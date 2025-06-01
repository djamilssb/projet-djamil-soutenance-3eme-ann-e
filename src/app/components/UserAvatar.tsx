"use client";

import Link from "next/link";
import Image from 'next/image';

export default function UserAvatar(): React.JSX.Element {
    const image = "/default_avatar.webp";

    return (
        <Link href="/game/profil" className="avatar">
            <Image
                src={image}
                alt="Avatar"
                width="92"
                height="92"
            />
        </Link>
    );
}
