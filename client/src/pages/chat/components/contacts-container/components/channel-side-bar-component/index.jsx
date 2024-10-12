  import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible";
  import { ChevronDown, ChevronRight, Plus } from "lucide-react";
  import { Button } from "@/components/ui/button";
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
  import { useState } from "react";
  
  const directMessages = [
    {
      id: 1,
      name: "Alice Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      status: "online",
    },
    {
      id: 2,
      name: "Bob Smith",
      avatar: "/placeholder.svg?height=32&width=32",
      status: "offline",
    },
    {
      id: 3,
      name: "Charlie Brown",
      avatar: "/placeholder.svg?height=32&width=32",
      status: "away",
    },
    {
        id: 1,
        name: "Alice Johnson",
        avatar: "/placeholder.svg?height=32&width=32",
        status: "online",
      },
      {
        id: 2,
        name: "Bob Smith",
        avatar: "/placeholder.svg?height=32&width=32",
        status: "offline",
      },
      {
        id: 3,
        name: "Charlie Brown",
        avatar: "/placeholder.svg?height=32&width=32",
        status: "away",
      },
  ];
  export default function Channels() {
    const [channelIsExpanded, setChannelIsExpanded] = useState(false);
    return (
      <div>
        <Collapsible open={channelIsExpanded} onOpenChange={setChannelIsExpanded}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-accent rounded-md">
            <div className="flex items-center">
              {channelIsExpanded ? (
                <ChevronDown className="h-4 w-4 mr-1 text-muted-foreground" />
              ) : (
                <ChevronRight className="h-4 w-4 mr-1 text-muted-foreground" />
              )}
              <span className="font-semibold text-base text-muted-foreground">Channels</span>
            </div>
            <Button size="sm" variant="ghost">
              <Plus className="h-4 w-4 text-muted-foreground" />
            </Button>
          </CollapsibleTrigger>
          <div >
          <CollapsibleContent>
            {directMessages.map((dm) => (
              <div
                key={dm.id}
                className="flex items-center gap-3 p-2 hover:bg-accent rounded-md ml-2"
              >
                <Avatar>
                  <AvatarImage src={dm.avatar} alt={dm.name} />
                  <AvatarFallback>
                    {dm.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <span>{dm.name}</span>
              </div>
            ))}
          </CollapsibleContent>
          </div>
        </Collapsible>
      </div>
    );
  }
  