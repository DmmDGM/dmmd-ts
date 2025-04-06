// Imports
import { attempt } from "../util/pcall";

// Defines constants
/** Project's git commit hash. */
export const commitHash = attempt(() => Bun.spawnSync([
    "git", "rev-parse", "--short", "HEAD"
]).stdout.toString(), null);
