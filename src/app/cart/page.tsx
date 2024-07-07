"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useCartStore } from "@/utils/store";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const CartPage = () => {
    const {products, totalItems, totalPrice, removeFromCart} = useCartStore()
    const {data: session} = useSession()
    const router = useRouter()
    const [deliveryAddress, setDeliveryAddress] = useState(""); // Ajout de l'état pour l'adresse

    useEffect(()=>{
        useCartStore.persist.rehydrate()
    },[])

    const resetCart = () => useCartStore.setState({ products: [], totalItems: 0, totalPrice: 0 })

    const handleCheckout = async () => {
        if (!session) {
            router.push("/login");
        } else if (!deliveryAddress) { // Vérifier si l'adresse de livraison est fournie
            toast.error("Veuillez fournir une adresse de livraison.");
        } else {
            try {
                const res = await fetch("http://localhost:3000/api/orders", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        price: totalPrice,
                        products,
                        status: "En cours de livraison",
                        address: deliveryAddress,
                        userEmail: session.user.email // Inclure l'adresse de livraison
                    })
                })
                toast.success("Commande réussie ! Votre commande est en route")
                resetCart()
                router.push("/orders")
            } catch (err) {
                console.log(err);
            }
        }
    }

    return (
        <div className="h-[calc(100vh-6rem)] flex flex-row text-red-500">
            <div className="h-full w-3/5 p-4 xl:px-40 flex flex-col justify-center overflow-scroll text-xl">
                {products.map((item) => (
                    <div className="flex items-center justify-between mb-4" key={item.id}>
                        {item.img && (<Image src={item.img} alt="" width={100} height={100}/>)}
                        <div className="">
                            <h1 className="uppercase text-xl font-semibold">{item.title} x{item.quantity}</h1>
                            <span>{item.optionTitle}</span>
                        </div>
                        <h2 className="font-semibold">{item.price}</h2>
                        <span className="cursor-pointer" onClick={() => removeFromCart(item)}>X</span>
                    </div>
                ))}
            </div>
            <div className="xl:px-40 h-full w-2/5 p-4 bg-fuchsia-50 flex flex-col justify-center gap-6 text-xl">
                <div className="flex justify-between">
                    <span className="">Sous-total ({totalItems})</span>
                    <span>MGA {totalPrice}</span>
                </div>
                <div className="flex justify-between">
                    <span className="">Coût service</span>
                    <span>0</span>
                </div>
                <div className="flex justify-between">
                    <span className="">Frais de livraison</span>
                    <span className="text-green-500">Gratuit !</span>
                </div>
                <input
                    type="text"
                    placeholder="Adresse de livraison"
                    className="border-2 border-red-500 rounded-md p-2 text-black"
                    required
                    value={deliveryAddress}
                    onChange={e => setDeliveryAddress(e.target.value)}
                />
                <hr className="my-2"/>
                <div className="flex justify-between">
                    <span className="">Total</span>
                    <span className="font-bold">MGA {totalPrice}</span>
                </div>
                <button className="self-end bg-red-500 text-white p-3 rounded-md w-1/2" onClick={handleCheckout}>valider</button>
            </div>
        </div>
    )
} 

export default CartPage