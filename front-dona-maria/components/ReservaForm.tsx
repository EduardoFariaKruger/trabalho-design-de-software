// 'use client'
// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { api } from "@/app/lib/http";
// import { ENDPOINTS } from "@/app/lib/api";

// // Interfaces simplificadas
// interface ClienteSelect { id: number; nome: string; }
// interface EspacoSelect { id: number; nome: string; preco: number; }

// interface ReservaForma {
//     id_reserva: number | null;
//     data: string; 
//     id_cliente: number;
//     id_espaco: number;
//     id_adm: number; 
//     valorTotal: number; 
//     valorPago: number;
//     tipoPagamento: string;
// }

// // Dados Mock (Buscaria de endpoints /api/clientes e /api/espacos)
// const MOCK_CLIENTES_SELECT: ClienteSelect[] = [
//     { id: 1, nome: 'João da Silva' },
//     { id: 2, nome: 'Maria Oliveira' },
//     { id: 3, nome: 'Pedro Souza' },
// ];

// const MOCK_ESPACOS_SELECT: EspacoSelect[] = [
//     { id: 1, nome: 'Salão Principal', preco: 800.00 },
//     { id: 2, nome: 'Churrasqueira VIP', preco: 350.00 },
//     { id: 3, nome: 'Quadra Esportiva', preco: 120.00 },
// ];
// const ID_ADM_FIXO = 99; 


// interface ReservaFormProps {
//     reserva: ReservaForma | null;
//     onClose: () => void;
//     onSave: (data: ReservaForma) => void;
// }


// export default function ReservaForm({ reserva, onClose, onSave }: ReservaFormProps) {
//     const isEditing = !!reserva;
    
//     // Encontrar o preço inicial para o cálculo
//     const initialPrice = MOCK_ESPACOS_SELECT.find(e => e.id === reserva?.id_espaco)?.preco || 0;

//     const [formData, setFormData] = useState({
//         data: reserva?.data || '',
//         id_cliente: reserva?.id_cliente.toString() || '',
//         id_espaco: reserva?.id_espaco.toString() || '',
        
//         // Pagamento
//         valorTotal: reserva?.valorTotal.toString() || initialPrice.toString(),
//         valorPago: reserva?.valorPago.toString() || initialPrice.toString(),
//         tipoPagamento: reserva?.tipoPagamento || 'PIX',
//     });

//     // Atualiza valorTotal quando o espaço muda
//     useEffect(() => {
//         const selectedEspaco = MOCK_ESPACOS_SELECT.find(e => e.id === parseInt(formData.id_espaco));
//         if (selectedEspaco) {
//             setFormData(prev => ({
//                 ...prev,
//                 valorTotal: selectedEspaco.preco.toFixed(2),
//                 // Em nova reserva, valorPago assume valorTotal
//                 valorPago: isEditing ? prev.valorPago : selectedEspaco.preco.toFixed(2), 
//             }));
//         }
//     }, [formData.id_espaco, isEditing]);

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({ ...prev, [name]: value }));
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();

//         // 1. Validação
//         if (!formData.data || !formData.id_cliente || !formData.id_espaco || !formData.valorPago) {
//             alert('Por favor, preencha todos os campos principais.');
//             return;
//         }

//         const dataToSave: ReservaForma = {
//             id_reserva: reserva?.id_reserva || null,
//             data: formData.data,
//             id_cliente: parseInt(formData.id_cliente, 10),
//             id_espaco: parseInt(formData.id_espaco, 10),
//             id_adm: ID_ADM_FIXO, 
//             valorTotal: parseFloat(formData.valorTotal),
//             valorPago: parseFloat(formData.valorPago),
//             tipoPagamento: formData.tipoPagamento,
//         };
        
//         // 2. Envio ao backend
//         await onSave(dataToSave);
//         onClose();
//     };

//     return (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center">
//             <div className="relative bg-white p-8 rounded-lg shadow-2xl w-full max-w-lg mx-auto">
//                 <h2 className="text-2xl font-bold mb-6 text-gray-900">
//                     {isEditing ? 'Editar Reserva' : 'Nova Reserva'}
//                 </h2>
                
//                 <form onSubmit={handleSubmit} className="space-y-4">
                    
//                     {/* Linha 1: Cliente e Data */}
//                     <div className="grid grid-cols-2 gap-4">
                        
//                         {/* Data da Reserva */}
//                         <div>
//                             <label htmlFor="data" className="block text-sm font-medium text-gray-700">Data da Reserva</label>
//                             <input type="date" name="data" id="data" value={formData.data} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500" />
//                         </div>
                        
