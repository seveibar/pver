import { AppContext } from "../app-context"

/**
 * Setup github parts:
 * - Create github action
 * - Make sure NODE_AUTH_TOKEN secret is set for repo and the action has
 *   registry-url set
 * - Make sure https://github.com/seveibar/pver/settings/actions says that
 *   the action is allow read and write permissions
 */
export const setupGithub = async (ctx: AppContext) => {}
