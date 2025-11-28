// // // app/dashboard/clientes/page.tsx
// // 'use client'
// // import { useState } from 'react';
// // import ClientForm from '@/components/ClientForm';
// // import { format } from 'date-fns';

// // // 💡 Definição do Tipo (Mantida)
// // interface Cliente {
// //   id_cliente: number;
// //   nome: string;
// //   cpf: number;
// //   datanasc: string; // YYYY-MM-DD
// // }

// // // 💡 Dados Mock (Simplificados, apenas para preencher a tela)
// // const MOCK_CLIENTES: Cliente[] = [
// //   { id_cliente: 1, nome: 'João da Silva', cpf: 12345678901, datanasc: '1985-05-10' },
// //   { id_cliente: 2, nome: 'Maria Oliveira', cpf: 98765432109, datanasc: '1992-11-25' },
// // ];

// // export default function ClientesPage() {
// //   // Em um ambiente real, 'clientes' seria populado por um hook que busca dados do backend.
// //   const [clientes, setClientes] = useState<Cliente[]>(MOCK_CLIENTES);
  
// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const [selectedClient, setSelectedClient] = useState<Cliente | null>(null);

// //   // Função Placeholder para o Backend
// //   const handleClientOperation = (data: Cliente) => {
// //     // ⚠️ SUBSTITUIR ESTA LÓGICA PELO SEU CÓDIGO DE BACKEND:
// //     // Ex: await fetch('/api/clientes', { method: 'POST', body: JSON.stringify(data) });
    
// //     alert(`Operação enviada para o backend (simulado). Nome: ${data.nome}`);
// //     setIsModalOpen(false);
    
// //     // Após o sucesso do backend, você precisaria recarregar a lista (ou atualizar o estado localmente)
// //     // Para manter a simulação:
// //     if (!data.id_cliente) {
// //         setClientes(prev => [{...data, id_cliente: Math.random() * 100}, ...prev]);
// //     }
// //   };

// //   const handleDelete = (id: number) => {
// //     if (confirm('Tem certeza que deseja excluir?')) {
// //       // ⚠️ SUBSTITUIR ESTA LÓGICA PELO SEU CÓDIGO DE BACKEND:
// //       // Ex: await fetch(`/api/clientes/${id}`, { method: 'DELETE' });
// //       alert('Comando de Exclusão enviado para o backend (simulado).');
      
// //       // Para manter a simulação:
// //       setClientes(clientes.filter(c => c.id_cliente !== id));
// //     }
// //   };

// //   return (
// //     <div>
// //       <div className="flex justify-between items-center mb-6">
// //         <h1 className="text-3xl font-bold text-gray-900">Gerenciamento de Clientes</h1>
// //         <button
// //           onClick={() => {setSelectedClient(null); setIsModalOpen(true);}}
// //           className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md shadow-md transition-colors"
// //         >
// //           + Novo Cliente
// //         </button>
// //       </div>

// //       <div className="bg-white p-6 rounded-lg shadow-xl">
// //           {/* Tabela de Clientes (Mantida) */}
// //           <table className="min-w-full divide-y divide-gray-200">
// //             {/* ... Conteúdo do <thead> ... */}
// //             <thead className="bg-gray-50">
// //               <tr>
// //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
// //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CPF</th>
// //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nascimento</th>
// //                 <th className="relative px-6 py-3"><span className="sr-only">Ações</span></th>
// //               </tr>
// //             </thead>
// //             <tbody className="bg-white divide-y divide-gray-200">
// //               {clientes.map((cliente) => (
// //                 <tr key={cliente.id_cliente}>
// //                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{cliente.nome}</td>
// //                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cliente.cpf}</td>
// //                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
// //                     {format(new Date(cliente.datanasc), 'dd/MM/yyyy')}
// //                   </td>
// //                   <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
// //                     <button
// //                       onClick={() => {setSelectedClient(cliente); setIsModalOpen(true);}}
// //                       className="text-indigo-600 hover:text-indigo-900 mr-4"
// //                     >
// //                       Editar
// //                     </button>
// //                     <button
// //                       onClick={() => handleDelete(cliente.id_cliente)}
// //                       className="text-red-600 hover:text-red-900"
// //                     >
// //                       Excluir
// //                     </button>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //       </div>

// //       {/* Modal para Adicionar/Editar */}
// //       {isModalOpen && (
// //         <ClientForm
// //           client={selectedClient}
// //           onClose={() => setIsModalOpen(false)}
// //           onSave={handleClientOperation} // Passamos a função de operação unificada
// //         />
// //       )}
// //     </div>
// //   );
// // }

'use client'
import { useState, useEffect } from 'react';
import ClientForm, { ClienteForm } from '@/components/ClientForm'; // agora importamos o tipo ClienteForm
import { format } from 'date-fns';
import { api } from '@/app/lib/http';
import { ENDPOINTS } from '@/app/lib/api';

// Tipo para a tabela (id_cliente sempre definido)
interface Cliente {
  id_cliente: number;
  nome: string;
  cpf: number;
  datanasc: string; // YYYY-MM-DD
}

export default function ClientesPage() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<ClienteForm | null>(null);

  // Hook para carregar clientes do backend
  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await api.get(ENDPOINTS.clientes);
        setClientes(response.data);
      } catch (error) {
        console.error('Erro ao carregar clientes:', error);
        alert('Não foi possível carregar os clientes.');
      }
    };
    fetchClientes();
  }, []);

  // Salvar/editar cliente
  const handleClientOperation = async (data: ClienteForm) => {
    try {
      if (data.id_cliente) {
        // PUT
        const response = await api.put(`${ENDPOINTS.clientes}/${data.id_cliente}`, data);
        // Atualiza lista convertendo para Cliente (id_cliente sempre definido)
        setClientes(prev =>
          prev.map(c => (c.id_cliente === data.id_cliente ? response.data : c))
        );
        console.log('Cliente atualizado com sucesso!');
      } else {
        // POST
        console.log('Criando novo cliente:', data);
        const response = await api.post(ENDPOINTS.clientes, data);
        setClientes(prev => [response.data, ...prev]);
        console.log('Cliente criado com sucesso!');
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Erro ao salvar cliente:', error);
      alert('Não foi possível salvar o cliente.');
    }
  };

  // Deletar cliente
  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir?')) return;
    try {
      await api.delete(`${ENDPOINTS.clientes}/${id}`);
      setClientes(prev => prev.filter(c => c.id_cliente !== id));
      console.log('Cliente excluído com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir cliente:', error);
      alert('Não foi possível excluir o cliente.');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Gerenciamento de Clientes</h1>
        <button
          onClick={() => { setSelectedClient(null); setIsModalOpen(true); }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md shadow-md transition-colors"
        >
          + Novo Cliente
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-xl">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CPF</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nascimento</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {clientes.map(cliente => (
              <tr key={cliente.id_cliente}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{cliente.nome}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cliente.cpf}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {format(new Date(cliente.datanasc + 'T00:00:00'), 'dd/MM/yyyy')} 
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => { setSelectedClient(cliente); setIsModalOpen(true); }}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(cliente.id_cliente)}
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
        <ClientForm
          client={selectedClient}
          onClose={() => setIsModalOpen(false)}
          onSave={handleClientOperation} // agora tipado como ClienteForm
        />
      )}
    </div>
  );
}
