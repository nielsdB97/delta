import axios from "axios";

export const HTTPClient = axios.create({ baseURL: "/api" });
