import ItemEntry from '@/components/molecules/categoryEntry'
import { ICategory, IDocument, widgetTypes } from '@/scripts/util'

interface IItemTree {
  items: ICategory[] | IDocument[]
  compact: boolean
  type: widgetTypes
}

const ItemTree = ({items, compact, type}: IItemTree) => {

  return (
    <div className='space-y-3'>
    {
      items.map(item => <ItemEntry compact={compact} item={item} type={type}/>)
    }
    </div>
  )
}

export default ItemTree