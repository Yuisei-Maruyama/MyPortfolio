# Material UI

## Theme

createTheme でテーマを作成して、、ThemeProviderコンポーネントを利用して、配下コンポーネントでもThemeを利用できるようにしておく。  

```ts
import React from 'react'
import { createTheme } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'

const theme = createTheme({
  (省略)
})

const Theme: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      (省略)
    </ThemeProvider>
  )
}

export default Theme
```

### テーマカラー調整

`palette` プロパティでWebサイトのブランドカラーを調整できる。

```ts
import { createTheme } from '@material-ui/core'
import red from '@material-ui/core/colors/red'
import grey from '@material-ui/core/colors/grey'

const theme = createTheme({
  palette: {
    primary: red,
    secondary: grey,
  },
})

export default theme
```

### フォント調整

`typography` プロパティで利用フォントを指定できる。  

```ts
import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Helvetica Neue',
      'Arial',
      'Hiragino Kaku Gothic ProN',
      'Hiragino Sans',
      'sans-serif',
    ].join(),
  },
});

export default theme;
```

Roboto などWebフォントを利用したい場合は、以下のように取り込む指定を入れておく必要がある。  

```ts
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
```

---

### 型定義

```ts
export type Direction = 'ltr' | 'rtl';

export interface ThemeOptions {
  shape?: ShapeOptions;
  breakpoints?: BreakpointsOptions;
  direction?: Direction;
  mixins?: MixinsOptions;
  overrides?: Overrides;
  palette?: PaletteOptions;
  props?: ComponentsProps;
  shadows?: Shadows;
  spacing?: SpacingOptions;
  transitions?: TransitionsOptions;
  typography?: TypographyOptions | ((palette: Palette) => TypographyOptions);
  zIndex?: ZIndexOptions;
  unstable_strictMode?: boolean;
}

export interface Theme {
  shape: Shape;
  breakpoints: Breakpoints;
  direction: Direction;
  mixins: Mixins;
  overrides?: Overrides;
  palette: Palette;
  props?: ComponentsProps;
  shadows: Shadows;
  spacing: Spacing;
  transitions: Transitions;
  typography: Typography;
  zIndex: ZIndex;
  unstable_strictMode?: boolean;
}
```

> palette

```ts
export interface PaletteOptions {
  primary?: PaletteColorOptions;
  secondary?: PaletteColorOptions;
  error?: PaletteColorOptions;
  warning?: PaletteColorOptions;
  info?: PaletteColorOptions;
  success?: PaletteColorOptions;
  type?: PaletteType;
  tonalOffset?: PaletteTonalOffset;
  contrastThreshold?: number;
  common?: Partial<CommonColors>;
  grey?: ColorPartial;
  text?: Partial<TypeText>;
  divider?: string;
  action?: Partial<TypeAction>;
  background?: Partial<TypeBackground>;
  getContrastText?: (background: string) => string;
}
```

> props

```ts
export type ComponentsProps = {
  [Name in keyof ComponentsPropsList]?: Partial<ComponentsPropsList[Name]>;
};

export interface ComponentsPropsList {
  MuiAppBar: AppBarProps;
  MuiAvatar: AvatarProps;
  MuiBackdrop: BackdropProps;
  MuiBadge: BadgeProps;
  MuiBottomNavigation: BottomNavigationProps;
  MuiBottomNavigationAction: BottomNavigationActionProps;
  MuiBreadcrumbs: BreadcrumbsProps;
  MuiButton: ButtonProps;
  MuiButtonBase: ButtonBaseProps;
  MuiButtonGroup: ButtonGroupProps;
  MuiCard: CardProps;
  MuiCardActionArea: CardActionAreaProps;
  MuiCardActions: CardActionsProps;
  MuiCardContent: CardContentProps;
  MuiCardHeader: CardHeaderProps;
  MuiCardMedia: CardMediaProps;
  MuiCheckbox: CheckboxProps;
  MuiChip: ChipProps;
  MuiCircularProgress: CircularProgressProps;
  MuiCollapse: CollapseProps;
  MuiContainer: ContainerProps;
  MuiCssBaseline: CssBaselineProps;
  MuiDialog: DialogProps;
  MuiDialogActions: DialogActionsProps;
  MuiDialogContent: DialogContentProps;
  MuiDialogContentText: DialogContentTextProps;
  MuiDialogTitle: DialogTitleProps;
  MuiDivider: DividerProps;
  MuiDrawer: DrawerProps;
  MuiAccordion: AccordionProps;
  MuiAccordionActions: AccordionActionsProps;
  MuiAccordionDetails: AccordionDetailsProps;
  MuiAccordionSummary: AccordionSummaryProps;
  MuiExpansionPanel: ExpansionPanelProps;
  MuiExpansionPanelActions: ExpansionPanelActionsProps;
  MuiExpansionPanelDetails: ExpansionPanelDetailsProps;
  MuiExpansionPanelSummary: ExpansionPanelSummaryProps;
  MuiFab: FabProps;
  MuiFilledInput: FilledInputProps;
  MuiFormControl: FormControlProps;
  MuiFormControlLabel: FormControlLabelProps;
  MuiFormGroup: FormGroupProps;
  MuiFormHelperText: FormHelperTextProps;
  MuiFormLabel: FormLabelProps;
  MuiGrid: GridProps;
  MuiIcon: IconProps;
  MuiIconButton: IconButtonProps;
  MuiImageList: ImageListProps;
  MuiImageListItem: ImageListItemProps;
  MuiImageListItemBar: ImageListItemBarProps;
  MuiInput: InputProps;
  MuiInputAdornment: InputAdornmentProps;
  MuiInputBase: InputBaseProps;
  MuiInputLabel: InputLabelProps;
  MuiLinearProgress: LinearProgressProps;
  MuiLink: LinkProps;
  MuiList: ListProps;
  MuiListItem: ListItemProps;
  MuiListItemAvatar: ListItemAvatarProps;
  MuiListItemIcon: ListItemIconProps;
  MuiListItemSecondaryAction: ListItemSecondaryActionProps;
  MuiListItemText: ListItemTextProps;
  MuiListSubheader: ListSubheaderProps;
  MuiMenu: MenuProps;
  MuiMenuItem: MenuItemProps;
  MuiMenuList: MenuListProps;
  MuiMobileStepper: MobileStepperProps;
  MuiModal: ModalProps;
  MuiNativeSelect: NativeSelectProps;
  MuiOutlinedInput: OutlinedInputProps;
  MuiPaper: PaperProps;
  MuiPopover: PopoverProps;
  MuiRadio: RadioProps;
  MuiRadioGroup: RadioGroupProps;
  MuiSelect: SelectProps;
  MuiSlider: SliderProps;
  MuiSnackbar: SnackbarProps;
  MuiSnackbarContent: SnackbarContentProps;
  MuiStep: StepProps;
  MuiStepButton: StepButtonProps;
  MuiStepConnector: StepConnectorProps;
  MuiStepContent: StepContentProps;
  MuiStepIcon: StepIconProps;
  MuiStepLabel: StepLabelProps;
  MuiStepper: StepperProps;
  MuiSvgIcon: SvgIconProps;
  MuiSwipeableDrawer: SwipeableDrawerProps;
  MuiSwitch: SwitchProps;
  MuiTab: TabProps;
  MuiTable: TableProps;
  MuiTableBody: TableBodyProps;
  MuiTableCell: TableCellProps;
  MuiTableContainer: TableContainerProps;
  MuiTableHead: TableHeadProps;
  MuiTablePagination: TablePaginationProps;
  MuiTableRow: TableRowProps;
  MuiTableSortLabel: TableSortLabelProps;
  MuiTabs: TabsProps;
  MuiTextField: TextFieldProps;
  MuiToolbar: ToolbarProps;
  MuiTooltip: TooltipProps;
  MuiTouchRipple: TouchRippleProps;
  MuiTypography: TypographyProps;
  MuiUseMediaQuery: useMediaQueryOptions;
  MuiWithWidth: WithWidthOptions;
}
```

