import { AppContext } from "../app-context"
import simpleGit from "simple-git"

export const makeGitTag = async (tag: string, ctx: AppContext) => {
  console.log(`Creating git tag ${tag}`)
  await simpleGit(ctx.current_directory)
    .addTag(tag)
    .catch((e) => {
      if (e.toString().includes("already exists")) {
        console.log(`Tag ${tag} already exists, skipping`)
        return
      }
      throw e
    })
}
