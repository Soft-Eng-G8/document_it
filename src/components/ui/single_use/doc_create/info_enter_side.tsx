'use client'

import * as React from "react"
import { Progress } from "@/components/ui/multiple_uses/progress"
import { Button } from "@/components/ui/multiple_uses/button"
import { Input } from "@/components/ui/multiple_uses/input"
import { Checkbox } from "@/components/ui/multiple_uses/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/multiple_uses/radio-group"
import { Label } from "@/components/ui/multiple_uses/label"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/multiple_uses/dropdown-menu"

const phases = [
  {
    title: "Main Info",
    content: (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-black"></h3>
        <p>Please fill out the following information:</p>
        <Input placeholder="Document Name" />
        <Input placeholder="Organization Name" type="email" />
        <div className="flex items-center space-x-2">
        <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup>
          <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
        </div>
      </div>
    )
  },
  {
    title: "Phase 2",
    content: (
      <div className="space-y-4">
        <p>Please select your preferences:</p>
        <RadioGroup defaultValue="option-1">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-1" id="option-1" />
            <Label htmlFor="option-1">Option 1</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-2" id="option-2" />
            <Label htmlFor="option-2">Option 2</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-3" id="option-3" />
            <Label htmlFor="option-3">Option 3</Label>
          </div>
        </RadioGroup>
        <Button variant="outline">Save Preferences</Button>
      </div>
    )
  },
  {
    title: "Phase 3",
    content: (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">You've reached the final phase!</h3>
        <p>Here's a summary of your journey:</p>
        <ul className="list-disc list-inside">
          <li>Completed Phase 1</li>
          <li>Completed Phase 2</li>
          <li>Now at Phase 3</li>
        </ul>
        <p>What would you like to do next?</p>
        <div className="flex space-x-2">
          <Button variant="outline">Download Report</Button>
          <Button variant="outline">Share Progress</Button>
        </div>
      </div>
    )
  },
]

export default function ProgressDemo() {
  const [progress, setProgress] = React.useState(33)
  const [currentPhase, setCurrentPhase] = React.useState(0)
  const [position, setPosition] = React.useState("bottom")

  const handleNextPhase = () => {
    if (currentPhase < phases.length - 1) {
      setCurrentPhase(prev => prev + 1)
      setProgress(prev => Math.min(100, prev + 100 / phases.length))
    } else {
        //go next page
      setCurrentPhase(0)
      setProgress(0)
      // Keep progress at 100 when reaching the end
    }
  }

  return (
    <div className="relative flex-1 bg-background rounded-lg shadow-lg h-[500px]">
      <div className="absolute top-0 left-0 w-full bg-white p-6 rounded-tr-lg rounded-tl-lg shadow-lg">
        <h1 className='font-semibold text-black text-xl mb-2'>{phases[currentPhase].title}</h1>
        <Progress value={progress} className="w-full" />
      </div>

      <div className="flex justify-center absolute top-24 left-0 right-0 bottom-16 overflow-y-auto overflow-x-hidden p-4 bg-background text-black">
       
        {phases[currentPhase].content}
      </div>

      <div className="absolute bottom-0 left-0 w-full bg-background text-black p-4 shadow-lg">
        <Button onClick={handleNextPhase} className="w-full">
          {currentPhase < phases.length - 1 ? "Next Phase" : "Finish"}
        </Button>
      </div>
    </div>
  )
}

