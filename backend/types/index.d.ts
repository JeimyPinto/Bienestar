export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface DatabaseConfig {
    database: string;
    username: string;
    password: string;
    host: string;
    dialect: 'mysql' | 'postgres' | 'sqlite' | 'mssql';
}