export default function DashboardPage() {
    return (
      <div>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
          Bem-vindo(a) ao Seu Cantinho!
        </h1>
        
        <p className="text-gray-600 mb-8">
          Use o menu lateral para gerenciar Clientes, Reservas e Espaços.
        </p>
  
        {/* Cartões de Estatísticas Simples (Exemplo) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DashboardCard title="Reservas Hoje" value="12" />
          <DashboardCard title="Novos Clientes" value="3" />
          <DashboardCard title="Espaços Ocupados" value="8/10" />
        </div>
        
        {/* Você pode adicionar gráficos, listas de tarefas aqui... */}
      </div>
    );
  }
  
  // Componente simples para os cartões
  function DashboardCard({ title, value }: { title: string, value: string }) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
      </div>
    )
  }