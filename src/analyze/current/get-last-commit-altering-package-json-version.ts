import { AppContext } from "../../app-context"
import simpleGit from "simple-git"

export const getLastCommitAlteringPackageJsonVersion = async (
  ctx: AppContext
): Promise<string | null> => {
  const git = simpleGit(ctx.current_directory)
  const log = await git.log({ file: "package.json" })

  if (!log.latest) return null

  // Return the hash of the first commit that changed the version line
  // To do this, you must load the commit diff for each commit
  for (const commit of log.all) {
    const diff = await git.diff([
      "-U0", // Don't show surrounding lines
      log.latest.hash,
      commit.hash,
      "--",
      "package.json",
    ])
    if (diff.includes('"version":')) return commit.hash
  }

  return null
}
