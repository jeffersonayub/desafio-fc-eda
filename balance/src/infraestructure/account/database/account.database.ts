import { Account } from "../../../domain/account/entity/account";
import { AccountRepositoryInterface } from "../../../domain/account/repository/account.repository.interface";
import { Connection } from "../../database/connection";

export class AccountDatabase implements AccountRepositoryInterface {

    constructor(private connection: Connection) { }

    async get(accountId: string): Promise<Account> {
        const [account] = await this.connection.query("SELECT * FROM account WHERE account_id = ? ORDER BY id DESC LIMIT 1", [accountId]);
        if (!account) {
            throw new Error("Account not found");
        }
        return new Account(account.account_id, account.balance);
    }

    async save(account: Account): Promise<void> {
        await this.connection.query("INSERT INTO account(account_id, balance, created_at, updated_at) VALUES (?,?,NOW(),NOW())", [account.accountId, account.balance]);
    }

    async update(account: Account): Promise<void> {
        await this.connection.query("UPDATE account SET balance = ?, updated_at = NOW() WHERE account_id = ?", [account.balance, account.accountId]);
    }

    async clear(): Promise<void> {
        await this.connection.query("TRUNCATE TABLE account", []);
    }
}