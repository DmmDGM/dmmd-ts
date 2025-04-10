// Imports
import { attemptSync as attempt } from "../util/pcall";

// Defines properties
/** Project's git commit hash. */
export const commitHash = attempt(() => Bun.spawnSync([
    "git", "rev-parse", "--short", "HEAD"
]).stdout.toString(), null);
