import pool from "@/lib/db";
import dev from "@/lib/dev-log";
import handleError from "@/lib/error-handling";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { userName } = await req.json();
   
    if (!userName || userName.trim() === "") {
        dev.log("Unable to create user: Cannot create empty username");
        return NextResponse.json({ message: "Username cannot be empty!" }, { status: 400 });
    }

    try {
        await pool.query(`
           INSERT INTO users (user_name)
           VALUES ($1);
        `, [userName]);
        
        dev.log("User successfully created!");
        return NextResponse.json({ message: "User successfully created!" }, { status: 201 });
    } catch (err: unknown) {
        return handleError(err, "Failed to create user");
    }
}

// Get all the users
export async function GET() {
    try {
        const results = await pool.query("SELECT * FROM users");
        dev.log(`Successfully fetched users:\n ${results.rows}`)
        return NextResponse.json({ message: "Successfully fetched all users!", users: results.rows }, { status: 200 });
    } catch (err: unknown) {
        return handleError(err, "Failed to fetch all users");
    }
}