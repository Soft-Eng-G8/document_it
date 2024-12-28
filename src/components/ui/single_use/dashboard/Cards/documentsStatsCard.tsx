"use client";
// Install the nivo packages if not already done
// yarn add @nivo/pie
import { ResponsivePie } from '@nivo/pie';

const MyResponsivePie = ({ data }: { data: any }) => (
  <ResponsivePie
    data={data}
    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
    innerRadius={0.5}
    padAngle={0.7}
    cornerRadius={3}
    activeOuterRadiusOffset={8}
    colors={({ data }) => (data as any).color} // Use the color property from the data
    arcLinkLabelsSkipAngle={10}
    arcLinkLabelsTextColor="#333333"
    arcLinkLabelsThickness={2}
    arcLinkLabelsColor={({ data }) => (data as any).color} // Use the color for link labels
    arcLabelsSkipAngle={10}
    arcLabelsTextColor={{
      from: 'data.color',
      modifiers: [['darker', 2]],
    }}
    legends={[
      {
        anchor: 'bottom',
        direction: 'row',
        justify: false,
        translateX: 0,
        translateY: 56,
        itemsSpacing: 0,
        itemWidth: 100,
        itemHeight: 18,
        itemTextColor: '#999',
        itemDirection: 'left-to-right',
        itemOpacity: 1,
        symbolSize: 18,
        symbolShape: 'circle',
        effects: [
          {
            on: 'hover',
            style: {
              itemTextColor: '#000',
            },
          },
        ],
      },
    ]}
  />
);

import React from 'react';

function DocumentsStatsCard() {
  const data = [
    {
      id: "Etat Civil",
      label: "Etat Civil",
      value: 235,
      color: "#68D391", // Example green color
    },
    {
      id: "Visas",
      label: "Visas",
      value: 120,
      color: "#F56565", // Example red color
    },
    {
      id: "Other",
      label: "Other",
      value: 5,
      color: "#63B3ED", // Example blue color
    },
  ];

  return (
    <div className="w-full border rounded-lg bg-mywhite shadow-lg p-4">
      <p className="font-bold text-black text-[20px] ml-5">Documents Stats</p>
      <div className="w-full h-[450px]">
        <MyResponsivePie data={data} />
      </div>
    </div>
  );
}

export default DocumentsStatsCard;