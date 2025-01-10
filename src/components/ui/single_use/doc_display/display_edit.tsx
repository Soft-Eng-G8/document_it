"use client";
import React, { useState } from 'react'
import { Textarea } from '../../multiple_uses/textarea';
import { Label } from '@radix-ui/react-label';
import { Input } from '../../multiple_uses/input';
import { Button } from '../../multiple_uses/button';

interface IFormEdit {
  description: string;
  requirements: string[];
  additionalContent: string;
  files: { name: string; file: File }[];
}

function DisplayEdit() {
    const [isVisible, setIsVisible] = useState(false);
    const [formData, setFormData] = React.useState<IFormEdit>({
        description: "",
        requirements: [''],
        additionalContent: "",
        files: []
      })

    const toggleSection = () => {
        setIsVisible((prev) => !prev);
      };
  return (
    <div className='ml-20'>
        <button
        onClick={toggleSection}
        className=" text-black font-bold px-4 py-2 rounded flex items-center"
      >
        <span className="mr-2 text-lg">
          Edit Document
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`w-5 h-5 transform transition-transform ${
            isVisible ? 'rotate-90' : ''
          }`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
      {isVisible && (<div className='ml-7'>
        <div className='text-black font-semibold mb-4'>Add a Description</div>
        <Textarea 
                placeholder="Description" 
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-[400px] mb-5 text-black"
              />

              <div>
                <Label htmlFor="requirements" className='text-black font-semibold mb-4'>Requirements</Label>
                {formData.requirements.map((req, index) => (
                  <div key={index} className="flex items-center space-x-2 mt-2">
                    <Input
                      value={req}
                      onChange={(e) => {
                        const newReqs = [...formData.requirements];
                        newReqs[index] = e.target.value;
                        setFormData(prev => ({ ...prev, requirements: newReqs }));
                      }}
                      placeholder={`Requirement ${index + 1}`}
                      required={index === 0}
                      className='text-black '
                    />
                    {index > 0 && (
                      <Button
                        variant="secondary"
                        onClick={() => {
                          const newReqs = formData.requirements.filter((_, i) => i !== index);
                          setFormData(prev => ({ ...prev, requirements: newReqs }));
                        }}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  className="mt-2 bg-neutral-500 hover:bg-neutral-500/90 font-medium p-4"
                  onClick={() => setFormData(prev => ({ ...prev, requirements: [...prev.requirements, ''] }))}
                >
                  Add Requirement
                </Button>
              </div>
              <div className='text-black font-semibold mb-4 mt-5'>Add an Observation</div>
        <Textarea 
                placeholder="Description" 
                value={formData.additionalContent}
                onChange={(e) => setFormData(prev => ({ ...prev, additionalContent: e.target.value }))}
                className="w-[400px] mb-5 text-black"
              />

<Button
                  className="mt-2 "
                  onClick={() => setFormData(prev => ({ ...prev, requirements: [...prev.requirements, ''] }))}
                >
                  Submit
                </Button>
      </div>)}
    </div>
  )
}

export default DisplayEdit
