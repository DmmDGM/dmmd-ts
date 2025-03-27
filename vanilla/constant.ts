// Imports
import nodeCp from "node:child_process";

// Defines constants
/** Git commit hash. */
export const commitHash = nodeCp.execSync("git rev-parse --short HEAD").toString().trim();
