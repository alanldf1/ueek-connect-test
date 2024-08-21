
import { Rubik } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

const rubik = Rubik({ 
  subsets: ["latin"],
  weights: [300, 400, 500, 600, 700, 800, 900], 
});

export const metadata = {
  title: "Ueek Connect",
  description: "Riga digital - Teste técnico",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <body className={`${rubik.className} text-slate-200 bg-darkbody md:container`}> */}
      <body className={`${rubik.className} text-slate-200 min-h-screen bg-darkbody bg-custom-gradient md:bg-custom-gradient-desktop bg-cover`}>
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
