"use client"

import { signOut, useSession } from "next-auth/react"
import Link from "next/link";

const UserLinks = () => {
    const { status } = useSession();
  return (
    <div>
        {status === "authenticated" ? (
                    <div>
                        <Link href="/orders">Commandes</Link>
                        <span className="ml-4 cursor-pointer" onClick={()=>signOut()}>Déconnexion</span>
                    </div>
                ) : (
                    <Link href="/login">connexion</Link>
                )}
    </div>
  )
}

export default UserLinks
