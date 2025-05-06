import Auth from "@/app/api/models/Auth";

const fetchSignIn = async (data: Auth): Promise<boolean> => {
    return await fetch('/api/auth/sign-in', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(async (res: Response) => {
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        const json = await res.json();

        if (json.message.includes('successful')) {
            console.log('Authentication successful');
            return true;
        } else {
            throw new Error('Authentication failed');
        }
    })
    .catch((err: Error) => {
        console.error('Error:', err);
        return false;
    });
};

export default fetchSignIn;