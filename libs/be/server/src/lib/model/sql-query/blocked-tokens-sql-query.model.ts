// done
import { ColumnBlockedTokensEnum } from '../../enum/column.enum';
import { DatabaseEnum } from '../../enum/database.enum';
import { TableAccountsEnum } from '../../enum/table.enum';
import { SqlQueryColumnModel } from './sql-query-column.model';

export interface BlockedTokensSqlQueryModel {
  database: DatabaseEnum.accounts;
  table: TableAccountsEnum.blockedTokens;
  scope: ('*' | ColumnBlockedTokensEnum)[];
  columns: SqlQueryColumnModel<ColumnBlockedTokensEnum>[];
}
