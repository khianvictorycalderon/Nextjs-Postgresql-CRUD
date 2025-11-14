import pool from "@/lib/db";
import dev from "@/lib/dev-log";
import handleError from "@/lib/error-handling";
import { NextResponse } from "next/server";

// This code automatically creates table for the user if it still does not exist
export async function POST() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                user_id SERIAL PRIMARY KEY NOT NULL,
                user_name VARCHAR(200)
            )    ;
        `);
        dev.log("Table users successfully created!");
        return NextResponse.json({ message: "Table users successfully created!" }, { status: 200 })
    } catch (err: unknown) {
        return handleError(err, "Failed to create users table");
    }
}