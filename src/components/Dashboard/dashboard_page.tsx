import NavBar from "./nav/navbar"
import LeftPanel from "./nav/left_panel"
import PlayingCards from "./middle/playing_cards"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      {/* Left Panel */}
      <LeftPanel />
      {/* Playing Cards */}
      <PlayingCards />
    </div>
  )
}