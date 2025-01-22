import axios from "axios";
import botResponses from "./botResponses";

const getBotResponse = async (userMessage) => {
  const apiToken = process.env.WIT_AI_TOKEN; // Use an environment variable to store the token
  const endpoint = `https://api.wit.ai/message?q=${encodeURIComponent(userMessage)}`;

    const response = await axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    });

    const { data } = response;
    const { intents } = data;
    const [firstIntent] = intents || [];

    const responseText = botResponses[firstIntent?.name] || "I'm sorry, I didn't understand that. Can you please rephrase?";

    return responseText;
  };
 
  export default getBotResponse;