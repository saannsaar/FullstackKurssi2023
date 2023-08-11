import { Button, View, StyleSheet } from "react-native";
import FormikTextInput from "./FormikTextInput"
import { Formik } from 'formik';
import validationSchema from "../validations/SigninvalidationSchema";

const initialValues= {
    email: '',
    password: '',
}
const styles = StyleSheet.create({
    
    formContainer: {
        backgroundColor: '#f0fbfc',
        borderColor: '#f0fbfc',
        borderRadius: 10,
        borderWidth: 1,
        padding: 10,
        margin: 10,
    },
   
});

const SignInForm = () => {
    return (
        <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={(values) => console.log(values)}>
            {({ handleSubmit }) => (
                <View style={styles.formContainer}>
                    <FormikTextInput name={'email'} placeholder='Email'/>
                    <FormikTextInput name={'password'} placeholder='Password' secureTextEntry/>
                    <Button color='#68bdc4' width='50%' onPress={handleSubmit} title='Sign in!'/>
                </View>
            )}
        </Formik>
    )
}

export default SignInForm;