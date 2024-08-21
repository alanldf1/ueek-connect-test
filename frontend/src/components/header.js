'use client'

import Image from "next/image";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { useMediaQuery } from "@/hooks/use-media-query";
import { AlignJustify, X } from "lucide-react";
import * as SheetPrimitive from "@radix-ui/react-dialog"

export default function Header() {
    const isDesktop = useMediaQuery("(min-width: 768px)");
    return isDesktop ? 
    <header className="p-5 md:container">
        <div className="flex justify-between items-center">
            <Image src={"/ueek-connect-logo.svg"} width={100} height={100} className="w-[125px]" />
            <div className="flex space-x-4">
                <div className="flex justify-center space-x-7">
                    <a href="#" className="text-slate-200 py-2">Início</a>
                    <a href="#" className="text-slate-200 py-2">Como funciona?</a>
                    <a href="#" className="text-slate-200 py-2">Prêmio</a>
                </div>
                <Button>Comprar número</Button>
            </div>
        </div>

    </header>
    :
        <header className="p-5">
            <div className="flex justify-between items-center">
                <Image src={"/ueek-connect-logo.svg"} width={100} height={100} className="w-[125px]" />
                <div className="flex space-x-4">
                    <Button>Comprar número</Button>
                    <Sheet>
                        <SheetTrigger>
                            <AlignJustify color="#EDF0F3" />
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <Image src={"/ueek-connect-logo.svg"} width={100} height={100} className="w-[125px]" />
                                <SheetPrimitive.Close
                                    className="rounded-sm ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
                                    <X className="h-7 w-7 background text-slate-200" />
                                    {/* <span className="sr-only">Close</span> */}
                                </SheetPrimitive.Close>
                            </SheetHeader>
                            
                            <div className="flex flex-col space-y-3 mt-10">
                                <a href="#" className="text-slate-200 py-2">Início</a>
                                <a href="#" className="text-slate-200 py-2">Como funciona?</a>
                                <a href="#" className="text-slate-200 py-2">Prêmio</a>
                            </div>
                            
                        </SheetContent>
                    </Sheet>
                </div>
            </div>

        </header>
    // return (
    // <div className="header ">
    //     <Image src={"/ueek-connect-logo.svg"} width={100} height={100} className="w-[300px]"/>
    // </div>
    // )
}