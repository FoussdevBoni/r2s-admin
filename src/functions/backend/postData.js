import axios from "axios";

export async function  postData(api , input , successAction , errorAction ) {
    try {
        const response = await  axios.post(api , input)
        const data = response.data
        if (successAction) {
            successAction(data)
        }
    } catch (error) {
        errorAction(error)
    }
}

export default postData;