// app/dashboard/espacos/page.tsx
'use client'

import { useState, useEffect } from 'react';
import EspacoForm from '@/components/EspacoForm';
import { api } from '@/app/lib/http';
import { ENDPOINTS } from '@/app/lib/api';

interface Espaco {
  id_espaco: number | null;
  nome: string;
  descricao: string;
  capacidade: number;
  preco: number;
  tipo: string;
  diasindisponiveis: string[] | null;
}

export default function EspacosPage() {
  const [espacos, setEspacos] = useState<Espaco[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEspaco, setSelectedEspaco] = useState<Espaco | null>(null);

  // 🔹 Buscar espaços ao carregar a página
  useEffect(() => {
    const fetchEspacos = async () => {
      try {
        const response = await api.get(ENDPOINTS.espacos);
        setEspacos(response.data);
      } catch (error) {
        console.error('Erro ao carregar espaços:', error);
        alert('Não foi possível carregar os espaços.');
      }
    };

    fetchEspacos();
  }, []);

  const handleOpenModal = (espacoToEdit: Espaco | null = null) => {
    setSelectedEspaco(espacoToEdit);
    setIsModalOpen(true);
  };

  // 🔹 Criar ou atualizar espaço
  const handleEspacoOperation = async (data: Espaco) => {
    try {
      if (data.id_espaco) {
        // PUT
        const response = await api.put(`${ENDPOINTS.espacos}/${data.id_espaco}`, data);

        setEspacos(prev =>
          prev.map(e => (e.id_espaco === data.id_espaco ? response.data : e))
        );

        console.log('Espaço atualizado com sucesso.');
      } else {
        // POST
        const response = await api.post(ENDPOINTS.espacos, data);
        setEspacos(prev => [response.data, ...prev]);

        console.log('Espaço criado com sucesso.');
      }

      setIsModalOpen(false);
    } catch (error) {
      console.error('Erro ao salvar espaço:', error);
      alert('Não foi possível salvar o espaço.');
    }
  };

  // 🔹 Deletar espaço
  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir este espaço?')) return;

    try {
      await api.delete(`${ENDPOINTS.espacos}/${id}`);
      setEspacos(prev => prev.filter(e => e.id_espaco !== id));
      console.log('Espaço excluído com sucesso.');
    } catch (error) {
      console.error('Erro ao excluir espaço:', error);
      alert('Não foi possível excluir o espaço.');
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
              <th className="px-6 py-3 text-left text-xs font-medium">Nome / Tipo</th>
              <th className="px-6 py-3 text-left text-xs font-medium">Capacidade</th>
              <th className="px-6 py-3 text-left text-xs font-medium">Preço</th>
              <th className="px-6 py-3 text-left text-xs font-medium">Dias Indisponíveis</th>
              <th className="relative px-6 py-3 text-right text-xs font-medium">Ações</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {espacos.map(espaco => (
              <tr key={espaco.id_espaco}>
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">{espaco.nome}</div>
                  <div className="text-xs text-gray-500">{espaco.tipo}</div>
                </td>

                <td className="px-6 py-4 text-sm text-gray-500">
                  {espaco.capacidade} Pessoas
                </td>

                <td className="px-6 py-4 text-sm text-gray-500">
                  R$ {espaco.preco.toFixed(2)}
                </td>

                <td className="px-6 py-4 text-sm text-gray-500">
                  {espaco.diasindisponiveis?.length || 0} dias listados
                </td>

                <td className="px-6 py-4 text-right text-sm font-medium">
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
