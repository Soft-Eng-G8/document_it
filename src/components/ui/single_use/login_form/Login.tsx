"use client";
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/multiple_uses/button";
import { Input } from "@/components/ui/multiple_uses/input";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/multiple_uses/resizable";
import LoginPanel from './login_panel';
import SignUpPanel from './sign_up';

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export function ProfileForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
          Username
        </label>
        <Input id="username" {...form.register("username")} placeholder="Enter your username" className="mt-1 block w-full max-w-xs border-b border-gray-300 focus:border-blue-500 focus:ring-0" />
        {form.formState.errors.username && (
          <p className="mt-2 text-sm text-red-600">{form.formState.errors.username.message}</p>
        )}
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
}


function Login() {

  const [isLogin, setIsLogin] = useState(true);
  const [forgotPass, setForgotPass] = useState(false);

  const togglePanel = () => {
    setIsLogin((prev) => !prev);
  };

  const toggleForgotPass = () =>{
    setForgotPass((prev)=>!prev)
  };

  return (
    <div className="container flex items-center justify-center   ">
      <ResizablePanelGroup
        direction="horizontal"
        className="max-w-screen-lg  md:min-w-[450px] shadow-xl rounded-lg"
      >
        <ResizablePanel defaultSize={50}>
        <div
            className="h-full w-full bg-cover bg-center"
            style={{
              backgroundImage: 'url("https://i.ibb.co/DD36LBh/untitled.png")',
            }}
          >
            
          </div>
        </ResizablePanel>
        <ResizableHandle />
    <ResizablePanel defaultSize={50} className="bg-mywhite">
        {forgotPass? <h1>hi</h1>: isLogin ? <LoginPanel /> : <SignUpPanel />}
        <div className='flex flex-row justify-center items-center p-4'>
        <h1 className='text-black '>
          {forgotPass? "": isLogin? "Not a member?": "Already have an account?"}
        </h1>
        <button onClick={forgotPass? toggleForgotPass : togglePanel} className='bg-transparent text-foreground pl-4 font-bold'>
          
         {forgotPass? "Back to Login": isLogin ? "Sign Up" : "Login"}
        </button>
        </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

export default Login;