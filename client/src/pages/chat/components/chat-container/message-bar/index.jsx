import React, { useState } from 'react'
import { Paperclip, Smile, Send } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function MessageBar() {
  const [message, setMessage] = useState('');
  const handleSendMessage = async () => {
    // console.log(message);
  };

  return (
    <div className="bg-background border-t h-20">
    <div className='mx-8'>
      <div className="max-w-4xl mx-auto">
        <footer className="pb-4 pt-3">
          <div className="flex items-center space-x-2 bg-muted rounded-2xl border p-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                    <Paperclip className="h-5 w-5" />
                    <span className="sr-only">Attach file</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Attach file</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <input 
              className="flex-1 bg-transparent border-none focus:outline-none text-sm"
              placeholder="Type a message..."
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                    <Smile className="h-5 w-5" />
                    <span className="sr-only">Add emoji</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Add emoji</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button type="submit" size="icon" variant="ghost" className="text-primary hover:text-primary-foreground hover:bg-primary" onClick = {handleSendMessage}>
                    <Send className="h-5 w-5" />
                    <span className="sr-only">Send message</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Send message</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </footer>
      </div>
      </div>
    </div>
  )
}