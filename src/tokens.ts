/** Single source of truth for all design tokens */
export const T = {
  bg:     '#09090D',
  surf:   '#111117',
  line:   'rgba(255,255,255,0.07)',
  dim:    'rgba(255,255,255,0.03)',
  hi:     '#C4A9FF',           // single accent — soft lavender-violet
  hiGlow: 'rgba(196,169,255,0.18)',
  text:   '#EDEAF4',
  muted:  '#66636F',
  faint:  '#3A3842',
} as const

export type Token = typeof T
