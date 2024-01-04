"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmDataSource = void 0;
const typeorm_1 = require("typeorm");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.TypeOrmDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    ssl: true,
    extra: {
        ssl: {
            rejectUnauthorized: false,
        },
    },
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    entities: ['dist/src/**/*.entity{.ts,.js}'],
    migrations: ['dist/database/migrations/*{.ts,.js}'],
});
//# sourceMappingURL=data-source.js.map