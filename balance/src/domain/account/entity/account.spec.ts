import { Account } from "./account";

describe("account entity tests", () => {
    it("should create account", () => {
        const createdAt = new Date("2024-01-01T10:00:00");
        const account = new Account("1", 100, createdAt);
        expect(account.createdAt).toBe(createdAt);
        expect(account.accountId).toBe("1");
        expect(account.balance).toBe(100);
    });
});