'use client'

import { Label } from "@radix-ui/react-label"
import { useState } from "react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"

export default function LoginFields() {

    const [name, setName] = useState("")
    const cacheUserName = (): void => {
        document.cookie = `user_name=${name}`
    }
    return (
        <>
            <h1 className="text-2xl font-semibold text-center">Join</h1>
            <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" type="text" name="name" placeholder="your beautiful name" required onChange={(e) => setName(e.target.value)} />

                <Label htmlFor="email">Email</Label>
                <Input id="email" type="text" name="email" placeholder="you@example.com" required />
            </div>
            <Button className="w-full" type="submit" onClick={() => cacheUserName()}> Signup</Button >
        </>
    )
}