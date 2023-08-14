import { Button, View, StyleSheet, Pressable } from "react-native";
import FormikTextInput from "./FormikTextInput"
import { Formik } from 'formik';
import validationSchema from "../validations/SigninvalidationSchema";
import useLogin from "../hooks/useLogin";


const initialValues= {
    username: '',
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
    const [logIn, result] = useLogin();

    const onSubmit = async (values) => {
        
        console.log("LOGIN");
        const { username, password } = values;
    
        try {
            const { data } = await logIn({ username, password });
            console.log(data);
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={onSubmit}>
            {({ handleSubmit }) => (
                <View style={styles.formContainer}>
                    <FormikTextInput name={'username'} placeholder='Username'/>
                    <FormikTextInput name={'password'} placeholder='Password' secureTextEntry/>
                    <Button color='#68bdc4' width='50%' onPress={handleSubmit} title='Sign in!'/>
                    
                </View>
            )}
        </Formik>
    )
}

export default SignInForm;