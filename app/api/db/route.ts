import pool from "@/lib/db";

// This code automatically creates table for the user if it still does not exist
export async function POST() {
    const res = await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
            user_id SERIAL PRIMARY KEY NOT NULL,
            user_name VARCHAR(200)
        )    ;
    `);
}