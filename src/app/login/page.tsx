"use client"
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
    const { data, status } = useSession();
    const router = useRouter();

    if(status === "loading"){
        return <p>Loading...</p>
    }

    if(status === "authenticated"){
        router.push("/")
    }

    console.log("data: "+data);
    console.log("status: "+status);
    

    return( 
        <div className="p-4 h-[calc(100vh-6rem)] flex items-center justify-center">
            <div className="h-[70%] w-[60%] shadow-2xl rounded-md flex flex-row">
                <div className="relative w-1/2 h-full">
                   <Image src="/logo.jpg" alt="" layout="fill" objectFit="contain" className="object-cover"/>
                </div>
                <div className="p-10 flex flex-col gap-8">
                    <h1 className="font-semibold text-2xl text-red-500">Bienvenue !</h1>
                    <p>Se connecter ou créer compte</p>
                    <button className="flex items-center gap-4 p-4 ring-1 ring-blue-100 rounded-md" onClick={()=>{signIn("google")}}>
                        <Image src="/google.png" alt="" width={30} height={30} className="object-contain"/>
                        <span className="">
                            Se connecter avec Google
                        </span>
                    </button>
                    <button className="flex gap-4 p-4 ring-1 ring-blue-100 rounded-md">
                        <Image src="/facebook.png" alt="" width={20} height={20} className="object-contain"/>
                        <span>
                            Se connecter avec Facebook
                        </span>
                    </button>
                    <p className="text-sm">
                        Vous rencontrez un problème ? <Link className="underline" href="/">Contactez-nous</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default LoginPage