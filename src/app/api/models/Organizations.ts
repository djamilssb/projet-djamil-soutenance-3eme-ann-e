class kt_organizations {
    id?: number;
    name?: string;
    email?: string;
    phone_number?: string;
    about_us?: string;
    created_at?: Date;

    constructor(data?: Partial<kt_organizations>) {
        Object.assign(this, data);
    }

    public getId(): number | undefined {
        return this.id;
    }

    public getName(): string | undefined {
        return this.name;
    }

    public getEmail(): string | undefined {
        return this.email;
    }

    public getPhoneNumber(): string | undefined {
        return this.phone_number;
    }

    public getAboutUs(): string | undefined {
        return this.about_us;
    }

    public getCreatedAt(): Date | undefined {
        return this.created_at;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public setPhoneNumber(phone_number: string): void {
        this.phone_number = phone_number;
    }

    public setAboutUs(about_us: string): void {
        this.about_us = about_us;
    }

    public setCreatedAt(created_at: Date): void {
        this.created_at = created_at;
    }
}

export default kt_organizations;
