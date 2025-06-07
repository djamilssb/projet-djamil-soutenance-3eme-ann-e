import Auth from "@/app/api/models/Auth";

const fetchSignIn = async (data: Auth): Promise<boolean> => {
    try {
        const res = await fetch('/api/auth/sign-in', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            if (res.status === 401) {
                console.error('Session expired or invalid credentials');
            }
            throw new Error('Network response failed');
        }

        const json = await res.json();
        if (json.message.includes('successful')) {
            return true;
        } else {
            throw new Error('Authentication failed');
        }
    } catch (err) {
        console.error('Error:', err);
        return false;
    }
};

export default fetchSignIn;