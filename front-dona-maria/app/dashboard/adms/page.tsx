// app/dashboard/adms/page.tsx
'use client'
import { useState, useEffect, useCallback } from 'react';
import ADMForm from '@/components/ADMForm'; 
import { api } from '@/app/lib/http'; 
import { ENDPOINTS } from '@/app/lib/api'; 

// 💡 TIPOS (Mantidos)
interface ADM {
  id_adm: number;
  login: string;
  senha: string; 
}

interface ADMForma {
  id_adm: number | null;
  login: string;
  senha: string;
}


export default function ADMsPage() {
  const [adms, setADMs] = useState<ADM[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedADM, setSelectedADM] = useState<ADMForma | null>(null);


  const fetchADMs = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get(ENDPOINTS.adms);
      setADMs(response.data);
    } catch (error) {
      console.error('Erro ao carregar ADMs:', error);
      alert('Não foi possível carregar os Administradores.');
      setADMs([]);
    } finally {
        setLoading(false);
    }
  }, []);
  
  useEffect(() => {
    fetchADMs();
  }, [fetchADMs]);


  const handleADMOperation = async (data: ADMForma) => {
    try {
      if (data.id_adm) {
        const response = await api.put(`${ENDPOINTS.adms}/${data.id_adm}`, data);
        
        setADMs(prev =>
          prev.map(a => (a.id_adm === data.id_adm ? response.data : a))
        );
        console.log('ADM atualizado com sucesso!');
      } else {
        const response = await api.post(ENDPOINTS.adms, data); 
        
        setADMs(prev => [response.data, ...prev]);
        console.log('ADM criado com sucesso!');
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Erro ao salvar ADM:', error);
      alert('Não foi possível salvar o ADM. Verifique se o login já existe.');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir este ADM?')) return; 
    
    try {
      await api.delete(`${ENDPOINTS.adms}/${id}`);
      
      setADMs(prev => prev.filter(a => a.id_adm !== id));
      console.log('ADM excluído com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir ADM:', error);
      alert('Não foi possível excluir o ADM. Pode haver dependências.');
    }
  };

  if (loading) {
    return (
        <div className="text-center p-8 text-gray-500">
            Carregando Administradores...
        </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Gerenciamento de Administradores</h1>
        <button
          onClick={() => { setSelectedADM(null); setIsModalOpen(true); }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md shadow-md transition-colors"
        >
          + Novo ADM
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-xl">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Login</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Senha</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {adms.map(adm => (
              <tr key={adm.id_adm}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">{adm.id_adm}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{adm.login}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">********</td> 
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => { setSelectedADM(adm); setIsModalOpen(true); }}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(adm.id_adm)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {adms.length === 0 && !loading && (
            <p className="text-center py-4 text-gray-500">Nenhum administrador encontrado.</p>
        )}
      </div>

      {isModalOpen && (
        <ADMForm
          adm={selectedADM}
          onClose={() => setIsModalOpen(false)}
          onSave={handleADMOperation} 
        />
      )}
    </div>
  );
}