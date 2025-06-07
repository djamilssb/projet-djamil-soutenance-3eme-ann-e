import SaveQuizz from "@/app/api/models/SaveQuizz";

describe("SaveQuizz Model", () => {
    it("should create a SaveQuizz instance with provided data", () => {
        const data = { id: 1, id_user: 2, id_quizz: 3, id_character: 4, score: 100, created_at: new Date() };
        const saveQuizz = new SaveQuizz(data);

        expect(saveQuizz.id).toBe(1);
        expect(saveQuizz.id_user).toBe(2);
        expect(saveQuizz.id_quizz).toBe(3);
        expect(saveQuizz.id_character).toBe(4);
        expect(saveQuizz.score).toBe(100);
        expect(saveQuizz.created_at).toBeInstanceOf(Date);
    });

    it("should allow setting and getting properties", () => {
        const saveQuizz = new SaveQuizz();

        saveQuizz.setId(1);
        saveQuizz.setIdUser(2);
        saveQuizz.setIdQuizz(3);
        saveQuizz.setIdCharacter(4);
        saveQuizz.setScore(100);
        saveQuizz.setCreatedAt(new Date("2023-01-01"));

        expect(saveQuizz.getId()).toBe(1);
        expect(saveQuizz.getIdUser()).toBe(2);
        expect(saveQuizz.getIdQuizz()).toBe(3);
        expect(saveQuizz.getIdCharacter()).toBe(4);
        expect(saveQuizz.getScore()).toBe(100);
        expect(saveQuizz.getCreatedAt()).toEqual(new Date("2023-01-01"));
    });
});