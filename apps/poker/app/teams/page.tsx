import TeamsScreen from "@/components/teamsScreen";
import { Label } from "@/components/ui/label";
import AvatarComponent from "@/components/avatar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Teams",
  description: "Teams page",
};

export default async function MinimalPage() {

  return (
    <div className="min-h-screen p-10 ">
      <header className=" flex h-16 shrink-0 items-center gap-2 px-4 mb-10">
        <div className="flex w-full items-center justify-start gap-4 pl-5 ">
          <div className="flex flex-col">
            <Label className="text-2xl text-left justify-start">
              Teams
            </Label>
          </div>
        </div>
        <div className="flex w-full items-center justify-end">
          <div className="flex gap-4">
            <AvatarComponent />
          </div>
        </div>
      </header>
      <TeamsScreen />
    </div>
  );
}

