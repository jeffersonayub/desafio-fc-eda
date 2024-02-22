import { Account } from "../entity/account";
import { AccountRepositoryInterface } from "../repository/account.repository.interface";
import { AccountRepository } from "../../../infraestructure/account/repository/account.repository";
import { UpdateAccount } from "./update-account";

describe("Update Account event test", () => {

    let accountRepositoryInterface: AccountRepositoryInterface;

    beforeAll(() => {
        accountRepositoryInterface = new AccountRepository();
    });

    beforeEach(async () => {
        accountRepositoryInterface.clear();
    });

    it("should update balance", async () => {
        await accountRepositoryInterface.save(new Account("1", 100));
        await accountRepositoryInterface.save(new Account("2", 200));
        const event = new UpdateAccount(accountRepositoryInterface);
        const spy = jest.spyOn(accountRepositoryInterface, "update");
        const input = {
            accountIdFrom: "1",
            accountIdTo: "2",
            balanceAccountFrom: 100,
            balanceAccountTo: 200
        }
        await event.execute(input);
        expect(spy).toHaveBeenCalledTimes(2);

        const newAccountBalanceFrom = await accountRepositoryInterface.get("1");
        const newAccountBalanceTo = await accountRepositoryInterface.get("2");

        expect(newAccountBalanceFrom.balance).toBe(100);
        expect(newAccountBalanceTo.balance).toBe(200);
    })
});