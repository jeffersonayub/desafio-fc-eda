import { Message } from "kafkajs";
import { UpdateAccount} from "../../domain/account/event/update-account";
import { AccountRepositoryInterface } from "../../domain/account/repository/account.repository.interface";
import QueueConsumer from "../kafka/queue.consumer";

export class UpdateAccountController {
    constructor(queue: QueueConsumer, accountRepositoryInterface: AccountRepositoryInterface) {
        const accountUpdate = new UpdateAccount(accountRepositoryInterface);

        queue.consume("balance", async (message: Message) => {
            if (!message.value?.toString()) {
                throw new Error("invalid message");
            }

            const decodedMessage = JSON.parse(message.value.toString());

            const input = {
                accountIdFrom: decodedMessage.Payload.account_id_from,
                accountIdTo: decodedMessage.Payload.account_id_to,
                balanceAccountFrom: decodedMessage.Payload.balance_account_from,
                balanceAccountTo: decodedMessage.Payload.balance_account_to
            }
            await accountUpdate.execute(input);
            console.log("message consumed: ", message.value.toString())
        }).catch((err) => console.log(err))
    }
}
