class Users {
    id?: number;
    id_avatar?: number;
    username?: string;
    password?: string;
    password_kids?: string;
    email?: string;
    phone?: string;
    address?: string;
    role?: string;
    created_at?: Date;

    constructor(data: Partial<Users>) {
        Object.assign(this, data)
    };

    public getId(): number | undefined {
        return this.id;
    };

    public getIdAvatar(): number | undefined {
        return this.id_avatar;
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

    public getPhone(): string | undefined {
        return this.phone;
    };

    public getAddress(): string | undefined {
        return this.address;
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

    public setIdAvatar(id_avatar: number): void {
        this.id_avatar = id_avatar;
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

    public setPhone(phone: string): void {
        this.phone = phone;
    };

    public setAddress(address: string): void {
        this.address = address;
    };

    public setRole(role: string): void {
        this.role = role;
    };

    public setCreatedAt(created_at: Date): void {
        this.created_at = created_at;
    };
}

export default Users;