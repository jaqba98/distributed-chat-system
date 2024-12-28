// done
import { ColumnSocketsEnum } from '../../enum/column.enum';
import { DatabaseEnum } from '../../enum/database.enum';
import { TableAccountsEnum } from '../../enum/table.enum';
import { SqlQueryColumnModel } from './sql-query-column.model';

export interface SocketsSqlQueryModel {
  database: DatabaseEnum.chat;
  table: TableAccountsEnum.sockets;
  scope: ('*' | ColumnSocketsEnum)[];
  columns: SqlQueryColumnModel<ColumnSocketsEnum>[];
}
