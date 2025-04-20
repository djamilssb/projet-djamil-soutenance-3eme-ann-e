import Link from "next/link";
import React from "react";

export function Footer(): React.JSX.Element {
    return (
        <section className="flex justify-between p-4 levitate">
            <h2 hidden>Footer menu</h2>
            <div className="bg-[var(--secondary-color)] flex max-w-fit gap-4 rounded bold">
                <Link href="">
                    <div className="hover:bg-[var(--hover-secondary)] p-2 rounded">
                        <h3>Conditions générales d&apos;utilisation</h3>
                    </div>
                </Link>
                <Link href="">
                    <div className="hover:bg-[var(--hover-secondary)] p-2 rounded">
                        <h3>Gestion des coockies</h3>
                    </div>
                </Link>
            </div>  
            <Link href="">
                <div className="bg-[var(--secondary-color)] hover:bg-[var(--hover-secondary)] p-2 rounded">
                    <button className="bold mr-2 cursor-pointer">Nous contacter</button>
                </div>
            </Link>
        </section>
    )
}