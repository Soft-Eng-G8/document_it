import React from 'react'
import CategoryCard from './category_card'
import { Roboto } from 'next/font/google';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRouter } from 'next/navigation'
import prisma from '@/lib/db';


async function Categories({categories}: {categories: any}) {

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false
  };
  const router = useRouter();
  
  return (
    <div className='flex flex-col '>
      <Slider {...settings}>
      {categories.map((category: { id: React.Key | null | undefined; title: string; }, key: React.Key | null | undefined) => (
        <button onClick={() => router.push(`/category/${category.id}`)} key={key}>
          <CategoryCard key={category.id} category={category.title} symbol={""}/>
        </button>
        
      ))}
      </Slider>

    </div>
  )
}

export default Categories
