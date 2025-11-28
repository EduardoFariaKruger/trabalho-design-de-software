'use client'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { api } from '@/app/lib/http';
import { ENDPOINTS } from '@/app/lib/api';

interface Espaco {
  id_espaco: number;
  nome: string;
  descricao: string;
  preco: number;
  capacidade: number;
  tipo: string;
}

export default function EspacosDisponiveisPage() {
    const [espacos, setEspacos] = useState<Espaco[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEspacos = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await api.get(ENDPOINTS.espacos);
                setEspacos(response.data); 
            } catch (err) {
                console.error("Erro ao buscar espaços:", err);
                setError("Não foi possível carregar os espaços. Tente novamente mais tarde.");
            } finally {
                setLoading(false);
            }
        };

        fetchEspacos();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 p-8 text-center pt-20">
                <p className="text-xl text-indigo-600">Carregando espaços disponíveis...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-100 p-8 text-center pt-20">
                <h2 className="text-xl font-bold text-red-600 mb-4">Erro de Conexão</h2>
                <p className="text-gray-700">{error}</p>
                <Link 
                    href="/login"
                    className="mt-6 inline-block text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                    Voltar para o Login
                </Link>
            </div>
        );
    }


    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <header className="max-w-4xl mx-auto mb-10">
                <div className="flex justify-between items-center border-b pb-4">
                    <h1 className="text-4xl font-extrabold text-indigo-700">
                        Seu Cantinho
                    </h1>
                    <Link 
                        href="/login"
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
                    >
                        Acesso de Administrador
                    </Link>
                </div>
                <h2 className="text-xl text-gray-700 mt-4">
                    Confira nossos espaços disponíveis para locação:
                </h2>
            </header>

            <main className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                {espacos.length === 0 ? (
                    <p className="col-span-full text-center text-gray-500 text-lg">
                        Nenhum espaço disponível para reserva no momento.
                    </p>
                ) : (
                    espacos.map((espaco) => (
                        <div 
                            key={espaco.id_espaco} 
                            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-200"
                        >
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                {espaco.nome}
                            </h3>
                            <p className="text-sm text-indigo-600 font-medium mb-3">
                                {espaco.tipo}
                            </p>
                            
                            <p className="text-gray-600 mb-4 text-sm">
                                {espaco.descricao}
                            </p>

                            <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                                <div className="text-lg font-semibold text-gray-800">
                                    👥 Capacidade: {espaco.capacidade}
                                </div>
                                <div className="text-xl font-extrabold text-green-700">
                                    R$ {espaco.preco.toFixed(2)}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </main>
        </div>
    );
}