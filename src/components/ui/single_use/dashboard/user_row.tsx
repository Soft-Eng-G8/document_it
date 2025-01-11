"use client";
import React, { useState, useMemo } from "react";
import { Button } from "../../multiple_uses/button";

interface UserProps {
  title: string;
  imageUrl?: string;
  email: string;
  roles: string[];
  onRemove: (email: string) => void; // Add the onRemove prop
}

const roleColors: Record<string, string> = {
  admin: "#FF5733",
  contributor: "#3357FF",
  viewer: "#000000",
};

const UserRow: React.FC<UserProps> = ({ title, imageUrl, email, roles, onRemove }) => {
  const [colorMap, setColorMap] = useState<Record<string, string>>({});

  const userColor = useMemo(() => {
    return colorMap[email];
  }, [email, colorMap]);

  return (
    <div className="flex items-center justify-between p-4 bg-grey border rounded-lg">
      <div className="flex items-center gap-4">
        {imageUrl ? (
          <img src={imageUrl} alt="user" className="w-12 h-12 rounded-full" />
        ) : (
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
            style={{ backgroundColor: userColor }}
          >
            {title.charAt(0).toUpperCase()}
          </div>
        )}
        <div>
          <h3 className="text-[16px] font-bold text-black">{title}</h3>
          <h4 className="text-[14px] font-medium text-neutral-400">{email}</h4>
        </div>
      </div>
      <div className="flex gap-2">
        {roles.map((role, key) => (
          <div
            key={key}
            className="rounded-2xl text-sm font-semibold pt-1 pb-1 pr-3 pl-3 bg-neutral-200"
            style={{ color: roleColors[role.toLowerCase()] || "#000" }}
          >
            {role}
          </div>
        ))}
      </div>
      <Button
        className="bg-neutral-300 hover:bg-neutral-400 text-black font-semibold"
        onClick={() => onRemove(email)} // Use the onRemove function
      >
        Remove
      </Button>
    </div>
  );
};

export default UserRow;