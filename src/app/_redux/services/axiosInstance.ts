import axios from "axios";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";
const instance = axios.create({
    baseURL: `${BACKEND_URL}/api`,
    headers: {
        "Content-Type": "application/json",
    },
});

export default instance;