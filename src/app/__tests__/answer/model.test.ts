import Answer from "@/app/api/models/Answer";

describe("Answer Model", () => {
    it("should correctly initialize and return properties", () => {
        const answer = new Answer({
            id: 1,
            idQuizz: 2,
            idQuestion: 1,
            orderIndex: 3,
            content: "test content",
            explication: "test explication",
            isCorrect: false
        });

        expect(answer.getId()).toBe(1);
        expect(answer.getQuizzId()).toBe(2);
        expect(answer.getQuestionId()).toBe(1);
        expect(answer.getOrderIndex()).toBe(3);
        expect(answer.getContent()).toBe("test content");
        expect(answer.getExplication()).toBe("test explication");
        expect(answer.getIsCorrect()).toBe(false);
    });
});