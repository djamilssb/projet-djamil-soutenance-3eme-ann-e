import Characters from "@/app/api/models/Characters";

describe("Characters Model", () => {
    it("should correctly initialize and return properties", () => {
        const character = new Characters({
            id: 1,
            id_quiz: 101,
            name: "Test Character",
            image_url: "http://alien1.png",
            created_at: new Date("2023-01-01"),
        });

        expect(character.getId()).toBe(1);
        expect(character.getIdQuiz()).toBe(101);
        expect(character.getName()).toBe("Test Character");
        expect(character.getImageUrl()).toBe("http://alien1.png");
        expect(character.getCreatedAt()).toEqual(new Date("2023-01-01"));
    });

    it("should correctly set properties", () => {
        const character = new Characters();

        character.setId(2);
        character.setIdQuiz(102);
        character.setName("Updated Character");
        character.setImageUrl("http://alien1.png");
        character.setCreatedAt(new Date("2023-02-01"));

        expect(character.getId()).toBe(2);
        expect(character.getIdQuiz()).toBe(102);
        expect(character.getName()).toBe("Updated Character");
        expect(character.getImageUrl()).toBe("http://alien1.png");
        expect(character.getCreatedAt()).toEqual(new Date("2023-02-01"));
    });
});