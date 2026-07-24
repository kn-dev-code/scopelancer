"use client"
import { Button } from '@/components/ui/button'
import { client } from '@/lib/betterauth/client'
import { Waypoints, WaypointsIcon } from 'lucide-react'
import Link from 'next/link'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field"
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
const SignIn = () => {


  const formSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      email: "",
      password: "",
    }
  })

  const handleSignIn = async (provider: "google" | "github") => {
    try {
      await client.signIn.social({
        provider,
        callbackURL: "/",
      })
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="bg-[#060D1A] dark:bg-[#060D1A] h-screen w-screen">

      <div className="flex flex-row items-center justify-center pr-[20%] pt-12 gap-x-2 rounded-xl">
        <WaypointsIcon className = "text-white text-2xl" />
        <Link className="text-white text-2xl" href="/">Scopelancer</Link>
      </div>
      <main className="w-full flex flex-col items-center justify-center">
        {/* Sign in container */}
        <div className="flex flex-col self-center bg-[#0D1726] border-2 border-[#202A38] w-[30%] p-7 rounded-2xl">
          <h2 className="text-2xl font-bold text-white">Welcome back</h2>
          <p className="text-sm text-[#89929E]">Sign in to defend your next client scope.</p>
          <Button className="bg-[#0E1727] border-2 border-[#202A38] text-white transition-all duration-300 hover:cursor-pointer font-semibold h-11 mt-4 hover:bg-[#00B2F9] hover:scale-95" onClick={() => handleSignIn("google")}>Continue with Google</Button>
          <Button className="bg-[#0E1727] border-2 border-[#202A38] text-white transition-all duration-300 hover:cursor-pointer font-semibold h-11 mt-4 hover:bg-[#00B2F9] hover:scale-95" onClick={() => handleSignIn("github")}>Continue with GitHub</Button>
          <span className="text-[#89929E] text-sm mt-4 text-center">or</span>
          <form>
            <FieldSet>
              <FieldGroup className="flex flex-col text-center">
                <Field>
                  <FieldLabel className="text-[#89929E]">Email</FieldLabel>
                  <Input className="bg-[#09101E] border-2 border-[#202A38] rounded-md placeholder:font-bold h-11 text-white" placeholder="you@studio.com" id="email" {...form.register("email")} />
                  <FieldError>{form.formState.errors.email?.message}</FieldError>
                </Field>

                <Field>
                  <FieldLabel className="text-[#89929E]">Password</FieldLabel>
                  <Input className="bg-[#09101E] border-2 border-[#202A38] rounded-md placeholder:text-2xl h-11 text-white" placeholder="........" id="password" {...form.register("password")} />
                  <FieldError>{form.formState.errors.password?.message}</FieldError>
                </Field>

                <FieldDescription>
                  <Link href="/auth/forgot-passsword">Forgot password?</Link>
                </FieldDescription>
                <Button className="bg-[#00B2F9] text-black hover:bg-[#00B2F9]/80 transition-all duration-300 hover:cursor-pointer h-10" type="submit">Sign in →</Button>
              </FieldGroup>
            </FieldSet>
          </form>
          <div className="flex flex-row gap-x-2 text-sm text-center justify-center mt-4">
            <span className="text-[#89929E]">New to Scopelancer?</span>
            <Link className="text-[#00B2F9] hover:text-[#00B2F9]/80 transition-all duration-300 hover:cursor-pointer" href="/auth/signup">Create an account</Link>
          </div>
        </div>
      </main>
    </div>
  )
}

export default SignIn