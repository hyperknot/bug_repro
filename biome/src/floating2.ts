export async function executeTxOperations(
  db_: SQLiteDBUnion,
  operations: Array<(tx: SyncTransaction) => any>,
): Promise<Array<any>> {
  const isAsync = (db_ as any).resultKind !== 'sync'
  const results: Array<any> = []

  if (isAsync) {
    await (db_ as SqliteRemoteDatabase).transaction(async (tx) => {
      for (const op of operations) {
        const result = await op(tx as any)
        results.push(result)
      }
    })
  } else {
    ;(db_ as BetterSQLite3Database).transaction((tx) => {
      for (const op of operations) {
        const result = op(tx)
        results.push(result)
      }
    })
  }

  return results
}
