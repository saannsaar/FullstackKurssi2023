import * as yup from 'yup';

const validationSchema = yup.object().shape({
    email: yup.string().email("Email must be a valid email!").required("Email is required!"),
    password: yup.string().min(5, "Password has to be at least 5 characters long!").max(15, "Password can't be longer than 15 characters!").required("Password required!")
})

export default validationSchema;