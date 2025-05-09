import Users from "@/app/api/models/Users";

const fetchSignUp = async (data: Users): Promise<boolean> => {
    return await fetch('/api/auth/sign-up', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(async (res: Response) => {

        if (!res.ok) {
            throw new Error('Network response was not ok');
        };

        const json = await res.json();

        if (json.message.includes('successful')) {
            console.log('User created successfully');
            return true;

        } else {
            throw new Error('User creation failed');
        };
    })
    .catch((err: Error) => {
        console.error('Error:', err);
        return false;

    });
};

export default fetchSignUp;