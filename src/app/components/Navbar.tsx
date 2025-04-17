import Image from "next/image";
import React from "react";

export function Navbar(): React.JSX.Element {
    return (
        <nav className="mr-6 ml-6 mt-2">
            <div className="flex items-center justify-between">
                <Image src={"https://live.staticflickr.com/65535/54455195422_75049b52e6_m.jpg"} alt="Logo de KidsTrotter" height={140} width={140}/>
                <h1 className="text-[var(--secondary-color)] bold">KidsTrotter</h1>
                <button className="bg-[var(--secondary-color)] hover:bg-[var(--hover-secondary)] bold p-4 rounded">Se connecter/s&apos;inscrire</button>
            </div>
        </nav>
    )
}