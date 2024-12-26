const dotenv = require('dotenv')
const process = require('process')

// Load in correct env file
const env = process.env.NODE_ENV ?? 'development'
const envFile = `.env.${env}`
const result = dotenv.config({ path: envFile })
if (result.error) {
    console.error(`Failed to load ${envFile}: ${result.error.message}`)
    process.exit(1)
}

// Getter wrapper to throw if env var not set
function getEnvVar(key) {
    const value = process.env[key];
    if (!value) {
        console.error(`Missing required environment variable: ${key}`);
        process.exit(1);
    }
    return value;
}

// Actual config
const config = {
    mongo:
    {
        user: getEnvVar('MONGO_USER'),
        password: getEnvVar('MONGO_PASSWORD'),
        cluster: getEnvVar('MONGO_CLUSTER'),
        table: getEnvVar('MONGO_TABLE')
    },
    server: {
        port: getEnvVar('PORT'),
    },
    auth: {
        secret: getEnvVar('TOKEN_SECRET'),
        saltRounds: getEnvVar('HASH_SALT_ROUNDS'),
    }
}

Object.freeze(config)
module.exports = { config }