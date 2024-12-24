// done
import { ColumnAccountsUsersEnum } from '../../enum/column.enum';
import { DatabaseEnum } from '../../enum/database.enum';
import { TableAccountsEnum } from '../../enum/table.enum';
import { SqlQueryColumnModel } from './sql-query-column.model';

export interface AccountsUsersSqlQueryModel {
  table: TableAccountsEnum.accounts;
  scope: ('*' | ColumnAccountsUsersEnum)[];
  columns: SqlQueryColumnModel<ColumnAccountsUsersEnum>[];
}

export interface AccountsSqlQueryModel extends AccountsUsersSqlQueryModel {
  database: DatabaseEnum.accounts;
}
