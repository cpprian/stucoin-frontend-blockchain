import { Button } from "components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export type TopStudents = {
    name: string;
    surname: string;
    email: string;
    student: {
        totalScore: number;
    };
};

export const studentColumns: ColumnDef<TopStudents>[] = [
    {
        accessorKey: "index",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Rank
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return (
                <div className="flex items-center justify-center">
                    <span className="text-lg font-medium">{row.index + 1}</span>
                </div>
            )
        }
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "surname",
        header: "Surname",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "student",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Total Score
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return (
                <div className="flex items-center justify-center">
                    <span className="text-lg font-medium">{row.original.student.totalScore}</span>
                </div>
            )
        }
    },
];

