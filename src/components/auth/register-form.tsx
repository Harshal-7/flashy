"use client";

import React, { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { RegisterSchema } from "@/schema/RegisterSchema";
import { register } from "@/actions/register";
import { useToast } from "@/hooks/use-toast";
import GoogleIcon from "../ui/google";

const RegisterForm = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isContainValues, setIsContainValues] = useState(false);

  const path = usePathname();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (form.getValues().name.length > 1 || form.getValues().email.length > 1) {
      setIsContainValues(true);
    } else {
      setIsContainValues(false);
    }
  }, [form.getValues().name.length || form.getValues().email.length]);

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setLoading(true);

    register(values).then((res) => {
      if (res.error) {
        toast({
          title: res.error,
          variant: "destructive",
        });
      } else if (res.success) {
        toast({
          title: res.success,
          description: "Login to access dashboard",
          variant: "primary",
        });
        setLoading(false);
        router.replace(`/login`);
      }
    });
  };

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex flex-col gap-10 relative w-2/3 h-screen items-center justify-center">
        {/* Login / Register Heading  */}
        <div className="flex gap-2 items-end mb-6 md:mb-10">
          <Link
            href="/login"
            className={` ${
              path === "/login"
                ? "font-semibold text-3xl"
                : "text-accent-foreground/90 font-medium "
            }`}
          >
            Log In
          </Link>
          /
          <Link
            href="/register"
            className={` ${
              path === "/register"
                ? "font-semibold text-3xl"
                : "text-accent-foreground/90 font-medium "
            }`}
          >
            Register
          </Link>
        </div>

        {/* FORM  */}
        <Form {...form}>
          <form className="flex flex-col md:flex-row justify-center items-center gap-6">
            {/* ENTER NAME  */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-col relative">
                  <FormControl>
                    <input
                      {...field}
                      placeholder="Enter Your Name"
                      type="text"
                      className="
                        flex h-11 w-full min-w-60 border border-muted-foreground/70 rounded-3xl bg-transparent px-6 py-1 transition-colors file:border-0 file:bg-transparent
                        file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus:ring-1 focus:ring-primary focus:border-none"
                    />
                  </FormControl>
                  <FormMessage className="absolute -bottom-6 left-5" />
                </FormItem>
              )}
            />

            {/* ENTER EMAIL  */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-col relative">
                  <FormControl>
                    <input
                      {...field}
                      placeholder="Enter Your Email"
                      type="email"
                      className="
                        flex h-11 w-full min-w-60 border border-muted-foreground/70 rounded-3xl bg-transparent px-6 py-1 transition-colors file:border-0 file:bg-transparent
                        file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus:ring-1 focus:ring-primary focus:border-none"
                    />
                  </FormControl>
                  <FormMessage className="absolute -bottom-6 left-5" />
                </FormItem>
              )}
            />

            {/* ENTER PASSWORD  */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="flex flex-col relative">
                  <FormControl>
                    <input
                      {...field}
                      placeholder="Create Your Password"
                      type={isPasswordVisible ? "text" : "password"}
                      className="
                        flex h-11 w-full min-w-60 border border-muted-foreground/70 rounded-3xl bg-transparent px-6 py-1 transition-colors file:border-0 file:bg-transparent
                        file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus:ring-1 focus:ring-primary focus:border-none"
                    />
                  </FormControl>
                  <FormMessage className="absolute -bottom-11 left-5" />

                  {/* password eye  */}
                </FormItem>
              )}
            />
          </form>

          {/* Submit button  */}
          <div className="flex flex-col w-full gap-5 justify-center items-center -mt-4 md:mt-0">
            {isContainValues ? (
              <button
                onClick={form.handleSubmit(onSubmit)}
                className=" 
                flex items-center justify-center gap-1.5 py-2 h-11 px-6
                text-secondary bg-primary
                rounded-3xl w-full min-w-60 max-w-60 text-center font-semibold
                shadow-[-5px_-5px_10px_rgba(255,_255,_255,_0.8),_5px_5px_10px_rgba(0,_0,_0,_0.25)]
                hover:bg-primary/90
                transition-all
                duration-500
            "
              >
                {loading ? (
                  <Loader2 className="animate-spin w-6 h-6" />
                ) : (
                  <span>Create An Account</span>
                )}
              </button>
            ) : (
              <button
                className="
              flex justify-center items-center gap-2 h-11 w-full min-w-60 max-w-60 border border-muted-foreground/70 rounded-3xl hover:bg-accent-foreground/5
              bg-transparent px-6 py-1 transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground 
              focus-visible:outline-none focus:ring-1 focus:ring-primary focus:border-none"
              >
                <GoogleIcon />
                <div>Continue with Google</div>
              </button>
            )}
          </div>
        </Form>
      </div>

      <div className="hidden lg:flex w-1/3">
        <img
          src="/login.svg"
          alt="login-img"
          className="w-60 lg:w-[350px] xl:w-[500px] h-60 lg:h-[350px] xl:h-[500px] "
        />
      </div>
    </div>
  );
};

export default RegisterForm;
