"use client";

import { Spinner } from "components/spinner";
import { useEffect, useState } from "react";
import Image from "next/image";
import { fetchData } from "actions/api";
import { CarouselReward } from "components/reward-card";
import { useCurrentRole } from "hooks/use-current-role";
import { Button } from "components/ui/button";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "components/ui/use-toast";
import { ToastAction } from "components/ui/toast";
import { Reward } from "schemas/reward";

const RewardsPage = () => {
    const role = useCurrentRole();
    const router = useRouter();
    const [rewards, setRewards] = useState<Reward[]>([]);
    const [error, setError] = useState<number | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);

    const fetchRewards = async () => {
        try {
            const res = await fetchData(`/rewards`, "GET", {});
            if (res?.status === 200) {
                const data = await res.json();
                setRewards(data);
                console.log(data);
            } else {
                console.error(res);
                setError(res?.status);
            }
        } catch (err) {
            console.error(err);
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchRewards();
    }, []);

    const onCreate = async () => {
        try {
            setIsLoading(true);
            const reward = {
                title: "Untitled",
                description: "",
                coverImage: "",
                points: 0,
            }

            const res = await fetchData("/rewards", "POST", reward);
            if (res?.status === 200) {
                res.json().then((data) => {
                    toast({
                        title: "Reward created",
                        description: "New reward has been created successfully.",
                    });
                    router.push(`/rewards/${data.insertedID}`);
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
            setIsLoading(false);
        }
    };

    return (
        <div className="h-full flex flex-col items-center justify-center space-y-4">
            {isLoading && (
                <>
                    <Spinner size="icon" />
                    <h2 className="text-lg font-medium">
                        Loading available rewards...
                    </h2>
                </>
            )}
            {!isLoading && rewards.length > 0 && (
                <CarouselReward rewards={rewards} />
            )}
            {!isLoading && rewards.length === 0 && (
                <>
                    <Image
                        src="/empty.png"
                        height="500"
                        width="500"
                        alt="Empty"
                    />
                    <h2 className="text-lg font-medium">
                        There is no rewards yet.
                    </h2>
                </>
            )}
            {role === "ADMIN" && (
                <Button onClick={onCreate}>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Create a new reward
                </Button>
            )}
        </div>
    );
}

export default RewardsPage;