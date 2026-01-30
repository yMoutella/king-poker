import { useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { Cancel01Icon, Tick02Icon } from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import type { UserStoryCard } from "../dashboard_page"

interface LeftPanelProps {
  onStartVoting: (card: UserStoryCard) => void
}

export default function LeftPanel({ onStartVoting }: LeftPanelProps) {
  const [cards, setCards] = useState<UserStoryCard[]>([])
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCardId, setEditingCardId] = useState<string | null>(null)
  const [formData, setFormData] = useState({ title: "", url: "", description: "" })

  const handleSaveCard = () => {
    if (!formData.title.trim()) return
    
    if (editingCardId) {
      // Update existing card
      setCards(cards.map((card) =>
        card.id === editingCardId
          ? {
              ...card,
              title: formData.title,
              url: formData.url || undefined,
              description: formData.description || undefined,
            }
          : card
      ))
    } else {
      // Create new card
      const card: UserStoryCard = {
        id: crypto.randomUUID(),
        title: formData.title,
        url: formData.url || undefined,
        description: formData.description || undefined,
      }
      setCards([...cards, card])
    }
    
    setFormData({ title: "", url: "", description: "" })
    setEditingCardId(null)
    setIsModalOpen(false)
  }

  const handleEditCard = (card: UserStoryCard) => {
    setEditingCardId(card.id)
    setFormData({
      title: card.title,
      url: card.url || "",
      description: card.description || "",
    })
    setIsModalOpen(true)
  }

  const handleDeleteCard = (id: string) => {
    setCards(cards.filter((card) => card.id !== id))
  }

  const handleCancel = () => {
    setFormData({ title: "", url: "", description: "" })
    setEditingCardId(null)
    setIsModalOpen(false)
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
          <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <AlertDialogTrigger
              render={
                <Button variant="outline" size="sm">
                  <span className="text-base leading-none">+</span>
                  New Card
                </Button>
              }
            />
            <AlertDialogContent className="max-w-md">
              <AlertDialogHeader>
                <AlertDialogTitle>{editingCardId ? "Edit User Story" : "Add User Story"}</AlertDialogTitle>
              </AlertDialogHeader>
              <div className="flex flex-col gap-4 py-2">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    placeholder="Enter user story title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="url">URL Link</Label>
                  <Input
                    id="url"
                    type="url"
                    placeholder="https://example.com/ticket/123"
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="description">Short Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Brief description of the user story"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleSaveCard} disabled={!formData.title.trim()}>
                  {editingCardId ? "Save Changes" : "Add Card"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
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
                  onClick={() => handleEditCard(card)}
                >
                  <CardHeader className="relative">
                    <CardTitle className="pr-6 text-xs">{card.title}</CardTitle>
                    {card.url && (
                      <a
                        href={card.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[0.6rem] text-primary hover:underline truncate block"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {card.url}
                      </a>
                    )}
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
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      className="absolute right-2 top-8 opacity-0 transition-opacity group-hover/card:opacity-100"
                      onClick={(e) => {
                        e.stopPropagation()
                        onStartVoting(card)
                      }}
                    >
                      <span className="text-[0.5rem]">▶</span>
                      <span className="sr-only">Start voting</span>
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