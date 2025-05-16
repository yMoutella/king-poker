
import { StoryState, Story } from "../interfaces/story";
import { create } from "zustand";

export const useSelStory = create<StoryState>((set) => ({
    story: {
        id: null,
        title: null,
        description: null
    },
    setStory: (story: Story) => set({ story }),
    setDescription: (description: string) => set((state) => ({
        story: {
            ...state.story,
            description: description
        }
    }
    ))
}));