const colors = {
  basePrimary: '#282D3C',
  accentPrimary: '#264E36',
  lightPrimary: '#FFF2EC',
  errorPrimary: '#BA3242',
  linkPrimary: '#d4ae7a',
};

const customTheme = {
  token: {
    colorPrimary: colors.basePrimary,
    colorSuccess: colors.accentPrimary,
    colorTextBase: colors.lightPrimary,
    colorWarning: colors.errorPrimary,
    colorLink: colors.linkPrimary,
    colorTextHeading: colors.basePrimary,
    fontFamily: 'Source Sans 3',
    fontSize: 16,
  },
  components: {
    Select: {
      selectorBg: colors.basePrimary,
      optionSelectedBg: colors.basePrimary,
      optionSelectedColor: colors.lightPrimary,
      optionActiveBg: colors.accentPrimary,
    }
  }
};

export default customTheme;