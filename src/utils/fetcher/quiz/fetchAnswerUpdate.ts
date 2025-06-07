import Answer from "@/app/api/models/Answer";

const fetchAnswerUpdate = async ( data: Answer ): Promise<boolean> => {
    try {
        const res = await fetch(`/api/answers/${data.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (res.status == 200) {
            return true;
        }

        console.error(`Failed to modify answer with id ${data.id}: ${res.status}`);
        return false;
        
    } catch (err) {
        console.error('Error updating answer:', err);
        return false;
    }
};

export default fetchAnswerUpdate;