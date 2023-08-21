import { Button, View, StyleSheet, Pressable } from "react-native";
import FormikTextInput from "./FormikTextInput"
import { Formik } from 'formik';
import validationSchema from "../validations/SigninvalidationSchema";
import useLogin from "../hooks/useLogin";
import { useNavigate } from "react-router-native";

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
    console.log("HEIs")
    const [logIn] = useLogin();
    
    const navigate = useNavigate();
    console.log("login")
    const onSubmit = async (values) => {
        
       console.log("HEI")
        const { username, password } = values;
        console.log("LOGIN front");
        console.log(values)
       
        
        try {
            await logIn({ username, password });
            navigate('/');
           
        } catch(error) {
            console.log("ERROR frontista: ", error);
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
};

export const SignInFormContainer = ({ onSubmit }) => {
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