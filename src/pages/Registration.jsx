import { LockClosedIcon } from "@heroicons/react/20/solid"
import { AiOutlineStock } from "react-icons/ai"
import { useNavigate } from "react-router-dom"
import { RegisterUser } from "../services/Auth"
import { useState } from 'react'

export default function Registration () {

  const navigate = useNavigate()

  const intialState = {
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  }

  const [formState, setFormState] = useState(intialState)

  const handleChange = (e) => {
    setFormState({...formState, [e.target.id]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formState.name && formState.email && formState.password && formState.passwordConfirm) {
      if (formState.password === formState.passwordConfirm) {
        try {
          await RegisterUser({
            name: formState.name,
            email: formState.email,
            password: formState.password
          })
          navigate('/signin')
        } catch (err) {
          console.log(err)
        }
      }
    }
    setFormState({ name: "", email: "", password: "", passwordConfirm: "" })
  }

  return (
    <>
      <div className="h-screen flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <AiOutlineStock className="mx-auto h-12 w-auto bg-gradient-to-r from-[#4abea3] to-[#64fcd9] text-white rounded-full p-2" />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-slate-100">
              Register for Stockwise
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formState.name}
                  onChange={handleChange}
                  autoComplete="name"
                  required
                  className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 dark:bg-slate-700 dark:text-slate-100 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-[#4abea3] sm:text-sm sm:leading-6"
                  placeholder="Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                  className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 dark:bg-slate-700 dark:text-slate-100 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-[#4abea3] sm:text-sm sm:leading-6"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                  className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 dark:bg-slate-700 dark:text-slate-100 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-[#4abea3] sm:text-sm sm:leading-6"
                  placeholder="Password"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Confirm Password
                </label>
                <input
                  id="passwordConfirm"
                  name="passwordConfirm"
                  type="password"
                  value={formState.passwordConfirm}
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                  className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 dark:bg-slate-700 dark:text-slate-100 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-[#4abea3] sm:text-sm sm:leading-6"
                  placeholder="Confirm Password"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md bg-gradient-to-r from-[#4abea3] to-[#64fcd9] py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-gradient-to-r from-sky-700 to-cyan-500 group-hover:text-slate-300"
                    aria-hidden="true"
                  />
                </span>
                Register
              </button>
              <button
                onClick={() => navigate("/signin")}
                name="guest"
                className=" mt-2 group relative flex w-full justify-center rounded-md bg-gradient-to-r from-[#8f8f8f] to-[#636565] py-2 px-3 text-sm font-semibold text-white hover:bg-slate-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-gradient-to-r from-sky-700 to-cyan-500 group-hover:text-slate-300"
                    aria-hidden="true"
                  />
                </span>
                Register as Guest
              </button>
            </div>
          </form>
          <div className="mt-10 flex justify-center">
            <button
              onClick={() => navigate("/signin")}
              className="text-sm font-semibold leading-7 text-black dark:text-slate-100"
            >
              Sign in <span aria-hidden="true">&rarr;</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
