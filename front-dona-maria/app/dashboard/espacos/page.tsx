// app/dashboard/espacos/page.tsx
'use client'
import { useState } from 'react';
import EspacoForm from '@/components/EspacoForm';

interface Espaco {
  id_espaco: number | null;
  nome: string;
  descricao: string;
  capacidade: number;
  preco: number; 
  tipo: string;
  diasIndisponiveis: string[];
}

const MOCK_ESPACOS: Espaco[] = [
  { id_espaco: 1, nome: 'Salão Principal', descricao: 'Grande salão...', capacidade: 100, preco: 800.00, tipo: 'Salão de Festas', diasIndisponiveis: ['2025-12-10', '2025-12-11'] },
  { id_espaco: 2, nome: 'Churrasqueira VIP', descricao: 'Área com churrasqueira...', capacidade: 25, preco: 350.00, tipo: 'Área Gourmet', diasIndisponiveis: ['2025-12-01'] },
];

export default function EspacosPage() {
  const [espacos, setEspacos] = useState<Espaco[]>(MOCK_ESPACOS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEspaco, setSelectedEspaco] = useState<Espaco | null>(null);

  const handleOpenModal = (espacoToEdit: Espaco | null = null) => {
    setSelectedEspaco(espacoToEdit);
    setIsModalOpen(true);
  };

  const handleEspacoOperation = (data: Espaco) => {
    // ⚠️ SUBSTITUIR PELA SUA CHAMADA DE API
    alert(`Operação de Espaço enviada para o backend (simulado). Nome: ${data.nome}`);
    setIsModalOpen(false);
    
    if (!data.id_espaco) {
        setEspacos(prev => [{...data, id_espaco: Math.random() * 100}, ...prev]);
    } else {
        setEspacos(prev => prev.map(e => e.id_espaco === data.id_espaco ? data : e));
    }
  };

  const handleDelete = (id: number) => {
    if (confirm('Tem certeza que deseja excluir este espaço?')) {
      // ⚠️ SUBSTITUIR PELA SUA CHAMADA DE API (DELETE)
      alert('Comando de Exclusão de Espaço enviado para o backend (simulado).');
      setEspacos(espacos.filter(e => e.id_espaco !== id));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Gerenciamento de Espaços</h1>
        <button
          onClick={() => handleOpenModal(null)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md shadow-md transition-colors"
        >
          + Novo Espaço
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-xl">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome / Tipo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacidade</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preço</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dias Indisponíveis</th>
              <th className="relative px-6 py-3"><span className="sr-only">Ações</span></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {espacos.map((espaco) => (
              <tr key={espaco.id_espaco}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{espaco.nome}</div>
                  <div className="text-xs text-gray-500">{espaco.tipo}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {espaco.capacidade} Pessoas
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  R$ {espaco.preco.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {espaco.diasIndisponiveis.length} dias listados
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleOpenModal(espaco)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(espaco.id_espaco as number)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <EspacoForm
          espaco={selectedEspaco}
          onClose={() => setIsModalOpen(false)}
          onSave={handleEspacoOperation} 
        />
      )}
    </div>
  );
}