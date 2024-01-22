import { Button } from "components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "components/ui/card"
import { Input } from "components/ui/input"
import { Label } from "components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "components/ui/tabs"
import { Task } from "schemas/task"
import { ScrollUserTasks } from "./scroll-user-tasks"

interface TabsProfileProps {
    name: string,
    activeTasks: Task[],
    historyTasks: Task[],
};

export function TabsProfile({
    name,
    activeTasks,
    historyTasks,
}: TabsProfileProps) {
    return (
        <Tabs defaultValue="active" className="w-[600px]">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="active">Active tasks</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>
            <TabsContent value="active">
                <Card>
                    <CardHeader>
                        <CardTitle>Active tasks</CardTitle>
                        <CardDescription>
                            {name}'s active tasks.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <ScrollUserTasks tasks={activeTasks} />
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="history">
                <Card>
                    <CardHeader>
                        <CardTitle>History</CardTitle>
                        <CardDescription>
                            {name}'s history.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <ScrollUserTasks tasks={historyTasks} />
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    )
}
