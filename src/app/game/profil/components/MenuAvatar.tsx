import { useQuery } from "@tanstack/react-query";
import CardAvatar from "./CardAvatar";
import fetchListAvatar from "@/utils/fetcher/avatars/fetchListAvatar";
import Avatar from "@/app/api/models/Avatar";

interface MenuAvatarProps {
  onAvatarSelect: (avatarId: number, avatarUrl: string) => void;
  onClose: () => void;
}

export default function MenuAvatar({ onAvatarSelect, onClose }: MenuAvatarProps) {
  const { isPending, isError, data } = useQuery({
    queryKey: ["avatars"],
    queryFn: async () => {
      const avatars = await fetchListAvatar();
      return avatars.map((a) => new Avatar(a));
    },
  });

  const handleAvatarSelection = (avatarId: number, avatarUrl: string) => {
    onAvatarSelect(avatarId, avatarUrl);
    onClose();
  };

  if (isPending) {
    return (
      <div className="flex flex-col items-center bg-black/90 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-fit h-fit p-6 rounded-lg z-50 text-white">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-teal-400 mb-3"></div>
        Chargement des avatars...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center bg-black/90 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-fit h-fit p-6 rounded-lg z-50">
        <div className="text-red-500">Erreur lors du chargement des avatars.</div>
        <button 
          onClick={onClose}
          className="mt-4 bg-teal-400 hover:bg-teal-500 text-black font-bold py-2 px-4 rounded"
        >
          Fermer
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center">
      <div className="flex flex-col items-center bg-black/90 w-fit h-fit p-6 rounded-lg">
        <h3 className="text-white text-xl font-bold mb-4">
          Choisissez un avatar
        </h3>
        <div className="grid grid-cols-4 gap-6 mb-6">
          {data.map((a: Avatar) => {
            return (
              <CardAvatar
                key={a.getId()}
                avatarId={a.getId()!}
                avatarUrl={a.getImageUrl()!}
                onAvatarSelect={handleAvatarSelection}
              />
            );
          })}
        </div>
        <button 
          onClick={onClose}
          className="mt-4 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded"
        >
          Annuler
        </button>
      </div>
    </div>
  );
}