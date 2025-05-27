class Users {
    public id?: number;
    public username?: string;
    public email?: string;
    public password?: string;
    public password_kids?: string;
    public created_at?: string;
    public phone?: string;
    public address?: string;
    public id_avatar?: number;

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
}

export default Users;