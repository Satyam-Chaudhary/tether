import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store";
import { X } from "lucide-react";
import { Paperclip, Smile, Send } from "lucide-react";
import ContactInfo from "../../contacts-container/components/ contacts-info";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function ChatHeader() {
  const { closeChat, selectChatData } = useAppStore();

  return (
    <div>
      <header className="border-b p-4 w-full flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <ContactInfo contact={selectChatData} />
        </div>
        <div className="w-18 mr-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full ring-secondary ring-1 focus:ring-primary bg-red-300 hover:bg-red-400"
                  onClick={closeChat}
                >
                  <span className="sr-only">Close Chat</span>
                  <X className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Close Chat</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </header>
    </div>
  );
}
