"use client"

import { Student, Teacher, User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { SettingsTabs } from "components/settings-tabs";
import { Skeleton } from "components/ui/skeleton";
import { Spinner } from "components/ui/spinner";
import { useCurrentUser } from "hooks/use-current-user";
import { fetcher } from "lib/fetcher";

const SettingsPage = () => {
    const user = useCurrentUser();

    const { data: userData } = useQuery<User>({
        queryKey: ["profile", user?.id],
        queryFn: () => fetcher(`/api/profile/${user?.id}`),
    });

    const { data: studentData } = useQuery<Student>({
        queryKey: ["student", user?.id],
        queryFn: () => fetcher(`/api/student/${user?.id}`),
    });

    const { data: teacherData } = useQuery<Teacher>({
        queryKey: ["teacher", user?.id],
        queryFn: () => fetcher(`/api/teacher/${user?.id}`),
    });

    if (userData === undefined) return (
        <div className="py-20">
            <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
                <div className="flex flex-col items-center space-y-4 mb-10">
                    <h1 className="text-4xl font-bold">Settings</h1>
                </div>
                <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
                    <div className="space-y-4 pl-8 pt-4">
                        <Skeleton className="h-4 w-[50%]" />
                        <Skeleton className="h-12 w-[80%]" />
                        <Skeleton className="h-4 w-[40%]" />
                        <Skeleton className="h-4 w-[60%]" />
                        <Skeleton className="h-4 w-[60%]" />
                        <Skeleton className="h-4 w-[60%]" />
                        <Skeleton className="h-4 w-[60%]" />
                        <Skeleton className="h-4 w-[40%]" />
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="py-20">
            <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
                <div className="flex flex-col items-center space-y-4 mb-10">
                    <h1 className="text-4xl font-bold">Settings</h1>
                </div>
                <div className="flex flex-col items-center space-y-4">
                    <SettingsTabs
                        user={userData}
                        student={studentData}
                        teacher={teacherData}
                    />
                </div>
            </div>
        </div>
    )
};

export default SettingsPage;