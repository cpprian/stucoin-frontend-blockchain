import * as React from "react"

import { ScrollArea } from "components/ui/scroll-area"
import { Separator } from "components/ui/separator"
import { Task } from "schemas/task"
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { Badge } from "./ui/badge";

interface ScrollUserTasksProps {
    tasks: Task[];
};

export function ScrollUserTasks({
    tasks,
}: ScrollUserTasksProps) {
    const router = useRouter();
    return (
        <ScrollArea className="h-96 w-auto rounded-md border">
            <div className="p-4">
                <h4 className="mb-5 text-sm font-medium leading-none">Tasks</h4>
                {tasks.map((task) => (
                    <>
                        <div key={task.ID} className="justify-between flex">
                            <div className="flex justify-start text-xm overflow-hidden">
                                {task.Title.length > 20 ? task.Title.slice(0, 20) + "..." : task.Title}
                            </div>
                            <div className="flex w-12 justify-center">
                                <Badge
                                    className="text-xm"
                                    variant="outline"
                                >
                                    {task.Completed}
                                </Badge>
                            </div>
                            <div className="flex w-12 justify-end text-xs">
                                <Button
                                    variant="outline"
                                    className="background-transparent"
                                    onClick={() => {

                                        router.push(`/tasks/${task.ID}`);
                                    }}
                                >
                                    View
                                </Button>
                            </div>
                        </div>
                        <Separator className="my-2" />
                    </>
                ))}
            </div>
        </ScrollArea>
    )
};
