import { theme as proTheme } from "./base";
import { extendTheme, theme as baseTheme } from "@chakra-ui/react";

export const theme = extendTheme(
  {
    colors: { ...baseTheme.colors, brand: baseTheme.colors.blue },
    fonts: {
      heading: "Inter, -apple-system, system-ui, sans-serif",
      body: "Inter, -apple-system, system-ui, sans-serif",
    },
  },
  proTheme,
  {
    components: {
      Button: {
        baseStyle: {
          borderRadius: 4, // Change this value to your desired border radius
        },
      },
      Input: {
        baseStyle: {
          field: {
            borderRadius: 4, // Change this value to your desired border radius
          },
        },
      },
    },
  }
);
