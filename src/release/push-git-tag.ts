import simpleGit from "simple-git"
import { AppContext } from "../app-context"

export const pushGitTag = async (tag: string, ctx: AppContext) => {
  console.log("Pushing git tag", tag)
  await simpleGit(ctx.current_directory).push("origin", tag)
}
