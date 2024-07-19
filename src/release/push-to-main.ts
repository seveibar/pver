import simpleGit, { SimpleGit } from "simple-git"
import { AppContext } from "../app-context"

export const pushToMain = async (ctx: AppContext) => {
  console.log("Pushing to main")
  let git: SimpleGit = simpleGit(ctx.current_directory)

  if (process.env.GITHUB_TOKEN) {
    const remoteUrl = await git.remote(['get-url', 'origin'])
    const newUrl = remoteUrl.replace('https://', `https://x-access-token:${process.env.GITHUB_TOKEN}@`)
    await git.removeRemote('origin')
    await git.addRemote('origin', newUrl)
  }

  // sometimes when pushing to main we get an error that we need to integrate
  // remote changes first, let's pull main and rebase
  await git.pull("origin", "main", ["--rebase"])

  await git.push(["origin", `HEAD:${process.env.GITHUB_REF ?? "main"}`])
}
