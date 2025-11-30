"use client";
import { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import ReservaForm from "@/components/ReservaForm";
import { api } from "@/app/lib/http";
import { ENDPOINTS } from "@/app/lib/api";
import Link from "next/link";

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
  id_pagamento?: number;
  id_adm: number;
}

interface ReservaFormaBase {
  id_reserva: number | null;
  data: string;
  id_cliente: number;
  id_espaco: number;
  id_pagamento?: number;
  id_adm: number;
  valorTotal: number;
  valorPago: number;
  tipoPagamento: string;
}

interface Espaco {
  id_espaco: number | null; 
  nome: string;
  descricao: string;
  capacidade: number;
  preco: number;
  tipo: string;
  diasindisponiveis: string[] | null;
}

export default function ReservasPage() {
  const [reservas, setReservas] = useState<ReservaExibicao[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReserva, setSelectedReserva] =
    useState<ReservaFormaBase | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reservaOriginal, setReservaOriginal] = useState<ReservaExibicao | null>(null);

  const fetchReservas = async () => {
    setLoading(true);
    setError(null);

    try {
      const reservasRes = await api.get(ENDPOINTS.reservas);
      const reservas = reservasRes.data as any[];

      const [clientesRes, espacosRes, pagamentosRes] = await Promise.all([
        api.get(ENDPOINTS.clientes),
        api.get(ENDPOINTS.espacos),
        api.get(ENDPOINTS.pagamentos),
      ]);

      const clientes = clientesRes.data as any[];
      const espacos = espacosRes.data as any[];
      const pagamentos = pagamentosRes.data as any[];

      const reservasFormatadas: ReservaExibicao[] = reservas.map((r: any) => {
        const cliente = clientes.find(
          (c: any) => c.id_cliente === r.id_cliente
        );
        const espaco = espacos.find((e: any) => e.id_espaco === r.id_espaco);
        const pagamento = pagamentos.find(
          (p: any) => p.id_reserva === r.id_reserva
        );

        return {
          id_reserva: r.id_reserva,
          data: r.data,
          id_cliente: r.id_cliente,
          id_espaco: r.id_espaco,
          id_pagamento: pagamento?.id_pagamento,
          id_adm: r.id_adm ?? 1,
          nome_cliente: cliente?.nome ?? "Desconhecido",
          nome_espaco: espaco?.nome ?? "Desconhecido",

          valorTotal: pagamento?.valorTotal ?? 0,
          valorPago: pagamento?.valorPago ?? 0,
          tipoPagamento: pagamento?.tipoPagamento ?? "Não informado",
        };
      });

      setReservas(reservasFormatadas);
    } catch (err) {
      console.error("Erro ao buscar reservas:", err);
      setError(
        "Não foi possível carregar as reservas. Tente novamente mais tarde."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservas();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-8 text-center pt-20">
        <p className="text-xl text-indigo-600">Carregando reservas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 p-8 text-center pt-20">
        <h2 className="text-xl font-bold text-red-600 mb-4">Erro de Conexão</h2>
        <p className="text-gray-700">{error}</p>
        <Link
          href="/login"
          className="mt-6 inline-block text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          Voltar para o Login
        </Link>
      </div>
    );
  }

  const handleOpenModal = (reservaToEdit: ReservaExibicao | null = null) => {
    if (reservaToEdit) {
      setSelectedReserva({
        id_reserva: reservaToEdit.id_reserva,
        data: reservaToEdit.data,
        id_cliente: reservaToEdit.id_cliente,
        id_espaco: reservaToEdit.id_espaco,
        id_pagamento: reservaToEdit.id_pagamento,
        id_adm: reservaToEdit.id_adm,
        valorTotal: reservaToEdit.valorTotal,
        valorPago: reservaToEdit.valorPago,
        tipoPagamento: reservaToEdit.tipoPagamento,
      });
      setReservaOriginal(reservaToEdit); // <-- guarda original
    } else {
      setSelectedReserva(null);
      setReservaOriginal(null);
    }
    setIsModalOpen(true);
  };

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

        console.log("selectedReserva:",data)
        // Atualiza pagamento
        if (data.id_pagamento) {
          console.log("PUT pagamento:", data)
          await api.put(`${ENDPOINTS.pagamentos}/${data.id_pagamento}`, {
            valorPago: data.valorPago,
            valorTotal: data.valorTotal,
            tipoPagamento: data.tipoPagamento,
          });
        }

        if (reservaOriginal) {
          const espacoRes = await api.get(`${ENDPOINTS.espacos}/${reservaOriginal.id_espaco}`);
          const espacoAtual: Espaco = espacoRes.data;

          const diasIndisponiveis = [
            ...(espacoAtual.diasindisponiveis || []).filter(d => d !== reservaOriginal.data),
            data.data
          ];

          const payloadEspaco: Espaco = {
            ...espacoAtual,
            diasindisponiveis: diasIndisponiveis
          };

          await api.put(`${ENDPOINTS.espacos}/${data.id_espaco}`, payloadEspaco);
        }

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
        const pagamentoResponse = await api.post(ENDPOINTS.pagamentos, {
          id_reserva: reservaId,
          valorPago: data.valorPago,
          valorTotal: data.valorTotal,
          tipoPagamento: data.tipoPagamento,
        });

        data.id_pagamento = pagamentoResponse.data.id_pagamento;

        // Atualiza dias indisponíveis do espaço
        const espacoRes = await api.get(`${ENDPOINTS.espacos}/${data.id_espaco}`);
        const espacoAtual: Espaco = espacoRes.data;

        const diasIndisponiveis = Array.from(
          new Set([...(espacoAtual.diasindisponiveis || []), data.data])
        );

        const payloadEspaco: Espaco = {
          id_espaco: espacoAtual.id_espaco,
          nome: espacoAtual.nome,
          descricao: espacoAtual.descricao,
          capacidade: espacoAtual.capacidade,
          preco: espacoAtual.preco,
          tipo: espacoAtual.tipo,
          diasindisponiveis: diasIndisponiveis,
        };

        await api.put(`${ENDPOINTS.espacos}/${data.id_espaco}`, payloadEspaco);
        console.log("Reserva e pagamento criados com sucesso!");
      }

      setIsModalOpen(false);
      fetchReservas();
    } catch (error: any) {
      if (error.response?.status === 409) {
        alert("Esta data já está reservada para este espaço.");
        return;
      }
      console.error("Erro ao salvar:", error);
      alert("Erro ao salvar a reserva.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir esta reserva?")) return;

    try {
      await api.delete(`${ENDPOINTS.reservas}/${id}`);
      setReservas((prev) => prev.filter((e) => e.id_espaco !== id));
      console.log("Espaço excluído com sucesso.");

      fetchReservas();
    } catch (error) {
      console.error("Erro ao excluir reserva:", error);
      alert("Não foi possível excluir a reserva.");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Gerenciamento de Reservas
        </h1>
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cliente / Espaço
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Data
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Valor / Pago
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pgto
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reservas.map((reserva) => (
              <tr key={reserva.id_reserva}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {reserva.nome_cliente}
                  </div>
                  <div className="text-xs text-gray-500">
                    {reserva.nome_espaco}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {format(parseISO(reserva.data), "dd/MM/yyyy")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="text-sm font-medium text-gray-900">
                    Total: R$ {(reserva.valorTotal ?? 0).toFixed(2)}
                  </div>

                  {(reserva.valorPago ?? 0) < (reserva.valorTotal ?? 0) ? (
                    <div className="text-xs text-red-600">
                      Pago: R$ {(reserva.valorPago ?? 0).toFixed(2)} (Pendente)
                    </div>
                  ) : (
                    <div className="text-xs text-green-600">
                      Pago: R$ {(reserva.valorPago ?? 0).toFixed(2)} (Completo)
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {reserva.tipoPagamento}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() =>
                      handleOpenModal(reserva)
                    }
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
