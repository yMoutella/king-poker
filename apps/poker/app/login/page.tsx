import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { signIn } from "@/auth";
import Form from "next/form"
import { Metadata } from "next";
import LoginFields from "@/components/loginFields";

export const metadata: Metadata = {
  title: "Login",
  description: "Login in Poker page",
};

export default async function LoginPage() {

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <Card className="w-full max-w-sm p-6 rounded-2xl shadow-md">
        <CardContent className="space-y-6">
          <Form action={async (formData) => {
            "use server"
            await signIn("resend", {
              redirect: true,
              redirectTo: "/teams",
              email: formData.get("email") as string,
              pk: formData.get("pk") as string,
            })
          }} className="space-y-4">
            <LoginFields />
          </Form>
        </CardContent>
      </Card>
    </div >
  )
}

