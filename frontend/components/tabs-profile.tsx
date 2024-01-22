import {
    Card,
    CardContent,
    CardDescription,
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
import { Role, Student, Teacher } from "@prisma/client"
import { Textarea } from "./ui/textarea"

interface TabsProfileProps {
    name: string,
    email: string,
    bio: string,
    role: Role,
    activeTasks: Task[],
    historyTasks: Task[],
    student?: Student | null,
    teacher?: Teacher | null,
};

export function TabsProfile({
    name,
    email,
    bio,
    role,
    activeTasks,
    historyTasks,
    student,
    teacher,
}: TabsProfileProps) {
    return (
        <Tabs defaultValue="about" className="w-[600px]">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="active">Active tasks</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>
            <TabsContent value="about">
                <Card>
                    <CardHeader>
                        <CardTitle>About</CardTitle>
                        <CardDescription>
                            {name}'s profile.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <Label>Email</Label>
                        <Input value={email} disabled />
                        <Label>Bio</Label>
                        <Textarea value={bio} disabled />
                        {role === "STUDENT" && (
                            <>
                                <Label>University</Label>
                                <Input value={student?.university ?? ""} disabled />
                                <Label>Faculty</Label>
                                <Input value={student?.faculty ?? ""} disabled />
                                <Label>Year</Label>
                                <Input value={student?.yearOfStudy ?? ""} disabled />
                                <Label>Total score</Label>
                                <Input value={student?.totalScore ?? ""} disabled />
                            </>
                        )}
                        {teacher && (
                            <>
                                <Label>University</Label>
                                <Input value={teacher?.university ?? ""} disabled />
                                <Label>Faculty</Label>
                                <Input value={teacher?.faculty ?? ""} disabled />
                                <Label>Department</Label>
                                <Input value={teacher?.department ?? ""} disabled />
                                <Label>Interests</Label>
                                {teacher?.interests.map((interest, idx) => (
                                    <Label key={idx}>{interest}</Label>
                                ))}
                            </>
                        )}
                    </CardContent>
                </Card>
            </TabsContent>
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
