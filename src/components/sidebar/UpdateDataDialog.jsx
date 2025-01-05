"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function UpdateDataDialog({ isOpen, onOpenChange }) {
  const [isEditable, setIsEditable] = useState(false);
  const [formData, setFormData] = useState({
    username: "johndoe",
    profilePic: null,
    firstName: "John",
    lastName: "Doe",
    phone: "123-456-7890",
    school: "Springfield High",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, profilePic: e.target.files[0] }));
  };

  const DialogOrDrawer = ({ children }) => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

    return isMobile ? (
      <Drawer open={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent className="max-h-[80vh] overflow-y-auto">
          <DrawerHeader>
            <DrawerTitle>Update Data</DrawerTitle>
            <DrawerDescription>
              Modify your profile information below. Click &quot;Save changes&quot; when you&apos;re done.
            </DrawerDescription>
          </DrawerHeader>
          {children}
          <DrawerClose />
        </DrawerContent>
      </Drawer>
    ) : (
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Update Data</DialogTitle>
            <DialogDescription>
              Modify your profile information below. Click &quot;Save changes&quot; when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <DialogOrDrawer>
      <div className="grid gap-4 py-4">
        {/* Username */}
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="username" className="text-right">
            Username
          </Label>
          <Input
            id="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="@username"
            className="col-span-3"
          />
        </div>

        {/* Profile Picture */}
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="profilePic" className="text-right">
            Profile Pic
          </Label>
          <Input
            id="profilePic"
            type="file"
            onChange={handleFileChange}
            className="col-span-3"
          />
        </div>

        {/* First Name */}
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="firstName" className="text-right">
            First Name
          </Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder="Enter your first name"
            className={`col-span-3 ${!isEditable && "bg-gray-200 cursor-not-allowed"}`}
            readOnly={!isEditable}
          />
        </div>

        {/* Last Name */}
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="lastName" className="text-right">
            Last Name
          </Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder="Enter your last name"
            className={`col-span-3 ${!isEditable && "bg-gray-200 cursor-not-allowed"}`}
            readOnly={!isEditable}
          />
        </div>

        {/* Phone */}
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="phone" className="text-right">
            Phone
          </Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Enter your phone number"
            className={`col-span-3 ${!isEditable && "bg-gray-200 cursor-not-allowed"}`}
            readOnly={!isEditable}
          />
        </div>

        {/* School */}
        {formData.school !== null && (
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="school" className="text-right">
              School
            </Label>
            <Input
              id="school"
              value={formData.school}
              readOnly
              className="col-span-3 bg-gray-200 cursor-not-allowed"
            />
          </div>
        )}
      </div>
      <DialogFooter>
        <Button onClick={() => setIsEditable(!isEditable)}>
          {isEditable ? "Lock Editing" : "Unlock Editing"}
        </Button>
        <Button type="submit">Save changes</Button>
      </DialogFooter>
    </DialogOrDrawer>
  );
}
