import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    heroui({
      layout: {
        dividerWeight: "1px", 
        disabledOpacity: 0.45, 
        fontSize: {
          tiny: "0.75rem",   // 12px
          small: "0.875rem", // 14px
          medium: "0.9375rem", // 15px
          large: "1.125rem", // 18px
        },
        lineHeight: {
          tiny: "1rem", 
          small: "1.25rem", 
          medium: "1.5rem", 
          large: "1.75rem", 
        },
        radius: {
          small: "6px", 
          medium: "8px", 
          large: "12px", 
        },
        borderWidth: {
          small: "1px", 
          medium: "1px", 
          large: "2px", 
        },
      },
      themes: {
        light: {
          colors: {
            "background": {
              "DEFAULT": "#FFFFFF"
            },
            "content1": {
              "DEFAULT": "#FFFFFF",
              "foreground": "#11181C"
            },
            "content2": {
              "DEFAULT": "#f4f4f5",
              "foreground": "#27272a"
            },
            "content3": {
              "DEFAULT": "#e4e4e7",
              "foreground": "#3f3f46"
            },
            "content4": {
              "DEFAULT": "#d4d4d8",
              "foreground": "#52525b"
            },
            "divider": {
              "DEFAULT": "rgba(17, 17, 17, 0.15)"
            },
            "focus": {
              "DEFAULT": "#006FEE"
            },
            "foreground": {
              "50": "#fafafa",
              "100": "#f4f4f5",
              "200": "#e4e4e7",
              "300": "#d4d4d8",
              "400": "#a1a1aa",
              "500": "#71717a",
              "600": "#52525b",
              "700": "#3f3f46",
              "800": "#27272a",
              "900": "#18181b",
              "DEFAULT": "#11181C"
            },
            "overlay": {
              "DEFAULT": "#000000"
            },
            "danger": {
              "50": "#fee7ef",
              "100": "#fdd0df",
              "200": "#faa0bf",
              "300": "#f871a0",
              "400": "#f54180",
              "500": "#f31260",
              "600": "#c20e4d",
              "700": "#920b3a",
              "800": "#610726",
              "900": "#310413",
              "DEFAULT": "#f31260",
              "foreground": "#ffffff"
            },
            "default": {
              "50": "#fafafa",
              "100": "#f4f4f5",
              "200": "#e4e4e7",
              "300": "#d4d4d8",
              "400": "#a1a1aa",
              "500": "#71717a",
              "600": "#52525b",
              "700": "#3f3f46",
              "800": "#27272a",
              "900": "#18181b",
              "DEFAULT": "#d4d4d8",
              "foreground": "#000"
            },
            "primary": {
              "50": "#e6f1fe",
              "100": "#cce3fd",
              "200": "#99c7fb",
              "300": "#66aaf9",
              "400": "#338ef7",
              "500": "#006FEE",
              "600": "#005bc4",
              "700": "#004493",
              "800": "#002e62",
              "900": "#001731",
              "DEFAULT": "#006FEE",
              "foreground": "#fff"
            },
            "secondary": {
              "50": "#f2eafa",
              "100": "#e4d4f4",
              "200": "#c9a9e9",
              "300": "#ae7ede",
              "400": "#9353d3",
              "500": "#7828c8",
              "600": "#6020a0",
              "700": "#481878",
              "800": "#301050",
              "900": "#180828",
              "DEFAULT": "#7828c8",
              "foreground": "#fff"
            },
            "success": {
              "50": "#e8faf0",
              "100": "#d1f4e0",
              "200": "#a2e9c1",
              "300": "#74dfa2",
              "400": "#45d483",
              "500": "#17c964",
              "600": "#12a150",
              "700": "#0e793c",
              "800": "#095028",
              "900": "#052814",
              "DEFAULT": "#17c964",
              "foreground": "#000"
            },
            "warning": {
              "50": "#fefce8",
              "100": "#fdedd3",
              "200": "#fbdba7",
              "300": "#f9c97c",
              "400": "#f7b750",
              "500": "#f5a524",
              "600": "#c4841d",
              "700": "#936316",
              "800": "#62420e",
              "900": "#312107",
              "DEFAULT": "#f5a524",
              "foreground": "#000"
            }
          }
        },
        dark: {
          colors: {
            "background": {
              "DEFAULT": "#000000"
            },
            "content1": {
              "DEFAULT": "#18181b",
              "foreground": "#fafafa"
            },
            "content2": {
              "DEFAULT": "#27272a",
              "foreground": "#f4f4f5"
            },
            "content3": {
              "DEFAULT": "#3f3f46",
              "foreground": "#e4e4e7"
            },
            "content4": {
              "DEFAULT": "#52525b",
              "foreground": "#d4d4d8"
            },
            "divider": {
              "DEFAULT": "rgba(255, 255, 255, 0.15)"
            },
            "focus": {
              "DEFAULT": "#006FEE"
            },
            "foreground": {
              "50": "#18181b",
              "100": "#27272a",
              "200": "#3f3f46",
              "300": "#52525b",
              "400": "#71717a",
              "500": "#a1a1aa",
              "600": "#d4d4d8",
              "700": "#e4e4e7",
              "800": "#f4f4f5",
              "900": "#fafafa",
              "DEFAULT": "#ECEDEE"
            },
            "overlay": {
              "DEFAULT": "#000000"
            },
            "danger": {
              "50": "#310413",
              "100": "#610726",
              "200": "#920b3a",
              "300": "#c20e4d",
              "400": "#f31260",
              "500": "#f54180",
              "600": "#f871a0",
              "700": "#faa0bf",
              "800": "#fdd0df",
              "900": "#fee7ef",
              "DEFAULT": "#f31260",
              "foreground": "#ffffff"
            },
            "default": {
              "50": "#18181b",
              "100": "#27272a",
              "200": "#3f3f46",
              "300": "#52525b",
              "400": "#71717a",
              "500": "#a1a1aa",
              "600": "#d4d4d8",
              "700": "#e4e4e7",
              "800": "#f4f4f5",
              "900": "#fafafa",
              "DEFAULT": "#3f3f46",
              "foreground": "#fff"
            },
            "primary": {
              "50": "#001731",
              "100": "#002e62",
              "200": "#004493",
              "300": "#005bc4",
              "400": "#006FEE",
              "500": "#338ef7",
              "600": "#66aaf9",
              "700": "#99c7fb",
              "800": "#cce3fd",
              "900": "#e6f1fe",
              "DEFAULT": "#006FEE",
              "foreground": "#fff"
            },
            "secondary": {
              "50": "#180828",
              "100": "#301050",
              "200": "#481878",
              "300": "#6020a0",
              "400": "#7828c8",
              "500": "#9353d3",
              "600": "#ae7ede",
              "700": "#c9a9e9",
              "800": "#e4d4f4",
              "900": "#f2eafa",
              "DEFAULT": "#9353d3",
              "foreground": "#fff"
            },
            "success": {
              "50": "#052814",
              "100": "#095028",
              "200": "#0e793c",
              "300": "#12a150",
              "400": "#17c964",
              "500": "#45d483",
              "600": "#74dfa2",
              "700": "#a2e9c1",
              "800": "#d1f4e0",
              "900": "#e8faf0",
              "DEFAULT": "#17c964",
              "foreground": "#000"
            },
            "warning": {
              "50": "#312107",
              "100": "#62420e",
              "200": "#936316",
              "300": "#c4841d",
              "400": "#f5a524",
              "500": "#f7b750",
              "600": "#f9c97c",
              "700": "#fbdba7",
              "800": "#fdedd3",
              "900": "#fefce8",
              "DEFAULT": "#f5a524",
              "foreground": "#000"
            }
          }
        },
        comfort: {
          colors: {
            "background": {
              "DEFAULT": "#F5F5DC" // Beige background for comfort theme
            },
            "content1": {
              "DEFAULT": "#F5F5DC",
              "foreground": "#3E3E3C"
            },
            "content2": {
              "DEFAULT": "#E8E8D0",
              "foreground": "#3E3E3C"
            },
            "content3": {
              "DEFAULT": "#DCDCC8",
              "foreground": "#3E3E3C"
            },
            "content4": {
              "DEFAULT": "#D0D0BC",
              "foreground": "#3E3E3C"
            },
            "divider": {
              "DEFAULT": "rgba(62, 62, 60, 0.15)"
            },
            "focus": {
              "DEFAULT": "#5D8AA8" // Steel blue for focus
            },
            "foreground": {
              "50": "#F5F5F0",
              "100": "#EBEBE6",
              "200": "#D6D6D1",
              "300": "#C2C2BD",
              "400": "#ADADA8",
              "500": "#999994",
              "600": "#85857F",
              "700": "#70706B",
              "800": "#5C5C56",
              "900": "#3E3E3C",
              "DEFAULT": "#3E3E3C"
            },
            "overlay": {
              "DEFAULT": "#3E3E3C"
            },
            "danger": {
              "50": "#fee7ef",
              "100": "#fdd0df",
              "200": "#faa0bf",
              "300": "#f871a0",
              "400": "#f54180",
              "500": "#f31260",
              "600": "#c20e4d",
              "700": "#920b3a",
              "800": "#610726",
              "900": "#310413",
              "DEFAULT": "#c20e4d",
              "foreground": "#ffffff"
            },
            "default": {
              "50": "#F5F5F0",
              "100": "#EBEBE6",
              "200": "#D6D6D1",
              "300": "#C2C2BD",
              "400": "#ADADA8",
              "500": "#999994",
              "600": "#85857F",
              "700": "#70706B",
              "800": "#5C5C56",
              "900": "#3E3E3C",
              "DEFAULT": "#C2C2BD",
              "foreground": "#3E3E3C"
            },
            "primary": {
              "50": "#EDF3F7",
              "100": "#DBE7EF",
              "200": "#B7CFDF",
              "300": "#93B7CF",
              "400": "#6F9FBF",
              "500": "#5D8AA8", // Steel blue for comfort theme
              "600": "#4A6E86",
              "700": "#385365",
              "800": "#253743",
              "900": "#131C22",
              "DEFAULT": "#5D8AA8",
              "foreground": "#fff"
            },
            "secondary": {
              "50": "#F2F0E6",
              "100": "#E5E1CD",
              "200": "#CBC39B",
              "300": "#B1A569",
              "400": "#978737",
              "500": "#7D6F04",
              "600": "#645903",
              "700": "#4B4302",
              "800": "#322C02",
              "900": "#191601",
              "DEFAULT": "#7D6F04",
              "foreground": "#fff"
            },
            "success": {
              "50": "#E9F5EC",
              "100": "#D3EBD9",
              "200": "#A7D7B3",
              "300": "#7BC38D",
              "400": "#4FAF67",
              "500": "#3C8A50",
              "600": "#306E40",
              "700": "#245330",
              "800": "#183720",
              "900": "#0C1C10",
              "DEFAULT": "#3C8A50",
              "foreground": "#fff"
            },
            "warning": {
              "50": "#FEF9E7",
              "100": "#FCF3CF",
              "200": "#F9E79F",
              "300": "#F7DB6F",
              "400": "#F4CF3F",
              "500": "#F1C40F",
              "600": "#C19D0C",
              "700": "#917609",
              "800": "#614E06",
              "900": "#302703",
              "DEFAULT": "#F1C40F",
              "foreground": "#000"
            }
          }
        }
      }
    })
  ]
}
