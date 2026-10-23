import { serveStdio } from "@modelcontextprotocol/server/stdio";
import { createGeoExplorerServer } from "./server.ts";

serveStdio(createGeoExplorerServer);
