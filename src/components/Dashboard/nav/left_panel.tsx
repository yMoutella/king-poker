import { useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { Cancel01Icon, Tick02Icon } from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

interface UserStoryCard {
  id: string
  title: string
  description?: string
}

export default function LeftPanel() {
  const [cards, setCards] = useState<UserStoryCard[]>([])
  const [isCollapsed, setIsCollapsed] = useState(false)

  const handleCreateCard = () => {
    const newCard: UserStoryCard = {
      id: crypto.randomUUID(),
      title: `User Story ${cards.length + 1}`,
      description: "Click to edit description",
    }
    setCards([...cards, newCard])
  }

  const handleDeleteCard = (id: string) => {
    setCards(cards.filter((card) => card.id !== id))
  }

  return (
    <>
      {/* Collapsed Tab */}
      {isCollapsed && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsCollapsed(false)}
          className="fixed left-0 top-20 z-40 h-auto rounded-l-none rounded-r-lg border-l-0 px-2 py-3 shadow-lg"
        >
          <span className="text-xs">▶</span>
        </Button>
      )}

      {/* Main Panel */}
      <aside
        className={`fixed top-20 z-40 flex h-[50vh] flex-col rounded-lg border border-border bg-card shadow-xl transition-all duration-300 ${
          isCollapsed ? "-left-80 w-72" : "left-4 w-1/4 min-w-64"
        }`}
      >
        {/* Panel Header */}
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="mr-1"
            >
              <span className="text-xs">◀</span>
            </Button>
            <HugeiconsIcon icon={Tick02Icon} strokeWidth={2} className="size-4 text-primary" />
            <span className="text-sm font-medium">User Stories</span>
          </div>
          <Button variant="outline" size="sm" onClick={handleCreateCard}>
            <span className="text-base leading-none">+</span>
            New Card
          </Button>
        </div>

        {/* Cards List */}
        <div className="flex-1 overflow-y-auto p-3">
          {cards.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <HugeiconsIcon
                icon={Tick02Icon}
                strokeWidth={1.5}
                className="size-12 text-muted-foreground/40"
              />
              <p className="mt-3 text-sm text-muted-foreground">No user stories yet</p>
              <p className="text-xs text-muted-foreground/70">Click the button above to create one</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {cards.map((card) => (
                <Card
                  key={card.id}
                  size="sm"
                  className="cursor-pointer transition-colors hover:bg-accent/50"
                >
                  <CardHeader className="relative">
                    <CardTitle className="pr-6 text-xs">{card.title}</CardTitle>
                    {card.description && (
                      <CardDescription className="text-[0.65rem]">
                        {card.description}
                      </CardDescription>
                    )}
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      className="absolute right-2 top-2 opacity-0 transition-opacity group-hover/card:opacity-100"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteCard(card.id)
                      }}
                    >
                      <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} className="size-3" />
                      <span className="sr-only">Delete card</span>
                    </Button>
                  </CardHeader>
                </Card>
              ))}
            </div>
          )}
        </div>
      </aside>
    </>
  )
}