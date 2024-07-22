import { spawnSync } from "child_process"
import { AppContext } from "../app-context"
export const npmPublish = (ctx: AppContext) => {
  const result = spawnSync("npm", ["publish"], {
    cwd: ctx.current_directory,
    env: {
      ...process.env,
      NODE_AUTH_TOKEN: process.env.NODE_AUTH_TOKEN || process.env.NPM_TOKEN,
    },
    stdio: "inherit",
  })

  if (result.status !== 0) {
    throw new Error("npm publish failed")
  }
}
