import { TeamState } from "@/interfaces/teams"
import { create } from "zustand"

export const useSelTeam = create<TeamState>((set) => ({
    team: { name: null, date: null },
    selectTeam: ({ name, date }) => set({ team: { name: name, date: date } }),
}))