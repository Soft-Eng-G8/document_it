"use client";
import React from 'react'
import CategoryCard from './category_card'
import { Roboto } from 'next/font/google';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function Categories() {

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false
  };
  const categories = [
    {
      title: "Cat1",
      id: 1,
    },
    {
      title: "Cat2",
      id: 2,
    },
    {
      title: "Cat3",
      id: 3,
    },
    {
      title: "Cat4",
      id: 3,
    },
  ]

  return (
    <div className='flex flex-col '>
      <Slider {...settings}>
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category.title} symbol={""}/>
      ))}
      </Slider>

    </div>
  )
}

export default Categories
