import { useQuery } from "@tanstack/react-query";
import CardAvatar from "./CardAvatar";
import fetchListAvatar from "@/utils/fetcher/avatars/fetchListAvatar";
import Avatar from "@/app/api/models/Avatar";

interface MenuAvatarProps {
  onAvatarSelect: (avatarId: number, avatarUrl: string) => void;
}

export default function MenuAvatar({ onAvatarSelect }: MenuAvatarProps) {
  const { isPending, isError, data } = useQuery({
    queryKey: ["avatars"],
    queryFn: async () => {
      const avatars = await fetchListAvatar();
      return avatars.map((a) => new Avatar(a));
    },
  });

  if (isPending) {
    return (
      <div className="flex flex-col items-center bg-black/90 absolute w-fit h-fit p-2 text-white">
        Chargement des avatars...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-500">Erreur lors du chargement des avatars.</div>
    );
  }

  return (
    <div className="flex flex-col items-center bg-black/90 absolute w-fit h-fit p-2">
      <h3 className="text-white text-xl font-bold mb-4">
        Choisissez un avatar
      </h3>
      <div className="flex gap-4">
        {data.map((a: Avatar) => {
          return (
            <CardAvatar
              key={a.getId()}
              avatarId={a.getId()!}
              avatarUrl={a.getImageUrl()!}
              onAvatarSelect={onAvatarSelect}
            />
          );
        })}
      </div>
    </div>
  );
}
