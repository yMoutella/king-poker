import { useState } from "react"
import { cn } from "@/lib/utils"

const CARD_VALUES = ["0", "1", "2", "3", "5", "8", "13", "21", "34", "55", "89", "?", "☕"]

export default function PlayingCards() {
  const [selectedCard, setSelectedCard] = useState<string | null>(null)

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-background via-background to-transparent pb-3 pt-6">
      <div className="flex justify-center">
        <div className="flex gap-1.5 px-4">
          {CARD_VALUES.map((value) => (
            <button
              key={value}
              onClick={() => setSelectedCard(selectedCard === value ? null : value)}
              className={cn(
                "group relative flex h-16 w-11 cursor-pointer items-center justify-center rounded-md border-2 bg-card text-sm font-bold shadow-sm transition-all duration-200 hover:-translate-y-1.5 hover:shadow-md",
                selectedCard === value
                  ? "border-primary bg-primary/10 -translate-y-3 shadow-md shadow-primary/20"
                  : "border-border hover:border-primary/50"
              )}
            >
              <span
                className={cn(
                  "transition-colors",
                  selectedCard === value ? "text-primary" : "text-foreground"
                )}
              >
                {value}
              </span>
              {/* Card shine effect */}
              <div className="absolute inset-0 rounded-md bg-gradient-to-br from-white/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </button>
          ))}
        </div>
      </div>
      {selectedCard && (
        <p className="mt-1.5 text-center text-[0.65rem] text-muted-foreground">
          Selected: <span className="font-semibold text-primary">{selectedCard}</span>
        </p>
      )}
    </div>
  )
}