import animationData from '@/assets/lottieAnimations/emptyChat';
import { useAppStore } from '@/store';
import Lottie from "lottie-react";

export default function EmptyChatContainer() {
  const {userInfo} = useAppStore();
  return (
    <div className="flex-1 md:flex flex-col justify-center items-center hidden duration-1000 transition-all bg-background">
      <div className="flex  justify-center items-center h-64 w-64">
        <Lottie
          isClickToPauseDisabled={true}
          className='h-full w-full'
          animationData={animationData}
        />
      </div>
      <div className="text-2xl text-gray-500 poppins-medium"><span>Hi! </span><span className= "text-purple-800">{`${userInfo.firstName} ${userInfo.lastName} `}</span><span>Welcome to Tether </span>
      </div>
      
    </div>
  )
}
