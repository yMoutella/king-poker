
export interface Story {
    id: string | null;
    title: string | null;
    description: string | null;
}

export interface StoryState {
    story: Story;
    setStory: (story: Story) => void;
    setDescription: (description: string) => void;
}

