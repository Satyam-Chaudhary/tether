import { useAppStore } from "@/store"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { HOST } from "@/utils/constants";
import ContactsContainer from "./components/contacts-container";
import EmptyChatContainer from "./components/empty-chat-container";
import ChatContainer from "./components/chat-container";

const Chat = () => {

  const {userInfo} = useAppStore();
  const navigate = useNavigate();


  useEffect(() => {
    if(!userInfo.profileSetup){ // if profileSetup is false
      toast('Please complete your profile setup before accessing chat');
      console.log('INFO: Profile setup not completed');
      navigate('/profile');
    }
  }, [userInfo, navigate])

  return (
    <div className="flex h-[100vh] overflow-hidden">
      <ContactsContainer/>
      {/* <EmptyChatContainer/> */}
      <ChatContainer/>
    </div>
  )
}

export default Chat
