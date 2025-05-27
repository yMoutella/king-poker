'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
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
import Form from "next/form";
import { createNewTeam } from "@/lib/createNewTeam";
import { useState } from "react";
import { Team } from "@/interfaces/team";

type ChildProps = {
    addTeam: (newTeam: Team) => void
}

export default function CreateTeamModal({ addTeam }: ChildProps) {


    const [team, setTeam] = useState('')
    const [open, setOpen] = useState<boolean>(false)

    return (
        < div className="flex justify-center mb-2" >
            <div className="w-full max-w-3xl flex justify-end">
                <Dialog modal={true} open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline">Create new team</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <Form action={async () => {
                            addTeam(await createNewTeam(team))
                            setOpen(false)
                        }}>
                            <DialogHeader>
                                <DialogTitle>New team</DialogTitle>
                                <DialogDescription>
                                    Create your new team here. You'll be able to add mates in the team main page.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="items-center gap-8">
                                    <Input id="name" placeholder="Team name" className="col-span-3" onChange={(e) => setTeam(e.target.value)} required />
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
                        </Form>
                    </DialogContent>
                </Dialog>
            </div>
        </div >
    )

}