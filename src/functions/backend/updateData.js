import axios from "axios";

async function updateData(api , newInput , successAction , errorAction) {
  try {
    const response = await axios.put(api , newInput)
    successAction(response.data)

  } catch (error) {
    errorAction(error)
  }
}

export default updateData;