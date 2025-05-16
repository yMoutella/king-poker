import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import AppSidebar from "@/components/app-sidebar"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import Image from "next/image"
import Logo from "../public/diamond.svg"


export default function Composite({ team, children }: any) {

    const SIDEBAR_WIDTH = "20rem"
    const SIDEBAR_WIDTH_MOBILE = "18rem"

    return (
        <>
            <SidebarProvider defaultOpen={false} style={
                {
                    "--sidebar-width": SIDEBAR_WIDTH,
                    "--sidebar-width-mobile": SIDEBAR_WIDTH_MOBILE
                } as React.CSSProperties
            }>
                <SidebarInset>
                    <header className="flex h-16 shrink-0 items-center gap-2 px-4 pt-10 ">
                        <div className="flex w-full items-center justify-start gap-4 pl-5 ">
                            <Image
                                src={Logo}
                                alt="Logo"
                                width={100}
                                height={100}
                                className="h-10 w-10 rounded-full" />
                            <div className="flex flex-col">
                                <Label className="text-2xl text-left justify-start">
                                    {team}
                                </Label>
                                <Label className="text-left justify-start">
                                    Voting in: Story-99
                                </Label>
                            </div>

                        </div>

                        <div className="flex w-full items-center justify-end">
                            <div className="flex gap-4">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Avatar>
                                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-50">
                                        <h1>User setup</h1>
                                        <Label>Next feature</Label>
                                    </PopoverContent>
                                </Popover>
                                <Button className="cursor-pointer">Invite players</Button>
                            </div>
                        </div>
                        <SidebarTrigger className="-mr-1 ml-auto rotate-180 text-accent-foreground" />
                    </header>
                    {children}
                </SidebarInset>
                <AppSidebar />
            </SidebarProvider >

        </>
    )
}