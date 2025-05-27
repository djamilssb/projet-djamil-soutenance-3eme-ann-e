import { useModale } from "@/app/hooks/useModale";
import Image from "next/image";

interface CardAvatarProps {
    avatarId: number;
    avatarUrl: string;
    onAvatarSelect: (id: number, url: string) => void;
}

export default function CardAvatar({ avatarId, avatarUrl, onAvatarSelect }: CardAvatarProps) {
    const handleClick = () => {
        onAvatarSelect(avatarId, avatarUrl);
    };

    return (
        <div
            onClick={handleClick}
            className="relative w-[10vw] h-[18vh] rounded-full group hover:scale-105 transition-transform duration-300 cursor-pointer"
        >
            <Image
                src={avatarUrl}
                alt="Avatar"
                fill
                className="rounded-full transition-transform duration-300 group-hover:scale-110"
            />
        </div>
    );
}