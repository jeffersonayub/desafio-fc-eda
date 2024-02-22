import { Account } from "../entity/account";
import { AccountRepositoryInterface } from "../repository/account-repository-interface";
import { AccountRepository } from "../../../infraestructure/account/account.repository";
import { GetAccount } from "./get-account";

describe("GetAccountBalance tests", () => {

    let accountBalanceRepository: AccountRepository;

    beforeAll(() => {
        accountBalanceRepository = new AccountRepository();
    });

    beforeEach(async () => {
        accountBalanceRepository.clear();
    });
    it("should get account balance", async () => {
        await accountBalanceRepository.save(new Account("1", 100, new Date("2024-01-01T10:00:00")));

        const input = {
            accountId: "1"
        };

        const usecase = new GetAccount(accountBalanceRepository);
        const output = await usecase.execute(input);

        expect(output.accountId).toBe("1");
        expect(output.balance).toBe(100);
    });

    it("should throw exception if account balance not found", async () => {
        const input = {
            accountId: "123"
        };

        const usecase = new GetAccount(accountBalanceRepository);

        expect(async () => {
            await usecase.execute(input);
        }).rejects.toThrow(new Error("Account balance not found"));
    });
});