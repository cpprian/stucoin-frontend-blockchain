"use client";

import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";

import { useCurrentUser } from "hooks/use-current-user";
import { Button } from "components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "components/ui/dropdown-menu";
import { Skeleton } from "components/ui/skeleton";

interface MenuProps {
  documentId: string;
};

export const Menu = ({
  documentId
}: MenuProps) => {
  const router = useRouter();
  const user = useCurrentUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="ghost">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-60" 
        align="end" 
        alignOffset={8} 
        forceMount
      >
        <DropdownMenuSeparator />
        <div className="text-xs text-muted-foreground p-2">
          Last edited by: {user?.name}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

Menu.Skeleton = function MenuSkeleton() {
  return (
    <Skeleton className="h-10 w-10" />
  )
}