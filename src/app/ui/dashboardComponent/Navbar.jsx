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
        <header className="w-full h-16 bg-content1/50 backdrop-blur-md border-b border-divider flex items-center justify-end px-6 sticky top-0 z-40 shadow-sm">
            <div className="flex items-center gap-4">
                <Link 
                    href="/" 
                    className="flex items-center justify-center w-10 h-10 bg-default-100 hover:bg-default-200 text-default-600 hover:text-foreground transition-all rounded-xl"
                    aria-label="Home"
                >
                    <Home className="w-4 h-4" />
                </Link>

                <div className="relative">
                    <Avatar>
                        <Avatar.Image
                            src={user?.photo}
                            alt={user?.name || "User Avatar"}
                            className="size-10 rounded-full"
                        />
                    </Avatar>
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-700 border-2 border-content1 rounded-full"></div>
                </div>
            </div>
        </header>
    );
}

export default Navbar;