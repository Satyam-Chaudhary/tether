import { useAppStore } from "@/store";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { colorOptions } from "@/lib/utils";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";
import { UPDATE_PROFILE_ROUTE } from "@/utils/constants";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useAppStore();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState(null);
  const [selectedColor, setSelectedColor] = useState(colorOptions[0].value);

  const getInitials = () => {
    if (firstName) {
      return (
        firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase()
      );
    } else if (userInfo.email) {
      return userInfo.email.charAt(0).toUpperCase();
    }
    return "X";
  };

  const validateProfile = () => {
    if (!firstName) {
      toast.error("First Name is required");
      return false;
    }
    if (!lastName) {
      toast.error("Last Name is required");
      return false;
    }
    return true;
  };

  const saveChanges = async () => {
    if (validateProfile()) {
      try {
        const response = await apiClient.post(
          UPDATE_PROFILE_ROUTE,
          { firstName, lastName, color: selectedColor },
          { withCredentials: true }
        );

        if(response.status === 200 && response.data.user){
          setUserInfo({...response.data.user});
          toast.success("Profile updated successfully");
          navigate("/chat");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8 flex items-center">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6 min-w-80">
        <header className="flex items-center mb-6">
          <Button variant="ghost" size="icon" className="mr-4">
            <ArrowLeft />
          </Button>
          <h1 className="text-2xl font-bold">Edit Profile</h1>
        </header>

        <div className="space-y-6">
          <div className="flex flex-col items-center">
            <div className="relative w-32 h-32 mb-4">
              <Avatar className="w-full h-full">
                <AvatarImage src={image} alt="Profile" />
                <AvatarFallback
                  className={`text-4xl ${selectedColor} text-white`}
                >
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
            </div>

            <Label htmlFor="image-upload" className="cursor-pointer">
              <Input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                // onChange={handleImageUpload}
              />
              <span className="text-sm font-medium text-blue-600 hover:underline">
                {image ? "Change profile picture" : "Upload profile picture"}
              </span>
              {image && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRemoveImage}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove Image
                </Button>
              )}
            </Label>
            <div>
              {!image && (
                <div className="mt-4">
                  <Label htmlFor="color-select">Select background color</Label>
                  <div className="flex space-x-2 mt-2">
                    {colorOptions.map((option) => (
                      <button
                        key={option.value}
                        className={`w-8 h-8 rounded-full ${option.value} ${
                          selectedColor === option.value
                            ? "ring-2 ring-offset-1 ring-blue-500"
                            : ""
                        }`}
                        onClick={() => setSelectedColor(option.value)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" disabled value={userInfo.email} />
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First Name</Label>
                <Input
                  id="first-name"
                  placeholder="Enter your first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last Name</Label>
                <Input
                  id="last-name"
                  placeholder="Enter your last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <Button onClick={saveChanges} className="w-full sm:w-auto">
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
