import axios from "axios";

async function deleteData(api , successAction , errorAction) {
  try {
    const response = await axios.delete(api)
    successAction(response.data)
  } catch (error) {
    errorAction(error)
  }
}

export default deleteData;