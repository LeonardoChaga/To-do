import { defineConfig } from 'cypress';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
    viewportWidth: 1280,
    viewportHeight: 720,
    e2e: {
        baseUrl: 'http://localhost:4200',
        video: true,
        screenshotOnRunFailure: true,
        experimentalRunAllSpecs: true,
        env: {
            slowTestThreshold: 40000,

            // Login e senha corretos para os testes de login
            validUsername: process.env['VALID_USERNAME'],
            validPassword: process.env['VALID_PASSWORD'],

            // Login e senha incorretos para os testes de login
            invalidUsername: process.env['INVALID_USERNAME'],
            invalidPassword: process.env['INVALID_PASSWORD'],

            // Login para testes de segurança com injeção de SQL
            sqlInjectionUsername: process.env['SQL_INJECTION_USERNAME'],
            sqlInjectionPassword: process.env['SQL_INJECTION_PASSWORD'],

            //Login para testes de segurança com XSS
            xssUsername: process.env['XSS_USERNAME'],
            xssPassword: process.env['XSS_PASSWORD'],

            // Login para testes com strings muito longas
            longUsername: process.env['LONG_USERNAME'],
            longPassword: process.env['LONG_PASSWORD'],

            // Login para testes com espaços em branco
            whitespaceUsername: process.env['SPACE_USERNAME'],
            whitespacePassword: process.env['SPACE_PASSWORD'],

            // Login para testes com usuário e senha no formato inválido
            invalidFormatUsername: process.env['INVALID_EMAIL_FORMAT'],
            invalidFormatPassword: process.env['INVALID_PASSWORD_FORMAT'],
        },
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
