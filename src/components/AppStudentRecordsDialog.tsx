'use client';
import React, { useEffect, useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '@/app/globals.css';
import { Student } from '@/types/Student';
import { fetchAttendanceByStudentNumber } from '@/lib/AttendanceRecordAPI';

const locales = {
    'en-US': require('date-fns/locale/en-US'),
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
    getDay,
    locales,
});

interface Props {
    student: Student;
}

interface AttendanceRecord {
    id: number;
    date: string;
    time_in: string;
    time_out: string;
}

interface CalendarEvent {
    id: number;
    title: string;
    start: Date;
    end: Date;
    allDay: boolean;
}

const AppStudentRecordsDialog: React.FC<Props> = ({ student }) => {
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const response = await fetchAttendanceByStudentNumber(Number(student?.student_number));

                console.log("API Response:", response);

                const records: AttendanceRecord[] = Array.isArray(response)
                    ? response
                    : [];

                console.log("Records:", records);

                const formattedEvents: CalendarEvent[] = records.map((record) => ({
                    id: record.id,
                    title: `${record.time_in} - ${record.time_out}`,
                    start: new Date(`${record.date}T${record.time_in}`),
                    end: new Date(`${record.date}T${record.time_out}`),
                    allDay: false,
                }));

                setEvents(formattedEvents);
            } catch (error) {
                console.error('Failed to fetch attendance records:', error);
                setEvents([]);
            } finally {
                setLoading(false);
            }
        };

        fetchRecords();
    }, [student?.student_number]);

    console.log("events ", events);

    return (
        <div className="p-6 rounded-lg w-full mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Attendance for {student?.user?.first_name} {student?.user?.last_name}
            </h2>

            {loading ? (
                <div className="flex justify-center items-center h-80">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : (
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 600 }}
                    className="rounded-lg shadow-md"
                    eventPropGetter={(event) => ({
                        style: {
                            backgroundColor: '#4CAF50',
                            color: '#fff',
                            borderRadius: '5px',
                            padding: '5px',
                        },
                    })}
                />
            )}
        </div>
    );
};

export default AppStudentRecordsDialog;
