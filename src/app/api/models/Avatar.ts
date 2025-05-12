class Avatar {
    id?: number;
    image_url?: string;
    created_at?: Date;

    constructor(data: Partial<Avatar>) {
        Object.assign(this, data);
    };

    public getId(): number | undefined {
        return this.id;
    };

    public getImageUrl(): string | undefined {
        return this.image_url;
    };

    public getCreatedAt(): Date | undefined {
        return this.created_at;
    };

    public setId(id: number): void {
        this.id = id;
    };

    public setImageUrl(image_url: string): void {
        this.image_url = image_url;
    };

    public setCreatedAt(created_at: Date): void {
        this.created_at = created_at;
    };
};

export default Avatar;