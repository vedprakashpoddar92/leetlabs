import { z } from "zod";

// Define Register Validation Schema

const registerValidationSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email id"),
    password: z.string().min(6, "Password must be at least 6 characters long").max(16, "Password must be at most 16 characters long"),
});

const loginValidationSchema = z.object({
    email: z.string().email("Invalid email id"),
    password: z.string().min(6, "Password must be at least 6 characters long").max(16, "Password must be at most 16 characters long"),
});

export { registerValidationSchema, loginValidationSchema };

