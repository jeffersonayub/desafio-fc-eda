import { GetAccountInputDto, GetAccount } from "../../domain/account/event/get-account";
import { AccountRepositoryInterface } from "../../domain/account/repository/account.repository.interface";
import { Server } from "../server/server";

export class GetAccountController {
    constructor(http: Server, accountBalanceRepository: AccountRepositoryInterface) {
        http.on("GET", "/balance/:accountId", async (params) => {
            try {
                const usecase = new GetAccount(accountBalanceRepository);

                const input: GetAccountInputDto = {
                    accountId: params.accountId
                }
                const output = await usecase.execute(input);
                return {
                    status: 200,
                    data: output
                };
            } catch (error) {
                if (error instanceof Error) {
                    return {
                        status: 404,
                        data: {
                            message: error.message
                        }
                    }
                }

                return {
                    status: 500,
                    data: {
                        message: "internal server error"
                    }
                }
            }
        })
    }
}