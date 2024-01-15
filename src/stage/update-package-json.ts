import PackageJson from "@npmcli/package-json"
import { AppContext } from "../app-context"

export const updatePackageJson = async (
  new_version: string,
  ctx: AppContext
) => {
  console.log(`Updating package.json to version ${new_version}`)
  const pkg_json = await PackageJson.load(ctx.current_directory!)
  pkg_json.update({ version: new_version })
  await pkg_json.save()
}
