'use client'; 

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation'


const navItems = [
  { href: '/dashboard', label: 'Início', icon: '🏠' },
  { href: '/dashboard/clientes', label: 'Clientes', icon: '👥' },
  { href: '/dashboard/reservas', label: 'Reservas', icon: '🗓️' },
  { href: '/dashboard/espacos', label: 'Espaços', icon: '📍' },
  { href: '/dashboard/adms', label: 'Administradores', icon: '🔑' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className="h-screen w-64 bg-gray-800 text-white flex flex-col p-4 fixed">
      
      <div className="text-xl font-bold mb-8 border-b border-gray-700 pb-4">
        Seu Cantinho
      </div>

      <ul className="space-y-2">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link 
              href={item.href}
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

      <div className="mt-auto pt-4 border-t border-gray-700">
        <button className="w-full text-left p-2 rounded-lg text-white hover:bg-gray-700 transition-colors"
         onClick={() => router.push('/login')}>
          Sair
        </button>
      </div>
    </nav>
  );
}