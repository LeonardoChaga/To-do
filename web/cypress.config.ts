import { defineConfig } from 'cypress';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
    viewportWidth: 1280,
    viewportHeight: 720,
    e2e: {
        baseUrl: 'http://localhost:4200',
        video: false,
        env: {},
    },
    retries: {
        runMode: 2,
        openMode: 0,
    },
    defaultCommandTimeout: 8000,
    pageLoadTimeout: 60000,
    requestTimeout: 15000,
    responseTimeout: 15000,
});
