import { HOST, LOGOUT_ROUTE } from "@/utils/constants";
import { getInitials } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store";
import { LogOut, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { apiClient } from "@/lib/api-client";
import { toast } from "sonner";



export default function ProfileInfo() {
  const { userInfo, setUserInfo } = useAppStore();
  const { firstName, lastName, email, color, image } = userInfo;
  const navigate = useNavigate();

  const handleLogOut = async() => {
    try{
      const response = await apiClient.get(LOGOUT_ROUTE, {withCredentials:true});
      if(response.status === 200){
        navigate('/auth');
        setUserInfo(null);
        toast.success('Logged out successfully');
      };
  
    }catch(error){
      console.log(error)
    }
  };

  return (
    <div className="flex items-center justify-between space-x-2">
      <div className="flex items-center space-x-2">
        <Avatar>
          <AvatarImage
            src={`${HOST}/${image}`}
            alt="User"
            className="object-cover"
          />
          <AvatarFallback
            className={`text-xl ${color} object-contain ring-2 ring-stone-400 drop-shadow-lg text-white`}
          >
            {getInitials(firstName, lastName, email)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="font-semibold">{firstName + " " + lastName}</h2>
          <p className="text-sm text-muted-foreground">Online</p>
        </div>
      </div>
      <div className="flex">
      <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground"
                onClick={()=>{navigate('/profile')}}
              >
                <Pencil className="h-5 w-5" />
                <span className="sr-only">Edit Profile</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit Profile</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>


        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground"
                onClick={handleLogOut}
              >
                <LogOut className="h-5 w-5 text-red-400 hover:text-red-600" />
                <span className="sr-only">LogOut</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>LogOut</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
