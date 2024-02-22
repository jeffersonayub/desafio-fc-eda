import { Account } from "../../../domain/account/entity/account";
import { AccountRepositoryInterface } from "../../../domain/account/repository/account.repository.interface";

export class AccountRepository implements AccountRepositoryInterface {
    private account: Account[] = [];


    async save(account: Account): Promise<void> {
        this.account.push(account);
    }

    async update(account: Account): Promise<void> {
        const accountIndex = this.account.findIndex(findBalance => findBalance.accountId === account.accountId);
        this.account.splice(accountIndex, 1, account);
    }

    async get(accountId: string): Promise<Account> {
        const accountFound = this.account.find(account => account.accountId === accountId);

        if (!accountFound) {
            throw new Error("Account not found");
        }
        return accountFound;
    }

    async clear(): Promise<void> {
        this.account = [];
    }

}