// components/EspacoForm.tsx
'use client'
import { useState } from 'react';

interface Espaco {
  id_espaco: number | null; 
  nome: string;
  descricao: string;
  capacidade: number;
  preco: number;
  tipo: string;
  diasIndisponiveis: string[];
}

interface EspacoFormProps {
  espaco: Espaco | null;
  onClose: () => void;
  onSave: (data: Espaco) => void;
}

// Converte array de datas em string (separado por vírgulas)
const arrayToString = (arr: string[]) => arr.join(', ');
// Converte string de volta em array de datas
const stringToArray = (str: string): string[] => 
    str.split(',').map(s => s.trim()).filter(s => s.length > 0);


export default function EspacoForm({ espaco, onClose, onSave }: EspacoFormProps) {
  const [formData, setFormData] = useState({
    nome: espaco?.nome || '',
    descricao: espaco?.descricao || '',
    capacidade: espaco?.capacidade.toString() || '',
    preco: espaco?.preco.toString() || '',
    tipo: espaco?.tipo || '',
    diasIndisponiveisString: espaco?.diasIndisponiveis ? arrayToString(espaco.diasIndisponiveis) : '',
  });

  const isEditing = !!espaco;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nome || !formData.preco || !formData.capacidade) {
      alert('Nome, Preço e Capacidade são obrigatórios.');
      return;
    }

    const dataToSave: Espaco = {
        id_espaco: espaco?.id_espaco || null,
        nome: formData.nome,
        descricao: formData.descricao,
        capacidade: parseInt(formData.capacidade, 10),
        preco: parseFloat(formData.preco),
        tipo: formData.tipo,
        diasIndisponiveis: stringToArray(formData.diasIndisponiveisString), 
    };
    
    onSave(dataToSave);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center">
      <div className="relative bg-white p-8 rounded-lg shadow-2xl w-full max-w-lg mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">
          {isEditing ? 'Editar Espaço' : 'Novo Espaço'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome</label>
            <input type="text" name="nome" id="nome" value={formData.nome} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500" />
          </div>

          <div>
            <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">Descrição</label>
            <textarea name="descricao" id="descricao" rows={2} value={formData.descricao} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500" />
          </div>

          <div className="grid grid-cols-3 gap-4">
              <div>
                <label htmlFor="preco" className="block text-sm font-medium text-gray-700">Preço (R$)</label>
                <input type="number" name="preco" id="preco" value={formData.preco} onChange={handleChange} required step="0.01" min="0" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500" />
              </div>

              <div>
                <label htmlFor="capacidade" className="block text-sm font-medium text-gray-700">Capacidade</label>
                <input type="number" name="capacidade" id="capacidade" value={formData.capacidade} onChange={handleChange} required min="1" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500" />
              </div>
              
              <div>
                <label htmlFor="tipo" className="block text-sm font-medium text-gray-700">Tipo</label>
                <select name="tipo" id="tipo" value={formData.tipo} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500">
                    <option value="">Selecione o Tipo</option>
                    <option value="Salão de Festas">Salão de Festas</option>
                    <option value="Área Gourmet">Área Gourmet</option>
                    <option value="Quadra">Quadra</option>
                    <option value="Outro">Outro</option>
                </select>
              </div>
          </div>

          <div>
            <label htmlFor="diasIndisponiveisString" className="block text-sm font-medium text-gray-700">Dias Indisponíveis (YYYY-MM-DD)</label>
            <textarea
              name="diasIndisponiveisString"
              id="diasIndisponiveisString"
              rows={2}
              value={formData.diasIndisponiveisString}
              onChange={handleChange}
              placeholder="Ex: 2025-12-01, 2025-12-02, 2025-12-05"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <p className="text-xs text-gray-500 mt-1">Separe as datas por vírgula.</p>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button type="button" onClick={onClose} className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
              Cancelar
            </button>
            <button type="submit" className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors">
              {isEditing ? 'Salvar Alterações' : 'Cadastrar Espaço'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}