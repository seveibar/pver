import simpleGit from "simple-git"
import { AppContext } from "../app-context"

export const addCommitChanges = async (
  new_version: string,
  ctx: AppContext
) => {
  console.log("Adding files and committing changes")
  const git = simpleGit(ctx.current_directory)

  // TODO detect other version-impacted files
  await git.add("package.json")

  await git.commit(`v${new_version}`)
}
