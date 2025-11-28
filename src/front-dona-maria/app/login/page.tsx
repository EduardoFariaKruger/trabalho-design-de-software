import LoginForm from '../../components/LoginForm'

export default function LoginScreen() {
  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-center text-gray-900">
        Seu Cantinho
      </h1>
      
      <LoginForm /> 
      
    </div>
  )
}