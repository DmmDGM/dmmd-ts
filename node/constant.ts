// Imports
import nodeChild from "node:child_process";

// Defines constants
/** Git commit hash. */
export const commitHash = nodeChild.execSync("git rev-parse --short HEAD").toString().trim();
