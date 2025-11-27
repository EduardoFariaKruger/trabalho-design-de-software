'use client'
import { useState } from 'react';

export interface ClienteForm {
  id_cliente: number | null; // Pode ser null para novos clientes
  nome: string;
  cpf: number;
  dataNasc: string;
}

// Props esperadas pelo componente
interface ClientFormProps {
  client: ClienteForm | null;
  onClose: () => void;
  onSave: (data: ClienteForm) => Promise<void>; // Função para enviar dados ao componente pai/backend
}

export default function ClientForm({ client, onClose, onSave }: ClientFormProps) {
  const [formData, setFormData] = useState({
    nome: client?.nome || '',
    cpf: client?.cpf.toString() || '',
    dataNasc: client?.dataNasc || '',
  });

  const isEditing = !!client;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Validação
    if (!formData.nome || !formData.cpf || !formData.dataNasc) {
      alert('Todos os campos são obrigatórios.');
      return;
    }

    const dataToSave: ClienteForm = {
        // Se estiver editando, envia o ID, senão envia null ou undefined
        id_cliente: client?.id_cliente || null, 
        nome: formData.nome,
        cpf: parseInt(formData.cpf, 10),
        dataNasc: formData.dataNasc,
    };
    
    // 2. Chama a função passada pelo pai (que fará a requisição ao backend)
    onSave(dataToSave);
    
    // O onClose() será chamado dentro do onSave na página pai, após o sucesso do backend
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center">
      <div className="relative bg-white p-8 rounded-lg shadow-2xl w-full max-w-lg mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">
          {isEditing ? 'Editar Cliente' : 'Novo Cliente'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Nome */}
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome</label>
            <input
              type="text"
              name="nome"
              id="nome"
              value={formData.nome}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* CPF */}
          <div>
            <label htmlFor="cpf" className="block text-sm font-medium text-gray-700">CPF</label>
            <input
              type="number"
              name="cpf"
              id="cpf"
              value={formData.cpf}
              onChange={handleChange}
              required
              maxLength={11}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Data de Nascimento */}
          <div>
            <label htmlFor="dataNasc" className="block text-sm font-medium text-gray-700">Data de Nascimento</label>
            <input
              type="date"
              name="dataNasc"
              id="dataNasc"
              value={formData.dataNasc}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Botões de Ação */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
            >
              {isEditing ? 'Salvar Alterações' : 'Cadastrar Cliente'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}