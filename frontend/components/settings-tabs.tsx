import { Student, Teacher, User } from "@prisma/client"
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
import { Textarea } from "./ui/textarea"

interface SettingsTabsProps {
    user: User | undefined;
    student?: Student | undefined;
    teacher?: Teacher | undefined;
};

export function SettingsTabs({
    user,
    student,
    teacher,
}: SettingsTabsProps) {
    return (
        <Tabs defaultValue="account" className="w-[600px]">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
                {(student || teacher) && (
                    <TabsTrigger value="university">University</TabsTrigger>
                )}
            </TabsList>
            <TabsContent value="account">
                <Card>
                    <CardHeader>
                        <CardTitle>Account</CardTitle>
                        <CardDescription>
                            Make changes to your account here. Click save when you're done.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" defaultValue={user?.name ?? ""} />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="username">Email</Label>
                            <Input id="email" defaultValue={user?.email ?? ""} />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="bio">Bio</Label>
                            <Textarea placeholder={user?.bio ?? "Type your bio here."} />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button>Save changes</Button>
                    </CardFooter>
                </Card>
            </TabsContent>
            <TabsContent value="password">
                <Card>
                    <CardHeader>
                        <CardTitle>Password</CardTitle>
                        <CardDescription>
                            Change your password here. After saving, you'll be logged out.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Label htmlFor="current">Current password</Label>
                            <Input id="current" type="password" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="new">New password</Label>
                            <Input id="new" type="password" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="confirm">Confirm password</Label>
                            <Input id="confirm" type="password" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button>Save password</Button>
                    </CardFooter>
                </Card>
            </TabsContent>
            {(user?.role === "STUDENT" || user?.role === "TEACHER") && (
                <TabsContent value="university">
                    <Card>
                        <CardHeader>
                            <CardTitle>University</CardTitle>
                            <CardDescription>
                                Change your university here.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {user?.role === "STUDENT" && (
                                <>
                                    <div className="space-y-1">
                                        <Label htmlFor="university">University</Label>
                                        <Input id="university" defaultValue={student?.university ?? ""} />
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="faculty">Faculty</Label>
                                        <Input id="faculty" defaultValue={student?.faculty ?? ""} />
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="yearOfStudy">Year of study</Label>
                                        <Input id="yearOfStudy" defaultValue={student?.yearOfStudy ?? ""} />
                                    </div>
                                </>
                            )}
                            {user?.role === "TEACHER" && (
                                <>
                                    <div className="space-y-1">
                                        <Label htmlFor="university">University</Label>
                                        <Input id="university" defaultValue={teacher?.university ?? ""} />
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="faculty">Faculty</Label>
                                        <Input id="faculty" defaultValue={teacher?.faculty ?? ""} />
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="department">Department</Label>
                                        <Input id="department" defaultValue={teacher?.department ?? ""} />
                                    </div>
                                </>
                            )}
                        </CardContent>
                        <CardFooter>
                            <Button>Save changes</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            )}
        </Tabs>
    )
}
