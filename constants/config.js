import dotenv from "dotenv"
import { rateLimit } from "express-rate-limit"

dotenv.config()

// ===============  Environment variables   ===============

const config = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    SALT_ROUND: process.env.SALT_ROUND,
    TOKEN_EXPIRES: process.env.TOKEN_EXPIRES,
    TOKEN_SECRET: process.env.TOKEN_SECRET,
    COOKIE_EXPIRE_TIME: process.env.COOKIE_EXPIRE_TIME,   // In Minutes
    RATE_LIMIT_TIME: process.env.RATE_LIMIT_TIME,    // In Minutes
    RATE_LIMIT_REQUEST: process.env.RATE_LIMIT_REQUEST
}

// ===============  CORS options   ===============

export const corsOptions = {
    origin: "*",
}

// ===============  rate-limiter config   ===============

export const limiter = rateLimit({
    windowMs: 60 * 1000 * config.RATE_LIMIT_TIME,
    max: config.RATE_LIMIT_REQUEST,
})


export default config