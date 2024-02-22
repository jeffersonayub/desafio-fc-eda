export class Account {

    public readonly createdAt: Date;

    constructor(public readonly accountId: string, public readonly balance: number, createdAt?: Date) {
        this.createdAt = createdAt ?? new Date();
    }
}