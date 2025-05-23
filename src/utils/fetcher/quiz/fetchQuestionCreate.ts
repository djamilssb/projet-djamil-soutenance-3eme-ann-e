import Question from "@/app/api/models/Question";

const fetchQuestionCreate = async (data: Question): Promise<boolean> => {
    return await fetch('/api/questions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(async (res: Response) => {
        if (!res.ok) {
            if (res.status === 400) {
                console.error(res.text);
            }
        }
        const json = await res.json();

        if (res.status == 201) {
            return true;
        } else {
            throw new Error('Question creation failed');
        }
    })
    .catch((err: Error) => {
        console.error('Error:', err);
        return false;
    });
};

export default fetchQuestionCreate;