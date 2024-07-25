import { simpleGit } from "simple-git"
import { AppContext } from "../../app-context"
import { getNextVersion } from "./get-next-version"

export const getSimpleGitTransitions = async (
  {
    current_version,
    current_version_commit_sha,
  }: { current_version: string; current_version_commit_sha: string | null },
  ctx: AppContext
): Promise<string> => {
  const git = simpleGit(ctx.current_directory)
  const log = await git.log()
  if (!log.latest) throw new Error("No git history (commit something!)")
  
  // Check if the last commit contains [norelease]
  if (log.latest.message.includes('[norelease]')) {
    console.log('Last commit contains [norelease], skipping version increment')
    return current_version
  }
  
  if (log.latest && log.latest.hash === current_version_commit_sha)
    return current_version
  const logs_since_current = []
  for (const commit of log.all) {
    if (commit.hash === current_version_commit_sha) break
    logs_since_current.push(commit)
  }
  // Determine the type of change
  let change: "bigrelease" | "announce" | "increment" = "increment"
  if (
    logs_since_current.some((c) =>
      c.message.toLowerCase().startsWith("bigrelease:")
    )
  ) {
    change = "bigrelease"
  } else if (
    logs_since_current.some((c) =>
      c.message.toLowerCase().startsWith("announce:")
    )
  ) {
    change = "announce"
  }
  return getNextVersion(current_version, change)
}
