'use client'

import { useRef } from 'react'
import { Input } from "@/components/ui/multiple_uses/input"
import { Button } from "@/components/ui/multiple_uses/button"

interface SignUpProps {
  onToggle: () => void
}

export function SignUp({ onToggle }: SignUpProps) {
  const username = useRef('')
  const email = useRef('')
  const password = useRef('')

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Handle sign up logic here
  }

  return (
    <div className="flex flex-col h-[600px] p-6 text-secondary-foreground">
      <div className="flex flex-col items-center space-y-2">
        <span className="font-bold text-2xl text-primary">Docs</span>
      </div>
      <form className="flex flex-col items-center justify-center flex-1 space-y-4" onSubmit={onSubmit}>
        <span className="font-medium text-lg">Create an Account</span>
        <div className="w-full max-w-xs">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <Input 
            id="username" 
            type="text" 
            onChange={e => username.current = e.target.value}
          />
        </div>
        <div className="w-full max-w-xs">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <Input 
            id="email" 
            type="email" 
            onChange={e => email.current = e.target.value}
          />
        </div>
        <div className="w-full max-w-xs">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <Input 
            id="password" 
            type="password" 
            onChange={e => password.current = e.target.value}
          />
        </div>
        <Button className="text-mywhite font-semibold rounded-md w-full max-w-xs" type="submit">
          Sign Up
        </Button>
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <button
            type="button"
            onClick={onToggle}
            className="text-primary font-semibold hover:underline"
          >
            Login
          </button>
        </p>
      </form>
    </div>
  )
}

