'use client';
import React, { useState } from 'react';
import {
    ColumnDef,
    PaginationState,
    SortingState,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import AppTable from '@/components/AppTable';
import { ArrowUpDown } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Student } from '@/types/Student';
import { useStudents } from '@/lib/StudentAPI';
import AppStudentRecordsDialog from './AppStudentRecordsDialog';

export default function AppStudentsTable() {
    const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    const [searchKeyword, setSearchKeyword] = useState('');
    const [sorting, setSorting] = useState<SortingState>([]);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

    const { data, isLoading } = useStudents(
        pageIndex + 1,
        pageSize,
        searchKeyword,
        sorting.map((item) => item.id).join(','),
        Boolean(sorting.map((item) => item.desc).join(','))
    );

    const columns: ColumnDef<Student>[] = [
        {
            accessorKey: 'student',
            header: ({ column }) => (
                <Button
                    variant='ghost'
                    className='pl-0 text-left hover:!bg-transparent'
                    onClick={() => column.toggleSorting()}
                >
                    Student
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                </Button>
            ),
            cell: ({ row }) => {
                const { first_name, last_name } = row.original.user || {};

                return (
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button
                                variant="link"
                                onClick={() => setSelectedStudent(row.original)}
                            >
                                {`${first_name} ${last_name}`}
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="w-full max-w-[70vw] h-[70vh]">
                            {selectedStudent && (
                                <AppStudentRecordsDialog student={selectedStudent} />
                            )}
                        </DialogContent>
                    </Dialog>

                );
            },
            enableSorting: true,
        },
        {
            accessorKey: 'student_number',
            header: ({ column }) => (
                <Button
                    variant='ghost'
                    className='pl-0 text-left hover:!bg-transparent'
                    onClick={() => column.toggleSorting()}
                >
                    Student No.
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                </Button>
            ),
            cell: ({ row }) => row.original.student_number,
            enableSorting: true,
        },
        {
            accessorKey: 'strand',
            header: ({ column }) => (
                <Button
                    variant='ghost'
                    className='pl-0 text-left hover:!bg-transparent'
                    onClick={() => column.toggleSorting()}
                >
                    Strand
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                </Button>
            ),
            cell: ({ row }) => row.original.strand?.name,
            enableSorting: true,
        },
    ];

    const pagination = React.useMemo(() => ({ pageIndex, pageSize }), [pageIndex, pageSize]);

    const table = useReactTable({
        data: data?.data ?? Array(10).fill({}),
        columns: isLoading
            ? columns.map((column) => ({
                ...column,
                cell: () => <Skeleton className='h-12 w-full' />,
            }))
            : columns,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        onPaginationChange: setPagination,
        onGlobalFilterChange: setSearchKeyword,
        pageCount: data?.last_page ?? -1,
        manualPagination: true,
        manualFiltering: true,
        manualSorting: true,
        state: {
            sorting,
            pagination,
            globalFilter: searchKeyword,
        },
    });

    return (
        <div>
            <AppTable table={table} />
        </div>
    );
}
