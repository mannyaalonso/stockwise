import { useState, useEffect } from 'react'
import axios from 'axios'

const StockList = () => {
  const [stocks, setStocks] = useState([])
  const [isLoading, setLoading] = useState(true)
  const emptyLoader = ["", "", "", "", ""]

  const options = {
    method: "GET",
    url: "https://yahoo-finance15.p.rapidapi.com/api/yahoo/co/collections/day_gainers",
    params: { start: "0" },
    headers: {
      "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      "X-RapidAPI-Host": "yahoo-finance15.p.rapidapi.com",
    },
  }

  const getDayGainersList = async () => {
    axios
      .request(options)
      .then(function (response) {
        console.log(response.data)
        const top10 = response.data.quotes.slice(0, 10)
        setStocks(top10)
        setLoading(false)
      })
      .catch(function (error) {
        setLoading(false)
        console.error(error)
      })
  }

  useEffect(() => {
    getDayGainersList()
  }, [])

  return stocks && (
    <section aria-labelledby="recent-hires-title mt-4">
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="p-6">
          <h2
            className="text-base font-medium text-gray-900 flex items-center justify-between"
            id="recent-hires-title"
          >
            Stocks
            <span className="text-xs text-gray-400">
             
            </span>
          </h2>
          <div className="mt-6 flow-root">
            <ul className="-my-5 divide-y divide-gray-200">
              {/* {watchlist.map((stock) => (
                <Stock
                  key={stock.id}
                  stock={stock}
                />
              ))} */}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default StockList
