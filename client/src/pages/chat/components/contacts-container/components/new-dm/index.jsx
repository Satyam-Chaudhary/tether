import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CloudCog, Contact, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import Lottie from "lottie-react";
import animationData from "@/assets/lottieAnimations/searchProfile";
import noResultAnimation from "@/assets/lottieAnimations/noResult";
import { apiClient } from "@/lib/api-client";
import { SEARCH_CONTACT_ROUTE } from "@/utils/constants";
import { debounce } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import ContactInfo from "../ contacts-info";
import { Separator } from "@/components/ui/separator";
import { useAppStore } from "@/store";

export default function NewDm() {
  const { setSelectedChatType, setSelecedChatData } = useAppStore();
  const [isOpen, setIsOpen] = useState(false); // state to control the dialog
  const [searchedContacts, setSearchedContacts] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const searchContacts = async (searchTerm) => {
    try {
      if (searchTerm.length > 0) {
        const response = await apiClient.post(
          SEARCH_CONTACT_ROUTE,
          { searchTerm },
          { withCredentials: true }
        );
        if (response.status === 200 && response.data.contacts) {
          setHasSearched(true);
          setSearchedContacts(response.data.contacts);
        }
      } else {
        setSearchedContacts([]);
        setHasSearched(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const debouncedSearch = debounce(searchContacts, 300);

  const selectNewContact = (contact) => {
    setIsOpen(false);
    setSearchedContacts([]);
    setHasSearched(false);
    setSelectedChatType("contact");
    setSelecedChatData(contact);
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start hover:bg-background/65"
            onClick={() => setIsOpen(true)}
          >
            <Search className="mr-2 h-4 w-4 text-muted-foreground" />
            Find or start a conversation
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-[90vw] w-[450px] h-[450px] p-4 sm:p-6 md:p-8 rounded-lg flex flex-col">
          <DialogHeader className="items-center">
            <DialogTitle>Search Profile</DialogTitle>
          </DialogHeader>

          <div>
            <Input
              className="bg-background rounded-lg mt-2"
              placeholder="Enter a name or email"
              onChange={(e) => debouncedSearch(e.target.value)}
            />
          </div>

          {/* Conditionally render the ScrollArea or Lottie animations */}
          {searchedContacts.length > 0 ? (
            <ScrollArea className="h-[280px] overflow-y-auto rounded-md p-4">
              {searchedContacts.map((contact) => (
                <div key={contact.id} onClick={() => selectNewContact(contact)}>
                  <ContactInfo contact={contact} />
                  <Separator className="my-2 border" />
                </div>
              ))}
            </ScrollArea>
          ) : (
            <div className="flex-1 h-56 flex items-center justify-center">
              {!hasSearched ? (
                <Lottie
                  isClickToPauseDisabled={true}
                  className="h-56 w-full"
                  animationData={animationData}
                />
              ) : (
                <div className="flex flex-col items-center">
                  <Lottie
                    isClickToPauseDisabled={true}
                    className="h-56 w-full"
                    animationData={noResultAnimation}
                  />
                  <p className="text-xl text-center">No Profile Found</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
