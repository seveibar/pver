import simpleGit, { SimpleGit } from "simple-git"
import { AppContext } from "../app-context"

export const pushGitTag = async (tag: string, ctx: AppContext) => {
  console.log("Pushing git tag", tag)
  let git: SimpleGit = simpleGit(ctx.current_directory)

  if (process.env.GITHUB_TOKEN) {
    const remoteUrl = await git.remote(['get-url', 'origin'])
    const newUrl = remoteUrl.replace('https://', `https://x-access-token:${process.env.GITHUB_TOKEN}@`)
    await git.removeRemote('origin')
    await git.addRemote('origin', newUrl)
  }

  await git.push("origin", tag)
}
