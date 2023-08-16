import Text from "./Text"
import { View } from "react-native";
import validationSchema from "../validations/ReviewvalidationSchema";
import useCreateReview from "../hooks/useCreateReview";
import { useNavigate } from "react-router-native";
import { StyleSheet } from "react-native";
import FormikTextInput from "../components/FormikTextInput";
import { Formik } from "formik";
import { Button } from "react-native";
const initialValues= {
    ownerName: '',
    repositoryName: '',
    rating: 0,
    text: '',
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

const CreateReview = () => {


    const [createReview] = useCreateReview();

    const navigate = useNavigate();

    const onSubmit = async ( values ) => {
        const { ownerName, repositoryName, rating, text } = values;

        try {
            const { createReview: { repositoryId } } = await createReview({ ownerName, repositoryName, rating: Number(rating), text});
            navigate(`/repositories/${repositoryId}`);
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={onSubmit}>
        {({ handleSubmit }) => (
            <View style={styles.formContainer}>
                <FormikTextInput name={'ownerName'} placeholder='Repository owner name'/>
                <FormikTextInput name={'repositoryName'} placeholder='Repository name' />
                <FormikTextInput name={'rating'} placeholder='Rating between 0 and 100' />
                <FormikTextInput name={'text'} placeholder='Review' />
                <Button color='#68bdc4' width='50%' onPress={handleSubmit} title='Create a review'/>
            </View>
        )}
    </Formik>
    )
}

export default CreateReview;