//                         {/* Cliente */}
//                         <div>
//                             <label htmlFor="id_cliente" className="block text-sm font-medium text-gray-700">Cliente</label>
//                             <select name="id_cliente" id="id_cliente" value={formData.id_cliente} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500">
//                                 <option value="">Selecione o Cliente</option>
//                                 {MOCK_CLIENTES_SELECT.map(c => (
//                                     <option key={c.id} value={c.id}>{c.nome}</option>
//                                 ))}
//                             </select>
//                         </div>
//                     </div>

//                     {/* Linha 2: Espaço e Valor Total */}
//                     <div className="grid grid-cols-2 gap-4">
//                         {/* Espaço */}
//                         <div>
//                             <label htmlFor="id_espaco" className="block text-sm font-medium text-gray-700">Espaço Reservado</label>
//                             <select name="id_espaco" id="id_espaco" value={formData.id_espaco} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500">
//                                 <option value="">Selecione o Espaço</option>
//                                 {MOCK_ESPACOS_SELECT.map(e => (
//                                     <option key={e.id} value={e.id}>{e.nome} (R$ {e.preco.toFixed(2)})</option>
//                                 ))}
//                             </select>
//                         </div>

//                         {/* Valor Total (ReadOnly) */}
//                         <div>
//                             <label htmlFor="valorTotal" className="block text-sm font-medium text-gray-700">Valor Total (R$)</label>
//                             <input type="text" name="valorTotal" id="valorTotal" value={formData.valorTotal} readOnly className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-900" />
//                         </div>
//                     </div>

//                     <h3 className="text-lg font-semibold text-gray-900 pt-4 border-t mt-4">Dados de Pagamento</h3>

//                     {/* Linha 3: Valor Pago e Tipo de Pagamento */}
//                     <div className="grid grid-cols-2 gap-4">
//                         {/* Valor Pago */}
//                         <div>
//                             <label htmlFor="valorPago" className="block text-sm font-medium text-gray-700">Valor Pago (R$)</label>
//                             <input type="number" name="valorPago" id="valorPago" value={formData.valorPago} onChange={handleChange} required step="0.01" min="0" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500" />
//                         </div>
                        
//                         {/* Tipo de Pagamento */}
//                         <div>
//                             <label htmlFor="tipoPagamento" className="block text-sm font-medium text-gray-700">Tipo de Pagamento</label>
//                             <select name="tipoPagamento" id="tipoPagamento" value={formData.tipoPagamento} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500">
//                                 <option value="PIX">PIX</option>
//                                 <option value="Cartão">Cartão</option>
//                                 <option value="Transferência">Transferência</option>
//                                 <option value="Dinheiro">Dinheiro</option>
//                             </select>
//                         </div>
//                     </div>
                    
//                     {/* Botões de Ação */}
//                     <div className="flex justify-end space-x-3 pt-4">
//                         <button type="button" onClick={onClose} className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
//                             Cancelar
//                         </button>
//                         <button type="submit" className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors">
//                             {isEditing ? 'Salvar Reserva' : 'Registrar Reserva'}
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// }

'use client'
import { useState, useEffect } from 'react';
import { api } from "@/app/lib/http";
import { ENDPOINTS } from "@/app/lib/api";

// Interfaces simplificadas
interface ClienteSelect { id: number; nome: string; }
interface EspacoSelect { id: number; nome: string; preco: number; }

interface ReservaForma {
    id_reserva: number | null;
    data: string; 
    id_cliente: number;
    id_espaco: number;
    id_adm: number; 
    valorTotal: number; 
    valorPago: number;
    tipoPagamento: string;
}

const ID_ADM_FIXO = 99; 

interface ReservaFormProps {
    reserva: ReservaForma | null;
    onClose: () => void;
    onSave: (data: ReservaForma) => Promise<void>;
}

