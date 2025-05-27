'use client'

import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { Info } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { Team } from "@/interfaces/team";
import { format } from 'date-fns'
import CreateTeamModal from "./createTeamModal";

export default function TeamsList(props: { teams: Team[] }) {

    const [items, setItems] = useState<Team[]>(props.teams);
    const [selected, setSelected] = useState<string | null>(null);

    const addTeam = (newTeam: Team): void => {
        setItems(prev => [...prev, newTeam])
    }

    return (
        <>
            <CreateTeamModal addTeam={addTeam} />
            <div className="flex-col justify-center">
                <main className="flex flex-col items-center ">
                    <div className="w-full max-w-3xl space-y-1">
                        <Card className="rounded-2xl">
                            <CardContent className="p-3 space-y-4">
                                <ScrollArea className="h-100 space-y-2 overflow-scroll">
                                    {items.length > 0 ? (
                                        <TooltipProvider>
                                            {items.map((item: Team, index) => {
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
                                                                            {item.name!.charAt(0)}
                                                                        </AvatarFallback>
                                                                    </Avatar>
                                                                    <div>
                                                                        <p className="font-medium leading-none">
                                                                            {item.name}
                                                                        </p>
                                                                        <p className="text-sm text-muted-foreground">
                                                                            Updated in: {format(new Date(item.updatedAt), 'dd/MM/yyyy - HH:mm:ss')}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center space-x-2">
                                                                    <Info className="w-4 h-4 text-muted-foreground" />

                                                                </div>
                                                            </div>
                                                        </TooltipTrigger>
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
        </>
    )
}