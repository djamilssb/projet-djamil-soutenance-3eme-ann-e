type AuthProps = {
    email: string;
    password?: string;
    password_kids?: string;
    token?: string;
}

class Auth {
    private email: string;
    private password?: string;
    private password_kids?: string;
    private token?: string;

    constructor(props: AuthProps) {
        if (!props.email) {
            throw new Error("Email is required");
        };

        if (props.password && props.password_kids) {
            throw new Error("Cannot provide both password and password_kids");
        };

        if (!props.password && !props.password_kids) {
            throw new Error("Must provide either password or password_kids");
        };

        this.email = props.email;
        this.password = props.password;
        this.password_kids = props.password_kids;
        this.token = props.token;
    }

    public getEmail(): string {
        return this.email;
    };

    public getPassword(): string | undefined {
        return this.password;
    };

    public getPasswordKids(): string | undefined {
        return this.password_kids;
    };

    public getToken(): string | undefined {
        return this.token;
    };

    public setEmail(email: string): void {
        if (!email) {
            throw new Error("Email cannot be empty");
        }
        this.email = email;
    };

    public setPassword(password: string): void {
        if (this.password_kids) {
            throw new Error("Cannot set password when password_kids exists");
        }
        this.password = password;
    };

    public setpassword_kids(password_kids: string): void {
        if (this.password) {
            throw new Error("Cannot set password_kids when password exists");
        }
        this.password_kids = password_kids;
    };

    public setToken(token: string): void {
        this.token = token;
    };
};

export default Auth;