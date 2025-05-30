class Users {
    id?: number;
    id_avatar?: number;
    username?: string;
    email?: string;
    password?: string;
    password_kids?: string;
    phone?: string;
    address?: string;
    role?: string;
    created_at?: string;

    constructor(data: Partial<Users>) {
        this.id = data.id;
        this.username = data.username;
        this.email = data.email;
        this.password = data.password;
        this.password_kids = data.password_kids;
        this.created_at = data.created_at;
        this.phone = data.phone;
        this.address = data.address;
        this.id_avatar = data.id_avatar;
    }

    public getId(): number | undefined {
        return this.id;
    }

    public getUsername(): string | undefined {
        return this.username;
    }

    public getEmail(): string | undefined {
        return this.email;
    }

    public getPassword(): string | undefined {
        return this.password;
    }

    public getPassword_Kids(): string | undefined {
        return this.password_kids;
    }

    public getPhone(): string | undefined {
        return this.phone;
    }

    public getAddress(): string | undefined {
        return this.address;
    }

    public getIdAvatar(): number | undefined {
        return this.id_avatar;
    }

    public getRole(): string | undefined {
        return this.role;
    }

    public getCreatedAt(): string | undefined {
        return this.created_at;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public setUsername(username: string): void {
        this.username = username;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public setPassword(password: string): void {
        this.password = password;
    }

    public setPassword_Kids(password_kids: string): void {
        this.password_kids = password_kids;
    }

    public setPhone(phone: string): void {
        this.phone = phone;
    }

    public setAddress(address: string): void {
        this.address = address;
    }

    public setIdAvatar(id_avatar: number): void {
        this.id_avatar = id_avatar;
    }

    public setRole(role: string): void {
        this.role = role;
    }

    public setCreatedAt(created_at: string): void {
        this.created_at = created_at;
    }
}

export default Users;