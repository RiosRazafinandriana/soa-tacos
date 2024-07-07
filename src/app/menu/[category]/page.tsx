import { ProductType } from "@/types/types";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const getData = async (category:string) => {
    const res = await fetch(`http://localhost:3000/api/products?cat=${category}`,{
        cache:"no-store"
    })

    if(!res.ok){
        throw new Error("Failed!");
    }

    return res.json()
}    

type Props = {
    params:{category:string}
}

const CategoryPage = async ({params}:Props) => {
    
    const products:ProductType[] = await getData(params.category)
    return (
        <div className="text-red-500 h-[calc(100vh-6rem)] flex flex-wrap">
            {products.map((item) => (
                <Link className="w-1/4 h-[60%] p-2 flex flex-col border-r-2 border-b-2 border-red-500 group odd:bg-fuchsia-50" href={`/product/${item.id}`} key={item.id}>
                    {item.img && (
                        <div className="relative h-full">
                            <Image src={item.img} alt="" fill className="object-contain"/>
                        </div>
                    )}
                    <div className="flex items-center justify-between h-2/5">
                        <h1 className="text-xl uppercase p-2 font-semibold">{item.title}</h1>
                        <h2 className="group-hover:hidden text-xl">MGA {item.price}</h2>
                        <button className="hidden group-hover:block uppercase bg-red-500 text-white p-2 rounded-md">Ajouter au panier</button>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default CategoryPage;