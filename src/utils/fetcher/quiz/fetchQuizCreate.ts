import Quizz from "@/app/api/models/Quizz";
import fetchQuestionCreate from "./fetchQuestionCreate";

const fetchQuizCreate = async (data: Quizz): Promise<boolean> => {
    return await fetch('/api/quizz', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(async (res: Response) => {
        if (!res.ok) {
            if (res.status === 401) {
                console.error('Session expired or invalid credentials');
            }
            throw new Error('Network response failed');
        }
        const json = await res.json();
        console.info('new', json);

        if (res.status == 201) {
            const quizId = json.result.insertId;

            return true;
        } else {
            throw new Error('Quiz creation failed');
        }
    })
    .catch((err: Error) => {
        console.error('Error:', err);
        return false;
    });
};

export default fetchQuizCreate;