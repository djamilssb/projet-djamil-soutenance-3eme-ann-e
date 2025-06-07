const fetchQuestionDelete = async (id: number): Promise<boolean> => {
    try {
        const res = await fetch(`/api/questions/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) {
            console.error(`Failed to delete question with id ${id}: ${res.status}`);
            return false;
        }

        return true;
    } catch (err) {
        console.error('Error deleting question:', err);
        return false;
    }
};

export default fetchQuestionDelete;