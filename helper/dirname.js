import { fileURLToPath } from "url"
import { dirname as pathDirname } from "path"

export const dirname = (meta) => pathDirname(fileURLToPath(meta.url))