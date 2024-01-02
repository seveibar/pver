/**
 * The AppContext stores directory, arg, flag and config information and is
 * passed around to most functions.
 *
 * You should add anything to the Context that is shared between functions but
 * nothing that is specific to a particular command.
 *
 * Everything in the context should be strictly defined, no "any" or
 * semi-structured types etc.
 */
export type AppContext = {
  current_directory?: string

  current_method: "auto" | "package.json"
  transition_method: "auto" | "simplegit"
}

export const getAppContext = ({ argv }: { argv: Record<string, any> }) => {
  return {
    current_directory: process.cwd(),
    current_method: argv.current ?? "any",
    transition_method: argv.transition ?? "any",
  }
}
