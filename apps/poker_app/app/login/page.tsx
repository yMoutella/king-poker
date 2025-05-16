import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { signIn } from "@/auth";
import Form from "next/form"
import { Metadata } from "next";

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
            <h1 className="text-2xl font-semibold text-center">Join</h1  >
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="text" name="email" placeholder="you@example.com" />
            </div>
            {/* <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" />
            </div> */}
            <Button className="w-full" type="submit">Signup</Button>
          </Form>
        </CardContent>
      </Card>
    </div >
  )
}

