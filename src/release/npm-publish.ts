import { spawnSync } from "child_process"
import { AppContext } from "../app-context"
export const npmPublish = (ctx: AppContext) => {
  spawnSync("npm", ["publish"], {
    cwd: ctx.current_directory,
    stdio: "inherit",
  })
}
