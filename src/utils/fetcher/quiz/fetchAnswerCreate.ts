import Answer from "@/app/api/models/Answer";

const fetchAnswerCreate = async (data: Answer): Promise<boolean> => {
    console.error('answer data', data);
    return await fetch('/api/answers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(async (res: Response) => {
        console.error('answer creating...', res.text);
        if (!res.ok) throw new Error('Failed to create answer');
        const json = await res.json();

        if (res.status == 201) {
            return true;
        } else {
            throw new Error('Answer creation failed');
        }
    })
    .catch((err: Error) => {
        console.error('Error:', err);
        return false;
    });
};

export default fetchAnswerCreate;