import { analyze } from "../analyze"
import { AppContext } from "../app-context"
import { updatePackageJson } from "./update-package-json"

export const stage = async (ctx: AppContext) => {
  const analysis = await analyze(ctx)

  if (ctx.release_methods.includes("git")) {
    // TODO
  }

  if (ctx.release_methods.includes("npm")) {
    await updatePackageJson(analysis.next_version, ctx)
  }
}
