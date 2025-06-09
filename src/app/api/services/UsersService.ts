import bcrypt from "bcrypt";
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

    public async update(id: number, userData: Users): Promise<boolean> {
        try {
            if (!id || isNaN(id)) {
                throw new Error("Invalid user ID");
            }

            // Récupérer l'utilisateur actuel pour vérifier les mots de passe
            const currentUser = await this.userRepository.getById(id);
            if (!currentUser) {
                throw new Error("User not found");
            }

            // Créer un objet pour les données à mettre à jour (sans les champs de vérification)
            const updateData: Partial<Users> = {
                email: userData.email,
                username: userData.username,
                phone: userData.phone,
                address: userData.address,
                id_avatar: userData.id_avatar
            };

            if (userData.password && userData.getPassword()) {

                const isCurrentPasswordValid = await bcrypt.compare(userData.getPassword()!, currentUser.password || '');
                
                if (!isCurrentPasswordValid) {
                    throw new Error("invalid_current_password");
                }

                // Hasher le nouveau mot de passe
                updateData.password = await bcrypt.hash(userData.password, 14);
            }

            // if (userData.password_kids && userData.currentPassword_kids) {
            //     const isCurrentKidsPasswordValid = await bcrypt.compare(userData.currentPassword_kids, currentUser.password_kids || '');
                
            //     if (!isCurrentKidsPasswordValid) {
            //         throw new Error("invalid_current_kids_password");
            //     }

            //     updateData.password_kids = await bcrypt.hash(userData.password_kids, 14);
            // }

            const updated = await this.userRepository.update(id, updateData);

            if (!updated) throw new Error("Error while updating the user");

            return updated;
        } catch (e) {
            console.error("Error in update:", e);
            
            // Relancer les erreurs spécifiques de mot de passe
            if (e instanceof Error && (e.message === "invalid_current_password" || e.message === "invalid_current_kids_password")) {
                throw e;
            }
            
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



