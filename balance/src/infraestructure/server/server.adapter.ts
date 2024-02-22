import { CallbackFunction, Server, HttpMethod } from "./server";
import express, { Request, Response, NextFunction } from "express";

export class ServerAdapter implements Server {
    public readonly app: any;

    constructor() {
        this.app = express();
        this.app.use(express.json());
        this.app.use(function (_request: Request, response: Response, next: NextFunction) {
            next();
        });
    }

    public on(method: HttpMethod, uri: string, callback: CallbackFunction): void {
        const routeMethod = method.toLowerCase();
        this.app[routeMethod](uri, async (request: Request, response: Response) => {
            const output = await callback(request.params, request.body);
            response.status(output.status);
            return response.json(output.data);
        });
    }

    public listen(port: number): void {
        this.app.listen(port);
    }
}