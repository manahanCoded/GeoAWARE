import { checkSchema } from "express-validator";
 const signupValidationSchema = checkSchema({
    username: {
        notEmpty: {
            errorMessage: "Username is required",
        },
        isLength: {
            options: { min: 3 },
            errorMessage: "Username must be at least 3 characters long",
        },
    },
    email: {
        isEmail: {
            errorMessage: "Please provide a valid email",
        }
    },
    password: {
        isLength: {
            options: { min: 6 },
            errorMessage: "Password must be at least 6 characters long",
        },
    },
});

export default signupValidationSchema