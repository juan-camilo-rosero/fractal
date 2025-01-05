"use client";

import { useState, useEffect, useContext } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getDocument, updateDocument } from "@/lib/db_functions";
import { UserContext } from "@/context/UserContext";

export default function UpdateDataDialog({ isOpen, onOpenChange }) {
  // States separated for each field
  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState(""); // Phone number without dashes
  const [school, setSchool] = useState("");

  const [errors, setErrors] = useState({});
  const [isEditable, setIsEditable] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false); // New state to manage the update process
  const [updateError, setUpdateError] = useState(""); // State for error message

  const { email } = useContext(UserContext);

  // Synchronize the states when the dialog is open
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await getDocument("users", email);
        setUsername(res.username);
        setProfilePic(res.profilePic);
        setFirstName(res.firstName);
        setLastName(res.lastName);
        setPhone(res.phone);
        setSchool(res.school);
        setUpdateError("");
      } catch (err) {
        console.error("An error occurred trying to get the data: " + err);
        setUpdateError("Error fetching data. Please try again later.");
      }
    };
    if (isOpen) {
      getData();
    }
  }, [isOpen, email]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    switch (id) {
      case "username":
        setUsername(value);
        break;
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "phone":
        // Ensure the phone contains only numbers
        setPhone(value.replace(/\D/g, "")); // Remove any non-numeric characters
        break;
      default:
        break;
    }
  };

  const handleSaveChanges = async () => {
    if (validateFormData()) {
      setIsUpdating(true); // Start the update process
      setUpdateError(""); // Clear error message
      try {
        const res = await updateDocument("users", email, {
          username,
          firstName,
          lastName,
          phone,
        });
        // If the update is successful, close the dialog
        onOpenChange(false);
      } catch (err) {
        console.error("An error occurred trying to update the data");
        setUpdateError(
          "An error occurred while updating the data. Please try again."
        ); // Show error message
      } finally {
        setIsUpdating(false); // End the update process
      }
    }
  };

  const validateFormData = () => {
    const newErrors = {};
    if (!username || username.length < 3) {
      newErrors.username = "Username must be at least 3 characters.";
    }
    if (!firstName) {
      newErrors.firstName = "First name is required.";
    }
    if (!lastName) {
      newErrors.lastName = "Last name is required.";
    }
    // Validate phone number without dashes
    if (!phone || phone.length !== 10 || !/^\d{10}$/.test(phone)) {
      newErrors.phone = "Phone must be exactly 10 digits (no dashes).";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Update Data</DialogTitle>
          <DialogDescription>
            Modify your profile information below. Click &quot;Save changes&quot; when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              value={username}
              onChange={handleInputChange}
              placeholder="@username"
              className="col-span-3"
            />
            {errors.username && (
              <p className="text-red-500 col-span-4">{errors.username}</p>
            )}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="firstName" className="text-right">
              First Name
            </Label>
            <Input
              id="firstName"
              value={firstName}
              onChange={handleInputChange}
              placeholder="Enter your first name"
              className={`col-span-3 ${
                !isEditable && "bg-gray-200 cursor-not-allowed"
              }`}
              readOnly={!isEditable}
            />
            {errors.firstName && (
              <p className="text-red-500 col-span-4">{errors.firstName}</p>
            )}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="lastName" className="text-right">
              Last Name
            </Label>
            <Input
              id="lastName"
              value={lastName}
              onChange={handleInputChange}
              placeholder="Enter your last name"
              className={`col-span-3 ${
                !isEditable && "bg-gray-200 cursor-not-allowed"
              }`}
              readOnly={!isEditable}
            />
            {errors.lastName && (
              <p className="text-red-500 col-span-4">{errors.lastName}</p>
            )}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">
              Phone
            </Label>
            <Input
              id="phone"
              value={phone}
              onChange={handleInputChange}
              placeholder="Enter your phone number"
              className={`col-span-3 ${
                !isEditable && "bg-gray-200 cursor-not-allowed"
              }`}
              readOnly={!isEditable}
            />
            {errors.phone && (
              <p className="text-red-500 col-span-4">{errors.phone}</p>
            )}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="school" className="text-right">
              School
            </Label>
            <Input
              id="school"
              value={school}
              readOnly
              className="col-span-3 bg-gray-200 cursor-not-allowed"
            />
          </div>
          {updateError && (
            <p className="text-red-500 col-span-4">{updateError}</p>
          )}
        </div>
        <DialogFooter>
          <Button onClick={() => setIsEditable(!isEditable)}>
            {isEditable ? "Lock Editing" : "Unlock Editing"}
          </Button>
          <Button
            onClick={handleSaveChanges}
            disabled={isUpdating}
            style={{
              cursor: isUpdating ? "default" : "pointer",
              opacity: isUpdating ? 0.5 : 1,
            }}
          >
            {isUpdating ? "Updating..." : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
