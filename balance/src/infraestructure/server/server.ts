export interface Server {
    on(method: HttpMethod, uri: string, callback: CallbackFunction): void;
    listen(port: number): void;
}

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export type CallbackFunction = (params: any, body: any) => Promise<{ status: number; data: any }>;