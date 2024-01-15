import simpleGit from "simple-git"
import { AppContext } from "../app-context"

export const makeSureGitConfigured = async (ctx: AppContext) => {
  console.log("Making sure git is configured...")
  const git = simpleGit(ctx.current_directory)

  // TODO detect if there's an existing git configuration
  if (process.env.GITHUB_ACTIONS) {
    await git.addConfig("user.email", "actions@github.com", undefined, "local")
    await git.addConfig("user.name", "GitHub Actions", undefined, "local")
  }

  // TODO error if nothing configured
}
