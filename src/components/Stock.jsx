import { AiFillCloseCircle } from "react-icons/ai"
import { useState, useEffect } from "react"
import StockDetails from "./StockDetails"
import axios from "axios"

const Stock = ({ stock, handleStockDelete }) => {
  const [toggle, setToggle] = useState(false)
  const [fetchedStock, setFetchedStock] = useState({})

  const getStockData = async () => {
    const options = {
      method: "GET",
      url: `https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/${stock.name}/financial-data`,
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
        "X-RapidAPI-Host": "yahoo-finance15.p.rapidapi.com",
      },
    }

    axios
      .request(options)
      .then(function (response) {
        setFetchedStock(response.data.financialData.currentPrice)
      })
      .catch(function (error) {
        console.error(error)
      })
  }

  useEffect(() => {
    getStockData()
  },[])

  return fetchedStock && (
    <div>
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
            <p className="truncate text-xs text-emerald-400">+3.5%</p>
          </div>
          <div>
            <a
              href={stock.href}
              className="inline-flex items-center rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              ${fetchedStock.raw}
            </a>
          </div>
        </div>
      </li>
      <div>
        <div className="inline-flex items-center rounded-full bg-white px-2 py-1 text-xs font-semibold text-red-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 cursor-pointer">
          <AiFillCloseCircle onClick={() => handleStockDelete(stock.id)} />
        </div>
      </div>
      </div>
      {toggle && (
        <li className="py-4 cursor-pointer h-48 rounded-md">
          <div className="flex items-center space-x-4">
            <StockDetails ticker={stock.name} />
          </div>
        </li>
      )}
    </div>
  )
}

export default Stock
