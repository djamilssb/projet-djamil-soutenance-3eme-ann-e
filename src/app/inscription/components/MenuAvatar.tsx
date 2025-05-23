import CardAvatar from "./CardAvatar";

interface MenuAvatarProps {
    onAvatarSelect: (avatarId: number, avatarUrl: string) => void;
}

export default function MenuAvatar({ onAvatarSelect }: MenuAvatarProps) {
    return (
        <div className="flex flex-col items-center bg-black/90 absolute w-fit h-fit p-2">
            <h3 className="text-white text-xl font-bold mb-4">Choisissez un avatar</h3>
            <div className="flex gap-4">
                <CardAvatar avatarId={1} avatarUrl="/default_avatar.webp" onAvatarSelect={onAvatarSelect} />
                <CardAvatar avatarId={2} avatarUrl="/default_avatar.webp" onAvatarSelect={onAvatarSelect} />
                <CardAvatar avatarId={3} avatarUrl="/default_avatar.webp" onAvatarSelect={onAvatarSelect} />
            </div>
        </div>
    );
}