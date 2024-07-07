"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Footer from "./Footer";

const data = [
    {
        id: 1,
        title: "Ity ilay TACOS mahagaga",
        image: "/slide1.jpg"
    }, 
    {
        id: 2,
        title: "Azo atao PIZZA ihany koa",
        image: "/slide2.jpg"
    },
    {
        id: 3,
        title: "Be Fromage & Be Hena & Be Sauce",
        image: "/slide3.jpg"
    },
];

const Slider = () => {
    const [currentSlide, setCurrentSlide] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => setCurrentSlide((prev) => (prev === data.length - 1 ? 0 : prev +1))
        , 3500);
        return () => clearInterval(interval);
    }, []);

    return(
        <div className="flex flex-row h-[calc(100vh-6rem)] bg-fuchsia-50">
            {/* TEXT CONTAINER */}
            <div className="h-full flex items-center justify-center flex-col gap-8 text-red-500 font-bold w-1/2">
                <h1 className="text-7xl text-center uppercase p-4">
                    {data[currentSlide].title}
                </h1>
                <Link href="/menu" className="bg-red-500 text-white py-4 px-8 rounded-md w-48">
                    Commandez dès maintenant
                </Link>
            </div>
            
            {/* IMAGE CONTAINER */}
            <div className="w-1/2 h-full relative">
                <Image src={data[currentSlide].image} alt="" fill className="object-cover"/>
            </div>
        </div>
        
    )
}

export default Slider