import Departement from "@/app/api/models/Departement";

describe("Departement Model", () => {
    it("should create a Departement instance with provided data", () => {
        const data = { id: 1, name: "Paris", departement_number: "75" };
        const departement = new Departement(data);

        expect(departement.id).toBe(1);
        expect(departement.name).toBe("Paris");
        expect(departement.departement_number).toBe("75");
    });

    it("should create an empty Departement instance without data", () => {
        const departement = new Departement();
        
        expect(departement.id).toBeUndefined();
        expect(departement.name).toBeUndefined();
        expect(departement.departement_number).toBeUndefined();
    });

    it("should allow setting and getting properties", () => {
        const departement = new Departement();

        departement.setId(1);
        departement.setName("Paris");
        departement.setDepartementNumber("75");

        expect(departement.getId()).toBe(1);
        expect(departement.getName()).toBe("Paris");
        expect(departement.getDepartementNumber()).toBe("75");
    });

    it("should create a Departement with partial data", () => {
        const data = { name: "Paris" };
        const departement = new Departement(data);

        expect(departement.id).toBeUndefined();
        expect(departement.name).toBe("Paris");
        expect(departement.departement_number).toBeUndefined();
    });

    it("should convert to JSON correctly", () => {
        const data = { id: 1, name: "Paris", departement_number: "75" };
        const departement = new Departement(data);
        const json = departement.toJSON();

        expect(json).toEqual({
            id: 1,
            name: "Paris",
            departement_number: "75"
        });
    });

    it("should include undefined properties in JSON", () => {
        const data = { name: "Paris" };
        const departement = new Departement(data);
        const json = departement.toJSON();

        expect(json).toEqual({
            id: undefined,
            name: "Paris",
            departement_number: undefined
        });
    });
});