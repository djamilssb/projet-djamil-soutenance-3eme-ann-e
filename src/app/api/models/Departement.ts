class Departement {
    id?: number;
    name?: string;
    departement_number?: string;

    constructor(data?: Partial<Departement>) {
        Object.assign(this, data)
    }

    public getId(): number | undefined {
        return this.id;
    }

    public getName(): string | undefined {
        return this.name;
    }

    public getDepartementNumber(): string | undefined {
        return this.departement_number;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public setDepartementNumber(departement_number: string): void {
        this.departement_number = departement_number;
    }

    public toJSON(): object {
        return {
            id: this.id,
            name: this.name,
            departement_number: this.departement_number
        };
    }
}

export default Departement;