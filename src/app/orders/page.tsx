"use client"

import { OrderType } from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";
import { toast } from "react-toastify";

const OrderPage = () => {

    const {data:session,status} = useSession()

    const router = useRouter()

    if (status === "unauthenticated") {
        router.push("/");
    }

    const { isLoading, error, data } = useQuery({
        queryKey: ['orders'],
        queryFn: () => 
            fetch('http://localhost:3000/api/orders').then((res) => res.json()),
    })

    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: ({ id, status }: { id: string; status: string }) => {
            return fetch(`http://localhost:3000/api/orders/${id}`, {
                method:"PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(status),
            });
        },
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ["orders"] });
        },
    });

    const handleUpdate = (e: React.FormEvent<HTMLFormElement>, id: string) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement;
        const input = form.elements[0] as HTMLInputElement
        const status = input.value

        mutation.mutate({ id, status })
        toast.success("Le statut de la commande a été mis à jour")

    }

    if (isLoading || status === "loading") {
        return 'Loading...'
    }

    console.log(data);
    

    return (
        <div className="p-4 xl:px-40">
            <table className="w-full border-separate border-spacing-3">
                <thead>
                    <tr className="text-left">
                        <th>ID Commande</th>
                        <th>Date</th>
                        <th>Price</th>
                        <th>Produits</th>
                        <th>Addresse</th>
                        <th>Statut</th>
                    </tr>
                </thead>
                <tbody>
                    {[...data].reverse().map((item: OrderType) => (
                        <tr className={`${item.status !== "livré" && "bg-red-50"}`} key={item.id}>
                        <td className="py-6 px-1">{item.id}</td>
                        <td className="py-6 px-1">{item.createdAt.toString().slice(0,10)}</td>
                        <td className="py-6 px-1">{item.price}</td>
                        <td className="py-6 px-1">{item.products[0].title}</td>
                        <td className="py-6 px-1">{item.address}</td>
                        
                        {session?.user.isAdmin ? (
                            <td>
                                <form className="flex items-center justify-center gap-4" onSubmit={(e) => handleUpdate(e,item.id)}>
                                    <input placeholder={item.status} className="p-2 ring-1 ring-red-100 rounded-md"/>
                                    <button className="bg-red-400 p-2 rounded-full">
                                        <Image src="/edit.png" alt="" width={20} height={20}/>
                                    </button>
                                </form>
                            </td>
                        ) : (
                            <td className="py-6 px-1">{item.status}</td>
                        )
                        }
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default OrderPage