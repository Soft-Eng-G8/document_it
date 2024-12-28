"use client";

import React from 'react';
import { ResponsiveLine } from '@nivo/line';

// Line chart component
const MyResponsiveLine = ({ data }: { data: any }) => (
  <ResponsiveLine
    data={data}
    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
    xScale={{ type: 'point' }}
    yScale={{
      type: 'linear',
      min: 'auto',
      max: 'auto',
      stacked: true,
      reverse: false,
    }}
    yFormat=" >-.2f"
    axisTop={null}
    axisRight={null}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'transportation',
      legendOffset: 36,
      legendPosition: 'middle',
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'count',
      legendOffset: -40,
      legendPosition: 'middle',
    }}
    pointSize={10}
    pointColor={{ theme: 'background' }}
    pointBorderWidth={2}
    pointBorderColor={{ from: 'serieColor' }}
    pointLabel="data.yFormatted"
    pointLabelYOffset={-12}
    enableCrosshair
    useMesh={true}
    legends={[
      {
        anchor: 'bottom-right',
        direction: 'column',
        justify: false,
        translateX: 100,
        translateY: 0,
        itemsSpacing: 0,
        itemDirection: 'left-to-right',
        itemWidth: 80,
        itemHeight: 20,
        itemOpacity: 0.75,
        symbolSize: 12,
        symbolShape: 'circle',
        symbolBorderColor: 'rgba(0, 0, 0, .5)',
        effects: [
          {
            on: 'hover',
            style: {
              itemBackground: 'rgba(0, 0, 0, .03)',
              itemOpacity: 1,
            },
          },
        ],
      },
    ]}
    colors={{ datum: 'color' }} // Use the color defined in the data array
  />
);

function GeneralCard() {
  const data = [
    {
      id: 'USA',
      color: '#2192e2', // Line color set to red
      data: [
        { x: 'plane', y: 233 },
        { x: 'helicopter', y: 152 },
        { x: 'boat', y: 138 },
        { x: 'train', y: 150 },
        { x: 'subway', y: 289 },
        { x: 'bus', y: 180 },
        { x: 'car', y: 163 },
        { x: 'moto', y: 193 },
        { x: 'bicycle', y: 154 },
        { x: 'horse', y: 69 },
        { x: 'skateboard', y: 261 },
        { x: 'others', y: 146 },
      ],
    },
  ];

  return (
    <div className="w-full border rounded-lg bg-mywhite shadow-lg p-4">
      <p className="font-bold text-black text-[20px] ml-5">This Week</p>
      <p className="text-neutral-400 text-[13px] ml-5">this week's users</p>
      <div className="w-full h-[450px]">
        <MyResponsiveLine data={data} />
      </div>
    </div>
  );
}

export default GeneralCard;