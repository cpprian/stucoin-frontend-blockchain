"use client";

import { useCurrentRole } from "hooks/use-current-role";
import { UserButton } from "components/auth/user-button";
import { cn } from "lib/utils";
import { Apple, ChevronsLeft, FileText, GiftIcon, MenuIcon, PlusCircle, Settings, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { ElementRef, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { Item } from "./item";
import { useCurrentUser } from "hooks/use-current-user";
import { fetchData } from "actions/api";
import { ToastAction } from "components/ui/toast";
import { useToast } from "components/ui/use-toast";

export const Navigation = () => {
    const role = useCurrentRole();
    const user = useCurrentUser();
    const router = useRouter();
    const pathname = usePathname();
    const isMobile = useMediaQuery("(max-width: 768px)");
    const { toast } = useToast();

    const onCreate = async () => {
        try {
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
        } 
    };

    const isResizingRef = useRef(false);
    const sidebarRef = useRef<ElementRef<"aside">>(null);
    const navbarRef = useRef<ElementRef<"div">>(null);
    const [isResetting, setIsResetting] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);

    useEffect(() => {
        if (isMobile) {
            collapse();
        } else {
            resetWidth();
        }
    }, [isMobile]);

    useEffect(() => {
        if (isMobile) {
            collapse();
        }
    }, [pathname, isMobile]);

    const collapse = () => {
        if (sidebarRef.current && navbarRef.current) {
            setIsCollapsed(true);
            setIsResetting(true);

            sidebarRef.current.style.width = "0";
            navbarRef.current.style.setProperty("width", "100%");
            navbarRef.current.style.setProperty("left", "0");
            setTimeout(() => setIsResetting(false), 300);
        }
    };

    const resetWidth = () => {
        if (sidebarRef.current && navbarRef.current) {
            setIsCollapsed(false);
            setIsResetting(true);

            sidebarRef.current.style.width = isMobile ? "100%" : "240px";
            navbarRef.current.style.setProperty(
                "width",
                isMobile ? "0" : "calc(100% - 240px)"
            );
            navbarRef.current.style.setProperty(
                "left",
                isMobile ? "100%" : "240px"
            );
            setTimeout(() => setIsResetting(false), 300);
        }
    };

    const handleMouseMove = (event: MouseEvent) => {
        if (!isResizingRef.current) return;
        let newWidth = event.clientX;

        if (newWidth < 240) newWidth = 240;
        if (newWidth > 480) newWidth = 480;

        if (sidebarRef.current && navbarRef.current) {
            sidebarRef.current.style.width = `${newWidth}px`;
            navbarRef.current.style.setProperty("left", `${newWidth}px`);
            navbarRef.current.style.setProperty(
                "width",
                `calc(100% - ${newWidth}px)`
            );
        }
    };

    const handleMouseUp = () => {
        isResizingRef.current = false;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    }

    const handleCreate = () => {
        onCreate();
    };

    return (
        <>
            <aside
                ref={sidebarRef}
                className={cn(
                    "group/sidebar h-full bg-secondary overflow-y-auto relative flex w-60 flex-col",
                    isResetting && "transition-all ease-in-out duration-300",
                    isMobile && "w-0"
                )}
            >
                <div
                    onClick={collapse}
                    role="button"
                    className={cn(
                        "h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition",
                        isMobile && "opacity-100"
                    )}
                >
                    <ChevronsLeft className="h-6 w-6" />
                </div>
                <div>
                    <UserButton />
                    <Item
                        label="Top students"
                        icon={Apple}
                        onClick={() => {
                            router.push("/students");
                        }}
                    />
                    <Item
                        label={role === "TEACHER" ? "My tasks" : "See more tasks"}
                        icon={FileText}
                        onClick={() => {
                            router.push("/tasks");
                        }}
                    />
                    {(role === "STUDENT" || role === "ADMIN") && (
                        <Item
                            label="Rewards"
                            icon={GiftIcon}
                            onClick={() => {
                                router.push("/rewards");
                            }}
                        />
                    )}
                    <Item
                        label="My profile"
                        icon={User}
                        onClick={() => {
                            router.push(`/profile/${user?.id}`);
                        }}
                    />
                    {role === "TEACHER" && (
                        <Item
                            onClick={handleCreate}
                            label="New page"
                            icon={PlusCircle}
                        />
                    )}
                    <Item
                        label="Settings"
                        icon={Settings}
                        onClick={() => {
                            router.push(`/settings`);
                        }}
                    />
                </div>
            </aside>
            <div
                ref={navbarRef}
                className={cn(
                    "absolute top-0 left-60 w-[calc(100%-240px)]",
                    isResetting && "transition-all ease-in-out duration-300",
                    isMobile && "left-0 w-full"
                )}
            >
                <nav className="bg-transparent px-3 py-2 w-full">
                    {isCollapsed && <MenuIcon onClick={resetWidth} role="button" className="h-6 w-6 text-muted-foreground" />}
                </nav>
            </div>
        </>
    );
};