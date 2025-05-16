"use client"

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    Dialog,
    DialogContent,
    DialogClose,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react";
import { Info } from "lucide-react";


export default function TeamList() {

    const [items, setItems] = useState([
        { name: "Pineapple team", date: "2025-04-01" },
        { name: "Apple juice team", date: "2025-03-28" },
        { name: "Dragon fruit team", date: "2025-03-15" },
    ]);

    const [selected, setSelected] = useState<string | null>(null);


    return (
        <div>
            < div className="flex justify-center mb-2" >
                <div className="w-full max-w-3xl flex justify-end">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline">Create new team</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>New team</DialogTitle>
                                <DialogDescription>
                                    Create your new team here. You'll be able to add mates in the team main page.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="items-center gap-4">
                                    <Input id="name" value="" placeholder="Team name" className="col-span-3" />
                                </div>
                            </div>
                            <DialogFooter className="sm:justify-between">
                                <DialogClose asChild>
                                    <Button type="button" variant="secondary">
                                        Cancel
                                    </Button>
                                </DialogClose>
                                <Button type="submit">Save changes</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div >
            <div className="flex-col justify-center">
                <main className="flex flex-col items-center ">
                    <div className="w-full max-w-3xl space-y-1">
                        <Card className="rounded-2xl">
                            <CardContent className="p-3 space-y-4">
                                <ScrollArea className="h-64 space-y-2">
                                    {items.length > 0 ? (
                                        <TooltipProvider>
                                            {items.map((item, index) => {
                                                const isSelected = selected === item.name;
                                                return (
                                                    <Tooltip key={index}>
                                                        <TooltipTrigger asChild>
                                                            <div
                                                                onClick={() => setSelected(item.name)}
                                                                className={`flex items-center justify-between p-4 border rounded-lg transition-all cursor-pointer hover:bg-accent ${isSelected ? "border-ring bg-muted" : ""
                                                                    } mb-2`}
                                                            >
                                                                <div className="flex items-center space-x-3">
                                                                    <Avatar>
                                                                        <AvatarFallback>
                                                                            {item.name.charAt(0)}
                                                                        </AvatarFallback>
                                                                    </Avatar>
                                                                    <div>
                                                                        <p className="font-medium leading-none">
                                                                            {item.name}
                                                                        </p>
                                                                        <p className="text-sm text-muted-foreground">
                                                                            Last active: {item.date}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center space-x-2">
                                                                    <Info className="w-4 h-4 text-muted-foreground" />

                                                                </div>
                                                            </div>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>Created: {item.date}</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                );
                                            })}
                                        </TooltipProvider>
                                    ) : (<p className="text-center text-muted-foreground">No teams available</p>)}

                                </ScrollArea>
                                {selected && (
                                    <Button className="flex align-middle justify-center self-center">Open: {selected}</Button>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </main>
                <main className="flex flex-col items-center ">
                    <div className="w-full max-w-3xl space-y-1">
                        <Card className="mt-3 ">
                            <CardHeader>
                                <CardTitle>I have a team link:</CardTitle>
                                <CardDescription>If you got a invitation link, insert below</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form>
                                    <div className="grid w-full items-center gap-4">
                                        <div className="flex flex-col space-y-1.5">
                                            <Input id="name" className="text-center" placeholder="Invitation link" />
                                        </div>
                                        <div className="flex flex-col space-y-1.5">
                                        </div>
                                    </div>
                                </form>
                            </CardContent>
                            <CardFooter className="flex justify-center">
                                <Button className="w-1/6 h-10/12">Enter</Button>
                            </CardFooter>
                        </Card>
                    </div>
                </main>
            </div>
        </div>
    )

}