// done
import { ColumnAccountsUsersEnum } from '../../enum/column.enum';
import { DatabaseEnum } from '../../enum/database.enum';
import { TableAccountsEnum } from '../../enum/table.enum';
import { SqlQueryConditionModel } from './sql-query-condition.model';

export interface AccountsUsersSqlQueryModel {
  table: TableAccountsEnum.accounts;
  scope: ('*' | ColumnAccountsUsersEnum)[];
  conditions: SqlQueryConditionModel<ColumnAccountsUsersEnum>[];
}

export interface AccountsSqlQueryModel extends AccountsUsersSqlQueryModel {
  database: DatabaseEnum.accounts;
}
