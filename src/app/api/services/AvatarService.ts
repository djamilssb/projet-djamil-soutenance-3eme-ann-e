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
};

export default AvatarService;
