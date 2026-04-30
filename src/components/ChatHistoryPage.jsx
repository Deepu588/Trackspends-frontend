import { useEffect, useState } from "react";
import { getChatHistory } from '../components/child/sendMessage'
import Breadcrumb from "./child/BreadCrumb";

const ChatHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await getChatHistory();
      setHistory(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  return (

    <>
    <Breadcrumb title='Chat History'/>
    <div className="chat-container">
     
      <div className="messages">
        {history.map((item) => (
          <div key={item.insightId} className="history-block">
            
            <div className="message user">
              {item.userQuery}
            </div>

            <div className="message ai">
              {item.aiResponse}
            </div>

            <div className="timestamp">
              {new Date(item.createdAt).toLocaleString()}
            </div>

          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default ChatHistory;