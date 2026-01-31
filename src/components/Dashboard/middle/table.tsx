import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface User {
  id: string
  name: string
  avatar?: string
  vote?: string
  hasVoted: boolean
}

// Mock users for demonstration
const MOCK_USERS: User[] = [
  { id: "1", name: "Alice", hasVoted: false, vote: "5" },
  { id: "2", name: "Bob", hasVoted: false, vote: "8" },
  { id: "3", name: "Charlie", hasVoted: false, vote: "10" },
  { id: "4", name: "Diana", hasVoted: false, vote: "5" },
  { id: "5", name: "Eve", hasVoted: false, vote: "3" },
  { id: "6", name: "Frank", hasVoted: false, vote: "8" },
]

interface TableProps {
  timerStart: boolean
  onTimerStarted?: () => void
}

export default function Table({ timerStart, onTimerStarted }: TableProps) {
  const [users] = useState<User[]>(MOCK_USERS)
  const [revealed, setRevealed] = useState(false)
  const [timer, setTimer] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(timerStart)

  // Sync with timerStart prop when it becomes true
  useEffect(() => {
    if (timerStart) {
      setIsTimerRunning(true)
      setTimer(0)
      setRevealed(false)
      onTimerStarted?.()
    }
  }, [timerStart, onTimerStarted])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isTimerRunning && !revealed) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isTimerRunning, revealed])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleReveal = () => {
    setRevealed(true)
    setIsTimerRunning(false)
  }

  const handleReset = () => {
    setRevealed(false)
    setTimer(0)
    setIsTimerRunning(true)
  }

  // Position users around the table
  const getPositionClasses = (index: number) => {
    const positions = [
      "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2", // Top center
      "top-1/4 right-0 translate-x-1/2 -translate-y-1/2", // Top right
      "bottom-1/6 right-0 translate-x-1/2 translate-y-1/2", // Bottom right
      "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2", // Bottom center
      "bottom-1/6 left-0 -translate-x-1/2 translate-y-1/2", // Bottom left
      "top-1/4 left-0 -translate-x-1/2 -translate-y-1/2", // Top left
    ]
    return positions[index % positions.length]
  }

  const votedCount = users.filter((u) => u.hasVoted).length

  return (
    <div className="flex flex-1 items-center justify-center p-8">
      {/* Table */}
      <div className="relative h-72 w-[32rem] rounded-[50%] border-8 border-emerald-700 bg-emerald-800 shadow-2xl">
        {/* Inner table felt pattern */}
        <div className="absolute inset-4 rounded-[50%] border-2 border-emerald-600/30" />

        {/* Users around the table */}
        {users.map((user, index) => (
          <div
            key={user.id}
            className={cn(
              "absolute flex flex-col items-center gap-1",
              getPositionClasses(index)
            )}
          >
            {/* User avatar */}
            <div
              className={cn(
                "flex size-10 items-center justify-center rounded-full border-2 text-xs font-bold text-white shadow-md",
                user.hasVoted
                  ? "border-primary bg-primary/80"
                  : "border-muted-foreground/50 bg-muted-foreground/30"
              )}
            >
              {user.name.charAt(0)}
            </div>
            {/* User name */}
            <span className="text-[0.65rem] font-medium text-foreground">
              {user.name}
            </span>
            {/* Vote card */}
            {user.hasVoted && (
              <div
                className={cn(
                  "flex h-8 w-6 items-center justify-center rounded border text-xs font-bold shadow-sm",
                  revealed
                    ? "border-primary bg-card text-primary"
                    : "border-muted-foreground/50 bg-muted text-muted-foreground"
                )}
              >
                {revealed ? user.vote : "?"}
              </div>
            )}
          </div>
        ))}

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
          {/* Voting status */}
          <p className="text-xs text-emerald-200">
            {votedCount}/{users.length} voted
          </p>

          {/* Reveal/Reset button */}
          {!revealed ? (
            <Button
              onClick={handleReveal}
              className="bg-white text-emerald-800 hover:bg-white/90"
              disabled={votedCount === 0}
            >
              Reveal Cards
            </Button>
          ) : (
            <Button
              onClick={handleReset}
              variant="outline"
              className="border-white/50 bg-transparent text-white hover:bg-white/10"
            >
              New Round
            </Button>
          )}

          {/* Timer */}
          <div className="flex items-center gap-1.5 rounded-full bg-black/20 px-3 py-1">
            <div
              className={cn(
                "size-2 rounded-full",
                isTimerRunning ? "animate-pulse bg-green-400" : "bg-red-400"
              )}
            />
            <span className="font-mono text-sm text-white">{formatTime(timer)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}