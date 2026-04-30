import { ASK_AI, GET_AI_HISTORY } from "../../api-routes";
import api from "../../Api";

export const sendMessage = async (question) => {
  const res = await api.post(`${ASK_AI}`, 
   
   
        {userQuestion: question},
    
  );
  console.log(res)
  console.log(res.data)
  return res.data;
};

export const getChatHistory = async () => {
  const res = await api.get(`${GET_AI_HISTORY}`);
   console.log(res)
  return res.data;
};