// done
import { injectable } from 'tsyringe';
import { Pool } from 'mysql2/typings/mysql/lib/Pool';

import { SqlQueryType } from '../model/sql-query/sql-query.model';

@injectable()
export class SqlQueryUtils {
  async select<TData>(sqlQuery: SqlQueryType, pool: Pool) {
    const { scope, table, conditions } = sqlQuery;
    const scopeText = scope.join(', ');
    const conditionsItems = conditions.map((condition) => {
      return `${condition.column}="${condition.value}"`;
    });
    const conditionsText =
      conditionsItems.length === 0
        ? ''
        : `WHERE ${conditionsItems.join(' AND ')}`;
    const select = `SELECT ${scopeText} FROM ${table} ${conditionsText}`;
    const [resultSelect] = await pool.promise().query(select);
    return resultSelect as TData;
  }
}
