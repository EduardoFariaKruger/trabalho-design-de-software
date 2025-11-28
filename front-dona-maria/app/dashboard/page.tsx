export default function DashboardPage() {
    return (
      <div>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
          Bem-vindo(a) ao Seu Cantinho!
        </h1>
        
        <p className="text-gray-600 mb-8">
          Use o menu lateral para gerenciar Clientes, Reservas, Espaços e Administradores.
        </p>
      
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