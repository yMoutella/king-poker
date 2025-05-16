import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel, SidebarGroupContent,
    SidebarMenu, SidebarMenuItem
} from "@/components/ui/sidebar"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Story } from "@/interfaces/story";

const stories: Story[] = [
    { id: "1", title: "Story-33", description: "Enhance the user authentication process for better UX." },
    { id: "2", title: "Story-19", description: "Implement a dark mode toggle for the application." },
    { id: "3", title: "Story-29", description: "Resolve the issue with failed transactions in the payment gateway." },
    { id: "4", title: "Story-11", description: "Improve the performance of the dashboard for faster load times." },
    { id: "5", title: "Story-9", description: "Allow users to upload profile pictures and update their information." },
    { id: "6", title: "Story-99", description: "Add real-time notifications for user activities." },
    { id: "7", title: "Story-130", description: "Clean up and organize the existing codebase for maintainability." },
    { id: "8", title: "Story-3", description: "Enable the application to support multiple languages." },
    { id: "9", title: "Story-21", description: "Implement additional security measures to protect user data." },
    { id: "10", title: "Story-None", description: "Design an onboarding experience for new users." }
];

export default function AppSidebar() {
    return (
        <>
            <Sidebar side="right" variant="floating">
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel className="text-center flex justify-center text-accent-foreground text-2xl mb-1.5">Issues</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {stories.map((story) => (
                                    <SidebarMenuItem key={story.title}>
                                        <SidebarContent>
                                            <Card>
                                                <CardHeader>
                                                    <CardTitle>
                                                        {story.title}
                                                    </CardTitle>
                                                    <CardDescription>{story.description}</CardDescription>
                                                </CardHeader>
                                                <CardFooter className="flex justify-between">
                                                    <Button variant="default" className="cursor-pointer">Vote now</Button>
                                                    <Button variant="link" className="cursor-pointer">Edit issue</Button>
                                                </CardFooter>
                                            </Card>
                                        </SidebarContent>
                                    </SidebarMenuItem>
                                ))}
                                <Button variant="ghost" className="cursor-pointer hover:text-primary text-primary">Add issue <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                                </Button>
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>
        </>
    )
}