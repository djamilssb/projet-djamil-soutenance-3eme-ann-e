import executeQuery from "@/utils/executeQuery";
import Avatar from "../models/Avatar";

class AvatarRepository {
    constructor() {};

    public async getAll(): Promise<Avatar[]> {
        const rows = await executeQuery("SELECT A.id, A.image_url FROM kt_avatar A", []);
        return rows.map((row: object) => new Avatar(row));
    };

    public async getById(id: number): Promise<Avatar | null> {
        const rows = await executeQuery("SELECT A.id, A.image_url FROM kt_avatar A WHERE A.id = ?", [id]);
        if (rows.length === 0) return null;
        return new Avatar(rows[0]);
    };
};

export default AvatarRepository;