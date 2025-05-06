import Characters from "../models/Characters";
import CharacterRepository from "../repositories/CharactersRepository";

class CharactersService {

    private charactersRepository: CharacterRepository;

  constructor() {
    this.charactersRepository = new CharacterRepository();
  }

  async getAll(): Promise<Characters[]> {
    try {
      const characters = await this.charactersRepository.getAll();
    return characters
    ;
    } catch (error) {
      throw new Error("Erreur lors de la récupération des personnages");
    }
  }

    public async getById(id: number): Promise<Characters | null> {
        try {
            const character = await this.charactersRepository.getById(id);
            if (!character) throw new Error("Character not found");

            return character;
        } catch (e) {
            console.error("Error in getById:", e);
            throw new Error(`Erreur lors de la récupération du personnage avec ID ${id}`);
        }
    }

    public async create(character: Partial<Characters>): Promise<boolean> {
        try {
            if (!character.name?.trim() || !character.image_url?.trim() || !character.id_quiz) {
                throw new Error("Incomplete character data");
            }

            const created = await this.charactersRepository.create(character);
            if (!created) throw new Error("Error while creating the character");

            return created;
        } catch (e) {
            console.error("Error in create:", e);
            throw new Error("Erreur lors de la création du personnage");
        }
    }

    public async update(id: number, character: Partial<Characters>): Promise<boolean> {
        try {
            if (!id || isNaN(id)) {
                throw new Error("Invalid character ID");
            }

            const updated = await this.charactersRepository.update(id, character);
            if (!updated) throw new Error("Error while updating the character");

            return updated;
        } catch (e) {
            console.error("Error in update:", e);
            throw new Error("Erreur lors de la mise à jour du personnage");
        }
    }

    public async delete(id: number): Promise<boolean> {
        try {
            if (!id || isNaN(id)) {
                throw new Error("Invalid character ID");
            }

            const deleted = await this.charactersRepository.delete(id);
            if (!deleted) throw new Error("Error while deleting the character");

            return deleted;
        } catch (e) {
            console.error("Error in delete:", e);
            throw new Error("Erreur lors de la suppression du personnage");
        }
    }
}

export default CharactersService;
