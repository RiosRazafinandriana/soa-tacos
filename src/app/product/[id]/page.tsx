import React from "react";
import Image from "next/image";
import Price from "@/components/Price";
import { ProductType } from "@/types/types";
import DeleteButton from "@/components/DeleteButton";

const getData = async (id:string) => {
    const res = await fetch(`http://localhost:3000/api/products/${id}`,{
        cache:"no-store"
    })

    if (!res.ok) {
        throw new Error("Failed!");
    }

    return res.json()
}

const SingleProductPage = async ({params}:{params:{id:string}}) => {

    const singleProduct : ProductType = await getData(params.id)

    return (
            <div className="p-4 px-40 h-screen flex flex-row justify-around text-red-500 gap-8 items-center relative">
                {singleProduct.img && (
                    <div className="relative w-full h-[70%]">
                        <Image src={singleProduct.img} alt="" className="object-contain" fill/>
                    </div>
                )}
                <div className="flex flex-col h-[70%] justify-center">
                    <h1 className="text-5xl font-semibold uppercase">{singleProduct.title}</h1>
                    <span className="text-xl mt-2">{singleProduct.desc}</span>
                    <Price product={singleProduct}/>
                </div>
                <DeleteButton id={singleProduct.id}/>
            </div>
    )
}

export default SingleProductPage