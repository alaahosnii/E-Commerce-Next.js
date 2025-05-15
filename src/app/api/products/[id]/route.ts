import { NextResponse } from "next/server";
import { AxiosError } from "axios";
import axiosInstance from "@/app/_utils/axiosInstance";
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {

    try {
        const { id } = await params;
        const response = await axiosInstance.get(`/products/${id}`);
        const data = response.data;
        console.log("data", data);


        return NextResponse.json(data);
    } catch (error: unknown) {
        const axiosError = error as AxiosError;
        console.error("API Error:", axiosError?.response?.data || axiosError.message);

        return NextResponse.json(
            { error: axiosError?.response?.data || "Something went wrong" },
            { status: axiosError?.response?.status || 400 }
        );
    }
}