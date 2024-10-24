import axios from "axios";

async function getData(api , successAction , errorAction) {
   try {
      const response = await axios.get(api)

      if (successAction) {
        successAction(response.data)
      }
   } catch (error) {
    errorAction(error)
   }
}

export default getData;