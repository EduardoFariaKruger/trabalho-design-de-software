'use client'
import Link from 'next/link';

interface Espaco {
  id_espaco: number;
  nome: string;
  descricao: string;
  preco: number;
  capacidade: number;
  tipo: string;
}

// Dados Mock (Buscaria de um endpoint /api/espacos/public)
const MOCK_ESPACOS_PUBLIC: Espaco[] = [
  { id_espaco: 1, nome: 'Salão Principal', descricao: 'Grande salão para festas e eventos, ideal para 100 pessoas.', preco: 800.00, capacidade: 100, tipo: 'Salão de Festas' },
  { id_espaco: 2, nome: 'Churrasqueira VIP', descricao: 'Área com churrasqueira e piscina privativa, até 25 pessoas.', preco: 350.00, capacidade: 25, tipo: 'Área Gourmet' },
  { id_espaco: 3, nome: 'Quadra Esportiva', descricao: 'Quadra poliesportiva coberta para diversos esportes.', preco: 120.00, capacidade: 30, tipo: 'Quadra' },
];

export default function EspacosDisponiveisPage() {
    const espacos = MOCK_ESPACOS_PUBLIC;

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <header className="max-w-4xl mx-auto mb-10">
                <div className="flex justify-between items-center border-b pb-4">
                    <h1 className="text-4xl font-extrabold text-indigo-700">
                        Seu Cantinho
                    </h1>
                    {/* Botão para voltar ao Login/Acesso */}
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
                {espacos.map((espaco) => (
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
                ))}
            </main>

            {/* Se você precisar do layout root, crie app/convidado/layout.tsx e remova o html/body daqui.
                Por simplicidade, estou usando o div padrão. */}
        </div>
    );
}