import React from 'react'
import { ResizablePanel } from '../../multiple_uses/resizable'
import { Input } from '../../multiple_uses/input'
import { Button } from '../../multiple_uses/button'

function LoginPanel() {
  return (
          <div className="flex flex-col h-[600px] p-6 text-secondary-foreground">
            <div className="flex flex-col items-center space-y-2">
              <span className="font-bold text-2xl text-primary">Docs</span>
              
            </div>
            <div className="flex flex-col items-center justify-center flex-1 space-y-4">
            <span className="font-medium text-lg text-neutral-400">Welcome To Docs</span>
              <div className="w-full max-w-xs">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  User Name or Email
                </label>
                <Input id="username" type="text"  className='text-black'/>
              </div>
              <div className="w-full max-w-xs">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Input id="password" type="password" className='text-black' />
              </div>
              <a
                href="#"
                className="text-sm text-neutral-400 font-semibold hover:underline"
              >
                Forgot Password?
              </a>
              <Button className="text-mywhite font-semibold rounded-md w-full max-w-xs">
                Login
              </Button>
            </div>

          </div>
  )
}

export default LoginPanel
