"use client";

import { convertTaskList } from "actions/tasks";
import { taskColumns } from "data/task-columns";
import { DataTable } from "components/data-table";
import { Spinner } from "components/spinner";
import { Button } from "components/ui/button";
import { ToastAction } from "components/ui/toast";
import { useToast } from "components/ui/use-toast";
import { PlusCircle, User } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Task } from "schemas/task";
import { fetchData } from "actions/api";
import { useCurrentUser } from "hooks/use-current-user";
import { useCurrentRole } from "hooks/use-current-role";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "lib/fetcher";


const TaskPage = () => {
    const router = useRouter();
    const user = useCurrentUser();
    const role = useCurrentRole();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    const [tasks, setTasks] = useState<Task[]>([]);
    const [error, setError] = useState<number | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);

    const { data: userData } = useQuery<User>({
        queryKey: ["profile", user?.id],
        queryFn: () => fetcher(`/api/profile/${user?.id}`),
    });

    const fetchTeacherTasks = async () => {
        try {
            const res = await fetchData(`/tasks/teacher/${user?.id}`, "GET", {});
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

    const fetchStudentTasks = async () => {
        try {
            const res = await fetchData(`/tasks`, "GET", {});
            if (res?.status === 200) {
                const data = await res.json();
                setTasks(convertTaskList(data));
                console.log("All tasks: ", data);
            } else {
                setError(res?.status);
            }
        } catch (err) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (role === "TEACHER") {
            setIsLoading(true);
            fetchTeacherTasks();
        } else {
            setIsLoading(true);
            fetchStudentTasks();
            console.log("Student tasks: ", tasks)
        }
    }, [role]);

    const onCreate = async () => {
        try {
            setLoading(true);
            const task = {
                title: "Untitled",
                description: "",
                coverImage: "",
                points: 0,
                completed: "OPEN",
                owner: user?.id,
                inCharge: "",
                files: [],
                tags: [],
            }

            const res = await fetchData("/tasks", "POST", task);
            if (res?.status === 200) {
                res.json().then((data) => {
                    toast({
                        title: "Task created",
                        description: "Your task has been created successfully.",
                    });
                    router.push(`/tasks/${data.insertedID}`);
                });
            } else {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong",
                    description: "There was an error creating a new task. Please try again later.",
                    action: <ToastAction altText="Try again">Try again</ToastAction>
                });
            }
        } catch (err: any) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong",
                description: "There was an error creating a new task. Please try again later.",
                action: <ToastAction altText="Try again">Try again</ToastAction>
            });
        } finally {
            setLoading(false);
        }
    };

    if (!userData?.walletAddress) {
        return (
            <div className="h-full flex flex-col items-center justify-center space-y-4">
                <div className="flex flex-col items-center space-y-4">
                    <Image
                        src="/empty.png"
                        height="500"
                        width="500"
                        alt="Empty"
                    />
                    <h2 className="text-lg font-medium">
                        Oh no! You don't have a wallet yet. Add one now!
                    </h2>
                    <Button onClick={() => router.push("/settings")}>
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Add a wallet
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col items-center justify-center space-y-4">
            {isLoading && (
                <>
                    <Spinner size="icon" />
                    <h2 className="text-lg font-medium">
                        Loading tasks...
                    </h2>
                </>
            )}
            {!isLoading && tasks.length > 0 && (
                <DataTable 
                    columns={taskColumns}
                    data={
                        tasks.map((task) => ({
                            Title: task.Title,
                            Completed: task.Completed,
                            Points: task.Points,
                            ID: task.ID,
                            Description: task.Description,
                        }))
                    }
                />
            )}
            {role === "TEACHER" && !isLoading && tasks.length === 0 && (
                <>
                    <Image
                        src="/empty.png"
                        height="500"
                        width="500"
                        alt="Empty"
                    />
                    <h2 className="text-lg font-medium">
                        Oh no! You don't have any tasks yet. Create one now!
                    </h2>
                    {!loading && (
                        <Button onClick={onCreate}>
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Create a new task
                        </Button>
                    )}
                    {loading && (
                        <Spinner size="lg" />
                    )}
                </>
            )}
        </div>
    );
}

export default TaskPage;