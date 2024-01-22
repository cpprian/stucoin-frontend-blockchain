"use client"

import { useQuery } from "@tanstack/react-query";
import { fetchData } from "actions/api";
import { convertTaskList } from "actions/tasks";
import { Spinner } from "components/spinner";
import { fetcher } from "lib/fetcher";
import { User } from "next-auth";
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
    const [tasks, setTasks] = useState<Task[]>([]);
    const [error, setError] = useState<number | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const { data: User } = useQuery<User>({
        queryKey: ["profile", params.profileId],
        queryFn: () => fetcher(`/api/profile/${params.profileId}`),
    })

    const fetchUserTasks = async () => {
        try {
            const res = await fetchData(`/tasks/teacher/${params.profileId}`, "GET", {});
            if (res?.status === 200) {
                const data = await res.json();
                setTasks(convertTaskList(data));
            } else {
                setError(res?.status);
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
        <div>
            <h1>Profile page</h1>
            <h2>{User?.email}</h2>
            <h2>{User?.name}</h2>
            <ul>
                {tasks.map((task) => (
                    <li key={task.ID}>
                        <h3>{task.Title}</h3>
                        <p>{task.Description}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
};

export default ProfilePage;