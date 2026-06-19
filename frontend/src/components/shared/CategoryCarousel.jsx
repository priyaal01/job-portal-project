import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'
import Autoplay from "embla-carousel-autoplay";


const CategoryCarousel = () => {
    const category = [
        <img src='https:/thumbs.dreamstime.com/b/amazon-logo-amazon-logo-white-background-vector-format-avaliable-124289859.jpg' alt='' />,
        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpYSYRJF_IhvbEX26LqsL5w4eA5Xyc1P91oyCOVJa8ow&s=10' alt='' />,
        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF7innW58C7PAyAVy3h1614UsQI_UmKTcALInaoP3DMQ&s=10' alt='' />,
        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf32Pz5sj5OPu9thL69RmfrbjbMzmB0YBgfoDVkQYfAA&s=10' alt='' />,
        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGjQOGhUKPvYFM-r_slx6nO2Vq30OFJ99s_UgwKPLrlA&s=10' alt='' />,
        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0GSo2UGUtp_Y4L1JfF3njS9-sIPhYjSP16rVc0dIg-A&s=10' alt='' />,
        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfiXCpIb2nDB6PLi3jfPdZWRM7CmrnIclc4dl8dHFMWQ&s=10' alt='' />,

    ]
    return (
        <div>
            <Carousel plugins={[
                Autoplay({
                    delay: 2000,
                }),
            ]} className='w-full max-w-xl mx-auto my-16'>
                <CarouselContent>
                    {
                        category.map((cat, index) => (
                            <CarouselItem className='basis-1/2 md:basis-1/2 lg:basis-1/4 ml-8'>
                                <span className=''> {cat} </span>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
            </Carousel>
        </div>
    )

}

export default CategoryCarousel;