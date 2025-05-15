import axiosInstance from "@/app/_utils/axiosInstance";
import { NextResponse } from "next/server";
import { AxiosError } from "axios";
export async function PATCH(request: Request) {
    try {
        // Extract the token from request headers (or cookies)

        const body = await request.json();
        console.log("body", body);
        const token = request.headers.get("Authorization")?.replace("Bearer ", "");

        // If no token is found, you can either throw an error or proceed without it
        if (!token) {
            throw new Error("No token provided");
        }

        // Optionally, pass the token in the axios request headers
        const response = await axiosInstance.patch("/auth/updateUser", body, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });


        console.log("data", response.data);
        return NextResponse.json(response.data);
    } catch (error: unknown) {
        const axiosError = error as AxiosError;
        console.error("API Error:", axiosError?.response?.data || axiosError.message);

        return NextResponse.json(
            { error: axiosError?.response?.data || "Something went wrong" },
            { status: axiosError?.response?.status || 400 }
        );
    }
}
