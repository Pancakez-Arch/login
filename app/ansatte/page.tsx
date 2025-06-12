'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Ansatt {
  id: number;
  fornavn: string;
  etternavn: string;
  epost: string;
  telefon: string;
  sertifisering: string;
  ansettelses_dato: string;
}

export default function AnsatteSok() {
  const [ansatte, setAnsatte] = useState<Ansatt[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchAnsatte = async () => {
      try {
        const response = await fetch('/api/ansatte');
        const data = await response.json();
        setAnsatte(data);
      } catch (error) {
        console.error('Error fetching ansatte:', error);
      }
    };

    fetchAnsatte();
  }, []);

  const filteredAnsatte = ansatte.filter((ansatt) =>
    `${ansatt.fornavn} ${ansatt.etternavn} ${ansatt.epost} ${ansatt.sertifisering}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleSelectTrainer = (ansatt: Ansatt) => {
    router.push(
      `/betalinger?fornavn=${encodeURIComponent(ansatt.fornavn)}&etternavn=${encodeURIComponent(
        ansatt.etternavn
      )}&id=${ansatt.id}`
    );
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Søk blant ansatte</h1>

      <input
        type="text"
        placeholder="Søk etter navn, e-post eller sertifisering..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 border rounded-md mb-4"
      />

      <div className="space-y-4">
        {filteredAnsatte.map((ansatt) => (
          <div
            key={ansatt.id}
            className="p-4 bg-white rounded-md shadow-md flex justify-between items-center"
          >
            <div>
              <h2 className="text-lg font-semibold">
                {ansatt.fornavn} {ansatt.etternavn}
              </h2>
              <p>E-post: {ansatt.epost}</p>
              <p>Sertifisering: {ansatt.sertifisering}</p>
            </div>

            <button
              onClick={() => handleSelectTrainer(ansatt)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Velg Trener
            </button>
          </div>
        ))}

        {filteredAnsatte.length === 0 && (
          <p className="text-gray-500">Ingen ansatte funnet.</p>
        )}
      </div>
    </div>
  );
}
