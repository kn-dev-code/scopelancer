"use client";
import { Button } from "@/components/ui/button";
import { client } from "@/lib/betterauth/client";
import { Waypoints, WaypointsIcon } from "lucide-react";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { createAuthClient } from "better-auth/client";
import { useTranslations } from "next-intl";
const SignIn = () => {
  const t = useTranslations();
  const authClient = createAuthClient();

  const formSchema = z.object({
    email: z.string().email(t("auth.errors.emailInvalid")),
    password: z.string().min(8, t("auth.errors.passwordMin")),
  });

  type LoginUser = z.infer<typeof formSchema>;

  const form = useForm<LoginUser>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSignIn = async (provider: "google" | "github") => {
    try {
      await authClient.signIn.social({
        provider,
        callbackURL: "http://localhost:3000/dashboard",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-[#060D1A] dark:bg-[#060D1A] h-screen w-screen">
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
            {t("auth.signIn.title")}
          </h2>
          <p className="text-sm text-[#89929E]">{t("auth.signIn.subtitle")}</p>
          <Button
            className="bg-[#0E1727] border-2 border-[#202A38] text-white transition-all duration-300 hover:cursor-pointer font-semibold h-11 mt-4 hover:bg-[#00B2F9] hover:scale-95"
            onClick={() => handleSignIn("google")}
          >
            {t("auth.continueWithGoogle")}
          </Button>
          <Button
            className="bg-[#0E1727] border-2 border-[#202A38] text-white transition-all duration-300 hover:cursor-pointer font-semibold h-11 mt-4 hover:bg-[#00B2F9] hover:scale-95"
            onClick={() => handleSignIn("github")}
          >
            {t("auth.continueWithGithub")}
          </Button>
          <span className="text-[#89929E] text-sm mt-4 text-center">
            {t("auth.or")}
          </span>
          <form>
            <FieldSet>
              <FieldGroup className="flex flex-col text-center">
                <Field>
                  <FieldLabel className="text-[#89929E]">
                    {t("auth.emailLabel")}
                  </FieldLabel>
                  <Input
                    className="bg-[#09101E] border-2 border-[#202A38] rounded-md placeholder:font-bold h-11 text-white"
                    placeholder={t("auth.emailPlaceholder")}
                    id="email"
                    {...form.register("email")}
                  />
                  <FieldError>
                    {form.formState.errors.email?.message}
                  </FieldError>
                </Field>

                <Field>
                  <FieldLabel className="text-[#89929E]">
                    {t("auth.passwordLabel")}
                  </FieldLabel>
                  <Input
                    className="bg-[#09101E] border-2 border-[#202A38] rounded-md placeholder:text-2xl h-11 text-white"
                    placeholder={t("auth.passwordPlaceholder")}
                    id="password"
                    {...form.register("password")}
                  />
                  <FieldError>
                    {form.formState.errors.password?.message}
                  </FieldError>
                </Field>

                <FieldDescription>
                  <Link
                    className="text-[#89929E] hover:text-white"
                    href="/auth/forgot-passsword"
                  >
                    {t("auth.forgotPassword")}
                  </Link>
                </FieldDescription>
                <Button
                  className="bg-[#00B2F9] text-black hover:bg-[#00B2F9]/80 transition-all duration-300 hover:cursor-pointer h-10"
                  type="submit"
                >
                  {t("auth.signIn.submit")}
                </Button>
              </FieldGroup>
            </FieldSet>
          </form>
          <div className="flex flex-row gap-x-2 text-sm text-center justify-center mt-4">
            <span className="text-[#89929E]">{t("auth.signIn.noAccount")}</span>
            <Link
              className="text-[#00B2F9] hover:text-[#00B2F9]/80 transition-all duration-300 hover:cursor-pointer"
              href="/auth/sign-up"
            >
              {t("auth.signIn.createAccount")}
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignIn;
