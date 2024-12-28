// done
import { AccountsSqlQueryModel } from './accounts-sql-query.model';
import { BlockedTokensSqlQueryModel } from './blocked-tokens-sql-query.model';
import { RoomsSqlQueryModel } from './rooms-sql-query.model';
import { SocketsSqlQueryModel } from './sockets-sql-query.model';

export type SqlQueryType =
  | AccountsSqlQueryModel
  | BlockedTokensSqlQueryModel
  | RoomsSqlQueryModel
  | SocketsSqlQueryModel;
