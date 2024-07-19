import simpleGit from "simple-git"
import { AppContext } from "../app-context"

export const makeSureGitConfigured = async (ctx: AppContext) => {
  console.log("Making sure git is configured...")
  const git = simpleGit(ctx.current_directory)

  const user_email =
    process.env.GIT_USER_EMAIL ||
    (process.env.GITHUB_ACTIONS ? "actions@github.com" : undefined)
  const user_name =
    process.env.GIT_USER_NAME ||
    (process.env.GITHUB_ACTIONS ? "GitHub Actions" : undefined)

  if (user_email) {
    await git.addConfig("user.email", user_email, undefined, "local")
  }

  if (user_name) {
    await git.addConfig("user.name", user_name, undefined, "local")
  }
}
