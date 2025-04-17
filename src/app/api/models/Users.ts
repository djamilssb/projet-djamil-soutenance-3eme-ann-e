class Users {
    id?: number;
    username?: string;
    password?: string;
    password_kids?: string;
    email?: string;
    role?: string;
    created_at?: Date;

    constructor(data?: Partial<Users>) {
        Object.assign(this, data)
    };

    public getId(): number | undefined {
        return this.id;
    };

    public getUsername(): string | undefined {
        return this.username;
    };

    public getPassword(): string | undefined {
        return this.password;
    };

    public getPasswordKids(): string | undefined {
        return this.password_kids;
    };

    public getEmail(): string | undefined {
        return this.email;
    };

    public getRole(): string | undefined {
        return this.role;
    };

    public getCreatedAt(): Date | undefined {
        return this.created_at;
    };

    public setId(id: number): void {
        this.id = id;
    };

    public setUsername(username: string): void {
        this.username = username;
    };

    public setPassword(password: string): void {
        this.password = password;
    };

    public setPasswordKids(password_kids: string): void {
        this.password_kids = password_kids;
    };

    public setEmail(email: string): void {
        this.email = email;
    };

    public setRole(role: string): void {
        this.role = role;
    };

    public setCreatedAt(created_at: Date): void {
        this.created_at = created_at;
    };
}

export default Users;