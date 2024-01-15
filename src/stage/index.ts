import { makeGitTag } from "./make-git-tag"
import { analyze } from "../analyze"
import { AppContext } from "../app-context"
import { updatePackageJson } from "./update-package-json"

export const stage = async (ctx: AppContext) => {
  const analysis = await analyze(ctx)
  console.log(`current version: ${analysis.current_version}`)
  console.log(`next version: ${analysis.next_version}`)
  console.log("")
  console.log(`Using staging methods: ${ctx.release_methods.join(", ")}`)

  if (ctx.release_methods.includes("git")) {
    await makeGitTag(`v${analysis.next_version}`, ctx)
  }

  if (ctx.release_methods.includes("npm")) {
    await updatePackageJson(analysis.next_version, ctx)
  }
}
