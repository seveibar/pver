import PackageJson from "@npmcli/package-json"
import { AppContext } from "../app-context"

export const updatePackageJson = async (
  new_version: string,
  ctx: AppContext
) => {
  const pkg_json = await PackageJson.load("package.json")
  pkg_json.update({ version: new_version })
  await pkg_json.save()
}
