// done
import { injectable } from 'tsyringe';
import { Pool } from 'mysql2/typings/mysql/lib/Pool';

import { SqlQueryType } from '../model/sql-query/sql-query.model';

@injectable()
export class SqlQueryUtils {
  async select<TData>(sqlQuery: SqlQueryType, pool: Pool) {
    const { scope, table, columns } = sqlQuery;
    const scopeText = scope.join(', ');
    const conditionsItems = columns.map((column) => {
      return `${column.column}="${column.value}"`;
    });
    const conditionsText =
      conditionsItems.length === 0
        ? ''
        : `WHERE ${conditionsItems.join(' AND ')}`;
    const select = `SELECT ${scopeText} FROM ${table} ${conditionsText}`;
    const [resultSelect] = await pool.promise().query(select);
    return resultSelect as TData;
  }

  async insert(sqlQuery: SqlQueryType, pool: Pool) {
    const { table, columns } = sqlQuery;
    const columnsHeaders: string[] = [];
    const columnsValues: string[] = [];
    columns.forEach((column) => {
      columnsHeaders.push(column.column);
      columnsValues.push(`"${column.value}"`);
    });
    const columnsHeader = columnsHeaders.join(', ');
    const columnsValue = columnsValues.join(', ');
    const insert = `INSERT INTO ${table} (${columnsHeader}) VALUES (${columnsValue})`;
    await pool.promise().query(insert);
  }
}
