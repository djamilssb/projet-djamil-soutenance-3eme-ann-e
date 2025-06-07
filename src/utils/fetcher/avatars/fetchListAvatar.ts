import Avatar from "@/app/api/models/Avatar";

const fetchListAvatar = async (): Promise<Avatar[]> => {
    return await fetch('/api/avatar', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(async (res: Response) => {
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }

        const json = await res.json();

        if (!Array.isArray(json) || json.length === 0) {
            throw new Error('No avatars found or invalid response format');
        }

        return json;
    })
    .catch((err: Error) => {
        console.error('Error fetching avatars:', err);
        return [];
    });
};

export default fetchListAvatar;