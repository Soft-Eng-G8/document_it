import { Prisma } from "@prisma/client"

export const sleep = async(ms: number) => new Promise<void>(resolve => setTimeout(() => {resolve()}, ms))
export const rngArr = (arr: Array<any>) => arr[Math.floor(Math.random() * arr.length)]

interface ICategoryPure {
    title: string;
    id: number;
    description: string;
    imageUrl: string | null;
    categoryId: number | null;
}

export interface ICategory {
    title: string;
    id: number;
    description: string;
    imageUrl: string | null;
    categories: ICategory[]
    documents: IDocument[]
}

export type widgetTypes = "category" | "document" | "all"

export const structureCategories = (data: ICategoryPure[]) => {
  const idMap = new Map<number, ICategory>();
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
id: number;
  title: string;
  description: string;
  imageUrl: string | null;
  categoryId: number;
  content: string | null;
  additional: string | null;
  updatedAt: Date;
  createdAt: Date;
  userId: string;
}

export interface IDocument {
  id: number;
  title: string;
  description: string;
  imageUrl: string | null;
  categoryId: number;
  content: string | null;
  additional: string | null;
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
    content: old.content,
    additional: old.additional,
    userId: old.userId,
    categoryId: old.categoryId
  }
}