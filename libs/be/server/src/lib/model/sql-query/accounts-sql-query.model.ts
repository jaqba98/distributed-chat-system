// done
import { ColumnAccountsEnum } from '../../enum/column.enum';
import { DatabaseEnum } from '../../enum/database.enum';
import { TableAccountsEnum } from '../../enum/table.enum';
import { SqlQueryColumnModel } from './sql-query-column.model';

export interface AccountsSqlQueryModel {
  database: DatabaseEnum.accounts;
  table: TableAccountsEnum.accounts;
  scope: ('*' | ColumnAccountsEnum)[];
  columns: SqlQueryColumnModel<ColumnAccountsEnum>[];
}
