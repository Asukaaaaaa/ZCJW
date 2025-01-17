import UnoCSS from "@unocss/postcss";

import type { ToolsConfig } from "@rsbuild/core";

const config: ToolsConfig["postcss"] = (opt, { addPlugins }) => {
  addPlugins(UnoCSS());
};

export default config;
