'use client'
import React, { useMemo } from "react";

interface ContributionsRowHeadProps {
  contribution_id: string;
  contribution_type: string;
  contribution_name: string;
  contributor: { name: string; imageUrl?: string };
  date: string;
  status: string;
}

// Utility to generate consistent colors based on a string
const getColorForString = (str: string) => {
  const colors = [
    "#FF5733", // Red
    "#33FF57", // Green
    "#3357FF", // Blue
    "#FF33A1", // Pink
    "#FFC300", // Yellow
    "#DA33FF", // Purple
    "#33FFF1", // Cyan
    "#FF8C33", // Orange
    "#33FF8C", // Lime
    "#8C33FF", // Violet
  ];
  const hash = Array.from(str).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[hash % colors.length];
};

function ContributionRow({
  contribution_id,
  contribution_type,
  contribution_name,
  contributor,
  date,
  status,
}: ContributionsRowHeadProps) {
  const avatarColor = useMemo(() => getColorForString(contributor.name), [contributor.name]);

  const getStatusStyles = (status: string) => {
    if (status === "Pending") {
      return "text-orange-500 bg-orange-100 ";
    }
    if (status === "Reviewed") {
      return "text-green-500 bg-green-100";
    }
    return "";
  };

  return (
    <div className="flex flex-row p-2 justify-between items-center">
      {/* Document Name */}
      <div className="flex flex-row items-center flex-1">
        <div className="text-[16px] font-medium text-black">{contribution_name}</div>
      </div>

      {/* Contribution Type */}
      <div className="flex flex-row items-center flex-1">
        <div className="text-[16px] font-medium text-black first-letter:uppercase">{contribution_type.toLowerCase()}</div>
      </div>

      {/* Contributor */}
      <div className="flex flex-row items-center flex-1 gap-2">
        {contributor.imageUrl ? (
          <img
            src={contributor.imageUrl}
            alt={contributor.name}
            className="w-8 h-8 rounded-full"
          />
        ) : (
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
            style={{ backgroundColor: avatarColor }}
          >
            {contributor.name.charAt(0).toUpperCase()}
          </div>
        )}
        <span className="text-[16px] font-medium text-black">{contributor.name}</span>
      </div>

      {/* Date */}
      <div className="text-[16px] font-medium text-black flex-1">{date}</div>

      {/* Status */}
      <div className=" flex-1 flex items-start justify-start">
        <div
            className={`text-[16px] font-medium px-2 py-1 w-[100px] rounded-lg text-center first-letter:uppercase ${getStatusStyles(
            status
            )}`}
        >
            {status.toLowerCase()}
        </div>
      </div>

      {status === 'Pending' ? (
         <div className="flex flex-row items-center flex-1">
        <button className="text-[16px] font-medium text-black border-2 px-3 py-2 rounded-lg border-black" onClick={async(e) => {
          await fetch(`http://localhost:3000/api/documents/verify/${contribution_id}`, {
            method: 'POST',
            body: JSON.stringify({
              status: 'APPROVED'
            })
          })
          
        }}>{'Submit'}</button>
      </div>
    
      ) : (
                 <div className="flex flex-row items-center flex-1">
      </div>

      )}
      
    </div>
  );
}

export default ContributionRow;