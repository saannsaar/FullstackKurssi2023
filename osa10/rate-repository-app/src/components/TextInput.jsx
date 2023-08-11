import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    error: {
        borderBlockColor: '#e6221c'
    },
    inputStyle: {
        borderColor: '#8cc8d1',
        borderRadius: 6,
        borderWidth: 1,
        padding: 10,
        marginTop: 10,
        marginBottom: 10,

    }
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [styles.inputStyle, style, error && styles.error];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;