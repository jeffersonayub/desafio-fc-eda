import { Account } from "../entity/account";

export interface AccountRepositoryInterface {
    save(account: Account): Promise<void>;
    update(Account: Account): Promise<void>;
    get(accountId: string): Promise<Account>;
    clear(): Promise<void>;
}