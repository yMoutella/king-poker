import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DiamondIcon, Logout01Icon, Settings01Icon, UserIcon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react";

export default function NavBar(){
  return (
    <nav className="border-b border-border bg-card">
        <div className="flex h-14 items-center justify-between px-4">
          {/* Logo / Title */}
          <div className="flex items-center gap-2">
            <HugeiconsIcon icon={DiamondIcon} strokeWidth={2} className="size-5 text-primary" />
            <span className="font-semibold text-foreground">King Poker</span>
          </div>

          {/* Right side - Room Settings & User Menu */}
          <div className="flex items-center gap-2">
            {/* Room Settings */}
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button variant="ghost" size="icon">
                    <HugeiconsIcon icon={Settings01Icon} strokeWidth={2} className="size-4" />
                    <span className="sr-only">Room settings</span>
                  </Button>
                }
              />
              <DropdownMenuContent align="end">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Room Settings</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Game Rules</DropdownMenuItem>
                  <DropdownMenuItem>Blind Levels</DropdownMenuItem>
                  <DropdownMenuItem>Timer Settings</DropdownMenuItem>
                  <DropdownMenuItem>Invite Players</DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <HugeiconsIcon icon={UserIcon} strokeWidth={2} className="size-4" />
                    <span className="sr-only">User menu</span>
                  </Button>
                }
              />
              <DropdownMenuContent align="end">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <HugeiconsIcon icon={UserIcon} strokeWidth={2} />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <HugeiconsIcon icon={Settings01Icon} strokeWidth={2} />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive">
                    <HugeiconsIcon icon={Logout01Icon} strokeWidth={2} />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>

  )
}