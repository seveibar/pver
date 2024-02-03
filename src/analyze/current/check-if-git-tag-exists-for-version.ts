import { AppContext } from "../../app-context"
import simpleGit from "simple-git"

export const checkIfGitTagExistsForVersion = async (
  ctx: AppContext,
  version: string
): Promise<boolean> => {
  const git = simpleGit(ctx.current_directory)
  await git.fetch(["--tags"])
  const tags = await git.tags()
  return tags.all.includes(`v${version}`)
}
