export async function chatAppend(db: any) {
  const isAsync = db.resultKind !== 'sync'

  const txStatements: Array<(tx: any) => void> = [(tx) => tx.insert().run()]

  if (isAsync) {
    await db.transaction(async (tx: any) => {
      for (const stmt of txStatements) {
        await stmt(tx)
      }
    })
  } else {
    db.transaction((tx: any) => {
      for (const stmt of txStatements) {
        stmt(tx)
      }
    })
  }
}
