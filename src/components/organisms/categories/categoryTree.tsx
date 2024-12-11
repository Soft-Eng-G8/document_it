import CategoryEntry from '@/components/molecules/categoryEntry'
import data from './dummyData.json' 
import { Category } from './interfaces'

const categories: Category[] = data

const CategoryTree = () => {

  return (
    <div className='space-y-3'>
    {
      categories.map(category => <CategoryEntry category={category}/>)
    }
    </div>
  )
}

export default CategoryTree