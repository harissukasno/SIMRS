'use client';

import React from 'react';
import { useEffect, useState } from 'react';
import PasienTab from '@/components/common/PasienTab';
import { useRouter } from 'next/navigation';

interface Pasien {
    id: number;
    nama_lengkap: string;
    nama_panggilan: string;
    tanggal_lahir: Date;
    jenis_kelamin: 'Male' | 'Female';
    golongan_darah?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
    nomor_identitas?: string;
    nomor_hp: string;
    email?: string;
    alamat?: string;
    kontak_darurat_nama?: string;
    kontak_darurat_hp?: string;
    hubungan_dengan_pasien?: string;
    riwayat_medis?: string;
    alergi?: string;
    obat_saat_ini?: string;
    riwayat_medis_keluarga?: string;
    status_vaksinasi?: string;
    disabilitas?: string;
    penyedia_asuransi?: string;
    nomor_polis_asuransi?: string;
    masa_berlaku_asuransi?: Date;    
}

export default function PatientDashboardPage() {    

    const router = useRouter();
    
    const [pasiens, setPasiens] = useState<Pasien[]>([]);
    const [maniputalatedPatients, setManipulatedPatients] = useState<Pasien[]>([]);

    const fetchPasien = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pasien`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setPasiens(data);
            setManipulatedPatients(data);
        } catch (error) {
            console.error('Error fetching pasien:', error);
        }
    };
    
    useEffect(() => {        
        fetchPasien();        
    }, []);

    const handleSelectPatient = (patient: Pasien) => {        
        router.push(`/dashboard/pasien/${patient.id}`);
    };

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-1 md:gap-6">
            <div className="col-span-1 space-y-6 xl:col-span-7">
                <div className="grid grid-cols-1">
                    <div className="rounded-2xl border border-gray-200 bg-white p-3 sm:p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
                        <PasienTab />
                        <h1
                            className="text-center text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6"
                        >
                            Data Pasien
                        </h1>

                        <input
                            type="text"
                            placeholder="Cari Pasien..."
                            autoFocus
                            onChange={(e) => {
                                const searchTerm = e.target.value.toLowerCase();
                                if (searchTerm === '') {
                                    setManipulatedPatients(pasiens);
                                } else {
                                    setManipulatedPatients(
                                        pasiens.filter((pasien) =>
                                            pasien.nama_lengkap.toLowerCase().includes(searchTerm) ||
                                            pasien.nama_panggilan.toLowerCase().includes(searchTerm) ||
                                            pasien.alamat?.toLowerCase().includes(searchTerm)
                                        )
                                    );
                                }
                            }}
                            className="w-full px-3 py-2 mb-4 sm:mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-white/[0.02] dark:border-gray-700 dark:text-white text-sm sm:text-base"
                        />

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-xs sm:text-sm">
                                <thead className="bg-gray-100 dark:bg-gray-800">
                                    <tr>
                                        <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                                            Nama Lengkap
                                        </th>
                                        <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                                            Nama Panggilan
                                        </th>
                                        <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                                            Jenis Kelamin
                                        </th>
                                        <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                                            Alamat
                                        </th>
                                        <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                                            Tanggal Lahir
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-transparent divide-y divide-gray-200 dark:divide-gray-700">
                                    {maniputalatedPatients.slice(0, 30).map((patient) => (
                                        <tr
                                            key={patient.id}
                                            onClick={() => handleSelectPatient(patient)}
                                            className="hover:bg-blue-50 dark:hover:bg-blue-900/30 cursor-pointer transition-colors"
                                        >
                                            <td className="px-2 sm:px-4 py-2 sm:py-3 text-gray-900 dark:text-white">{patient.nama_lengkap}</td>
                                            <td className="px-2 sm:px-4 py-2 sm:py-3 text-gray-900 dark:text-white">{patient.nama_panggilan}</td>
                                            <td className="px-2 sm:px-4 py-2 sm:py-3 text-gray-900 dark:text-white">{patient.jenis_kelamin}</td>
                                            <td className="px-2 sm:px-4 py-2 sm:py-3 text-gray-900 dark:text-white">{patient.alamat}</td>
                                            <td className="px-2 sm:px-4 py-2 sm:py-3 text-gray-900 dark:text-white">
                                                {new Date(patient.tanggal_lahir).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}