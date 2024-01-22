"use client";

import { DataTable } from "components/data-table";
import { Spinner } from "components/spinner";
import { useEffect, useState } from "react";
import { TopStudents, studentColumns } from "data/student-columns";

const TaskPage = () => {
    const [students, setStudents] = useState<TopStudents[]>([]);
    const [error, setError] = useState<number | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);

    const fetchTopStudents = async () => {
        try {
            const res = await fetch(`/api/students`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (res?.status === 200) {
                const data = await res.json();
                setStudents(data);
                console.log(data);
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
        fetchTopStudents();
    }, []);

    return (
        <div className="h-full flex flex-col items-center justify-center space-y-4">
            {isLoading && (
                <>
                    <Spinner size="icon" />
                    <h2 className="text-lg font-medium">
                        Loading students...
                    </h2>
                </>
            )}
            {!isLoading && students.length > 0 && (
                <DataTable 
                    columns={studentColumns}
                    data={
                        students.map((student) => ({
                            name: student.name,
                            surname: student.surname,
                            email: student.email,
                            student: student.student,
                        }))
                    }
                    enableFilters={false}
                />
            )}
            {!isLoading && students.length === 0 && (
                <h2 className="text-lg font-medium">
                    No students found...
                </h2>
            )}
        </div>
    );
}

export default TaskPage;