import { createAccount } from "@/lib/accountUtils";
import prisma from "@/lib/db";
import { getPermsFromRole, IDocument, issueToken } from "@/scripts/util";
import { Prisma, User } from "@prisma/client";
import { hash } from "argon2";
import { pinata } from "../utils/config";

interface IUserOptions {
  id?: string
  name?: string
  perms?: boolean
}

export interface IDocumentData {
  title: string
  description: string
  content: string
  additional: string
  categoryId?: string
  userId: string
  logo: File | null
  pdf: File | null
  requirements: {
    title: string
    description: string
  }[]
}

interface IDocumentOptions {
  id?: string,
  userId: string
  status?: string
  bypass?: string
}



class DBManager {
  constructor() {}

  //? Users
  public async fetchUser(options: IUserOptions) {
    const { id, name} = options
    const whereClauses = {
      ...(id && {id}),
      ...(name && {name})
    }
    try {
      const user = await prisma.user.findUnique({
        where: whereClauses as Prisma.UserWhereUniqueInput, 
        select: {
          id: true,
          name: true,
          email: true,
          hashedPassword: true,
          roles: {
            include: {
              permissions: true
            }
          }
        }
      })
      
      if(!user) throw new Error("No user found")

      return {
        user,
        perms: getPermsFromRole(user.roles) 
      }
    } catch(err) {
      throw new Error(err as string)
    }
  }

  public async addUser(username: string, email: string, password: string, provider: string) {
    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({ where: { name: username } })
    if (existingUser) {
      return new Response(JSON.stringify({ error: 'User already exists' }), { status: 400 });
    }

    const hashedPassword = await hash(password)

    const role = await prisma.role.findFirst({
      where: { name: 'USER' }
    })

    try {
      const newUser = await prisma.user.create({
        data: {
          name: username,
          username,
          email,
          hashedPassword,
          roles: {
            connect: { id: role!.id }
          }
        }, 
        include: {
          roles: {
            include: {
              permissions: true
            }
        }}
      })
      const perms = getPermsFromRole(newUser.roles)
      const accountData = 
        provider === 'credentials' ? 
          {username, hashedPassword}:
          { accessToken: 'actionTokenReel', refreshToken: 'refreshTokenReel', providerAccountId: 'someOAuthId' } 
      
      await createAccount(newUser.id, provider, 'someProviderId', accountData)
    
      const token = issueToken("7d", ['id', newUser.id], ['name', newUser.name], ['permissions', perms])

      return token
    } catch(error) {
      return new Error(error as string)
    }
  }

  //? Documents
  public async fetchDocument(options: IDocumentOptions) {
    const { id, userId, status } = options
    const whereClauses = {
      ...(id && {id}),
      ...(userId && {userId})
    }
    try {
      const document = prisma.document.findUnique({
        where: whereClauses as Prisma.DocumentWhereUniqueInput,

      })
      if(!document) throw new Error("No user found")

      return document
    } catch(error) {
      throw new Error(error as string)
    }
  }

  public async addDocumentPending(doc: IDocumentData, options: IDocumentOptions) {
    try {
      const contribution_empty = await prisma.contribution.create({
        data: {
          newTitle: doc.title,
          newDescription: doc.description,
          newContent: doc.content,
          newAdditional: doc.additional,
          newCategory: {
            connect: { id: doc.categoryId }
          },
          user: {
            connect: { id: options.userId }
          },
          status: "PENDING"
        }
      })

      let logoUrl: string | null = null
      if(doc.logo) {
        const logoUploadData = await pinata.upload.file(doc.logo)
        logoUrl = await pinata.gateways.createSignedURL({
          cid: logoUploadData.cid,
          expires: 3600 * 24 * 365
        })
      }
      let pdfUrl: string | null = null
      if(doc.pdf) {
        const fileUploadData = await pinata.upload.file(doc.pdf)
        pdfUrl = await pinata.gateways.createSignedURL({
          cid: fileUploadData.cid,
          expires: 3600 * 24 * 365
        })
      }

      const contribution = await prisma.contribution.update({
        where: { id: contribution_empty.id },
        data: {
          newImageURL: logoUrl,
          newPdfURL: pdfUrl,
          newRequirements: {
            create: doc.requirements.map(req => ({
              ...req,
    
            }))
          }
        }
      })

      if(options.bypass) {
        return this.verifyContribution(contribution.id, "APPROVED")
      }
      return contribution
    } catch (error) {
      console.error(error)
      return error
    }
  }

