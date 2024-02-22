import { AccountRepositoryInterface } from "../repository/account.repository.interface";

export class GetAccount {
    constructor(private accountRepositoryInterface: AccountRepositoryInterface) { }

    async execute(input: GetAccountInputDto): Promise<GetAccountOutputDto> {
        const accountBalance = await this.accountRepositoryInterface.get(input.accountId);
        return {
            accountId: accountBalance.accountId,
            balance: accountBalance.balance
        }
    }
}

export type GetAccountInputDto = {
    accountId: string;
}

export type GetAccountOutputDto = {
    accountId: string;
    balance: number;
}