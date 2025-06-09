"use client";

import Link from "next/link";
import Image from 'next/image';
import { useQuery } from "@tanstack/react-query";

interface AvatarData {
    id: number;
    image_url: string;
}

export default function UserAvatar(): React.JSX.Element {
    const { data: userData, isLoading, isError } = useQuery<AvatarData>({
        queryKey: ['user-avatar'],
        queryFn: async () => {
            const tokenResponse = await fetch('/api/auth/token-id');
            const tokenData = await tokenResponse.json();
            console.log('Token data:', tokenData);

            if (!tokenData.userId) {
                console.log('No userId found');
                return {
                    id: 0,
                    image_url: "/default_avatar.webp"
                };
            }

            const avatarResponse = await fetch(`/api/avatar/${tokenData.userId}`);
            const avatarData = await avatarResponse.json();
            console.log('Avatar data:', avatarData);

            if (!avatarData || !avatarData.image_url) {
                console.log('No avatar data found');
                return {
                    id: 0,
                    image_url: "/avatar-default.png"
                };
            }

            return avatarData;
        },
        staleTime: Infinity,
        retry: false
    });

    console.log('Final userData:', userData);

    if (isLoading) {
        return <div className="w-[92px] h-[92px] rounded-full bg-gray-200 animate-pulse" />;
    }

    if (isError) {
        console.error('Error loading avatar');
        return <div className="w-[92px] h-[92px] rounded-full bg-red-200" />;
    }

    return (
        <Link href="/game/profil" className="avatar">
            <Image
                src={userData?.image_url || "/default_avatar.webp"}
                alt="Avatar"
                width={92}
                height={92}
                className="rounded-full"
                priority
            />
        </Link>
    );
}