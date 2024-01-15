import { analyze } from "../analyze"
import { AppContext } from "../app-context"
import { stage } from "../stage"
import { npmPublish } from "./npm-publish"
import { pushGitTag } from "./push-git-tag"
import { pushToMain } from "./push-to-main"

export const release = async (ctx: AppContext) => {
  const analysis = await analyze(ctx)
  await stage(ctx)

  if (ctx.release_methods.includes("git")) {
    await pushGitTag(`v${analysis.next_version}`, ctx)
  }

  if (ctx.release_methods.includes("npm")) {
    await npmPublish(ctx)
  }

  await pushToMain(ctx)
}
