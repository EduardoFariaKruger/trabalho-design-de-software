'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/app/lib/http'
import { ENDPOINTS } from '@/app/lib/api'

export default function LoginForm() {
  const [login, setLogin] = useState('')
  const [senha, setSenha] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)
  
    try {
      const credentials = { login, senha };
      
      const response = await api.post(ENDPOINTS.auth, credentials);

      console.log('Login efetuado com sucesso!', response.data);

      router.push('/dashboard');
    } catch (err: any) {
      console.error('Erro ao efetuar login:', err);
      const errorMessage = err.response?.data?.error || 'Login ou Senha incorretos.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
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
        <label htmlFor="senha" className="block text-sm font-medium text-gray-700">Senha</label>
        <input
          id="senha"
          name="senha"
          type="senha"
          required
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
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