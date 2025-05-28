import Question from "@/app/api/models/Question";

const fetchQuestionUpdate = async ( data: Question ): Promise<boolean> => {
    try {
        const res = await fetch(`/api/questions/${data.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (res.status == 200) {
            return true;
        }

        console.error(`Failed to update question with id ${data.id}: ${res.status}`);
        return false;
        
    } catch (err) {
        console.error('Error updating question:', err);
        return false;
    }
};

export default fetchQuestionUpdate;