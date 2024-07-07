import React from "react";
import Link from "next/link";

const Footer = () => {
    return(
        <div className="h-12 p-2 pt-2 text-red-500 flex items-center justify-between px-32">
           <Link href="/" className="font-bold text-base">SOA TACOS</Link>
           <p>© TOUT DROITS RESERVÉS</p>
        </div>
    )
}

export default Footer