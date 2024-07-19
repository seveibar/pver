import simpleGit, { SimpleGit } from "simple-git"
import { AppContext } from "../app-context"
import { configureOrigin } from "./configure-origin"

export const pushGitTag = async (tag: string, ctx: AppContext) => {
  console.log("Pushing git tag", tag)
  let git: SimpleGit = simpleGit(ctx.current_directory)

  await configureOrigin(git)

  await git.push("origin", tag)
}
