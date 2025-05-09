import Question from "@/app/api/models/Question";

describe("Question Model", () => {
    it("should correctly initialize and return properties", () => {
        const question = new Question({
            id: 1,
            idQuizz: 2,
            orderIndex: 3,
            content: "test content"
        });

        expect(question.getId()).toBe(1);
        expect(question.getQuizzId()).toBe(2);
        expect(question.getOrderIndex()).toBe(3);
        expect(question.getContent()).toBe("test content");
    });
});