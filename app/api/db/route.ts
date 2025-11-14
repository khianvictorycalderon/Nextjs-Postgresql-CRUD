import pool from "@/lib/db";
import { dev } from "@/lib/dev-log";
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
        if (err instanceof Error) {
            dev.log(`Failed to create users table: ${err.message}`);
            return NextResponse.json({ message: `Failed to create users table: ${err.message}`}, { status: 500 });
        } else {
            dev.log(`Failed to create users table: ${String(err)}`);
            return NextResponse.json({ message: `Failed to create users table: ${String(err)}`}, { status: 500 });
        }
    }
}