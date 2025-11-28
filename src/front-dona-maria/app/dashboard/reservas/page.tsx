'use client'
import { useState } from 'react';
import { format } from 'date-fns';
import ReservaForm from '@/components/ReservaForm';
import { api } from "@/app/lib/http";
import { ENDPOINTS } from "@/app/lib/api";

interface ReservaExibicao {
  id_reserva: number;
  data: string;
  nome_cliente: string; 
  nome_espaco: string; 
  valorTotal: number;
  valorPago: number;
  tipoPagamento: string;

  id_cliente: number; 
  id_espaco: number;
}

interface ReservaFormaBase {
    id_reserva: number | null;
    data: string; 
    id_cliente: number;
    id_espaco: number;
    id_adm: number; 
    valorTotal: number; 
    valorPago: number;
    tipoPagamento: string;
}

const MOCK_RESERVAS: ReservaExibicao[] = [
  { id_reserva: 101, data: '2025-12-10', nome_cliente: 'João da Silva', nome_espaco: 'Salão Principal', valorTotal: 800.00, valorPago: 800.00, tipoPagamento: 'PIX', id_cliente: 1, id_espaco: 1},
  { id_reserva: 102, data: '2025-11-20', nome_cliente: 'Maria Oliveira', nome_espaco: 'Quadra Esportiva', valorTotal: 120.00, valorPago: 60.00, tipoPagamento: 'Cartão', id_cliente: 2, id_espaco: 3}
];

export default function ReservasPage() {
  const [reservas, setReservas] = useState<ReservaExibicao[]>(MOCK_RESERVAS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReserva, setSelectedReserva] = useState<ReservaFormaBase | null>(null);

  const handleOpenModal = (reservaToEdit: ReservaFormaBase | null = null) => {
    // Nota: Em um projeto real, você buscaria os IDs do cliente/espaço pelo id_reserva.
    // Aqui, estamos apenas simulando o objeto
    setSelectedReserva(reservaToEdit);
    setIsModalOpen(true);
  };

  // const handleSave = (data: ReservaFormaBase) => {
  //     // ⚠️ SUBSTITUIR PELA SUA CHAMADA DE API (POST/PUT)
  //     alert(`Dados de Reserva e Pagamento enviados ao backend! ID Espaço: ${data.id_espaco}, Valor Pago: R$ ${data.valorPago}`);
  //     // Em caso de sucesso: Fechar modal e recarregar a lista (ou atualizar o estado)
  // }

  const handleSave = async (data: ReservaFormaBase) => {
    try {
      let reservaId = data.id_reserva;

      if (reservaId) {
        // Atualiza reserva
        await api.put(`${ENDPOINTS.reservas}/${reservaId}`, {
          data: data.data,
          id_cliente: data.id_cliente,
          id_espaco: data.id_espaco,
          id_adm: data.id_adm,
        });

        // Atualiza pagamento
        await api.put(`${ENDPOINTS.pagamentos}/${reservaId}`, {
          valorPago: data.valorPago,
          valorTotal: data.valorTotal,
          tipoPagamento: data.tipoPagamento,
        });

        console.log("Reserva e pagamento atualizados com sucesso!");
      } else {
        // Cria reserva
        const reservaResponse = await api.post(ENDPOINTS.reservas, {
          data: data.data,
          id_cliente: data.id_cliente,
          id_espaco: data.id_espaco,
          id_adm: data.id_adm,
        });

        reservaId = reservaResponse.data.id_reserva;

        // Cria pagamento
        await api.post(ENDPOINTS.pagamentos, {
          id_reserva: reservaId,
          valorPago: data.valorPago,
          valorTotal: data.valorTotal,
          tipoPagamento: data.tipoPagamento,
        });

        console.log("Reserva e pagamento criados com sucesso!");
      }
    } catch (error: any) {
      console.error("Erro ao salvar reserva + pagamento:", error);
      alert(`Erro ao salvar: ${error.response?.data?.message || error.message}`);
    }
  };
  
  const handleDelete = (id: number) => {
    if (confirm('Tem certeza que deseja cancelar esta reserva?')) {
      // ⚠️ SUBSTITUIR PELA SUA CHAMADA DE API (DELETE)
      alert('Comando de Cancelamento enviado para o backend (simulado).');
      setReservas(reservas.filter(r => r.id_reserva !== id));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Gerenciamento de Reservas</h1>
        <button
          onClick={() => handleOpenModal(null)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md shadow-md transition-colors"
        >
          + Nova Reserva
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-xl">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente / Espaço</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor / Pago</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pgto</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reservas.map((reserva) => (
              <tr key={reserva.id_reserva}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{reserva.nome_cliente}</div>
                  <div className="text-xs text-gray-500">{reserva.nome_espaco}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {format(new Date(reserva.data), 'dd/MM/yyyy')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="text-sm font-medium text-gray-900">Total: R$ {reserva.valorTotal.toFixed(2)}</div>
                    {reserva.valorPago < reserva.valorTotal ? (
                        <div className="text-xs text-red-600">Pago: R$ {reserva.valorPago.toFixed(2)} (Pendente)</div>
                    ) : (
                        <div className="text-xs text-green-600">Pago: R$ {reserva.valorPago.toFixed(2)} (Completo)</div>
                    )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {reserva.tipoPagamento}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleOpenModal(reserva as unknown as ReservaFormaBase)} 
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(reserva.id_reserva)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Cancelar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <ReservaForm
          reserva={selectedReserva}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave} 
        />
      )}
    </div>
  );
}