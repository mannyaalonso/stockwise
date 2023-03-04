import { AiFillCloseCircle } from "react-icons/ai"
import { Triangle } from "react-loader-spinner"
import { useState, useEffect } from "react"
import StockDetails from "./StockDetails"
import axios from "axios"

const Stock = ({ stock, handleStockDelete }) => {
  const [toggle, setToggle] = useState(false)
  const [data, setData] = useState(null)
  const [history, setHistory] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  let gainPercent = 0

  if (history) {
    gainPercent =
      (history[history.length - 1].close - history[0].close) / history[0].close
  }

  const options = {
    method: "GET",
    url: `https://yahoo-finance15.p.rapidapi.com/api/yahoo/hi/history/${stock.name}/15m`,
    params: { diffandsplits: "false" },
    headers: {
      "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      "X-RapidAPI-Host": "yahoo-finance15.p.rapidapi.com",
    },
  }

  const getStockHistory = async () => {
    setIsLoading(true)
    axios
      .request(options)
      .then(function (response) {
        const close = Object.values(response.data.items)
        setHistory(close)
        setData({
          labels: ["", "", "", "", "", "", ""],
          datasets: [
            {
              label: ["15m"],
              data: [
                close[close.length - 7].close,
                close[close.length - 6].close,
                close[close.length - 5].close,
                close[close.length - 4].close,
                close[close.length - 3].close,
                close[close.length - 2].close,
                close[close.length - 1].close,
              ],
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "transparent",
            },
          ],
        })
        setIsLoading(false)
      })
      .catch(function (error) {
        setIsLoading(false)
        console.error(error)
      })
  }

  useEffect(() => {
    if (data === null) getStockHistory()
  }, [])

  return (
    <div>
      {!isLoading ? (
        <div className="flex justify-between items-center">
          <li
            onClick={() => setToggle(!toggle)}
            className="py-4 cursor-pointer w-full mr-2"
          >
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 bg-gradient-to-r from-sky-800 to-cyan-600 flex justify-center items-center rounded-full text-white">
                  {stock.name[0]}
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900">
                  {stock.name}
                </p>
                <p className="truncate text-sm text-gray-500">{stock.name}</p>
              </div>
              <div className="min-w-0">
                {gainPercent > 0 ? (
                  <p className="truncate text-xs text-emerald-400">
                    +{gainPercent.toFixed(2)}%
                  </p>
                ) : (
                  <p className="truncate text-xs text-red-400">
                    {gainPercent.toFixed(2)}%
                  </p>
                )}
              </div>
              <div>
                <p className="inline-flex items-center rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                  ${history[history.length - 1].close}
                </p>
              </div>
            </div>
          </li>
          <div>
            <div className="inline-flex items-center rounded-full bg-white px-2 py-1 text-xs font-semibold text-red-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 cursor-pointer">
              <AiFillCloseCircle onClick={() => handleStockDelete(stock.id)} />
            </div>
          </div>
        </div>
      ) : (
        <Triangle
          height="40"
          width="40"
          color="#0788ab"
          ariaLabel="triangle-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      )}
      {toggle && (
        <li className="py-4 cursor-pointer h-48 rounded-md">
          <div className="flex items-center space-x-4">
            <StockDetails ticker={stock.name} data={data} options={options} />
          </div>
        </li>
      )}
    </div>
  )
}

export default Stock
