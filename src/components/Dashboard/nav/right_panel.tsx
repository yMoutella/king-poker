import { useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { Tick02Icon } from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"

// Mock current card for demonstration
const MOCK_CURRENT_CARD = {
  id: "1",
  title: "User Authentication Flow",
  url: "https://jira.example.com/browse/PROJ-123",
  description: "Implement login, logout, and session management for the application",
}

export default function RightPanel() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const currentCard = MOCK_CURRENT_CARD

  return (
    <>
      {/* Collapsed Tab */}
      {isCollapsed && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsCollapsed(false)}
          className="fixed right-0 top-20 z-40 h-auto rounded-r-none rounded-l-lg border-r-0 px-2 py-3 shadow-lg"
        >
          <span className="text-xs">◀</span>
        </Button>
      )}

      {/* Main Panel */}
      <aside
        className={`fixed top-20 z-40 flex h-auto max-h-[50vh] w-80 flex-col rounded-lg border border-border bg-card shadow-xl transition-all duration-300 ${
          isCollapsed ? "-right-80" : "right-4"
        }`}
      >
        {/* Panel Header */}
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="flex items-center gap-2">
            <HugeiconsIcon icon={Tick02Icon} strokeWidth={2} className="size-4 text-primary" />
            <span className="text-sm font-medium">Current Voting</span>
          </div>
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <span className="text-xs">▶</span>
          </Button>
        </div>

        {/* Current Card Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {currentCard ? (
            <div className="flex flex-col gap-3">
              {/* Card Title */}
              <h3 className="text-sm font-semibold text-foreground">
                {currentCard.title}
              </h3>

              {/* Card URL */}
              {currentCard.url && (
                <a
                  href={currentCard.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary hover:underline truncate"
                >
                  {currentCard.url}
                </a>
              )}

              {/* Card Description */}
              {currentCard.description && (
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {currentCard.description}
                </p>
              )}

              {/* Voting Status */}
              <div className="mt-2 rounded-md bg-muted/50 p-3">
                <p className="text-[0.65rem] uppercase tracking-wide text-muted-foreground">
                  Voting in progress
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <div className="size-2 animate-pulse rounded-full bg-green-500" />
                  <span className="text-xs text-foreground">4/6 members voted</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <HugeiconsIcon
                icon={Tick02Icon}
                strokeWidth={1.5}
                className="size-10 text-muted-foreground/40"
              />
              <p className="mt-3 text-sm text-muted-foreground">No card selected</p>
              <p className="text-xs text-muted-foreground/70">
                Select a user story to start voting
              </p>
            </div>
          )}
        </div>
      </aside>
    </>
  )
}