import { SignInButton, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
    return <header className="flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-3">
            <div className="bg-[#0160FE] w-fit p-2">
                <Image src="/uploadingLogo.png" width={50} height={50} alt="Logo"/>
            </div>
            <h1 className="font-bold text-xl">Uploading App</h1>
        </Link>
        <div className="px-5 flex items-center space-x-2">
            <UserButton afterSignOutUrl="/"/>
            <SignedOut>
                <SignInButton afterSignInUrl="/dashboard" mode="modal"/>
            </SignedOut>
        </div>
    </header>
};