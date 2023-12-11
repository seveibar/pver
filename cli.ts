import yargs from "yargs"
import { hideBin } from "yargs/helpers"

interface ReleaseOptions {
  git?: boolean
  npm?: boolean
  readme?: boolean
  pyproject?: boolean
  setuppy?: boolean
  versionpy?: boolean
  versionrb?: boolean
  mdfile?: string
}

yargs(hideBin(process.argv))
  // Analyze Command
  .command(
    "analyze",
    "Automatically compute the latest Pragmatic Version using the git history",
    {},
    (argv) => {
      // Logic for analyze command
    }
  )

  // Release Command
  .command(
    "release [action]",
    "Automatically compute and release a new version",
    (yargs) => {
      return yargs
        .positional("action", {
          describe: "The release action to perform",
          choices: ["increment", "announce", "bigrelease"],
        })
        .option("git", {
          describe: "Release as a git tag and push it",
          type: "boolean",
        })
        .option("npm", {
          describe: "Increment version in package.json",
          type: "boolean",
        })
        .option("readme", {
          describe: "Increment version in README files",
          type: "boolean",
        })
      // Additional options here...
    },
    (argv: ReleaseOptions) => {
      // Logic for release command
    }
  )

  // Stage Command
  .command(
    "stage [action]",
    "Tag the current commit and stage changes locally",
    (yargs) => {
      return yargs
        .positional("action", {
          describe: "The stage action to perform",
          choices: ["increment"],
        })
        .option("git", {
          describe: "Stage as a git tag",
          type: "boolean",
        })
        .option("npm", {
          describe: "Stage version in package.json",
          type: "boolean",
        })
      // Additional options here...
    },
    (argv: ReleaseOptions) => {
      // Logic for stage command
    }
  )

  .help().argv
