"use client"

import { useQuery } from "@tanstack/react-query";
import { fetchData } from "actions/api";
import { convertTaskList } from "actions/tasks";
import { ProfileCover } from "components/profile-cover";
import { Spinner } from "components/spinner";
import { TabsProfile } from "components/tabs-profile";
import { Badge } from "components/ui/badge";
import { Skeleton } from "components/ui/skeleton";
import { fetcher } from "lib/fetcher";
import { Student, Teacher, User } from "@prisma/client"
import { useEffect, useState } from "react";
import { Task } from "schemas/task";

interface ProfilePageProps {
    params: {
        profileId: string;
    }
};

const ProfilePage = ({
    params
}: ProfilePageProps) => {
    const [activeTasks, setaActiveTasks] = useState<Task[]>([]);
    const [historyTasks, setHistoryTasks] = useState<Task[]>([]);
    const [error, setError] = useState<number | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const { data: User } = useQuery<User>({
        queryKey: ["profileId", params.profileId],
        queryFn: () => fetcher(`/api/profile/${params.profileId}`),
    })

    const { data: StudentData } = useQuery<Student>({
        queryKey: ["student", params.profileId],
        queryFn: () => fetcher(`/api/student/${params.profileId}`),
    });

    const { data: TeacherData } = useQuery<Teacher>({
        queryKey: ["teacher", params.profileId],
        queryFn: () => fetcher(`/api/teacher/${params.profileId}`),
    });

    const fetchUserTasks = async () => {
        try {
            const res = await fetchData(`/tasks/active/${params.profileId}`, "GET", {});
            if (res?.status === 200) {
                const data = await res.json();
                setaActiveTasks(convertTaskList(data));
            } else {
                setError(res?.status);
            }

            const res2 = await fetchData(`/tasks/history/${params.profileId}`, "GET", {});
            if (res2?.status === 200) {
                const data = await res2.json();
                setHistoryTasks(convertTaskList(data));
            } else {
                setError(res2?.status);
            }
        } catch (err) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setIsLoading(true);
        fetchUserTasks();
        setIsLoading(false);
    }, []);

    if (isLoading) {
        return (
            <div className="h-full flex flex-col items-center justify-center space-y-4">
                <Spinner size="icon" />
                <h1>Loading profile data...</h1>
            </div>
        )
    }

    return (
        <div className="py-20">
            <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
                <div className="flex flex-col items-center space-y-4 mb-10">
                    <ProfileCover url={User?.image ?? ""} />
                    {User?.name && User?.surname && (
                        <h1 className="text-3xl font-bold">{User?.name} {User?.surname}</h1>
                    ) || (
                        <Skeleton className="h-6 w-[450px]" />
                    )}
                    <Badge className="text-base">
                        {User?.role === "ADMIN" ? "Admin" : User?.role === "TEACHER" ? "Teacher" : User?.role === "STUDENT" ? "Student" : (
                            <Skeleton className="h-4 w-[50px]" />
                        )}
                    </Badge>
                </div>
                <div className="flex flex-col items-center space-y-4">
                    <TabsProfile
                        name={User?.name ?? ""}
                        email={User?.email ?? ""}
                        bio={User?.bio ?? ""}
                        role={User?.role ?? "STUDENT"}
                        activeTasks={activeTasks}
                        historyTasks={historyTasks}
                        student={StudentData ?? null}
                        teacher={TeacherData ?? null}
                    />
                </div>

            </div>
        </div>
    )
};

export default ProfilePage;