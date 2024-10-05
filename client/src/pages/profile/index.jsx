import { useAppStore } from "@/store";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { colorOptions, getInitials, getShadowClass } from "@/lib/utils";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";
import {
  ADD_PROFILE_IMAGE_ROUTE,
  DELETE_PROFILE_IMAGE_ROUTE,
  HOST,
  UPDATE_PROFILE_ROUTE,
} from "@/utils/constants";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useAppStore();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState(null);
  const [selectedColor, setSelectedColor] = useState(colorOptions[0].value);
  // const fileInputRef = useRef(null);

  useEffect(() => {
    if (userInfo.profileSetup) {
      setFirstName(userInfo.firstName);
      setLastName(userInfo.lastName);
      setSelectedColor(userInfo.color);
      if (userInfo.image) {
        setImage(`${HOST}/${userInfo.image}`);
      }
    }
  }, [userInfo]);

  

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

  const handleNavigate = () => {
    if (userInfo.profileSetup) {
      navigate("/chat");
    } else {
      toast.error("Please complete your profile setup before accessing chat");
    }
  };

  // const handleFileInputClick = async () => {
  //   fileInputRef.current.click(); // holds the reference to the file input element and triggers the click event
  // };

  const handleImageUpload = async (event) => {
    try {
      if (userInfo.image) {
        const response = await apiClient.delete(DELETE_PROFILE_IMAGE_ROUTE, {
          withCredentials: true,
        });
        if (response.status === 200) {
          setUserInfo({ ...userInfo, image: null });
          setImage(null);
        }
      }
    } catch (error) {
      console.log(error);
    }
    try {
      const file = event.target.files?.[0]; // Get the first file from the selected files array
      console.log(file);
      const formData = new FormData(); // Create a new FormData object
      formData.append("profile-image", file); // Append the file to the FormData object
      // console.log(formData);
      const response = await apiClient.put(ADD_PROFILE_IMAGE_ROUTE, formData, {
        withCredentials: true,
      });
      if (response.status === 200 && response.data.user) {
        console.log(response.data.user.image);
        const newImage = response.data.user.image;
        setUserInfo({ ...userInfo, image: newImage});
        console.log(userInfo);
        setImage(`${HOST}/${newImage}`);
        toast.success("Profile image updated successfully");
      }
    } catch (error) {
      console.log(error);
    }

    // not needed as useEffect will update the image state
    // const reader = new FileReader();
    // reader.onload = () => {
    //   setImage(reader.result);
    // };
    // reader.readAsDataURL(file);
  };

  const handleDeleteImage = async () => {
    try {
      const response = await apiClient.delete(DELETE_PROFILE_IMAGE_ROUTE, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setUserInfo({ ...userInfo, image: null });
        setImage(null);
        toast.success("Profile image deleted successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveChanges = async () => {
    if (validateProfile()) {
      try {
        const response = await apiClient.post(
          UPDATE_PROFILE_ROUTE,
          { firstName, lastName, color: selectedColor },
          { withCredentials: true }
        );

        if (response.status === 200 && response.data.user) {
          setUserInfo({ ...response.data.user });
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
      <div
        className={`max-w-3xl mx-auto bg-white rounded-lg p-6 min-w-80 shadow-lg ${getShadowClass(
          selectedColor
        )} lg:w-full`}
      >
        <header className="flex items-center mb-6">
          <Button
            variant="ghost"
            size="icon"
            className="mr-4"
            onClick={handleNavigate}
          >
            <ArrowLeft />
          </Button>
          <h1 className="text-2xl font-bold">Edit Profile</h1>
        </header>

        <div className="space-y-6">
          <div className="flex flex-col items-center">
            <div className="relative w-32 h-32 mb-4">
              <Avatar className="w-full h-full ring-2 ring-stone-400 drop-shadow-lg ">
                <AvatarImage src={image} alt="Profile" className="object-cover" />
                <AvatarFallback
                  className={`text-4xl ${selectedColor} text-white`}
                >
                  {getInitials(firstName, lastName, userInfo.email)}
                </AvatarFallback>
              </Avatar>
            </div>

            <Label htmlFor="image-upload" className="cursor-pointer">
              <Input
                id="image-upload"
                name="profile-image"
                type="file"
                accept="image/*" // Accept only image files to be uploaded .png, .jpg, .jpeg
                className="hidden"
                // ref={fileInputRef}
                //onChange={handleFileInputClick} // When the file input changes, the handleFileInputClick function is called
                onChange={handleImageUpload} // When the file input is clicked, the handleImageUpload function is called
              />
              <span className="text-sm font-medium text-blue-600 hover:underline">
                {image ? "Change profile picture" : "Upload profile picture"}
              </span>
              {image && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-700 block mx-auto"
                  onClick={handleDeleteImage}
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
