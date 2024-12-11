import CategoryTree from '@/components/organisms/categories/categoryTree'
import Footer from '@/components/organisms/home/footer'
export default () => {
  

  return (
  <>
    <header id="heading" className="py-64">
      <h1 className="
      text-center text-8xl
    ">Categories</h1>
    </header>
    <section className="w-[80vw] m-auto p-5 bg-slate-100 rounded-lg mb-32">
      <CategoryTree/>
    </section>

    <Footer/>
  </>
  )
}