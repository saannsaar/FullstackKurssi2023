import React from 'react';
import theme from '../theme';
import { Text as NativeText, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  text: {
    color: theme.colors.titleColor,
    fontSize: theme.fontSizes.navbarTitle,
    fontFamily: theme.fonts.title,
    fontWeight: theme.fontWeights.normal,
  },
 
});

const Title = ({ style, ...props }) => {
  const titleStyle = [styles.text, style];

  return <NativeText style={titleStyle} {...props} />;
};

export default Title;