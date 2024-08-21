'use client'

import Image from "next/image";
import { useMediaQuery } from "@/hooks/use-media-query";

export default function Footer() {
    const isDesktop = useMediaQuery("(min-width: 768px)");
    // return isDesktop ? <div>Desktop</div> :
    //     <footer className="p-5">
    //         <div className="flex justify-center items-center">
    //             <Image src={"/ueek-connect-logo.svg"} width={100} height={100} className="w-[125px]" />
                
    //         </div>
    //         <div className="flex justify-center space-x-7 mt-5">
    //             <a href="#" className="text-slate-200 py-2">Início</a>
    //             <a href="#" className="text-slate-200 py-2">Como funciona?</a>
    //             <a href="#" className="text-slate-200 py-2">Prêmio</a>
    //         </div>
    //     </footer>
    return (
        <footer className="p-5">
            <div className="flex justify-center items-center">
                <Image src={"/ueek-connect-logo.svg"} width={100} height={100} className="w-[125px]" />
                
            </div>
            <div className="flex justify-center space-x-7 mt-5">
                <a href="#" className="text-slate-200 py-2">Início</a>
                <a href="#" className="text-slate-200 py-2">Como funciona?</a>
                <a href="#" className="text-slate-200 py-2">Prêmio</a>
            </div>
        </footer>
    )
}