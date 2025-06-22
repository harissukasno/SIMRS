'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { ThemeProvider } from '@/context/ThemeContext';

interface Pelayanan {
    id: number;
    jenis_pelayanan: number;
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

export default function AntrianPage() {
    const router = useRouter();

    const [pelayanan, setPelayanan] = useState<Pelayanan[]>([]);
    const [antrian, setAntrian] = useState<number[]>([]);
    const [idPasien, setIdPasien] = useState<number>(0);

    useEffect(() => {
        fetch('http://192.168.1.6:3000/pelayanan')
            .then(response => response.json())
            .then(dataPelayanan => {                
                setPelayanan(dataPelayanan);                                

                fetch('http://192.168.1.6:3000/antrian')
                .then(response => response.json())
                .then(data => {
                    // console.log(dataPelayanan);
                    // console.log(data);
                    
                    const tempAntrian = new Array(dataPelayanan.length).fill(0);
                    // data.forEach((item: Antrian) => {
                    //     tempAntrian[item.id_pelayanan - 1] += 1;
                    // });
                    
                    const today = new Date().toISOString().slice(0, 10);
                    data.forEach((item: Antrian & { waktu_checkin?: string }) => {
                        if (item.waktu_checkin && item.waktu_checkin.slice(0, 10) === today) {
                            tempAntrian[item.id_pelayanan - 1] += 1;                            
                        }
                    });
                                        
                    setAntrian(tempAntrian);                    
                            
                })
                .catch(error => console.error('Error:', error));
                
            })
            .catch(error => console.error('Error:', error));                    
                                
    }, []);

    const handleClick = (pelayanan: number) => {        
        const newAntrian = antrian[pelayanan-1] + 1;
        const data = {
            id_pasien: idPasien,
            id_pelayanan: pelayanan,
            nomor_antrian: newAntrian
        };

        fetch('http://192.168.1.6:3000/antrian', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            alert(`antrian anda nomor ${newAntrian}`);            
                        
            setAntrian(prevAntrian => {
                const newSetAntrian = [...prevAntrian];
                newSetAntrian[pelayanan-1] = newAntrian;
                return newSetAntrian;
            });

            setIdPasien(0);

        })
        .catch(error => {
            console.error('Error:', error);
        });        
    };

    const handleEnter = () => {
        const inputElement = document.getElementById('input-pasien') as HTMLInputElement;
        const inputValue = Number(inputElement.value);

        if (inputValue === 0) {
            router.push('/signin');
            localStorage.removeItem('token');
            return;
        }

        fetch(`http://192.168.1.6:3000/pasien/${inputValue}`)
            .then(response => response.json())
            .then(data => {                                
                if (data.message === "User found") {
                    setIdPasien(data.pasien.id);
                } else {
                    alert('Data tidak ditemukan, silahkan daftarkan diri anda terlebih dahulu');                    
                    inputElement.value = '';
                }
            })
            .catch(error => {
                console.error('Error:', error);                
            });
    }    

    return (
        <ThemeProvider>
            {idPasien === 0 ? (
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-2xl font-bold mb-4">Masukkan ID Pasien Anda</h1>
                <input
                    type="number"
                    id="input-pasien"
                    placeholder="ID Pasien"
                    className="border border-gray-300 rounded p-2 mb-4"
                />
                <button
                    onClick={handleEnter}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Masuk
                </button>
            </div>
            ) : (
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Antrian Pelayanan</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {pelayanan.map((item) => (
                        <div
                            key={item.id}
                            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-md dark:border-gray-800 dark:bg-white/[0.03] md:p-6 cursor-pointer"
                            onClick={() => handleClick(item.id)}
                        >
                            <h2 className="text-lg font-semibold mb-2">
                                Pelayanan {item.jenis_pelayanan}
                            </h2>
                            <p>Jumlah Antrian: {antrian[item.id - 1]}</p>
                        </div>
                    ))}
                </div>
            </div>
            )}
        </ThemeProvider>
    )
}