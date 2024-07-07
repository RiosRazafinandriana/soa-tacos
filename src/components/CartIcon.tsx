"use client"
import React, { useEffect } from "react";
import Link from "next/link";
import { useCartStore } from "@/utils/store";
import { useSession } from "next-auth/react";

const CartIcon = () => {

    const {data:session,status} = useSession()

    const { totalItems } = useCartStore()

    useEffect(()=>{
        useCartStore.persist.rehydrate()
    },[])

    return(
        <div>
            {status === "authenticated" ? (
                session?.user.isAdmin ? (
                    <Link href="/add" className="font-bold">Ajouter produit</Link>
                ) : (
                    <Link href="/cart">
                        <div className="flex items-center gap-4">
                            <span>
                                Panier<span className="font-bold">({totalItems})</span>
                            </span>
                        </div>
                    </Link>
                )
            ) : (
                <div></div>  // Div vide pour les utilisateurs non authentifiés
            )}
        </div>
    )
}

export default CartIcon