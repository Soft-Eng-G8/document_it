import React from 'react';
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
          <div className="flex flex-col h-[600px] p-6 text-secondary-foreground">
            <div className="flex flex-col items-center space-y-2">
              <span className="font-bold text-2xl text-primary">Docs</span>
              
            </div>
            <div className="flex flex-col items-center justify-center flex-1 space-y-4">
            <span className="font-medium text-lg">Welcome To Docs</span>
              <div className="w-full max-w-xs">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  User Name or Email
                </label>
                <Input id="username" type="text" />
              </div>
              <div className="w-full max-w-xs">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Input id="password" type="password" />
              </div>
              <a
                href="#"
                className="text-sm text-background font-semibold hover:underline"
              >
                Forgot Password?
              </a>
              <Button className="text-mywhite font-semibold rounded-md w-full max-w-xs">
                Login
              </Button>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

export default Login;