  public async editDocument(documentId: string, doc: IDocumentData, options: IDocumentOptions) {
    let logoUrl: string | null = null
    if(doc.logo) {
      const logoUploadData = await pinata.upload.file(doc.logo)
      logoUrl = await pinata.gateways.createSignedURL({
        cid: logoUploadData.cid,
        expires: 3600 * 24 * 365
      })
    }
    let pdfUrl: string | null = null
    if(doc.pdf) {
      const fileUploadData = await pinata.upload.file(doc.pdf)
      pdfUrl = await pinata.gateways.createSignedURL({
        cid: fileUploadData.cid,
        expires: 3600 * 24 * 365
      })
    }
    try {
        const oldDoc = await prisma.document.findUnique({
          where: { id: documentId }
        })
        if(!oldDoc) throw new Error("Cant find Document to edit")
        const contribution = await prisma.contribution.create({
        data: {
          oldTitle: oldDoc.title,
          newTitle: doc.title,
          oldDescription: oldDoc.description,
          newDescription: doc.description,
          oldContent: oldDoc.content,
          newContent: doc.content,
          oldAdditional: oldDoc.additional,
          newAdditional: doc.additional,
          oldCategory: {
            connect: { id: oldDoc.categoryId }
          },
          newCategory: {
            connect: { id: doc.categoryId }
          },
          oldImageURL: oldDoc.imageUrl,
          newImageURL: logoUrl,
          oldPdfURL: oldDoc.pdfUrl,
          newPdfURL: pdfUrl,
          user: {
            connect: { id: options.userId }
          },
          
          status: "PENDING"
        }
      })
      if(options.bypass) 
        return this.verifyContribution(contribution.id, "APPROVED")
    } catch (error) {
      
    }
  }


  //? Contributions
  public async createContribution(doc: IDocumentData) {
    // const document = prisma.document.create({
    //   data: {
    //     title: doc.title,
    //     description: doc.description,
    //     content: doc.content,
    //     additional: 
    //   }
    // })    
    // const req = prisma.requirement.createMany({
    //   data: document.requirements
    // })
  }
  public async verifyContribution(contributionId: string, status: "APPROVED" | "REJECTED") {
    try {
      const contribution = await prisma.contribution.update({
        where: { id: contributionId },
        data: { status, verifiedAt: new Date( ) },
        include: { newRequirements: true, oldRequirements: true, newCategory: true, oldCategory: true }
      })
      const applyChanges = status === "APPROVED"
      let updated_contribution = null;
      if(applyChanges) {
        switch (contribution.type) {
          case "NEW":
          updated_contribution = await prisma.contribution.update({
          where: { id: contributionId },
            data: {
              document: { create: {
                title: contribution!.newTitle,
                description: contribution!.newDescription,
                content: contribution!.newContent,
                additional: contribution!.newAdditional,
                requirements: {
                  connect: contribution!.newRequirements.map(req => ({id: req.id}))
                },
                addedBy: {
                  connect: { id: contribution!.userId }
                },
                category: {
                  connect: { id: contribution!.newCategoryid! }
                }
              }
            }}
          })
          break
        
          case "EDIT":
          updated_contribution = await prisma.contribution.update({
            where: { id: contributionId },
            data: {
              document: { update: {
                title: contribution!.newTitle,
                description: contribution!.newDescription,
                content: contribution!.newContent,
                additional: contribution!.newAdditional,
                requirements: {
                  connect: contribution!.newRequirements.map(req => ({id: req.id}))
                },
                addedBy: {
                  connect: { id: contribution!.userId }
                },
                category: {
                  connect: { id: contribution!.newCategoryid! }
                }  
              }}
            }
          })
          break
        }
      }
      return updated_contribution
    } catch (error) {
      
    }
  }
}


export default new DBManager()