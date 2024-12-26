// done
import { ColumnRoomsEnum } from '../../enum/column.enum';
import { DatabaseEnum } from '../../enum/database.enum';
import { TableAccountsEnum } from '../../enum/table.enum';
import { SqlQueryColumnModel } from './sql-query-column.model';

export interface RoomsSqlQueryModel {
  database: DatabaseEnum.rooms;
  table: TableAccountsEnum.rooms;
  scope: ('*' | ColumnRoomsEnum)[];
  columns: SqlQueryColumnModel<ColumnRoomsEnum>[];
}
