import { StyleSheet, View } from "react-native";
import validationSchema from "../validations/SignUpValidationSchema";
import useSignUp from "../hooks/useSignUp";
import { useNavigate } from "react-router-native";
import useLogin from "../hooks/useLogin";
import FormikTextInput from "./FormikTextInput";
import { Formik } from "formik";
import { Button } from "react-native";

const initialValues= {
    username: '',
    password: '',
    passwordComfirmation: '',
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


const SignUpForm = () => {

    const [signup] = useSignUp();
    const [logIn] = useLogin();
    const navigate = useNavigate();

    const onSubmit = async (values) => {
        const { username, password } = values;

        console.log(values);

        try {
            await signup({ username, password });
            await logIn({ username, password });
            navigate('/');
        } catch(error) {
            console.log("ERROR SIGNUPFORMISTA", error);
        }
    }

    return (
        <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={onSubmit}>
            {({handleSubmit}) => (
                <View>
                    <FormikTextInput name={'username'} placeholder='Username'/>
                    <FormikTextInput name={'password'} placeholder='Password' secureTextEntry/>
                    <FormikTextInput name={'passwordComfirmation'} placeholder='Password comfirmation' secureTextEntry/>
                    <Button color='#68bdc4' width='50%' onPress={handleSubmit} title='Sign up!'/>
                </View>
            )}
        </Formik>
    )
}

export default SignUpForm;