import {
  defineConfig,
  presetAttributify,
  presetUno,
  presetWind,
  transformerCompileClass,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";

export default defineConfig({
  content: {
    filesystem: ["./src/**/*.{html,jsx,tsx,vue,css,scss}"],
    // pipeline: {
    //   include: [
    //     /\.(s?css|vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
    //   ],
    //   exclude: [],
    // },
  },
  presets: [presetUno(), presetWind(), presetAttributify()],
  rules: [["gdir", { direction: "var(--global-direction)" }]],
  shortcuts: [
    ["abs-full", "absolute size-full top-0 left-0"],
    ["bg-ccnr", "bg-(center contain no-repeat)"],
    ["flex-center", "flex justify-center items-center"],
    ["flex-fall", "flex-(~ col) items-center"],
    [
      "line",
      "overflow-x-hidden text-ellipsis whitespace-nowrap py-1em -my-1em px-1 box-border",
    ],
    [
      "text-stroke",
      "relative z-0 after:(content-[attr(data-content)] -z-1 abs-full)",
    ],
  ],
  transformers: [
    transformerCompileClass(),
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  variants: [],
});
