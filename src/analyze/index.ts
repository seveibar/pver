import { AppContext } from "../app-context"
import { getCurrentPackageJsonVersion } from "./current/get-current-package-json-version"
import { getLastCommitAlteringPackageJsonVersion } from "./current/get-last-commit-altering-package-json-version"
import { getSimpleGitTransitions } from "./transition/get-simple-git-transitions"

export type Analysis = {
  current_method: string
  transition_method: string
  current_version: string
  next_version: string
}

export const analyze = async (ctx: AppContext): Promise<Analysis> => {
  let current_method = ctx.current_method
  // TODO scan to find best current_method
  if (current_method === "auto") current_method = "package.json"

  let transition_method = ctx.transition_method
  // TODO scan to find best transition_method
  if (transition_method === "auto") transition_method = "simplegit"

  let current_version,
    current_version_commit_sha: string | null = null
  if (current_method === "package.json") {
    current_version = await getCurrentPackageJsonVersion(ctx)
    if (transition_method === "simplegit")
      current_version_commit_sha =
        await getLastCommitAlteringPackageJsonVersion(ctx)
  }

  if (!current_version)
    throw new Error(
      `Couldn't find current version using --current-method: ${ctx.current_method}[${current_method}]`
    )

  let next_version
  if (transition_method === "simplegit")
    next_version = await getSimpleGitTransitions(
      {
        current_version,
        current_version_commit_sha,
      },
      ctx
    )

  if (!next_version)
    throw new Error(
      `Couldn't find next version using --transition-method: ${ctx.transition_method}[${transition_method}]`
    )

  return {
    current_method,
    transition_method,
    current_version,
    next_version,
  }
}
