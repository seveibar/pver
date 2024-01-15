import simpleGit from "simple-git"
import { AppContext } from "../app-context"

export const pushToMain = async (ctx: AppContext) => {
  console.log("Pushing to main")
  const git = simpleGit(ctx.current_directory)
  await git.push(["origin", `HEAD:${process.env.GITHUB_REF ?? "main"}`])
}
