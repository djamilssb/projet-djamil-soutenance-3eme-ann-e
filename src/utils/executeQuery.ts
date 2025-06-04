import connection from "../app/config/database";

const executeQuery = async <T = any>(sql: string, params?: any[]) => {
    try {
        const conn = await connection;
        const [rows] = await conn.query(sql, params);
        return rows as T | T[]; // Typage explicite pour indiquer que `rows` peut être un tableau ou un objet unique
    } catch (err) {
        console.error("Database error:", err);
    }
}

export default executeQuery;