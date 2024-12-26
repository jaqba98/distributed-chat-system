// done
import { AccountsSqlQueryModel } from './accounts-sql-query.model';
import { BlockedTokensSqlQueryModel } from './blocked-tokens-sql-query.model';
import { RoomsSqlQueryModel } from './rooms-sql-query.model';

export type SqlQueryType =
  | AccountsSqlQueryModel
  | BlockedTokensSqlQueryModel
  | RoomsSqlQueryModel;
