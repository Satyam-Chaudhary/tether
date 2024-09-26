import { useAppStore } from "@/store"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

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
    <div>
      Chat: {userInfo.firstName}
      {console.log(userInfo)}
    </div>
  )
}

export default Chat
