// Single source of truth for the app's green-on-cream palette.
export const COLORS = {
  green: '#1F7A53',
  greenSoft: '#E6F1EA',
  red: '#B42318',
  redSoft: '#FEE4E2',
  cream: '#FAF6EC',
  creamRaised: '#FFFDF7',
  white: '#FFFFFF',
  black: '#000000',
}

export const AVATAR_COLORS = ['#1F7A53', '#0F6E6E', '#2A5DA8', '#6D4AA6', '#8A5A1E', '#A33A5B', '#44546A']

export const STATUS_STYLES = {
  active: { color: COLORS.green, background: COLORS.greenSoft, borderColor: COLORS.green },
  inactive: { color: COLORS.red, background: COLORS.redSoft, borderColor: COLORS.red },
}

const theme = {
  token: {
    colorPrimary: COLORS.green,
    colorInfo: COLORS.green,
    colorLink: COLORS.green,
    colorBgLayout: COLORS.cream,
    colorBgContainer: COLORS.white,
    borderRadius: 8,
  },
  components: {
    Layout: {
      bodyBg: COLORS.cream,
      headerBg: COLORS.creamRaised,
      lightSiderBg: COLORS.creamRaised,
    },
    Menu: {
      itemBg: 'transparent',
      itemSelectedBg: COLORS.greenSoft,
      itemSelectedColor: COLORS.green,
      itemActiveBg: COLORS.greenSoft,
    },
  },
}

export default theme
