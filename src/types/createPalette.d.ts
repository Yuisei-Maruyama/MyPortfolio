// import * as createPalette from "@material-ui/core/styles/createPalette";
import { PaletteColorOptions } from "@material-ui/core/styles/createPalette";

interface CustomPalette {
  cyber?: PaletteColorOptions; // light, main, dark, 50, 100, ..., 900, A100, ..., A700
}

interface CustomPaletteColorOptions {
  sub?: string,
  text?: string,
  subText?: string
}

declare module "@material-ui/core/styles/createPalette" {
  // eslint-disable-next-line
  interface SimplePaletteColorOptions extends CustomPaletteColorOptions {}
  // eslint-disable-next-line
  interface PaletteOptions extends CustomPalette {}
  // eslint-disable-next-line
  interface Palette extends CustomPalette {}
}
