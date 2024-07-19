import simpleGit, { SimpleGit } from "simple-git"
import { AppContext } from "../app-context"
import { configureOrigin } from "./configure-origin"

export const pushToMain = async (ctx: AppContext) => {
  console.log("Pushing to main")
  let git: SimpleGit = simpleGit(ctx.current_directory)

  await configureOrigin(git)

  // sometimes when pushing to main we get an error that we need to integrate
  // remote changes first, let's pull main and rebase
  await git.pull("origin", "main", ["--rebase"])

  await git.push(["origin", `HEAD:${process.env.GITHUB_REF ?? "main"}`])
}
