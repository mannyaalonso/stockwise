import Stock from "./Stock"
import { useState, useEffect } from 'react'

const Watchlist = () => {
  const stockList = [
    {
      name: "APPL",
      handle: "Apple",
      price: 127,
      imageUrl:
        "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      href: "#",
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
                <Stock stock={stock} handleStockDelete={handleStockDelete}/>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Watchlist
