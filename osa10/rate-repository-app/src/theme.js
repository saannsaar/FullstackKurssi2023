import { Platform } from "react-native";

const theme = {
    colors: {
      textPrimary: '#24292e',
      textSecondary: '#586089',
      primary: '#0366d6',
      appBarBack: '#24292e',
      titleColor: '#FFFFFF'
    },
    fontSizes: {
      body: 14,
      subheading: 16,
      navbarTitle: 26,
    },
    fonts: Platform.select({
      default: 'System',
      anroid: 'Roboto',
      ios: 'Arial',
    }),
    fontWeights: {
      normal: '400',
      bold: '700',
    },
  };
  
  export default theme;