import Stock from "./Stock"
import { useState, useEffect } from 'react'

const Watchlist = () => {
  const stockList = [
    {
      id: 1,
      ticker: "AAPL",
      name: "Apple",
      price: 127,
    },
    {
      id: 2,
      ticker: "TSLA",
      name: "Tesla",
      price: 198,
    },
  ]

  const handleStockDelete = () => {

  }

  return (
    <section aria-labelledby="recent-hires-title">
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="p-6">
          <h2
            className="text-base font-medium text-gray-900 flex items-center justify-between"
            id="recent-hires-title"
          >
            Watchlist
            <span className="text-xs text-gray-400">
              Search a stock to add it to your watchlist
            </span>
          </h2>
          <div className="mt-6 flow-root">
            <ul className="-my-5 divide-y divide-gray-200">
              {stockList.map((stock) => (
                <Stock key={stock.id}  stock={stock} handleStockDelete={handleStockDelete}/>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Watchlist
