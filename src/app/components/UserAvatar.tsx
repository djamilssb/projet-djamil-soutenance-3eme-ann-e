"use client";

import Link from "next/link";
import Image from 'next/image';

export default function UserAvatar(): React.JSX.Element {
    const image = "/avatar-default.png";

    return (
        <Link href="/account" className="avatar">
            <Image
                src={image}
                alt="Avatar"
                width="92"
                height="92"
            />
        </Link>
    );
}
