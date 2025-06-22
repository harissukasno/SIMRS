"use client";
import React from "react";
import Badge from "../ui/badge/Badge";
import { ArrowDownIcon, ArrowUpIcon, UserIcon } from "@/icons";
import { useEffect, useState } from 'react';

export const HumanResourceMetrics = () => {    
  const [pasienCount, setPasienCount] = useState<number>(0);
  const [dokterCount, setDokterCount] = useState<number>(0);
  
  const fetchPasienCount = async () => {
    try {      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pasien/total_count`);
      const data = await response.json();      
      setPasienCount(data.count);
    }
    catch (error) {
      console.error('Error fetching pasien count:', error);
    }
  };

  const fetchDoctorCount = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/doctor/count`);
      const data = await response.json();
      setDokterCount(data);
    } catch (error) {
      console.error('Error fetching doctor count:', error);
    }
  };

  useEffect(() => {                   
    fetchPasienCount();
    fetchDoctorCount();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <UserIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Pasien
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {pasienCount}
            </h4>
          </div>
          <Badge color="success">
            <ArrowUpIcon />
            11.01%
          </Badge>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <UserIcon className="text-gray-800 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Dokter
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {dokterCount}
            </h4>
          </div>

          <Badge color="error">
            <ArrowDownIcon className="text-error-500" />
            9.05%
          </Badge>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}
    </div>
  );
};
