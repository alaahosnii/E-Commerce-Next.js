import axiosInstance from "@/app/_utils/axiosInstance";
import { AxiosError } from "axios";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const amount = searchParams.get("amount");
        const firstName = searchParams.get("firstName");
        const lastName = searchParams.get("lastName");
        const email = searchParams.get("email");
        const phone = searchParams.get("phone");
        const apartment = searchParams.get("apartment");
        const streetAddress = searchParams.get("streetAddress");
        console.log("amount", amount);
        console.log("firstName", firstName);
        console.log("lastName", lastName);
        console.log("email", email);
        console.log("phone", phone);
        console.log("apartment", apartment);
        console.log("streetAddress", streetAddress);
        const paymentData = { amount, firstName, lastName, email, phone, apartment, streetAddress };
        // Extract the token from request headers (or cookies)
        const token = req.headers.get("Authorization")?.replace("Bearer ", "");

        // If no token is found, you can either throw an error or proceed without it
        if (!token) {
            throw new Error("No token provided");
        }
        const response = await axiosInstance.get("/payment/clientSecret", {
            params: paymentData,
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
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