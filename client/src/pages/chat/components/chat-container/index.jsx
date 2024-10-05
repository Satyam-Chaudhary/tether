import ChatHeader from "./chat-header";
import MessageBar from "./message-bar";
import MessageContainer from "./message-container";

export default function ChatContainer() {
  return (
    <div className="flex flex-col w-full">
      <ChatHeader/>
      <MessageContainer/>
      <MessageBar/>
    </div>
  )
}
