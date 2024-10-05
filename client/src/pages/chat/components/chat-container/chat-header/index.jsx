import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
export default function ChatHeader() {
  return (
    <div>
      <header className="border-b p-4 w-full flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="" alt="Contact" />
            <AvatarFallback>C</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold">Contact Name</h2>
            <p className="text-sm text-muted-foreground">Online</p>
          </div>
        </div>
        <div className="w-18 mr-18">
          <Button variant="ghost" size="icon" className="rounded-full ring-secondary ring-1 focus:ring-primary">
            {/* <div className="flex space-x-1 items-center ">
              <p>Close Chat</p> */}
              <X />
            {/* </div> */}
          </Button>
        </div>
      </header>
    </div>
  );
}
