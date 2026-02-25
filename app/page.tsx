"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";



export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-[#00A884] dark:bg-[#111B21] text-white p-4">
            <div className="text-center space-y-6">
                <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">
                    Welcome to Whatsapp
                </h1>
                <p className="text-xl md:text-2xl text-white/80" >
                    It's a clone of Whatsapp
                </p>
                <Button asChild size="lg" className="px-15 py-7 bg-white text-[#00A884] hover:bg-gray-100 dark:bg-[#202C33] dark:text-white dark:hover:bg-[#243942]
                text-xl
                ">
                    <Link className=" font-semibold " href="/chat">
                        Start Chatting</Link>

                </Button>
            </div>
        </main>
    );
}
/*"email":"arpansakar@gmail.com","name":"Arpan","profileImage */