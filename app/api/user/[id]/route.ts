import pool from "@/lib/db";
import dev from "@/lib/dev-log";
import handleError from "@/lib/error-handling";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
    _req: NextRequest,
    { params }: { params: Promise<{ id: number }>}
) {
    const { id } = await params;
    dev.log(`ID parameter is ${id}`);

    try {
        await pool.query("DELETE FROM users WHERE user_id = $1", [Number(id)]);
        dev.log(`User with id ${id} successfully deleted!`);
        return NextResponse.json({ message: "Successfully deleted user" }, { status: 200 });
    } catch (err: unknown) {
        return handleError(err, "Failed to delete this user");
    }

}