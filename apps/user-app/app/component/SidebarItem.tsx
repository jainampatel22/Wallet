"use client"
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export const SidebarItem = ({ href, title, icon }: { href: string; title: string; icon: React.ReactNode }) => {
    const router = useRouter();
    const pathname = usePathname()
    const selected = pathname === href

    return (
        <div 
            className={`
                flex items-center p-3 rounded-lg transition-all duration-200 ease-in-out cursor-pointer
                ${selected 
                    ? "bg-purple-100 text-purple-700" 
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }
            `}
            onClick={() => {
                router.push(href);
            }}
        >
            <div className="mr-3 text-xl">
                {icon}
            </div>
            <div className={`font-medium ${selected ? "text-purple-700" : "text-gray-700"}`}>
                {title}
            </div>
        </div>
    )
}