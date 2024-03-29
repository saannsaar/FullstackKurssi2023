import { Text as OriginalText , StyleSheet } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary,
  },
  colorPrimary: {
    color: theme.colors.primary,
  },
  colorGrey: {
    color: theme.colors.textGrey,
  },
  colorBlack: {
    color: theme.colors.textBlack,
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading,
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold,
  },
});

const Text = ({ color, fontSize, fontWeight, style, ...props }) => {

  const textStyle = [
    styles.text,
    color === 'textSecondary' && styles.colorTextSecondary,
    color === 'primary' && styles.colorPrimary,
    color === 'textGrey' && styles.colorGrey,
    color === 'textBlack' && styles.colorBlack,
    fontSize === 'subHeading' && styles.fontSizeSubheading,
    fontWeight === 'bold' && styles.fontWeightBold,

    style,
  ];

  return <OriginalText style={textStyle} {...props} />;
};

export default Text;