import simpleGit from "simple-git"
import { AppContext } from "../app-context"

export const pushGitTag = (tag: string, ctx: AppContext) => {
  console.log("Pushing git tag", tag)
  simpleGit(ctx.current_directory).push("origin", tag)
}
