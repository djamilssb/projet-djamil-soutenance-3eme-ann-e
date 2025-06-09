import Quizz from "@/app/api/models/Quizz";

describe("Quizz Model", () => {
    it("should create a Quizz instance with provided data", () => {
        const date = new Date();
        const data = { 
            id: 1, 
            id_user: 2, 
            id_departement: 3, 
            title: "Test Quiz", 
            description: "Description test", 
            nbr_question: 10, 
            created_at: date,
            updated_at: date
        };
        const quizz = new Quizz(data);

        expect(quizz.id).toBe(1);
        expect(quizz.id_user).toBe(2);
        expect(quizz.id_departement).toBe(3);
        expect(quizz.title).toBe("Test Quiz");
        expect(quizz.description).toBe("Description test");
        expect(quizz.nbr_question).toBe(10);
        expect(quizz.created_at).toBe(date);
        expect(quizz.updated_at).toBe(date);
    });

    it("should create an empty Quizz instance without data", () => {
        const quizz = new Quizz();
        
        expect(quizz.id).toBeUndefined();
        expect(quizz.title).toBeUndefined();
        expect(quizz.description).toBeUndefined();
    });

    it("should allow setting and getting properties", () => {
        const quizz = new Quizz();
        const createdDate = new Date("2023-01-01");
        const updatedDate = new Date("2023-01-02");

        quizz.setId(1);
        quizz.setIdUser(2);
        quizz.setIdDepartement(3);
        quizz.setTitle("Test Quiz");
        quizz.setDescription("Description test");
        quizz.setNbrQuestion(10);
        quizz.setCreatedAt(createdDate);
        quizz.setUpdatedAt(updatedDate);

        expect(quizz.getId()).toBe(1);
        expect(quizz.getIdUser()).toBe(2);
        expect(quizz.getIdDepartement()).toBe(3);
        expect(quizz.getTitle()).toBe("Test Quiz");
        expect(quizz.getDescription()).toBe("Description test");
        expect(quizz.getNbrQuestion()).toBe(10);
        expect(quizz.getCreatedAt()).toEqual(createdDate);
        expect(quizz.getUpdatedAt()).toEqual(updatedDate);
    });

    it("should create a Quizz with partial data", () => {
        const data = { title: "Test Quiz", id_user: 1 };
        const quizz = new Quizz(data);

        expect(quizz.id).toBeUndefined();
        expect(quizz.title).toBe("Test Quiz");
        expect(quizz.id_user).toBe(1);
        expect(quizz.description).toBeUndefined();
    });

    it("should convert to JSON correctly", () => {
        const date = new Date();
        const data = { 
            id: 1, 
            id_user: 2, 
            id_departement: 3, 
            title: "Test Quiz", 
            description: "Description test",  
            nbr_question: 10, 
            created_at: date,
            updated_at: date
        };
        const quizz = new Quizz(data);
        const json = quizz.toJSON();

        expect(json).toEqual({
            id: 1,
            id_user: 2,
            id_departement: 3,
            title: "Test Quiz",
            description: "Description test",
            nbr_question: 10,
            created_at: date,
            updated_at: date
        });
    });

    it("should include undefined properties in JSON", () => {
        const data = { title: "Test Quiz", id_user: 1 };
        const quizz = new Quizz(data);
        const json = quizz.toJSON();

        expect(json).toEqual({
            id: undefined,
            id_user: 1,
            id_departement: undefined,
            title: "Test Quiz",
            description: undefined,
            nbr_question: undefined,
            created_at: undefined,
            updated_at: undefined
        });
    });
});