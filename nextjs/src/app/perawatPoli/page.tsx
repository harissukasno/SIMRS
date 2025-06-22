'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Pelayanan {
    id: number;
    jenis_pelayanan: string;
}

interface Antrian {
    id: number;
    id_pasien: number;
    id_pelayanan: number;
    nomor_antrian: number;
    status: 'Menunggu' | 'Dilayani' | 'Selesai' | 'Batal';
    waktu_checkin: Date;
    waktu_pelayanan: Date;
}

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

interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: string;
    id_pelayanan: number;
}

export default function PerawatPoli() {

    const router = useRouter();

    const [pelayanan, setPelayanan] = useState<Pelayanan[]>([]);
    const [antrian, setAntrian] = useState<Antrian[]>([]);    
    const [pasienData, setPasienData] = useState<Pasien[]>([]);
    const [user, setUser] = useState<User | null>(null);    
    
    const fetchPelayanan = async () => {
        try {
            const response = await fetch('http://192.168.1.6:3000/pelayanan');
            const data = await response.json();
            setPelayanan(data);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const fetchAntrian = async () => {
        try {
            const response = await fetch('http://192.168.1.6:3000/antrian');
            const data = await response.json();
            setAntrian(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };    

    const fetchPasienData = async () => {
        try {
            const response = await fetch('http://192.168.1.6:3000/pasien');
            const data = await response.json();
            setPasienData(data);
        } catch (error) {
            console.error('Error fetching pasien data:', error);
        }
    };

    const fetchUser = async () => {
        const token = localStorage.getItem('token');   
        if (!token) {
            console.error('Token not found');
            return;
        }
        const payload = JSON.parse(atob(token.split('.')[1]));       
        const id = payload.id;        
                  
        try {
            const response = await fetch(`http://192.168.1.6:3000/users/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            setUser(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {        
        fetchPelayanan();
        fetchAntrian();        
        fetchPasienData();
        fetchUser();        
    }
    , []);

    const handleProses = async (id: number) => {
        const antrianItem = antrian.find((item) => item.id === id);
        if (!antrianItem) {
            console.error(`Antrian with id ${id} not found`);
            return;
        }
        try {
            const response = await fetch(`http://192.168.1.6:3000/antrian/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    ...antrianItem, 
                    status: 'Dilayani', 
                    waktu_pelayanan: new Date().toISOString().slice(0, 19).replace('T', ' ') 
                }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();                        
        } catch (error) {
            console.error('Error:', error);
        }

        // Redirect to the patient detail page
        const patient = pasienData.find((p) => p.id === antrianItem.id_pasien);        
        if (patient) {
            router.push(`/perawatPoli/${patient.id}`);
        }
    };

    return (
        <div className="grid grid-cols-12 gap-4 md:gap-6">
            <div className="col-span-12 space-y-6 xl:col-span-7">
                <div className="grid grid-cols ">
                    <div className="rounded-2xl border border-gray-200 bg-white p-3 sm:p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
                        <div className="col-span-12 space-y-6 xl:col-span-7">
                            <h1 className="text-xl sm:text-2xl font-bold mb-4">
                                Data Antrian Pasien {pelayanan.find((p) => p.id === user?.id_pelayanan)?.jenis_pelayanan || 'Tidak Diketahui'}
                            </h1>
                            <div className="mb-4 text-base sm:text-lg font-semibold text-gray-700 dark:text-white">
                                Jumlah Antrian Hari Ini:{" "}
                                {antrian.filter(
                                    (item) =>
                                        item.id_pelayanan === user?.id_pelayanan &&
                                        new Date(item.waktu_checkin).toDateString() === new Date().toDateString()
                                ).length}
                            </div>
                            <div className="w-full overflow-x-auto rounded-lg shadow">
                                <table className="w-full min-w-[600px] sm:min-w-[900px] divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900 text-xs sm:text-sm">
                                    <thead className="bg-gray-100 dark:bg-gray-800">
                                        <tr>
                                            <th className="px-2 sm:px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider">Nomor Antrian</th>
                                            <th className="px-2 sm:px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider">Nama Pasien</th>
                                            <th className="px-2 sm:px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider">Status</th>
                                            <th className="px-2 sm:px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider">Waktu Check-in</th>
                                            <th className="px-2 sm:px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {antrian
                                            .filter((item) => item.id_pelayanan === user?.id_pelayanan && item.status === 'Menunggu')
                                            .map((item) => {
                                                const patient = pasienData.find((p) => p.id === item.id_pasien);
                                                return (
                                                    <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                                                        <td className="px-2 sm:px-4 py-2 text-gray-800 dark:text-gray-100">{item.nomor_antrian}</td>
                                                        <td className="px-2 sm:px-4 py-2 text-gray-800 dark:text-gray-100">{patient?.nama_lengkap || 'Tidak Diketahui'}</td>
                                                        <td className="px-2 sm:px-4 py-2">
                                                            <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                                                                {item.status}
                                                            </span>
                                                        </td>
                                                        <td className="px-2 sm:px-4 py-2 text-gray-800 dark:text-gray-100">{new Date(item.waktu_checkin).toLocaleString()}</td>
                                                        <td className="px-2 sm:px-4 py-2">
                                                            <div className="flex flex-col sm:flex-row gap-2">
                                                                <button
                                                                    className="bg-blue-600 hover:bg-blue-700 text-white px-2 sm:px-3 py-1 rounded transition text-xs sm:text-sm font-medium"
                                                                    onClick={() => handleProses(item.id)}
                                                                >
                                                                    Proses
                                                                </button>
                                                                <button
                                                                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 sm:px-3 py-1 rounded transition text-xs sm:text-sm font-medium"
                                                                    onClick={() => console.log(`Tunda antrian ${item.id}`)}
                                                                >
                                                                    Tunda
                                                                </button>
                                                                <button
                                                                    className="bg-red-500 hover:bg-red-600 text-white px-2 sm:px-3 py-1 rounded transition text-xs sm:text-sm font-medium"
                                                                    onClick={() => console.log(`Batal antrian ${item.id}`)}
                                                                >
                                                                    Batal
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                    </tbody>
                                </table>
                            </div>

                            <h2 className="text-lg sm:text-xl font-semibold mt-8 mb-4 text-gray-700 dark:text-white">Data Antrian Selesai</h2>
                            <div className="w-full overflow-x-auto rounded-lg shadow">
                                <table className="w-full min-w-[600px] sm:min-w-[900px] divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900 text-xs sm:text-sm">
                                    <thead className="bg-gray-100 dark:bg-gray-800">
                                        <tr>
                                            <th className="px-2 sm:px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider">Nomor Antrian</th>
                                            <th className="px-2 sm:px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider">Nama Pasien</th>
                                            <th className="px-2 sm:px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider">Status</th>
                                            <th className="px-2 sm:px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider">Waktu Check-in</th>
                                            <th className="px-2 sm:px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider">Waktu Pelayanan</th>
                                            <th className="px-2 sm:px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider">Lama Antrian</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {antrian
                                            .filter(
                                                (item) =>
                                                    item.id_pelayanan === user?.id_pelayanan &&
                                                    item.status === 'Selesai' &&
                                                    new Date(item.waktu_checkin).toDateString() === new Date().toDateString()
                                            )
                                            .map((item) => {
                                                const patient = pasienData.find((p) => p.id === item.id_pasien);
                                                return (
                                                    <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                                                        <td className="px-2 sm:px-4 py-2 text-gray-800 dark:text-gray-100">{item.nomor_antrian}</td>
                                                        <td className="px-2 sm:px-4 py-2 text-gray-800 dark:text-gray-100">{patient?.nama_lengkap || 'Tidak Diketahui'}</td>
                                                        <td className="px-2 sm:px-4 py-2">
                                                            <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                                                {item.status}
                                                            </span>
                                                        </td>
                                                        <td className="px-2 sm:px-4 py-2 text-gray-800 dark:text-gray-100">{new Date(item.waktu_checkin).toLocaleString()}</td>
                                                        <td className="px-2 sm:px-4 py-2 text-gray-800 dark:text-gray-100">{item.waktu_pelayanan ? new Date(item.waktu_pelayanan).toLocaleString() : '-'}</td>
                                                        <td className="px-2 sm:px-4 py-2 text-gray-800 dark:text-gray-100">
                                                            {item.waktu_pelayanan
                                                                ? new Date(new Date(item.waktu_pelayanan).getTime() - new Date(item.waktu_checkin).getTime())
                                                                    .toISOString()
                                                                    .substr(11, 8)
                                                                : '-'}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}