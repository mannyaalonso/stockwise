import { AiOutlineStock } from "react-icons/ai"
import { useNavigate } from "react-router-dom"

export default function Home() {
  const navigate = useNavigate()
  return (
    <>
      <main className="relative isolate h-screen flex items-center justify-center">
        <div className="bg-black rounded-lg">
          <img
            src="https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80"
            alt=""
            className="absolute inset-0 -z-10 h-full w-full object-cover object-top"
          />
          <div className="mx-auto max-w-7xl px-6 py-32 text-center sm:py-40 lg:px-8">
            <AiOutlineStock className="mx-auto h-12 w-auto bg-gradient-to-r from-[#4abea3] to-[#64fcd9] text-white rounded-full p-2" />
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Stockwise
            </h1>
            <p className="mt-4 text-base text-slate-100 sm:mt-6">
              Track stocks. Be wise.
            </p>
            <div className="mt-10 flex justify-center">
              <button
                onClick={() => navigate("/registration")}
                className="text-sm font-semibold leading-7 text-white hover:text-emerald-200"
              >
                <span aria-hidden="true">&larr;</span> Register | 
              </button>
              <button
                onClick={() => navigate("/signin")}
                className="text-sm font-semibold leading-7 text-emerald-200 whitespace-pre hover:text-white"
              >
                {" "}
                Sign in <span aria-hidden="true">&rarr;</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
