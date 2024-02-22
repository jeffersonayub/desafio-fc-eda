import { Account } from "../entity/account";
import { AccountRepositoryInterface } from "../repository/account.repository.interface";

export class UpdateAccount {
    constructor(private accountRepository: AccountRepositoryInterface) {

    }

    async execute(input: UpdateAccountInputDto): Promise<void> {

        const accountFrom = new Account(input.accountIdFrom, input.balanceAccountFrom);
        const accountTo = new Account(input.accountIdTo, input.balanceAccountTo);

        await this.accountRepository.update(accountFrom);
        await this.accountRepository.update(accountTo);
    }
}

type UpdateAccountInputDto = {
    accountIdFrom: string;
    accountIdTo: string;
    balanceAccountFrom: number;
    balanceAccountTo: number;
}