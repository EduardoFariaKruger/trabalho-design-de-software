'use client'; 

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/dashboard', label: 'Início', icon: '🏠' },
  { href: '/dashboard/clientes', label: 'Clientes', icon: '👥' },
  { href: '/dashboard/reservas', label: 'Reservas', icon: '🗓️' },
  { href: '/dashboard/espacos', label: 'Espaços', icon: '📍' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="h-screen w-64 bg-gray-800 text-white flex flex-col p-4 fixed">
      
      {/* Título do Sistema */}
      <div className="text-xl font-bold mb-8 border-b border-gray-700 pb-4">
        Dona Maria Reservas
      </div>

      {/* Opções de Navegação */}
      <ul className="space-y-2">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link 
              href={item.href}
              // Classe condicional para destacar o item ativo
              className={`flex items-center p-2 rounded-lg transition-colors ${
                pathname === item.href
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'hover:bg-gray-700 text-gray-300'
              }`}
            >
              <span className="mr-3 text-lg">{item.icon}</span>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Opção Sair (exemplo) */}
      <div className="mt-auto pt-4 border-t border-gray-700">
        <button className="w-full text-left p-2 rounded-lg text-gray-400 hover:bg-gray-700 hover:text-white transition-colors">
          Sair
        </button>
      </div>
    </nav>
  );
}