async function init() {
  initIPCMain()
  createWindow()
  initMenu()
}

export function initIPCMain() {
  for (const operation of electronDbOps) {
    ipcMain.handle(`db${operation}`, (_event, payload) => {
      return dbInvoke(operation, payload)
    })
  }
}

export function dbInvoke(op: ElectronDbOp, args?: unknown): Promise<unknown> {
  return new Promise((resolve, reject) => {})
}
