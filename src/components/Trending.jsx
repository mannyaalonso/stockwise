import { GetTrendingStocks } from '../services/PostServices'
import { useState, useEffect } from 'react'

const Trending = () => {
  const [trending, setTrending] = useState()

  const getTrendingStocks = async () => {
    const res = await GetTrendingStocks()
    const tickers = Object.keys(res)
    setTrending(tickers)
  }

  useEffect(() => {
    getTrendingStocks()
  },[])

  return (
    trending && (
      <section aria-labelledby="recent-hires-title">
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-6">
            <h2
              className="text-base font-medium text-gray-900 flex items-center justify-between"
              id="recent-hires-title"
            >
              Trending
              <span className="text-xs text-gray-400">
                Top 5 trending stocks amongst users
              </span>
            </h2>
            <div className="mt-6 flow-root">
              <ul className="-my-5 divide-y divide-gray-200">
                {trending.map((stock) => (
                  <div key={stock} className="w-12 bg-[#64fcd9] p-1 rounded-full flex row-span-full justify-center items-center m-2 cursor-pointer">
                    <p className="truncate text-[.6rem] text-[#3b927e] font-bold">
                      {stock}
                    </p>
                  </div>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    )
  )
}

export default Trending
