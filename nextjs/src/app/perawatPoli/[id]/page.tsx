'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

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

interface Antrian {
    id: number;
    id_pasien: number;
    id_pelayanan: number;
    nomor_antrian: number;
    status: 'Menunggu' | 'Dilayani' | 'Selesai' | 'Batal';
    waktu_checkin: Date;
    waktu_pelayanan: Date;
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

export default function PasienDetail() {

    const router = useRouter();
    const { id } = useParams();

    const [pasien, setPasien] = useState<Pasien | null>(null);
    const [antrian, setAntrian] = useState<Antrian[]>([]);    
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
        } catch (error) {
            console.error(error);
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

    const fetchAntrian = async () => {
        try {
            const response = await fetch('http://192.168.1.6:3000/antrian');
            const data = await response.json();
            setAntrian(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };    

    useEffect(() => {        
        fetchPasien();
        fetchRekamMedis();
        fetchAntrian();
    }, []);

    if (!pasien) {
        return <div>Loading...</div>;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const antrianItem = antrian.find((item) => item.id_pasien === Number(id) && item.status === 'Dilayani');
        if (!antrianItem) {
            console.error('Antrian item not found');
            return;
        }
        
        try {
            const response = await fetch(`http://192.168.1.6:3000/antrian/${antrianItem.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...antrianItem, 
                    status: 'Selesai', 
                    waktu_pelayanan: new Date().toISOString().slice(0, 19).replace('T', ' ') 
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to update pasien');
            }
            const data = await response.json();
                                    
        } catch (error) {
            console.error('Error updating pasien:', error);
        }

        router.push(`/perawatPoli`);
    };

    return(
        <div className="grid grid-cols-12 gap-4 md:gap-6">
            <div className="col-span-12">
                <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
                    <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
                        <div className="w-full">
                            <h1 style={{ textAlign: 'center', marginBottom: '20px', color: '#4A90E2' }}>
                                Detail Rekam Medis Pasien
                            </h1>

                            <div className="mb-8 p-6 rounded-xl bg-white border border-gray-200 shadow-sm">
                                <h2 className="text-lg font-semibold text-blue-700 mb-4 border-b pb-2">Data Pasien</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-gray-700">
                                    <div>
                                        <span className="font-medium">Nama Lengkap:</span> {pasien.nama_lengkap}
                                    </div>
                                    <div>
                                        <span className="font-medium">Nama Panggilan:</span> {pasien.nama_panggilan}
                                    </div>
                                    <div>
                                        <span className="font-medium">Tanggal Lahir:</span> {new Date(pasien.tanggal_lahir).toLocaleDateString()}
                                    </div>
                                    <div>
                                        <span className="font-medium">Jenis Kelamin:</span> {pasien.jenis_kelamin === 'Male' ? 'Laki-laki' : 'Perempuan'}
                                    </div>
                                    {pasien.golongan_darah && (
                                        <div>
                                            <span className="font-medium">Golongan Darah:</span> {pasien.golongan_darah}
                                        </div>
                                    )}
                                    {pasien.nomor_identitas && (
                                        <div>
                                            <span className="font-medium">Nomor Identitas:</span> {pasien.nomor_identitas}
                                        </div>
                                    )}
                                    <div>
                                        <span className="font-medium">Nomor HP:</span> {pasien.nomor_hp}
                                    </div>
                                    {pasien.email && (
                                        <div>
                                            <span className="font-medium">Email:</span> {pasien.email}
                                        </div>
                                    )}
                                    {pasien.alamat && (
                                        <div className="md:col-span-2">
                                            <span className="font-medium">Alamat:</span> {pasien.alamat}
                                        </div>
                                    )}
                                    {pasien.kontak_darurat_nama && (
                                        <div>
                                            <span className="font-medium">Kontak Darurat:</span> {pasien.kontak_darurat_nama} {pasien.kontak_darurat_hp && `(${pasien.kontak_darurat_hp})`}
                                        </div>
                                    )}
                                    {pasien.hubungan_dengan_pasien && (
                                        <div>
                                            <span className="font-medium">Hubungan dengan Pasien:</span> {pasien.hubungan_dengan_pasien}
                                        </div>
                                    )}
                                    {pasien.riwayat_medis && (
                                        <div className="md:col-span-2">
                                            <span className="font-medium">Riwayat Medis:</span> {pasien.riwayat_medis}
                                        </div>
                                    )}
                                    {pasien.alergi && (
                                        <div>
                                            <span className="font-medium">Alergi:</span> {pasien.alergi}
                                        </div>
                                    )}
                                    {pasien.obat_saat_ini && (
                                        <div>
                                            <span className="font-medium">Obat Saat Ini:</span> {pasien.obat_saat_ini}
                                        </div>
                                    )}
                                    {pasien.riwayat_medis_keluarga && (
                                        <div className="md:col-span-2">
                                            <span className="font-medium">Riwayat Medis Keluarga:</span> {pasien.riwayat_medis_keluarga}
                                        </div>
                                    )}
                                    {pasien.status_vaksinasi && (
                                        <div>
                                            <span className="font-medium">Status Vaksinasi:</span> {pasien.status_vaksinasi}
                                        </div>
                                    )}
                                    {pasien.disabilitas && (
                                        <div>
                                            <span className="font-medium">Disabilitas:</span> {pasien.disabilitas}
                                        </div>
                                    )}
                                    {pasien.penyedia_asuransi && (
                                        <div>
                                            <span className="font-medium">Penyedia Asuransi:</span> {pasien.penyedia_asuransi}
                                        </div>
                                    )}
                                    {pasien.nomor_polis_asuransi && (
                                        <div>
                                            <span className="font-medium">Nomor Polis Asuransi:</span> {pasien.nomor_polis_asuransi}
                                        </div>
                                    )}
                                    {pasien.masa_berlaku_asuransi && (
                                        <div>
                                            <span className="font-medium">Masa Berlaku Asuransi:</span> {new Date(pasien.masa_berlaku_asuransi).toLocaleDateString()}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="mb-8 p-6 rounded-xl bg-white border border-gray-200 shadow-sm">
                                <h2 className="text-lg font-semibold text-blue-700 mb-4 border-b pb-2">Data Rekam Medis</h2>
                                {rekamMedis.length === 0 ? (
                                    <div>Tidak ada data rekam medis.</div>
                                ) : (
                                    <div className="space-y-4">
                                        {rekamMedis.map((rm) => (
                                            <div key={rm.id} className="border rounded-lg p-4 bg-gray-50">
                                                <div><strong>Tanggal Pemeriksaan:</strong> {new Date(rm.tanggal_pemeriksaan).toLocaleDateString()}</div>
                                                <div><strong>Keluhan:</strong> {rm.keluhan}</div>
                                                <div><strong>Diagnosis:</strong> {rm.diagnosis}</div>
                                                <div><strong>Perawatan:</strong> {rm.perawatan}</div>
                                                <div><strong>Rekomendasi:</strong> {rm.rekomendasi}</div>
                                                <div><strong>Catatan Tambahan:</strong> {rm.catatan_tambahan}</div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="mt-6 rounded-lg bg-blue-600 px-4 py-2 text-white font-semibold hover:bg-blue-700 transition"
                            >
                                Tandai Selesai
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}