'use client'

import * as React from "react"
import { Progress } from "@/components/ui/multiple_uses/progress"
import { Button } from "@/components/ui/multiple_uses/button"
import { Input } from "@/components/ui/multiple_uses/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/multiple_uses/radio-group"
import { Label } from "@/components/ui/multiple_uses/label"
import { Textarea } from "@/components/ui/multiple_uses/textarea"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/multiple_uses/dropdown-menu"
import { AlertCircle, ImageUp } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/multiple_uses/alert"
import prisma from "@/lib/db"
import { ICategory } from "@/scripts/util"
import { redirect } from "next/navigation"
import manager, { IDocumentData } from "@/app/manager"
import { useSession } from "next-auth/react"

interface FormData {
  title: string;
  description: string;
  
  categoryId: string;
  imageUrl: string;
  requirements: string[];
  additional: string;
  logo: File | null;
  pdf: { name: string; file: File }[];
}

const DEFAULT_LOGO_URL = "https://i.ibb.co/VLjJjLg/ljomhorya.png"

interface catInterface  {
    categories: ICategory[]

}

function DocsCreate({categories}: catInterface) {
  // const { decodedToken, error }

    const phases = [
        {
          title: "Main Info",
          content: ({ formData, setFormData, errors }: { formData: IDocumentData; setFormData: React.Dispatch<React.SetStateAction<IDocumentData>>; errors: string[] }) => (
            <div className="space-y-4">
              <p>Please fill out the following information:</p>
              <Input 
                placeholder="Document Name" 
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                required
              />
              <Input 
                placeholder="Organization Name" 
                value={formData.additional}
                onChange={(e) => setFormData(prev => ({ ...prev, additionalOrg: e.target.value }))}
                required
              />
              <Textarea 
                placeholder="Description" 
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="min-h-[100px]"
              />
              <div className="flex items-center space-x-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="secondary">{formData.categoryId || "Category"}</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Select Category</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup 
                      value={formData.categoryId}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, categoryId: value }))}
                    >
                                  {
                      categories.map(cat => <DropdownMenuRadioItem value={cat.title}>{cat.title}</DropdownMenuRadioItem>)
                      }
                      
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              {errors.length > 0 && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    {errors.map((error, index) => (
                      <p key={index}>{error}</p>
                    ))}
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )
        },
        {
          title: "Requirements & Observations",
          content: ({ formData, setFormData, errors }: { formData: IDocumentData; setFormData: React.Dispatch<React.SetStateAction<IDocumentData>>; errors: string[] }) => (
            <div className="space-y-4">
              <div>
                <Label htmlFor="requirements">Requirements</Label>
                {formData.requirements.map((req, index) => (
                  <div key={index} className="flex items-center space-x-2 mt-2">
                    <Input
                      value={req.title}
                      onChange={(e) => {
                        const newReqs = [...formData.requirements];
                        newReqs[index].title = e.target.value;
                        setFormData(prev => ({ ...prev, requirements: newReqs }));
                      }}
                      placeholder={`Requirement ${index + 1}`}
                      required={index === 0}
                    />
                    {index > 0 && (
                      <Button
                        variant="secondary"
                        onClick={() => {
                          const newReqs = formData.requirements.filter((_, i) => i !== index);
                          setFormData(prev => ({ ...prev, requirements: newReqs }));
                        }}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  className="mt-2"
                  onClick={() => setFormData(prev => ({ ...prev, requirements: [...prev.requirements, {title: '', description: ''}] }))}
                >
                  Add Requirement
                </Button>
              </div>
              <div>
                <Label htmlFor="observations">Observations</Label>
                <Textarea
                  id="observations"
                  value={formData.additional}
                  onChange={(e) => setFormData(prev => ({ ...prev, additionalContent: e.target.value }))}
                  placeholder="Enter your observations"
                  className="min-h-[100px]"
                />
              </div>
              {errors.length > 0 && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    {errors.map((error, index) => (
                      <p key={index}>{error}</p>
                    ))}
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )
        }, {
          title: 'Upload Files',
          content: ({ formData, setFormData }: { formData: IDocumentData; setFormData: React.Dispatch<React.SetStateAction<IDocumentData>> }) => (
          <div className="space-y-4">
            <div>
              <Label htmlFor="logo">Upload Logo (optional)</Label>
              <Input
                id="logo"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setFormData((prev) => ({ ...prev, logo: file }));
                  }
                }}
              />
              <p className="text-sm text-gray-500 mt-1">If no logo is uploaded, a default logo will be used.</p>
            </div>

            <div>
              <Label htmlFor="pdf">Upload PDF File</Label>
              {formData.pdf && (
                <div className="flex items-center space-x-2 mt-2">
                  <span>{formData.pdf.name}</span>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, pdf: null }));
                    }}
                  >
                    Remove
                  </Button>
                </div>
              )}
              <Input
                id="pdf"
                type="file"
                accept=".pdf"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setFormData((prev) => ({ ...prev, pdf: file }));
                  }
                }}
              />
            </div>
          </div>
        )

        },


        
        // {
        //   title: "Upload Files",
        //   content: ({ formData, setFormData }: { formData: IDocumentData; setFormData: React.Dispatch<React.SetStateAction<FormData>> }) => (
        //     <div className="space-y-4">
        //       <div>
        //         <Label htmlFor="logo">Upload Logo (optional)</Label>
        //         <Input
        //           id="logo"
        //           type="file"
        //           accept="image/*"
        //           onChange={(e) => {
        //             const file = e.target.files?.[0];
        //             if (file) {
        //               setFormData(prev => ({ ...prev, logo: file, imageUrl: URL.createObjectURL(file) }));
        //             }
        //           }}
        //         />
        //         <p className="text-sm text-gray-500 mt-1">If no logo is uploaded, a default logo will be used.</p>
        //       </div>
        //       <div>
        //         <Label htmlFor="files">Upload PDF Files (optional)</Label>
        //         {formData.files.map((file, index) => (
        //           <div key={index} className="flex items-center space-x-2 mt-2">
        //             <Input
        //               value={file.name}
        //               onChange={(e) => {
        //                 const newFiles = [...formData.files];
        //                 newFiles[index].name = e.target.value;
        //                 setFormData(prev => ({ ...prev, files: newFiles }));
        //               }}
        //               placeholder="File Title"
        //             />
        //             <span>{file.file.name}</span>
        //             <Button
        //               variant="secondary"
        //               onClick={() => {
        //                 const newFiles = formData.files.filter((_, i) => i !== index);
        //                 setFormData(prev => ({ ...prev, files: newFiles }));
        //               }}
        //             >
        //               Remove
        //             </Button>
        //           </div>
        //         ))}
        //         <Input
        //           type="file"
        //           accept=".pdf"
        //           onChange={(e) => {
        //             const file = e.target.files?.[0];
        //             if (file) {
        //               setFormData(prev => ({
        //                 ...prev,
        //                 files: [...prev.files, { name: '', file }]
        //               }));
        //             }
        //           }}
        //         />
        //       </div>
        //     </div>
        //   )
        // },
        {
          title: "Review",
          content: ({ formData }: { formData: IDocumentData }) => (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Review your document</h3>
              <p>Please review the information you've entered:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Document Name: {formData.title}</li>
                <li>Organization Name: {formData.additional}</li>
                <li>Category: {formData.categoryId}</li>
                <li>Requirements: {formData.requirements.length}</li>
                <li>Observations: {formData.content ? "Provided" : "Not provided"}</li>
                <li>Logo: {formData.logo ? "Custom logo uploaded" : "Using default logo"}</li>
                <li>PDF Files: {formData.pdf ? "Uploaded" : "Not Uploaded"}</li>
              </ul>
              <p>If everything looks correct, click 'Finish' to submit your document.</p>
            </div>
          )
        },
      ]
  const userData = useSession()
  if(userData.status === "loading") return <div>Waiting</div>
  const userId = userData.data?.user.id
  if(!userId) return <div>Not authed</div>
  const [progress, setProgress] = React.useState(25)
  const [currentPhase, setCurrentPhase] = React.useState(0)
  const [errors, setErrors] = React.useState<string[]>([])
  const [formData, setFormData] = React.useState<IDocumentData>({
    content: "",
    userId, 
    title: "",
    additional: "",
    categoryId: "",
    description: "",
    requirements: [],
    logo: null,
    pdf: null
  })

  const validateForm = () => {
    const newErrors: string[] = [];
    if (currentPhase === 0) {
      if (!formData.title) newErrors.push("Document name is required");
      if (!formData.additional) newErrors.push("Organization name is required");
      if (!formData.categoryId) newErrors.push("Category is required");
    } else if (currentPhase === 1) {
      if (formData.requirements.length === 0 || !formData.requirements[0]) {
        newErrors.push("At least one requirement is required");
      }
    }
    setErrors(newErrors);
    return newErrors.length === 0;
  }

  const handleNextPhase = async () => {
    if (validateForm()) {
      if (currentPhase < phases.length - 1) {
        setCurrentPhase(prev => prev + 1)
        setProgress(prev => Math.min(100, prev + 100 / phases.length))
      } else {
        console.log("Form submitted:", formData)
        const dataToSend = {
          
        }
        // const dataToSend = new FormData()
        // dataToSend.append("title", formData.title);
        // dataToSend.append("additional", formData.additionalOrg);
        // dataToSend.append("categoryId", formData.categoryId);
        // dataToSend.append("description", formData.description);
        // dataToSend.append("imageUrl", formData.imageUrl);
        // formData.requirements.forEach((req) => {
        //   dataToSend.append("requirements", req);
        // });
        // dataToSend.append("additionalContent", formData.additionalContent);
        // if (formData.logo) {
        //   dataToSend.append("logo", formData.logo);
        // }
        // formData.files.forEach((file) => {
        //   dataToSend.append("files", file.file);
        // });
        try {
          // const response = await fetch("/api/docForm", {
          //   method: "POST",
          //   body: dataToSend
          // })
          manager.addDocumentPending(formData, {
            userId,
          })
        } catch (e) {
          console.error(e)
        }
        redirect('/categories')
      }
    }
  }

  //first thing is if you wanna return navbar
  return (

    <div className='bg-mygrey'>
      <div className="sticky top-0 w-full z-50  p-4">
              <div className="flex justify-center">
                <div></div> 
              </div>
            </div>
      <div className="flex h-screen bg-mygrey">
        <div className="flex flex-col h-[800px] w-full xl:w-3/12 bg-mygrey p-10 xl:p-4 xl:ml-20">
          <div className="relative flex-1 bg-mygrey rounded-lg shadow-lg h-[500px]">
            <div className="absolute top-0 left-0 w-full bg-white p-6 rounded-tr-lg rounded-tl-lg shadow-lg">
              <h1 className='font-semibold text-black text-xl mb-2'>{phases[currentPhase].title}</h1>
              <Progress value={progress} className="w-full" />
            </div>

            <div className="flex justify-center absolute top-24 left-0 right-0 bottom-16 overflow-y-auto overflow-x-hidden p-4 bg-mygrey text-black">
              {phases[currentPhase].content({ formData, setFormData, errors })}
            </div>

            <div className="absolute bottom-0 left-0 w-full bg-mygrey text-black p-4 shadow-lg">
              <Button onClick={handleNextPhase} className="w-full">
                {currentPhase < phases.length - 1 ? "Next Phase" : "Finish"}
              </Button>
            </div>
          </div>
        </div>

        <div className="hidden xl:flex flex-col flex-1 h-[800px] bg-mygrey p-4 xl:mr-20">
          <div className="flex items-center h-16 bg-mygrey rounded-md mb-4">
            <h1 className='font-bold text-2xl text-black'>Preview</h1>
          </div>
          <div className="flex-1 bg-mywhite rounded-lg shadow-lg overflow-y-auto">
            <div className="flex items-center justify-center p-4 border-b border-gray-400">
              <p className="font-bold text-2xl  ">Create Document</p>
            </div>
            
            <div className=" p-20 ">
            <div className="space-y-4">
              <div className="flex flex-row ml-14">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-gray-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                </svg>
                <div className="mr-1"></div>
                <p className="block mb-1 text-gray-400 ">Document Name:</p>
                <div className="mr-16 ml-5"></div>
                <p className="break-words bg-mygrey text-black font-semibold p-2 rounded-sm">{formData.title}</p>
              </div>
              <div className="flex flex-row ml-14">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-gray-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                </svg>
                <div className="mr-1"></div>
                <p className="block mb-1 text-gray-400">Organization Name:</p>
                <div className="mr-14 ml-2"></div>
                <p className="break-words bg-mygrey text-black font-semibold p-2 rounded-sm">{formData.additional}</p>
              </div>
              <div className="flex flex-row ml-20">
                <p className="block mb-1 text-gray-400">Description:</p>
                <div className="mr-28 ml-2"></div>
                <div className="w-80 p-4 border rounded-md overflow-auto border-gray-300">
                  <p className="whitespace-pre-wrap text-black break-words">{formData.description}</p>
                </div>
              </div>
              <div className="flex flex-row ml-14">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-gray-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
                </svg>
                <div className="mr-1"></div>
                <p className="block mb-1 text-gray-400">Category:</p>
                <div className="mr-32 ml-2"></div>
                <p className="break-words bg-mygrey text-black font-semibold p-2 rounded-sm">{formData.categoryId}</p>
              </div>
              <div className="flex flex-row ml-14">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-gray-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
                <div className="mr-1"></div>
                <p className="block mb-1 text-gray-400">Logo:</p>
                <div className="mr-32 ml-9"></div>
                <div className="h-40 w-60 bg-mygrey rounded-sm flex items-center justify-center">
                  {/* <img
                    src={formData.imageUrl}
                    alt="Logo"
                    className="h-32 w-32 object-cover rounded-full"
                  /> */}
                  <ImageUploader file={formData.logo}/>
                </div>
              </div>
              <div className="flex flex-row ml-14">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-gray-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                <div className="mr-1"></div>
                <p className="block mb-1 text-gray-400">Requirements:</p>
                <div className="mr-24 ml-2"></div>
                <div className="w-80 p-4 border rounded-md overflow-auto border-gray-300">
                  <ul className="list-decimal list-inside">
                    {formData.requirements.map((req, index) => (
                      <li key={index} className="text-black break-words">{req.title}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex flex-row ml-14">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-gray-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                </svg>
                <div className="mr-1"></div>
                <p className="block mb-1 text-gray-400">Observations:</p>
                <div className="mr-24 ml-3"></div>
                <div className="w-80 p-4 border rounded-md overflow-auto border-gray-300">
                  <p className="whitespace-pre-wrap text-black break-words">{formData.content}</p>
                </div>
              </div>
              <div className="flex flex-row ml-14">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-gray-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
                <div className="mr-1"></div>
                <p className="block mb-1 text-gray-400">PDF Files:</p>
                <div className="mr-28 ml-5"></div>
                <div className="w-80 p-4 border rounded-md overflow-auto border-gray-300">
                  <ul className="list-disc list-inside">
                    <li className="text-black break-words">
                      {formData.pdf?.name}
                    </li>
                    {/* {formData.files.map((file, index) => (
                      <li key={index} className="text-black break-words">{file.name || file.file.name}</li>
                    ))} */}
                  </ul>
                </div>
              </div>
            </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}
interface ImageUploaderProps {
  file: File | null; // Prop to accept the image file
}
const ImageUploader: React.FC<ImageUploaderProps> = ({ file }) => {
  const [imageSrc, setImageSrc] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result as string); // Set the image source as base64
      };
      reader.readAsDataURL(file); // Convert the file to a data URL
    } else {
      setImageSrc(null); // Clear the image if no file is provided
    }
  }, [file]); // Re-run the effect when the file changes

  return (
    <div>
      {imageSrc ? (
        <img src={imageSrc} alt="Uploaded" style={{ maxWidth: "100%" }} />
      ) : (
        <p>No image to display</p>
      )}
    </div>
  );
};
export default DocsCreate

