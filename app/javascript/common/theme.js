// Single source of truth for the app's green-on-cream palette.
export const COLORS = {
  green: '#1F7A53',
  greenSoft: '#E6F1EA',
  red: '#B42318',
  redSoft: '#FEE4E2',
  redMedium: '#E5484D',
  amber: '#B54708',
  amberSoft: '#FFF4E5',
  cream: '#FAF6EC',
  creamRaised: '#FFFDF7',
  white: '#FFFFFF',
  black: '#000000',
}

export const AVATAR_COLORS = ['#1F7A53', '#0F6E6E', '#2A5DA8', '#6D4AA6', '#8A5A1E', '#A33A5B', '#44546A']

export const avatarColorFor = (id) => {
  const value = String(id)
  let sum = value.length

  for (let index = 0; index < value.length; index += 1) {
    sum += value.charCodeAt(index)
  }

  return AVATAR_COLORS[sum % AVATAR_COLORS.length]
}

export const STATUS_STYLES = {
  active: { color: COLORS.green, background: COLORS.greenSoft, borderColor: COLORS.green },
  inactive: { color: COLORS.red, background: COLORS.redSoft, borderColor: COLORS.red },
  invited: { color: COLORS.amber, background: COLORS.amberSoft, borderColor: COLORS.amber },
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
