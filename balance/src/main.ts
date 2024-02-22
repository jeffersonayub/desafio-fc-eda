import { GetAccountController } from './infraestructure/controller/get-account.controller';
import { UpdateAccountController } from './infraestructure/controller/update-account.controller';
import { KafkaAdapter } from './infraestructure/kafka/kafka.adapter';
import { DBAdapter } from './infraestructure/database/adapter';
import { AccountDatabase } from './infraestructure/account/database/account.database';
import { ServerAdapter } from './infraestructure/server/server.adapter';

const server = new ServerAdapter();

const consumer = new KafkaAdapter();
const connection = new DBAdapter("mysql://root:root@mysql:3306/balances");
const accountRepositoryInterface = new AccountDatabase(connection);

new GetAccountController(server, accountRepositoryInterface);
new UpdateAccountController(consumer, accountRepositoryInterface);

server.listen(3003);