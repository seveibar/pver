export const configureOrigin = async (git: any) => {
  if (process.env.GITHUB_TOKEN) {
    // This doesn't work- it's possible the checkout command needs to use the
    // github token (in the workflow yaml)
    // const remote_url = await git.remote(["get-url", "origin"])
    // if (!remote_url.includes("x-access-token:")) {
    //   const new_url = remote_url!.replace(
    //     "https://",
    //     `https://x-access-token:${process.env.GITHUB_TOKEN}@`
    //   )
    //   await git.removeRemote("origin")
    //   await git.addRemote("origin", new_url)
    // }
  }
}
