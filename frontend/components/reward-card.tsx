import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent } from "components/ui/card"
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "components/ui/carousel"
import { Button } from "./ui/button"
import { Reward } from "schemas/reward"

interface RewardCardProps {
    rewards: Reward[];
};

export function CarouselReward({
    rewards,
}: RewardCardProps) {
    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)
    const [count, setCount] = React.useState(0)

    React.useEffect(() => {
        if (!api) {
            return
        }

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)

        api.on("select", () => {
            console.log("current")
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api])
    const plugin = React.useRef(
        Autoplay({ delay: 5000, stopOnInteraction: true })
    )

    return (
        <>
            <h1 className="text-2xl font-semibold">Available Rewards</h1>
            <Carousel
                plugins={[plugin.current]}
                className="w-full max-w-lg"
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
                setApi={setApi}
            >
                <CarouselContent>
                    {rewards.map((reward, index) => (
                        <CarouselItem key={index}>
                            <div className="p-1">
                                <Card>
                                    <CardContent className="flex flex-col aspect-square items-center justify-center p-6">
                                        <span className="text-4xl font-semibold py-2">{reward.Name}</span>
                                        <span className="text-muted-foreground py-6">{reward.Description}</span>
                                        <span className="text-muted-foreground py-6">Points: {reward.Points}</span>
                                        <Button
                                            onClick={() => console.log("View")}
                                        >
                                            Exchange Now
                                        </Button>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
            <div className="py-2 text-center text-muted-foreground">
                Slide {current} of {count}
            </div>
        </>
    )
}
