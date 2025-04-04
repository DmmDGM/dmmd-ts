// Imports
import { execSync as execute } from "node:child_process";

// Defines constants
/** Git commit hash. */
export const commitHash = execute("git rev-parse --short HEAD").toString().trim();
