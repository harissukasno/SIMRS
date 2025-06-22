'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useParams } from "next/navigation";


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

interface RekamMedis {
    id: number;
    id_pasien: number;
    id_dokter: number;
    tanggal_pemeriksaan: Date;
    keluhan: string;
    diagnosis: string;
    perawatan: string;
    rekomendasi: string;
    catatan_tambahan: string;
}

const PasienDetailPage: React.FC = () => {
    const params = useParams();
    const id = params.id;    
    const [pasien, setPasien] = useState<Pasien | null>(null);
    const [loading, setLoading] = useState(true);
    const [rekamMedis, setRekamMedis] = useState<RekamMedis[]>([]);

    const fetchPasien = async () => {        
        try {
            const response = await fetch(`http://192.168.1.6:3000/pasien/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();                        
            setPasien(data.pasien);                
            setLoading(false);
        } catch (error) {
            console.error('Error fetching pasien:', error);
        }
    };

    const fetchRekamMedis = async () => {
        try {
            const response = await fetch(`http://192.168.1.6:3000/rekam-medis/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();            
            setRekamMedis(data.rekamMedis);
        } catch (error) {
            console.error(error);
        }
    };
    
    useEffect(() => {        
        fetchPasien();       
        fetchRekamMedis(); 
    }, []);

    if (loading) return <div>Loading...</div>;
    if (!pasien) return <div>Data pasien tidak ditemukan.</div>;

    return (
        <div className="grid grid-cols-1 gap-4 md:gap-6">
            <div className="col-span-1 xl:col-span-7 space-y-6">
                <div className="grid grid-cols-1">
                    <div className="rounded-2xl border border-gray-200 bg-white p-3 sm:p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
                        <div className="flex items-center justify-between mb-4">
                            <button
                                onClick={() => window.history.back()}
                                className="px-3 py-2 text-sm sm:px-4 sm:py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
                            >
                                Kembali
                            </button>
                        </div>
                        <div className="bg-white dark:bg-white/[0.03] shadow rounded-2xl p-3 sm:p-6 border border-gray-200 dark:border-gray-800">
                            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-blue-700 dark:text-blue-400 mb-2 tracking-tight">
                                Detail Pasien
                            </h1>
                            <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 md:gap-x-6 gap-y-3 md:gap-y-4">
                                <div>
                                    <dt className="text-xs font-semibold text-gray-500 dark:text-gray-400">Nama Lengkap</dt>
                                    <dd className="text-base text-gray-900 dark:text-white">{pasien.nama_lengkap}</dd>
                                </div>
                                <div>
                                    <dt className="text-xs font-semibold text-gray-500 dark:text-gray-400">Nama Panggilan</dt>
                                    <dd className="text-base text-gray-900 dark:text-white">{pasien.nama_panggilan}</dd>
                                </div>
                                <div>
                                    <dt className="text-xs font-semibold text-gray-500 dark:text-gray-400">Tanggal Lahir</dt>
                                    <dd className="text-base text-gray-900 dark:text-white">{pasien.tanggal_lahir ? new Date(pasien.tanggal_lahir).toLocaleDateString() : '-'}</dd>
                                </div>
                                <div>
                                    <dt className="text-xs font-semibold text-gray-500 dark:text-gray-400">Jenis Kelamin</dt>
                                    <dd className="text-base text-gray-900 dark:text-white">{pasien.jenis_kelamin}</dd>
                                </div>
                                <div>
                                    <dt className="text-xs font-semibold text-gray-500 dark:text-gray-400">Golongan Darah</dt>
                                    <dd className="text-base text-gray-900 dark:text-white">{pasien.golongan_darah || '-'}</dd>
                                </div>
                                <div>
                                    <dt className="text-xs font-semibold text-gray-500 dark:text-gray-400">Nomor Identitas</dt>
                                    <dd className="text-base text-gray-900 dark:text-white">{pasien.nomor_identitas || '-'}</dd>
                                </div>
                                <div>
                                    <dt className="text-xs font-semibold text-gray-500 dark:text-gray-400">Nomor HP</dt>
                                    <dd className="text-base text-gray-900 dark:text-white">{pasien.nomor_hp}</dd>
                                </div>
                                <div>
                                    <dt className="text-xs font-semibold text-gray-500 dark:text-gray-400">Email</dt>
                                    <dd className="text-base text-gray-900 dark:text-white">{pasien.email || '-'}</dd>
                                </div>
                                <div>
                                    <dt className="text-xs font-semibold text-gray-500 dark:text-gray-400">Alamat</dt>
                                    <dd className="text-base text-gray-900 dark:text-white">{pasien.alamat || '-'}</dd>
                                </div>
                                <div>
                                    <dt className="text-xs font-semibold text-gray-500 dark:text-gray-400">Kontak Darurat Nama</dt>
                                    <dd className="text-base text-gray-900 dark:text-white">{pasien.kontak_darurat_nama || '-'}</dd>
                                </div>
                                <div>
                                    <dt className="text-xs font-semibold text-gray-500 dark:text-gray-400">Kontak Darurat HP</dt>
                                    <dd className="text-base text-gray-900 dark:text-white">{pasien.kontak_darurat_hp || '-'}</dd>
                                </div>
                                <div>
                                    <dt className="text-xs font-semibold text-gray-500 dark:text-gray-400">Hubungan dengan Pasien</dt>
                                    <dd className="text-base text-gray-900 dark:text-white">{pasien.hubungan_dengan_pasien || '-'}</dd>
                                </div>
                                <div>
                                    <dt className="text-xs font-semibold text-gray-500 dark:text-gray-400">Riwayat Medis</dt>
                                    <dd className="text-base text-gray-900 dark:text-white">{pasien.riwayat_medis || '-'}</dd>
                                </div>
                                <div>
                                    <dt className="text-xs font-semibold text-gray-500 dark:text-gray-400">Alergi</dt>
                                    <dd className="text-base text-gray-900 dark:text-white">{pasien.alergi || '-'}</dd>
                                </div>
                                <div>
                                    <dt className="text-xs font-semibold text-gray-500 dark:text-gray-400">Obat Saat Ini</dt>
                                    <dd className="text-base text-gray-900 dark:text-white">{pasien.obat_saat_ini || '-'}</dd>
                                </div>
                                <div>
                                    <dt className="text-xs font-semibold text-gray-500 dark:text-gray-400">Riwayat Medis Keluarga</dt>
                                    <dd className="text-base text-gray-900 dark:text-white">{pasien.riwayat_medis_keluarga || '-'}</dd>
                                </div>
                                <div>
                                    <dt className="text-xs font-semibold text-gray-500 dark:text-gray-400">Status Vaksinasi</dt>
                                    <dd className="text-base text-gray-900 dark:text-white">{pasien.status_vaksinasi || '-'}</dd>
                                </div>
                                <div>
                                    <dt className="text-xs font-semibold text-gray-500 dark:text-gray-400">Disabilitas</dt>
                                    <dd className="text-base text-gray-900 dark:text-white">{pasien.disabilitas || '-'}</dd>
                                </div>
                                <div>
                                    <dt className="text-xs font-semibold text-gray-500 dark:text-gray-400">Penyedia Asuransi</dt>
                                    <dd className="text-base text-gray-900 dark:text-white">{pasien.penyedia_asuransi || '-'}</dd>
                                </div>
                                <div>
                                    <dt className="text-xs font-semibold text-gray-500 dark:text-gray-400">Nomor Polis Asuransi</dt>
                                    <dd className="text-base text-gray-900 dark:text-white">{pasien.nomor_polis_asuransi || '-'}</dd>
                                </div>
                                <div>
                                    <dt className="text-xs font-semibold text-gray-500 dark:text-gray-400">Masa Berlaku Asuransi</dt>
                                    <dd className="text-base text-gray-900 dark:text-white">{pasien.masa_berlaku_asuransi ? new Date(pasien.masa_berlaku_asuransi).toLocaleDateString() : '-'}</dd>
                                </div>
                            </dl>
                        </div>

                        <div className="bg-white dark:bg-white/[0.03] shadow rounded-2xl p-3 sm:p-6 border border-gray-200 dark:border-gray-800 mt-6">
                            <h2 className="text-lg sm:text-xl font-bold mb-4 text-blue-700 dark:text-blue-400">Riwayat Rekam Medis</h2>
                            <div className="flex flex-col items-start sm:items-center justify-between mb-4">
                                {rekamMedis.length === 0 ? (
                                    <div className="text-gray-500 dark:text-gray-400">Belum ada rekam medis.</div>
                                ) : (
                                    <div className="w-full overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800 text-xs sm:text-sm">
                                            <thead>
                                                <tr>
                                                    <th className="px-2 sm:px-4 py-2 text-left font-semibold text-gray-500 dark:text-gray-400 uppercase">Tanggal</th>
                                                    <th className="px-2 sm:px-4 py-2 text-left font-semibold text-gray-500 dark:text-gray-400 uppercase">Keluhan</th>
                                                    <th className="px-2 sm:px-4 py-2 text-left font-semibold text-gray-500 dark:text-gray-400 uppercase">Diagnosis</th>
                                                    <th className="px-2 sm:px-4 py-2 text-left font-semibold text-gray-500 dark:text-gray-400 uppercase">Perawatan</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white dark:bg-white/[0.03] divide-y divide-gray-100 dark:divide-gray-800">
                                                {rekamMedis.map((rm, idx) => (
                                                    <tr
                                                        key={rm.id}
                                                        className={idx % 2 === 0 ? "bg-white dark:bg-white/[0.03]" : "bg-gray-50 dark:bg-gray-900/[0.08]"}
                                                    >
                                                        <td className="px-2 sm:px-4 py-2 whitespace-normal max-w-xs break-words text-gray-900 dark:text-white">{new Date(rm.tanggal_pemeriksaan).toLocaleDateString()}</td>
                                                        <td className="px-2 sm:px-4 py-2 whitespace-normal max-w-xs break-words text-gray-900 dark:text-white">{rm.keluhan}</td>
                                                        <td className="px-2 sm:px-4 py-2 whitespace-normal max-w-xs break-words text-gray-900 dark:text-white">{rm.diagnosis}</td>
                                                        <td className="px-2 sm:px-4 py-2 whitespace-normal max-w-xs break-words text-gray-900 dark:text-white">{rm.perawatan}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PasienDetailPage;