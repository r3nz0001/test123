import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { FcGoogle } from 'react-icons/fc'
import AuthLayout from '@/components/AuthLayout'
import loginSVG from '@/assets/svg/login.svg'
import { login } from '@/services/auth'
import useAuth from '@/hooks/useAuth'

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const { setAuth } = useAuth()
  const navigate = useNavigate()
  const [responseError, setResponseError] = useState()

  const onSubmit = async (data) => {
    const response = await login(data)
    if (!response.success) {
      setResponseError(response.error)
      return
    }

    setAuth({ user: data.email, accessToken: response.accessToken })
    return navigate('/dashboard')
  }

  return (
    <AuthLayout imgsrc={loginSVG}>
      <h1 className="mb-4">Inicia sesión</h1>
      <button
        onClick={() => navigate('/dashboard')}
        className="flex items-center justify-center border-gray-300"
      >
        <FcGoogle className="mr-2 h-8 w-8" />
        <p className="text-gray-500">Ingresa con Google</p>
      </button>
      <p className="my-5 text-sm text-gray-700">O con tu correo</p>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <input
            type="email"
            placeholder="Email"
            className={`mb-4 ${
              errors?.email &&
              'border-red-600 focus:border-red-600 focus:ring-red-600'
            }`}
            {...register('email', { required: true })}
          />
          <input
            type="password"
            placeholder="Contraseña"
            className={`mb-1 ${
              errors?.password &&
              'border-red-600 focus:border-red-600 focus:ring-red-600'
            }`}
            {...register('password', { required: true, minLength: 6 })}
          />
          <label className="mr-2 text-right text-sm text-red-600">
            {responseError || ''}
          </label>
        </div>
        <a href="#" className="mb-2 text-sm text-blue-600">
          ¿Olvidaste tu contraseña?
        </a>
        <button
          type="submit"
          className="bg-gray-300 text-gray-500 hover:bg-slate-400 hover:text-white"
        >
          Iniciar sesión
        </button>
        <Link to="/signup" className="text-sm text-blue-600">
          ¿No tienes cuenta? Regístrate
        </Link>
      </form>
    </AuthLayout>
  )
}

export default Login
