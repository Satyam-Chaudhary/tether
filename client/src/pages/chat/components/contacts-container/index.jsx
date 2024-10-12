import React from "react";
import Logo from "@/Logo";
import ProfileInfo from "./components/profile-info";
import NewDm from "./components/new-dm";
import Contacts from "./components/contacts-side-bar-component";
import Channels from "./components/channel-side-bar-component";
import { Separator } from "@/components/ui/separator";

export default function ContactsContainer() {
  return (
      <div className="h-screen md:w-[35vw] lg:w-[30vw] xl:w-[18vw] max-sm:w-[100vw] bg-secondary border flex flex-col relative z-10"> {/* Added relative z-10 here */}
        <div className="p-4">
          <Logo />
        </div>
        <div className="p-4">
          <div className="relative">
            <NewDm />
          </div>
        </div>
        <nav>
          <Contacts />
        </nav>
        <Separator className="my-2 bg-foreground/30 w-auto mx-2 rounded-xl" />
        <nav className="flex-1 overflow-y-auto">
          <Channels />
        </nav>
        <div className="p-3 border-t h-20">
          <ProfileInfo />
        </div>
      </div>
  );
}
