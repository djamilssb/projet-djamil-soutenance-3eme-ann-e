import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
    try {
        const cookieStore = await cookies();

        cookieStore.delete('token');
        
        return NextResponse.json(
            { message: "Logout successful" }, 
            { 
                status: 200,
                headers: {
                    'Set-Cookie': `token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`
                }
            }
        );
    } catch (err) {
        console.error("Error during logout:", err);
        return NextResponse.json(
            { message: "An error occurred during logout" }, 
            { status: 500 }
        );
    }
}