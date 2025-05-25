import Question from "@/app/api/models/Question";

const fetchQuestionCreate = async (data: Question): Promise<number> => {
    return await fetch('/api/questions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(async (res: Response) => {
        console.info('question creating...')
        if (!res.ok) throw new Error('Failed to create question');
        const json = await res.json();

        if (res.status == 201) {
            console.info('question created')
            return json.result.insertId;
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