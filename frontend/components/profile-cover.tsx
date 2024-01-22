"use client";

import { fetchData } from "actions/api";
import { useCoverImage } from "hooks/use-cover-image";
import { useEdgeStore } from "lib/edgestore";
import { cn } from "lib/utils";
import { ImageIcon, X } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Task } from "schemas/task";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { FaUser } from "react-icons/fa";

interface CoverImageProps {
    url?: string;
    currentUser?: string;
}

export const ProfileCover = ({
    url,
}: CoverImageProps) => {
    const params = useParams();

    return (
        <div>
            <Avatar className="h-24 w-24">
                <AvatarImage src={url || ""} />
                <AvatarFallback className="bg-sky-500">
                    <FaUser className="text-white h-12 w-12" />
                </AvatarFallback>
            </Avatar>
        </div>
    );
}

ProfileCover.Skeleton = function CoverSkeleton() {
    return (
        <Skeleton className="h-24 w-24 rounded-full" />
    )
}