import Quizz from "@/app/api/models/Quizz";

const fetchQuizUpdate = async ({ id, data }: { id: number; data: Quizz; }): Promise<boolean> => {
    try {
        const res = await fetch(`/api/quizz/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (res.status == 200) {
            return true;
        }

        console.error(`Failed to update quiz with id ${id}: ${res.status}`);
        return false;
        
    } catch (err) {
        console.error('Error updating quiz:', err);
        return false;
    }
};

export default fetchQuizUpdate;