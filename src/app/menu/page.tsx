import { MenuType } from "@/types/types";
import Link from "next/link";
import React from "react";

const getData = async () => {
    const res = await fetch("http://localhost:3000/api/categories",{
        cache:"no-store"
    })

    if (!res.ok) {
        throw new Error("Failed!");
    }

    return res.json()
}

const MenuPage = async () => {

    const menu:MenuType =await getData()
    return (
        <div className="p-4 px-20 h-[calc(100vh-6rem)] flex flex-row items-center bg-fuchsia-50">
            {menu.map((category) => (
                <Link className={`first:rounded-l-lg last:rounded-r-lg w-full h-2/3 bg-cover p-8  flex flex-col justify-between first:bg-red-500 last:bg-orange-400 shadow-lg`} href={`/menu/${category.slug}`} key={category.id} style={{ backgroundImage: `url(${category.img})` }}>
                    <div className={`text-${category.color} w-1/2`}>
                        <div>
                            <h1 className="uppercase font-bold text-3xl">{category.title}</h1>
                            <p className="mb-4">{category.desc}</p>
                        </div>
                                            
                        </div>
                        <div className="mt-auto">
                            <button className={`block border-2 border-${category.color} text-${category.color} rounded-lg p-2 self-start`}>Découvrir</button>
                         </div> 
                </Link>
            ))}
        </div>
    )
}

export default MenuPage