"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldDescription,
  FieldSet,
  FieldGroup,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { WaypointsIcon } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAuthClient } from "better-auth/client";
import { useTranslations } from "next-intl";
const SignUp = () => {
  const t = useTranslations();
  const authClient = createAuthClient();

  const formSchema = z.object({
    name: z.string().min(1, t("auth.errors.nameMin")),
    email: z.string().email(t("auth.errors.emailInvalid")),
    password: z.string().min(8, t("auth.errors.passwordMin")),
  });

  type registerUser = z.infer<typeof formSchema>;

  const form = useForm<registerUser>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const handleSignUp = async (provider: "google" | "github") => {
    try {
      await authClient.signIn.social({
        provider,
        callbackURL: "http://localhost:3000/dashboard",
      });
    } catch (error) {
      console.error(`API ERROR: ${error}`);
    }
  };

  const onSubmit = async (data: registerUser) => {
    try {
      await authClient.signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
        callbackURL: "http://localhost:3000/dashboard",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-[#060D1A] dark:bg-[#060D1A] h-screen w-screen overflow-hidden">
      <div className="flex flex-row items-center justify-center pr-[20%] pt-12 gap-x-2 rounded-xl">
        <WaypointsIcon className="text-white text-2xl" />
        <Link className="text-white text-2xl" href="/">
          {t("auth.logoTitle")}
        </Link>
      </div>
      <main className="w-full flex flex-col items-center justify-center pt-3">
        {/* Sign in container */}
        <div className="flex flex-col self-center bg-[#0D1726] border-2 border-[#202A38] w-[30%] p-7 rounded-2xl">
          <h2 className="text-2xl font-bold text-white">
            {t("auth.signUp.title")}
          </h2>
          <p className="text-sm text-[#89929E]">{t("auth.signUp.subtitle")}</p>
          <Button
            className="bg-[#0E1727] border-2 border-[#202A38] text-white transition-all duration-300 hover:cursor-pointer font-semibold h-11 mt-4 hover:bg-[#00B2F9] hover:scale-95"
            onClick={() => handleSignUp("google")}
          >
            {t("auth.continueWithGoogle")}
          </Button>
          <Button
            className="bg-[#0E1727] border-2 border-[#202A38] text-white transition-all duration-300 hover:cursor-pointer font-semibold h-11 mt-4 hover:bg-[#00B2F9] hover:scale-95"
            onClick={() => handleSignUp("github")}
          >
            {t("auth.continueWithGithub")}
          </Button>
          <span className="text-[#89929E] text-sm mt-4 text-center">
            {t("auth.or")}
          </span>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldSet>
              <FieldGroup className="flex flex-col text-center">
                <Field className="relative">
                  <FieldLabel className="text-[#89929E]">
                    {t("auth.nameLabel")}
                  </FieldLabel>
                  <Input
                    className="bg-[#09101E] border-2 border-[#202A38] rounded-md placeholder:font-bold h-11 text-white"
                    placeholder={t("auth.namePlaceholder")}
                    id="email"
                    {...form.register("email")}
                  />
                  <FieldError className="absolute pt-20">
                    {form.formState.errors.name?.message}
                  </FieldError>
                </Field>
                <Field className="relative">
                  <FieldLabel className="text-[#89929E]">
                    {t("auth.emailLabel")}
                  </FieldLabel>
                  <Input
                    className="bg-[#09101E] border-2 border-[#202A38] rounded-md placeholder:font-bold h-11 text-white"
                    placeholder={t("auth.emailPlaceholder")}
                    id="email"
                    {...form.register("email")}
                  />
                  <FieldError className="absolute pt-20">
                    {form.formState.errors.email?.message}
                  </FieldError>
                </Field>

                <Field className="relative">
                  <FieldLabel className="text-[#89929E]">
                    {t("auth.passwordLabel")}
                  </FieldLabel>
                  <Input
                    className="bg-[#09101E] border-2 border-[#202A38] rounded-md placeholder:text-2xl h-11 text-white"
                    placeholder={t("auth.passwordPlaceholder")}
                    id="password"
                    {...form.register("password")}
                  />
                  <FieldError className="absolute pt-20">
                    {form.formState.errors.password?.message}
                  </FieldError>
                </Field>

                <FieldDescription>
                  <Link href="/auth/forgot-passsword">
                    {t("auth.forgotPassword")}
                  </Link>
                </FieldDescription>
                <Button
                  className="bg-[#00B2F9] text-black hover:bg-[#00B2F9]/80 transition-all duration-300 hover:cursor-pointer h-10"
                  type="submit"
                >
                  {t("auth.signUp.submit")}
                </Button>
              </FieldGroup>
            </FieldSet>
          </form>
          <div className="flex flex-row gap-x-2 text-sm text-center justify-center mt-4">
            <span className="text-[#89929E]">
              {t("auth.signUp.haveAccount")}
            </span>
            <Link
              className="text-[#00B2F9] hover:text-[#00B2F9]/80 transition-all duration-300 hover:cursor-pointer"
              href="/auth/sign-in"
            >
              {t("auth.signUp.signInLink")}
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignUp;
