/* eslint-disable @typescript-eslint/no-explicit-any */
const env:any = "dev";

export const origin = env == "dev" ? "http://localhost:3000": "https://server.yogeshwar.tech"

export const adminCookie = "adminCookie"