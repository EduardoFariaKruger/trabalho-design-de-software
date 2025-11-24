'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    
    // 1. Lógica de Autenticação (Ainda não implementada)
    // Em um projeto real, você faria uma chamada de API aqui:
    // const res = await fetch('/api/login', { method: 'POST', body: JSON.stringify({ login, password }) })
    
    // Exemplo Simples (Simulação de sucesso):
    if (login === 'dona-maria' && password === '123456') {
        // 2. Redirecionamento em caso de sucesso
        router.push('/dashboard') // Redireciona para a primeira tela após o login
    } else {
        // 3. Exibição de erro
        setError('E-mail ou senha inválidos.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Campo Login */}
      <div>
        <label htmlFor="login" className="block text-sm font-medium text-gray-700">Login</label>
        <input
          id="login"
          name="login"
          type="login"
          required
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
        />
      </div>

      {/* Campo Senha */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
        />
      </div>

      {error && (
        <div className="text-sm text-red-600 p-2 bg-red-50 rounded-md">
          {error}
        </div>
      )}

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Entrar
      </button>

      <button
        type="button"
        onClick={() => router.push('/convidado')}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Entrar como Convidado
      </button>
    </form>
  )
}