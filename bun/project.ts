// Imports
import { ensureSync as ensure } from "../util/pcall";

// Defines properties
/** Project's git commit hash. */
export const commitHash = ensure(() => Bun.spawnSync([
    "git", "rev-parse", "--short", "HEAD"
]).stdout.toString(), null);
