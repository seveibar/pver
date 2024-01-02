export const getNextVersion = (
  current_version: string,
  change: "bigrelease" | "announce" | "increment"
) => {
  const [version, tag = ""] = current_version.split("-")
  const [major, minor, patch] = version.split(".").map((v) => parseInt(v))

  const suffix = tag ? `-${tag}` : ""

  if (change === "bigrelease") return `${major + 1}.0.0${suffix}`
  if (change === "announce") return `${major}.${minor + 1}.0${suffix}`
  if (change === "increment") return `${major}.${minor}.${patch + 1}${suffix}`
  throw new Error(`Invalid change type: "${change}"`)
}
