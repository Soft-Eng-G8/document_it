import { Prisma } from "@prisma/client"
import { NextRequest } from "next/server";
import { JwtPayload, sign, verify } from "jsonwebtoken";
import { JWT_SECRET } from "@/app/api/config";

export const sleep = async(ms: number) => new Promise<void>(resolve => setTimeout(() => {resolve()}, ms))
export const rngArr = (arr: Array<any>) => arr[Math.floor(Math.random() * arr.length)]

interface ICategoryPure {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  categoryId: string | null;
}

export interface ICategory {
  title: string;
  id: string;
  description: string;
  imageUrl: string | null;
  categories: ICategory[]
  documents: IDocument[]
}

export type widgetTypes = "category" | "document" | "all"

export const structureCategories = (data: ICategoryPure[]) => {
  const idMap = new Map<string, ICategory>();
  const topLevelCategories: ICategory[] = []

  for(const cat of data) idMap.set(cat.id, migrateCategory(cat))
  for(const cat of data) {
    const currentCategory = idMap.get(cat.id)!;

    if(cat.categoryId === null) topLevelCategories.push(currentCategory)
    else {
      const parentCategory = idMap.get(cat.categoryId)
      if(parentCategory) parentCategory.categories.push(currentCategory)
    }
  }

  return topLevelCategories
}

interface IDocumentPure {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  pdfUrl: string | null;
  categoryId: string;
  content: string | null;
  additional: string | null;
  updatedAt: Date;
  createdAt: Date;
  userId: string;
}

export interface IDocument {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  categoryId: string;
  content: string | null;
  additional: string | null;
  pdfUrl: string | null;
  // updatedAt: Date;
  // createdAt: Date;
  userId: string;
}

export const structureDocuments = (documents: IDocumentPure[], categories: ICategory[]) => {
  const documents_reel = documents.map(doc => migrateDocument(doc))
  function assignRecursively(category: ICategory): ICategory {
    // Find documents for the current category
    const assignedDocs = documents_reel.filter((doc) => doc.categoryId === category.id);

    // If this category has subcategories, process them recursively
    const updatedSubcategories = category.categories.map(assignRecursively);
    
    const returnVal = {
      ...category,
      categories: updatedSubcategories,
      documents: assignedDocs, // Add documents only at this category level
    }
    return returnVal
  }

  return categories.map(assignRecursively);
}

const migrateCategory = (old: ICategoryPure): ICategory => {
  return {
    id: old.id,
    title: old.title,
    description: old.description,
    imageUrl: old.imageUrl,
    categories: [],
    documents: []
  }
}

export const migrateDocument = (old: IDocumentPure): IDocument => {
  return {
    id: old.id,
    title: old.title,
    description: old.description,
    imageUrl: old.imageUrl,
    pdfUrl: old.pdfUrl,
    content: old.content,
    additional: old.additional,
    userId: old.userId,
    categoryId: old.categoryId
  }
}

interface IPerms {
  id: string
  name: string
  authorityLevel: number
}
interface IRoles {
  id: string
  name: string
  permissions: IPerms[]
}
export const getPermsFromRole = (roles: IRoles[]) => {
  const perms = Object.values(
  roles
    .flatMap((role: IRoles) => role.permissions)
    .reduce((acc, permission) => {
      const existing = acc[permission.name];
      // Keep the one with the highest authority level
      if (!existing || permission.authorityLevel > existing.authorityLevel) {
        acc[permission.name] = permission;
      }
      return acc;
    }, {} as Record<string, IRoles['permissions'][0]>)
  );
  return perms
}


export const formatPerms = (perms: IPerms[]) => {
  return {
    value: perms,
    has: (...val: string[]) => perms.find(perm => val.every(valPerm => perm.name === valPerm))
  }
}


type tokenProp = [key: string, val: any]
export const issueToken = (expiresIn: string, ...args: tokenProp[]) => {
  const tokenProps = Object.fromEntries(args)
  const token = sign(tokenProps, JWT_SECRET!, {expiresIn}) 
  return token
}

export const verifyToken = async(req: NextRequest) => {
  const authHeader = req.headers.get('Authorization')
  const token = authHeader?.split(" ")[1]
  if(!token) return {error: "Token not provided"}

  try {
    const decodedToken = verify(token, JWT_SECRET!) as JwtPayload
    return { decodedToken }
  } catch(e) {
    return { error: "Invalid or expired token" }
  }
}