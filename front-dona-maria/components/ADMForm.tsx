'use client'
import { useState } from 'react';

interface ADMForma {
  id_adm: number | null;
  login: string;
  senha: string;
}

interface ADMFormProps {
  adm: ADMForma | null;
  onClose: () => void;
  onSave: (data: ADMForma) => void; 
}

export default function ADMForm({ adm, onClose, onSave }: ADMFormProps) {
  const isEditing = !!adm;
  
  const [formData, setFormData] = useState({
    login: adm?.login || '',
    senha: '', 
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.login) {
      alert('O campo Login é obrigatório.');
      return;
    }

    if (!isEditing && !formData.senha) {
        alert('O campo Senha é obrigatório para um novo ADM.');
        return;
    }
    
    const dataToSave: ADMForma = {
        id_adm: adm?.id_adm || null, 
        login: formData.login,
        senha: formData.senha, 
    };
    
    onSave(dataToSave);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center">
      <div className="relative bg-white p-8 rounded-lg shadow-2xl w-full max-w-lg mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">
          {isEditing ? 'Editar ADM' : 'Novo ADM'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Campo Login */}
          <div>
            <label htmlFor="login" className="block text-sm font-medium text-gray-700">Login</label>
            <input 
              type="text" 
              name="login" 
              id="login" 
              value={formData.login} 
              onChange={handleChange} 
              required 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500" 
            />
          </div>

          <div>
            <label htmlFor="senha" className="block text-sm font-medium text-gray-700">
                {isEditing ? 'Nova Senha (deixe vazio para manter a atual)' : 'Senha'}
            </label>
            <input 
              type="password" 
              name="senha" 
              id="senha" 
              value={formData.senha} 
              onChange={handleChange} 
              required={!isEditing} // Requerido apenas se NÃO estiver editando
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500" 
            />
          </div>

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
              {isEditing ? 'Salvar Alterações' : 'Cadastrar ADM'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}