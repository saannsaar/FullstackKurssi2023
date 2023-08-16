import * as yup from 'yup';

const validationSchema = yup.object().shape({
    ownerName: yup.string().required("Owner name is required!"),
    repositoryName: yup.string().required("Repository name is required!"),
    rating: yup.number().min(0).max(100).required("Rating between 0 to 100 is required!")
})

export default validationSchema;