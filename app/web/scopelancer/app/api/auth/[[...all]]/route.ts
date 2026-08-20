import { auth } from "@/lib/betterauth/auth"; // Your setup configuration file
import { toNextJsHandler } from "better-auth/next-js";

export const { GET, POST } = toNextJsHandler(auth);
