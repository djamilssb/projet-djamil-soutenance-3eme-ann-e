import Users from "../models/Users";
import UserRepository from "../repositories/UsersRepository";

class UsersService {

    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    public async getAll(): Promise<Users[]> {
        try {
            const rows = await this.userRepository.getAll();
            if (!rows) throw new Error("Error while fetching users");

            return rows;
        } catch(e) {
            console.error("Error in getAll:", e);
            throw new Error("Erreur lors de la récupération des utilisateurs");
        }
    }

    public async getById(id: number): Promise<Users | null> {
        try {
            const user = await this.userRepository.getById(id);
            if (!user) throw new Error("Error while fetching user");

            return user;
        } catch(e) {
            console.error("Error in getById:", e);
            throw new Error(`Erreur lors de la récupération de l'utilisateur avec ID ${id}`);
        }
    }

    public async create(user: Partial<Users>): Promise<boolean> {
        try {
            if (!user.username?.trim() || !user.password?.trim() || !user.password_kids?.trim() || !user.email?.trim()) {
                throw new Error("Incomplete user data");
            }

            const created = await this.userRepository.create(user);

            if (!created) throw new Error("Error while creating the user");

            return created;
        } catch (e) {
            console.error("Error in create:", e);
            throw new Error("Error while creating the user");
        }
    }

    public async update(id: number, user: Partial<Users>): Promise<boolean> {
        try {
            if (!id || isNaN(id)) {
                throw new Error("Invalid user ID");
            }

            const updated = await this.userRepository.update(id, user);

            if (!updated) throw new Error("Error while updating the user");

            return updated;
        } catch (e) {
            console.error("Error in update:", e);
            throw new Error("Error while updating the user");
        }
    }

    public async delete(id: number): Promise<boolean> {
        try {
            if (!id || isNaN(id)) {
                throw new Error("Invalid user ID");
            }

            const deleted = await this.userRepository.delete(id);

            if (!deleted) throw new Error("Error while deleting the user");

            return deleted;
        } catch (e) {
            console.error("Error in delete:", e);
            throw new Error("Error while deleting the user");
        }
    }
}

export default UsersService;