export default function ReservaForm({ reserva, onClose, onSave }: ReservaFormProps) {
    const isEditing = !!reserva;

    const [formData, setFormData] = useState({
        data: reserva?.data || '',
        id_cliente: reserva?.id_cliente.toString() || '',
        id_espaco: reserva?.id_espaco.toString() || '',
        valorTotal: reserva?.valorTotal.toString() || '0',
        valorPago: reserva?.valorPago.toString() || '0',
        tipoPagamento: reserva?.tipoPagamento || 'PIX',
    });

    const [clientesSelect, setClientesSelect] = useState<ClienteSelect[]>([]);
    const [espacosSelect, setEspacosSelect] = useState<EspacoSelect[]>([]);

    // Buscar clientes da API
    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const response = await api.get(ENDPOINTS.clientes);
                setClientesSelect(response.data); // assume array de {id, nome}
            } catch (error) {
                console.error("Erro ao buscar clientes:", error);
                alert("Não foi possível carregar os clientes.");
            }
        };
        fetchClientes();
    }, []);

    // Buscar espaços da API
    useEffect(() => {
        const fetchEspacos = async () => {
            try {
                const response = await api.get(ENDPOINTS.espacos);
                setEspacosSelect(response.data); // assume array de {id, nome, preco}
            } catch (error) {
                console.error("Erro ao buscar espaços:", error);
                alert("Não foi possível carregar os espaços.");
            }
        };
        fetchEspacos();
    }, []);

    // Atualiza valorTotal e valorPago quando o espaço muda
    useEffect(() => {
        const selectedEspaco = espacosSelect.find(
            (e) => e.id === parseInt(formData.id_espaco)
        );
        if (selectedEspaco) {
            setFormData(prev => ({
                ...prev,
                valorTotal: selectedEspaco.preco.toFixed(2),
                valorPago: isEditing ? prev.valorPago : selectedEspaco.preco.toFixed(2),
            }));
        }
    }, [formData.id_espaco, espacosSelect, isEditing]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.data || !formData.id_cliente || !formData.id_espaco || !formData.valorPago) {
            alert('Por favor, preencha todos os campos principais.');
            return;
        }

        const dataToSave: ReservaForma = {
            id_reserva: reserva?.id_reserva || null,
            data: formData.data,
            id_cliente: parseInt(formData.id_cliente, 10),
            id_espaco: parseInt(formData.id_espaco, 10),
            id_adm: ID_ADM_FIXO,
            valorTotal: parseFloat(formData.valorTotal),
            valorPago: parseFloat(formData.valorPago),
            tipoPagamento: formData.tipoPagamento,
        };

        // Envia ao backend via onSave (POST ou PUT)
        await onSave(dataToSave);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center">
            <div className="relative bg-white p-8 rounded-lg shadow-2xl w-full max-w-lg mx-auto">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">
                    {isEditing ? 'Editar Reserva' : 'Nova Reserva'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Linha 1: Cliente e Data */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="data" className="block text-sm font-medium text-gray-700">Data da Reserva</label>
                            <input type="date" name="data" id="data" value={formData.data} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500" />
                        </div>

                        <div>
                            <label htmlFor="id_cliente" className="block text-sm font-medium text-gray-700">Cliente</label>
                            <select name="id_cliente" id="id_cliente" value={formData.id_cliente} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500">
                                <option value="">Selecione o Cliente</option>
                                {clientesSelect.map(c => (
                                    <option key={c.id} value={c.id}>{c.nome}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Linha 2: Espaço e Valor Total */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="id_espaco" className="block text-sm font-medium text-gray-700">Espaço Reservado</label>
                            <select name="id_espaco" id="id_espaco" value={formData.id_espaco} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500">
                                <option value="">Selecione o Espaço</option>
                                {espacosSelect.map(e => (
                                    <option key={e.id} value={e.id}>{e.nome} (R$ {e.preco.toFixed(2)})</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="valorTotal" className="block text-sm font-medium text-gray-700">Valor Total (R$)</label>
                            <input type="text" name="valorTotal" id="valorTotal" value={formData.valorTotal} readOnly className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-900" />
                        </div>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 pt-4 border-t mt-4">Dados de Pagamento</h3>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="valorPago" className="block text-sm font-medium text-gray-700">Valor Pago (R$)</label>
                            <input type="number" name="valorPago" id="valorPago" value={formData.valorPago} onChange={handleChange} required step="0.01" min="0" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500" />
                        </div>

                        <div>
                            <label htmlFor="tipoPagamento" className="block text-sm font-medium text-gray-700">Tipo de Pagamento</label>
                            <select name="tipoPagamento" id="tipoPagamento" value={formData.tipoPagamento} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500">
                                <option value="PIX">PIX</option>
                                <option value="Cartão">Cartão</option>
                                <option value="Transferência">Transferência</option>
                                <option value="Dinheiro">Dinheiro</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                        <button type="button" onClick={onClose} className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                            Cancelar
                        </button>
                        <button type="submit" className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors">
                            {isEditing ? 'Salvar Reserva' : 'Registrar Reserva'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
