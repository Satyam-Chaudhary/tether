'use client'

import React, { useState } from 'react'
import { Search, Menu, X, MessageSquare, Phone, Video, MoreVertical } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const contacts = [
  { id: 1, name: 'Alice Johnson', status: 'online', avatar: '/placeholder.svg?height=40&width=40' },
  { id: 2, name: 'Bob Smith', status: 'offline', avatar: '/placeholder.svg?height=40&width=40' },
  { id: 3, name: 'Charlie Brown', status: 'away', avatar: '/placeholder.svg?height=40&width=40' },
  { id: 4, name: 'Diana Prince', status: 'online', avatar: '/placeholder.svg?height=40&width=40' },
  { id: 5, name: 'Ethan Hunt', status: 'offline', avatar: '/placeholder.svg?height=40&width=40' },
]

export function ContactSidebarComponent() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    (<div className="relative h-screen">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 lg:hidden z-50"
        onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>
      <aside
        className={`
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 transition-transform duration-300 ease-in-out
          fixed lg:static top-0 left-0 h-full w-64 bg-background border-r
          flex flex-col z-40
        `}>
        <div className="p-4 border-b">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
              <AvatarFallback>UN</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold">User Name</h2>
              <p className="text-sm text-muted-foreground">Online</p>
            </div>
          </div>
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
                    <p className="text-sm font-medium truncate">{contact.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">{contact.status}</p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t">
          <div className="flex justify-around">
            <Button variant="ghost" size="icon">
              <MessageSquare className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Phone className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Video className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </aside>
    </div>)
  );
}