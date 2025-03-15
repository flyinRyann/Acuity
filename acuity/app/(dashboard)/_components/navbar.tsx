import { UserButton } from "@clerk/nextjs"
import Image from "next/image";
import { Logo } from "./logo";

export const Navbar = () => {
    return (
        <div>
            {/* Header */}
            <header className="border-b border-gray-200 p-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    {/* Note to self: Add Logo */}
                    <Logo />
                </div>
                <div>
                    <UserButton afterSignOutUrl="/" />
                </div>
            </header>
        </div>
    )
}