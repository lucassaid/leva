import { createStyled } from '@stitches/react'
import { ITokensDefinition } from '@stitches/core'

const scales = {
  colors: {
    $gray900: '#181C20',
    $gray800: '#292D39',
    $gray700: '#373C4B',
    $grey600: '#535760',
    $gray500: '#8C92A4',
    $gray50: '#FEFEFE',
    $blue500: '#007BFF',
    $blue400: '#0066DC',
    $blue100: '#3C93FF',
  },
  radii: {
    $xs: '2px',
    $sm: '3px',
    $lg: '10px',
  },
}

export const getDefaultTheme = (): NonNullable<ITokensDefinition> => ({
  colors: {
    ...scales.colors,
    $elevation1: scales.colors.$gray800, // bg color of the root panel (main title bar)
    $elevation2: scales.colors.$gray900, // bg color of the rows (main panel color)
    $elevation3: scales.colors.$gray700, // bg color of the inputs
    $accent1: scales.colors.$blue400,
    $accent2: scales.colors.$blue500,
    $accent3: scales.colors.$blue100,
    $highlight1: scales.colors.$grey600,
    $highlight2: scales.colors.$gray500,
    $highlight3: scales.colors.$gray50,
  },
  radii: {
    ...scales.radii,
  },
  space: {
    $input: '8px',
    $folderV: '8px',
    $rowH: '10px',
    $rowV: '4px',
    $colGap: '4px',
  },
  fonts: {
    $mono: `ui-monospace, SFMono-Regular, Menlo, 'Roboto Mono', monospace`,
  },
  fontSizes: {
    $root: '11px',
  },
  sizes: {
    $rootWidth: '280px',
    $controlWidth: '160px',
    $scrubberWidth: '8px',
    $scrubberHeight: '16px',
    $rowHeight: '24px',
    $joystickWidth: '100px',
    $joystickHeight: '100px',
  },
  shadows: {
    $root: '0 0 9px 0 rgba(53,49,49,0.50);',
    $overlay: '0 4px 14px #00000033',
  },
  borderWidths: {
    $input: '1px',
    $root: '0px',
    $folder: '4px',
    $focus: '1px',
    $hover: '1px',
    $active: '1px',
  },
  fontWeights: {
    $highlight2: '600',
  },
  transitions: {
    $border: 'border-color 250ms ease',
    $bg: 'background-color 250ms ease',
    $borderBg: 'border-color, background-color 250ms ease',
  },
})

type Options = { key: string; borderColor: string; backgroundColor?: string; inset?: boolean }

function createStateClass(value: string, config: any, options: Options) {
  const [borderColor, bgColor] = value.split(' ')
  const css: any = {}
  if (borderColor !== 'none') {
    css.boxShadow = `${options.inset ? 'inset ' : ''}0 0 0 ${config.tokens.borderWidths[options.key]} ${
      (borderColor && borderColor !== 'default') || options.borderColor
    }`
  }

  if (bgColor) {
    css.backgroundColor = bgColor || options.backgroundColor
  }
  return css
}

const utils = {
  focusStyle: (value: any, config: any) => createStateClass(value, config, { key: '$focus', borderColor: '$accent2' }),
  hoverStyle: (value: any, config: any) =>
    createStateClass(value, config, { key: '$hover', borderColor: '$accent1', inset: true }),
  activeStyle: (value: any, config: any) =>
    createStateClass(value, config, { key: '$active', borderColor: '$accent1', inset: true }),
}

export const { styled, css } = createStyled({
  tokens: getDefaultTheme(),
  utils: {
    ...utils,
    focus: (value, config) => ({ ':focus': utils.focusStyle(value, config) }),
    focusWithin: (value, config) => ({ ':focus-within': utils.focusStyle(value, config) }),
    hover: (value, config) => ({ ':hover': utils.hoverStyle(value, config) }),
    active: (value, config) => ({ ':active': utils.activeStyle(value, config) }),
  },
})

export const globalStyles = css.global({
  '.leva__body__dragged': {
    userSelect: 'none',
    input: {
      userSelect: 'none',
    },
    '*': {
      cursor: 'ew-resize !important',
    },
  },
})
