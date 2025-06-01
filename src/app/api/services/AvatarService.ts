import Avatar from "../models/Avatar";
import AvatarRepository from "../repositories/AvatarRepository";

class AvatarService {
  private avatarRepository: AvatarRepository;

  constructor() {
    this.avatarRepository = new AvatarRepository();
  };

  public async getAll(): Promise<Avatar[]> {
    try {
      const rows = await this.avatarRepository.getAll();
      if (rows.length === 0) return [];

      return rows;
    } catch (e) {
      console.error("Error in getAll:", e);
      throw new Error("Error while retrieving avatars");
    };
  };

  public async getById(id: number): Promise<Avatar | null> {
    try {
      if (!id || isNaN(id)) {
        throw new Error("Invalid avatar ID");
      }

      const avatar = await this.avatarRepository.getById(id);
      if (!avatar) {
        return null;
      }

      return avatar;
    } catch (e) {
      console.error("Error in getById:", e);
      return null;
    }
  }
};

export default AvatarService;
