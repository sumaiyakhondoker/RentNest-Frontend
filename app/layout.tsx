
import type { Metadata } from 'next'
import "./globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import { Navbar } from '@/components/shared/navbar';
import { Footer } from '@/components/shared/footer';

const inter = Inter({subsets:['latin'],variable:'--font-sans'});


export const metadata: Metadata = {
  title: 'RentNest',
  description: 'Created by Nabila',
}



export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
     className={cn("h-full antialiased", "font-sans", inter.variable)}
    >
      <body className="min-h-full flex flex-col">
        <Navbar></Navbar>
        <main className='flex-1'>
          {children}
        </main>
        <Footer></Footer>
        <Toaster position="top-right" richColors/>
        
      </body>
    </html>
  );
}
