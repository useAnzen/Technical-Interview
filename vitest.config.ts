import { defineConfig } from "vitest/config";
import AutoImport from "unplugin-auto-import/vite";
import tsconfig from "./tsconfig.json";
import path from "path";

export default defineConfig({
    plugins: [
        AutoImport({
            imports: ["vitest"],
            dts: true // generate TypeScript declaration
        })
    ],
    resolve: {
        alias: {
            ...Object.fromEntries(
                Object.entries(tsconfig.compilerOptions.paths).map(([key, [value]]) => [
                    key.replace("/*", ""),
                    path.resolve(__dirname, value.replace("/*", ""))
                ])
            )
        }
    }
});
