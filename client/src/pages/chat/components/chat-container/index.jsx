import ChatHeader from "./chat-header";
import MessageBar from "./message-bar";
import MessageContainer from "./message-container";

export default function ChatContainer() {
  return (
    <div className="flex flex-col w-[100vw] h-[100vh] fixed sm:static sm:flex-1 z-20 bg-background" >
      <ChatHeader/>
      <MessageContainer/>
      <MessageBar/>
    </div>
  )
}
