import NavBar from "./nav/navbar"
import LeftPanel from "./nav/left_panel"
import RightPanel from "./nav/right_panel"
import PlayingCards from "./middle/playing_cards"
import Table from "./middle/table"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <NavBar />
      {/* Left Panel */}
      <LeftPanel />
      {/* Right Panel */}
      <RightPanel />
      {/* Main content area */}
      <main className="flex flex-1 flex-col pb-24">
        {/* Table */}
        <Table />
      </main>
      {/* Playing Cards */}
      <PlayingCards />
    </div>
  )
}