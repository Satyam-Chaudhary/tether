import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Logo from "@/Logo";
import ProfileInfo from "./components/profile-info/ProfileInfo";

const contacts = [
  {
    id: 1,
    name: "Alice Johnson",
    status: "online",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Bob Smith",
    status: "offline",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Charlie Brown",
    status: "away",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "Diana Prince",
    status: "online",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    name: "Ethan Hunt",
    status: "offline",
    avatar: "/placeholder.svg?height=40&width=40",
  },
];

export default function ContactsContainer() {
  return (
    <div className="">
      <aside className="h-screen xl:w-80 w-64 max-sm:w-[100vw] bg-secondary border flex flex-col ">
        <div className="p-4">
          <Logo />
        </div>
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search contacts" className="pl-8" />
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto">
          <ul>
            {contacts.map((contact) => (
              <li key={contact.id} className="px-4 py-2 hover:bg-muted">
                <a href="#" className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={contact.avatar} alt={contact.name} />
                    <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {contact.name}
                    </p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {contact.status}
                    </p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-3 border-t h-20">
          <ProfileInfo />
        </div>
      </aside>
    </div>
  );
}
