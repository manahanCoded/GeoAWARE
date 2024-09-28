import { checkSchema } from "express-validator";
 const loginValidationSchema = checkSchema({
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

export default loginValidationSchema