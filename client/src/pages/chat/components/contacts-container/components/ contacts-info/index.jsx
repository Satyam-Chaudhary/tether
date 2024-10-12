import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { HOST } from "@/utils/constants";


export default function ContactInfo({contact}) {
    const { firstName, lastName, email, color, image } = contact;
  return (
    <div className="flex items-center space-x-4 m-2 cursor-pointer">
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
      <p className="text-sm text-muted-foreground">{email}</p>
      {/* <p className="text-sm text-muted-foreground">Online</p> */}
    </div>
  </div>
  )
}
