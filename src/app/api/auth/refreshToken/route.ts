import { NextRequest, NextResponse } from "next/server";
import axiosInstance from "@/app/_utils/axiosInstance";
export async function GET(request: NextRequest) {
    const token = request.headers.get("Authorization")?.split(" ")[1];
    console.log("token", request.headers.get("Authorization"));
    if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const response = await axiosInstance.get("/auth/refreshToken", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const res = NextResponse.json(response.data);
        res.cookies.set("token", response.data.token, {
            httpOnly: true,
            secure: true,
            maxAge: 60 * 60 * 24 * 30, // 30 days
            path: "/",
        });
        return res;
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }

}   