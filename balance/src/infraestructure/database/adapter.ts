import { Connection } from "./connection";
import mysql from "mysql2";

export class DBAdapter implements Connection {
    private mysql: any;
    constructor(connectionString: string) {
        this.mysql = mysql.createConnection(connectionString);
    }
    async query(statement: string, params?: any): Promise<any> {
        const [result] = await this.mysql.promise().execute(statement, params);
        return result;
    }
    async close(): Promise<void> {
        await this.mysql.promise().end();
    }
}