"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/lib/api";

const Page = () => {
  const [studentsCount, setStudentsCount] = useState(0);
  const [strandsCount, setStrandsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsRes, strandsRes] = await Promise.all([
          api.get("/api/students"),
          api.get("/api/strands"),
        ]);

        const students = Array.isArray(studentsRes.data.data)
          ? studentsRes.data.data.length
          : studentsRes.data.length || 0;

        const strands = Array.isArray(strandsRes.data.data)
          ? strandsRes.data.data.length
          : strandsRes.data.length || 0;

        setStudentsCount(students);
        setStrandsCount(strands);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen p-10 bg-gray-100">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-primary">Welcome, Admin 👋</h1>
        <p className="text-gray-600 mt-2">Here’s a quick overview of the student and strand data.</p>
      </header>

      {loading ? (
        <p className="text-center text-lg">Loading...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="rounded-xl shadow-md hover:shadow-lg transition-all">
            <CardContent className="p-8 text-center">
              <h4 className="text-2xl font-semibold">Records of Students</h4>
              <p className="text-5xl font-bold text-primary mt-4">{studentsCount}</p>
            </CardContent>
          </Card>

          <Card className="rounded-xl shadow-md hover:shadow-lg transition-all">
            <CardContent className="p-8 text-center">
              <h4 className="text-2xl font-semibold">Records of Strands</h4>
              <p className="text-5xl font-bold text-green-500 mt-4">{strandsCount}</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Page;
