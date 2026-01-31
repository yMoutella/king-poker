import { useCallback, useState } from "react"
import NavBar from "./nav/navbar"
import LeftPanel from "./nav/left_panel"
import RightPanel from "./nav/right_panel"
import PlayingCards from "./middle/playing_cards"
import Table from "./middle/table"

export interface UserStoryCard {
  id: string
  title: string
  url?: string
  description?: string
}

export default function DashboardPage() {
  const [currentVotingCard, setCurrentVotingCard] = useState<UserStoryCard | null>(null)
  const [startTimer, setStartTimer] = useState(false)

  const handleTimerStarted = useCallback(() => {
    setStartTimer(false)
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <NavBar />
      {/* Left Panel */}
      <LeftPanel onStartVoting={setCurrentVotingCard} onStartTimer={setStartTimer} />
      {/* Right Panel */}
      <RightPanel currentCard={currentVotingCard} />
      {/* Main content area */}
      <main className="flex flex-1 flex-col pb-24">
        {/* Table */}
        <Table timerStart={startTimer} onTimerStarted={handleTimerStarted} />
      </main>
      {/* Playing Cards */}
      <PlayingCards />
    </div>
  )
}