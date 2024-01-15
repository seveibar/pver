import fs from "fs/promises"

/**
 * The AppContext stores directory, arg, flag and config information and is
 * passed around to most functions.
 *
 * You should add anything to the Context that is shared between functions but
 * nothing that is specific to a particular command.
 *
 * Everything in the context should be strictly defined, no "auto" or
 * semi-structured types etc.
 */
export type AppContext = {
  current_directory?: string

  current_method: "auto" | "package.json"
  transition_method: "auto" | "simplegit"
  release_methods: Array<"git" | "npm">
}

export const getAppContext = async ({
  argv,
  has_package_json,
  has_git_dir,
}: {
  argv: Record<string, any>
  has_package_json?: boolean
  has_git_dir?: boolean
}) => {
  const release_methods: AppContext["release_methods"] =
    argv.release_methods ?? []

  if (argv.git) release_methods.push("git")
  if (argv.npm) release_methods.push("npm")

  if (has_git_dir === undefined) {
    has_git_dir = await fs
      .stat(".git")
      .then(() => true)
      .catch((e) => false)
    has_package_json = await fs
      .stat("package.json")
      .then(() => true)
      .catch((e) => false)
  }

  if (release_methods.length === 0) {
    // automatically determine release methods
    if (has_git_dir) release_methods.push("git")
    if (has_package_json) release_methods.push("npm")
  }

  return {
    current_directory: process.cwd(),
    current_method: argv.current ?? "auto",
    transition_method: argv.transition ?? "auto",
    release_methods,
  }
}
