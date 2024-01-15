#!/usr/bin/env node
import yargs from "yargs"
import { hideBin } from "yargs/helpers"
import { getAppContext } from "./src/app-context"
import { analyze } from "./src/analyze"
import { release } from "./src/release"
import { stage } from "./src/stage"

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
    (yargs) => {
      return yargs
        .option("current", {
          describe: "Method to compute the current version",
          choices: ["auto", "package.json"],
          default: "auto",
        })
        .option("transition", {
          describe: "Method to compute next version(s) from current version",
          choices: ["auto", "simplegit"],
          default: "auto",
        })
    },
    async (argv) => {
      const analysis = await analyze(await getAppContext({ argv }))
      console.log(analysis)
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
          default: "auto",
          choices: ["auto", "increment", "announce", "bigrelease"],
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
    async (argv) => {
      const ctx = await getAppContext({ argv })
      await release(ctx)
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
          default: "auto",
          choices: ["auto", "increment", "announce", "bigrelease"],
        })
        .option("git", {
          describe: "Stage as a git tag",
          type: "boolean",
        })
        .option("npm", {
          describe: "Stage version in package.json",
          type: "boolean",
        })
    },
    async (argv) => {
      const ctx = await getAppContext({ argv })
      await stage(ctx)
    }
  )

  .help().argv
