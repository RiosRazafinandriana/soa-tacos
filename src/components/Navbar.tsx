import React from "react";
import Menu from "./Menu";
import Link from "next/link";
import Image from "next/image";
import CartIcon from "./CartIcon";
import UserLinks from "./UserLinks";

const Navbar = () => {
    {/*const user = true*/}

    return(
        <div className="h-24 text-red-500 p-4 pb-2 flex items-center justify-between border-b-2 border-b-red-500 uppercase px-40">
            {/*LOGO*/}
            <div className="flex gap-4 flex-1">
                <Link href="/">Accueil</Link>
                <Link href="/menu">Menu</Link>
                {/*<Link href="/">Contact</Link>*/}
            </div>

            <div className="text-xl font-bold flex-1 text-center justify-self-center">
                <Link href="/">Soa Tacos</Link>
            </div>

            <div className="flex gap-4 items-center flex-1 justify-end">
                <UserLinks/>
                <CartIcon/>
            </div>

        </div>
    )
}

export default Navbar