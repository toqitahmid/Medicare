"use client";

import React from "react";
import Link from "next/link";
import { Avatar, Button } from "@heroui/react";
import { Home } from "lucide-react";
import { authClient } from "@/app/lib/auth-client";

const Navbar = () => {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    return (
        <header className="w-full h-16 bg-background/70 backdrop-blur-2xl saturate-150 border-b border-divider/50 flex items-center justify-end px-6 sticky top-0 z-40 shadow-sm">
            <div className="flex items-center gap-4">
                <Link 
                    href="/" 
                    className="flex items-center justify-center w-10 h-10 bg-default-100/50 hover:bg-primary/10 text-default-500 hover:text-primary transition-all duration-300 rounded-xl hover:shadow-sm"
                    aria-label="Home"
                >
                    <Home className="w-4 h-4" />
                </Link>

                <div className="relative group cursor-pointer transition-transform duration-300 hover:scale-105">
                    <Avatar className="shadow-sm">
                        <Avatar.Image
                            src={user?.photo}
                            alt={user?.name || "User Avatar"}
                            className="size-10 rounded-full"
                        />
                    </Avatar>
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full shadow-[0_0_6px_rgba(34,197,94,0.5)]"></div>
                </div>
            </div>
        </header>
    );
}

export default Navbar;