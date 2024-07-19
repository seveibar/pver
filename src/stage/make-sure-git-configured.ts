import simpleGit from "simple-git"
import { AppContext } from "../app-context"

export const makeSureGitConfigured = async (ctx: AppContext) => {
  console.log("Making sure git is configured...")
  const git = simpleGit(ctx.current_directory)

  const userEmail = process.env.GIT_USER_EMAIL || (process.env.GITHUB_ACTIONS ? "actions@github.com" : undefined)
  const userName = process.env.GIT_USER_NAME || (process.env.GITHUB_ACTIONS ? "GitHub Actions" : undefined)

  if (userEmail) {
    await git.addConfig("user.email", userEmail, undefined, "local")
  }

  if (userName) {
    await git.addConfig("user.name", userName, undefined, "local")
  }

  if (!userEmail || !userName) {
    throw new Error("Git user email or name not configured. Please set GIT_USER_EMAIL and GIT_USER_NAME environment variables.")
  }
}
