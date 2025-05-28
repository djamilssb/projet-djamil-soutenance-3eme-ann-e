const fetchAnswerDelete = async (id: number): Promise<boolean> => {
    try {
        const res = await fetch(`/api/answers/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) {
            console.error(`Failed to delete answer with id ${id}: ${res.status}`);
            return false;
        }

        return true;
    } catch (err) {
        console.error('Error deleting answer:', err);
        return false;
    }
};

export default fetchAnswerDelete;