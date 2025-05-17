import executeQuery from "@/utils/executeQuery";
import Avatar from "../models/Avatar";

class AvatarRepository {
    constructor() {};

    public async getAll(): Promise<Avatar[]> {
        const rows = await executeQuery("SELECT A.id, A.image_url FROM kt_avatar A", []);
        return rows.map((row: object) => new Avatar(row));
    };
};

export default AvatarRepository;