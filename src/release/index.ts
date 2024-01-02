import { analyze } from "../analyze"
import { AppContext } from "../app-context"

export const release = async (ctx: AppContext) => {
  const analysis = await analyze(ctx)

  // TODO
}
