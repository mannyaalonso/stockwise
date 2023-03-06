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

  console.log(trending)

  return trending && (
    <section aria-labelledby="recent-hires-title">
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="p-6">
          <h2
            className="text-base font-medium text-gray-900 flex items-center justify-between"
            id="recent-hires-title"
          >
            Trending
            <span className="text-xs text-gray-400">
              Click green button to save
            </span>
          </h2>
          <div className="mt-6 flow-root">
            <ul className="-my-5 divide-y divide-gray-200">
              Hello
              {/* {watchlist.map((stock) => (
                <Stock
                  key={stock.id}
                  stock={stock}
                  handleStockDelete={handleStockDelete}
                />
              ))} */}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Trending
