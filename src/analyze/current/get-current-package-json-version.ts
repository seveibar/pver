import fs from "node:fs"
import { AppContext } from "../../app-context"

export const getCurrentPackageJsonVersion = (ctx: AppContext) => {
  const package_json_path = `${ctx.current_directory}/package.json`
  try {
    const packageJson = JSON.parse(
      fs.readFileSync(package_json_path).toString()
    )
    return packageJson.version
  } catch (e: any) {
    throw new Error(
      `Could not read package.json at ${package_json_path}: ${e.toString()}`
    )
  }
}
