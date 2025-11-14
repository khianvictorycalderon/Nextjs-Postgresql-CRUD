import pool from "@/lib/db";
import dev from "@/lib/dev-log";
import handleError from "@/lib/error-handling";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
    _req: NextRequest,
    { params }: { params: Promise<{ id: number }>}
) {
    const { id: userId } = await params;
    if(isNaN(userId)) {
        dev.log("Invalid user id!");
        return NextResponse.json({ message: "Invalid user ID!" }, { status: 400 });
    }
    dev.log(`ID parameter is ${userId}`);

    try {
        await pool.query("DELETE FROM users WHERE user_id = $1", [Number(userId)]);
        dev.log(`User with id ${userId} successfully deleted!`);
        return NextResponse.json({ message: "Successfully deleted user" }, { status: 200 });
    } catch (err: unknown) {
        return handleError(err, "Failed to delete this user");
    }

}

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: number }>}
) {
    const { id: userId } = await params; // User ID
    const { newName } = await req.json(); // User's new name

    if(isNaN(userId)) {
        dev.log("Invalid user id!");
        return NextResponse.json({ message: "Invalid user ID!" }, { status: 400 });
    }

    if(!newName || newName.trim() === "") {
        dev.log("Invalid new user name!");
        return NextResponse.json({ message: "Invalid new user's name!" }, { status: 400 });
    }

    dev.log(`ID: ${userId}`);
    dev.log(`New user name: ${newName}`);

    try {
        await pool.query("UPDATE users SET user_name = $1 WHERE user_id = $2", [newName, userId]);
        dev.log("User's name successfully updated!");
        return NextResponse.json({ message: "User successfully deleted!"})
    } catch (err: unknown) {
        handleError(err, "Failed to update new user name");
    }
}