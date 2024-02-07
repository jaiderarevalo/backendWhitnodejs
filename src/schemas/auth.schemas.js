import { z } from "zod";

export const registerSchema = z.object({
  username: z.string({
    required_error: "Username is  required",
  }),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email" }),

    password: z.string({
        required_error:"Password is required"
    }).min(5,{
        message: "password must be at least 6 characters"
    })

});


export const loginSchema = z.object({
    email: z.string({
        required_error:"Email is required"
    }).email({
        message:"invalid email"
    }),
    password: z.string({
        required_error:"password is required "
    })

})

// para que se ejecute bien toca  hacer un middlewere validator.middleware.js