### 型拡張の方法

例えば、下記のように `palette` のプロパティに `cyber` を追加しようとすると、エラーになる。

```ts
const baseTheme = createTheme({
    palette: {
      type: mode ? 'dark' : 'light',
      cyber: {
        main: '#001A1A',
        sub: '#021114',
        text: '#00F8F8',
        subText: '#00FF00'
      }
    },
  })
```

(エラー内容)
```ts
型 '{ type: "dark" | "light"; cyber: { main: string; sub: string; text: string; subText: string; }; }' を型 'PaletteOptions' に割り当てることはできません。
  オブジェクト リテラルは既知のプロパティのみ指定できます。'cyber' は型 'PaletteOptions' に存在しません。
```

**対応方法**  

1. `types/XXX.d.ts` を作成する。  

2. 上記ファイル内で下記のような記述を行い、型の拡張を行う。  

```ts
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
```


### レイアウト調整

`CssBaseline` は各ブラウザーの差異を平均化させる normalize.css のような役割を果たしてくれる。

```ts
import React from 'react'
import { CssBaseline, createTheme } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'

const Theme: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
};

export default Theme;
```

### makeStyles

makeStyles を利用してスタイルを割り当てることができる。  

- ネストによるスタイル指定
- props経由で動的にスタイル指定
- 画面幅に応じたスタイル変更

```ts
import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

type Props = {
  color: string
}

const useStyles = makeStyles<Theme, Props>((theme) => ({
  root: {
    // ネスト（入れ子）によるスタイル指定
    '& p': {
      // props経由で動的にスタイル指定
      color: (props) => props.color,
    },
  },
  button: {
    margin: '10px 30px',
    padding: theme.spacing(2),
    background: 'linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0.1))',

    // mediumサイズ以上の画面幅のときのスタイル指定
    [theme.breakpoints.up('md')]: {
      background: 'linear-gradient(#e66465, #9198e5)',
    },
  },
}))

const Child: FC<Props> = (props) => {
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <Button className={classes.button}>Click</Button>
      <p>Hello World.</p>
    </div>
  )
}

const Parent: React.FC = () => {
  return <Child color="#d32f2f" />
}

export default Parent
```

### 中央寄せ

Containerはコンテンツを中央寄せしたいときに活用できる。  

```ts
import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles'
import { CssBaseline, createTheme, Container, Card } from '@material-ui/core'

const theme = createTheme({
  palette: {
    primary: red,
    secondary: grey,
  },
})

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm">
        <Card />
      </Container>
    </ThemeProvider>
  )
}

export default App
```

### Grid

`Grid` はGridレイアウトを実装したいときに活用できる。  

```ts
import React from 'react'
import { styled } from '@mui/material/styles'
import { Box, Paper, Grid } from '@mui/material/Box'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

export default function BasicGrid() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Item>xs=8</Item>
        </Grid>
        <Grid item xs={4}>
          <Item>xs=4</Item>
        </Grid>
        <Grid item xs={4}>
          <Item>xs=4</Item>
        </Grid>
        <Grid item xs={8}>
          <Item>xs=8</Item>
        </Grid>
      </Grid>
    </Box>
  )
}
```
