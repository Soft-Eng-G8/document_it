'use client'

import React, { useRef, useState } from 'react'
import { Button } from "@/components/ui/multiple_uses/button"
import { Input } from "@/components/ui/multiple_uses/input"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/multiple_uses/resizable"
import { signIn } from 'next-auth/react'
import { SignUp } from './sign_up'
import Header from '../dashboard/header'

interface ILogin {
  callbackUrl: string
}

function Login(props: ILogin) {
  const username = useRef('')
  const password = useRef('')
  const [isLogin, setIsLogin] = useState(true)

  const onSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const result = await signIn('credentials', {
      username: username.current,
      password: password.current,
      callbackUrl: props.callbackUrl 
    })
  }

  const togglePanel = () => {
    setIsLogin(prev => !prev)
  }

  return (
    
    <div className="container flex items-center justify-center">
      <ResizablePanelGroup
        direction="horizontal"
        className="max-w-screen-lg md:min-w-[450px] shadow-xl rounded-lg"
      >
        <ResizablePanel defaultSize={50}>
          <div
            className="h-full w-full bg-cover bg-center"
            style={{
              backgroundImage: 'url("https://i.ibb.co/DD36LBh/untitled.png")',
            }}
          />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50} className="bg-mywhite">
          {isLogin ? (
            <div className="flex flex-col h-[600px] p-6 text-secondary-foreground">
              <div className="flex flex-col items-center space-y-2">
                <span className="font-bold text-2xl text-primary">Docs</span>
              </div>
              <form className="flex flex-col items-center justify-center flex-1 space-y-4" onSubmit={onSubmit}>
                <span className="font-medium text-lg">Welcome To Docs</span>
                <div className="w-full max-w-xs">
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    User Name or Email
                  </label>
                  <Input 
                    id="username" 
                    type="text" 
                    onChange={e => username.current = e.target.value}
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
                  Login
                </Button>
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={togglePanel}
                    className="text-primary font-semibold hover:underline"
                  >
                    Sign Up
                  </button>
                </p>
              </form>
            </div>
          ) : (
            <SignUp onToggle={togglePanel} />
          )}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

export default Login

