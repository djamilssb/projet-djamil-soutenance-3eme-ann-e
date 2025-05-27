import Image from "next/image";

interface CardAvatarProps {
  avatarId: number;
  avatarUrl: string;
  onAvatarSelect: (avatarId: number, avatarUrl: string) => void;
}

export default function CardAvatar({ avatarId, avatarUrl, onAvatarSelect }: CardAvatarProps) {
  return (
    <div 
      className="cursor-pointer transition-transform hover:scale-110"
      onClick={() => onAvatarSelect(avatarId, avatarUrl)}
    >
      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-teal-400">
        <Image 
          src={avatarUrl} 
          alt={`Avatar ${avatarId}`} 
          width={64} 
          height={64}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}