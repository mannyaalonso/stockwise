import { AiFillCloseCircle } from "react-icons/ai"
import { useState, useEffect } from 'react'

const Stock = ({ stock, handleStockDelete }) => {
  const [toggle, setToggle] = useState(false)

  console.log(toggle)

  return (
    <li key={stock.name} onClick={() => setToggle(!toggle)} className="py-4 cursor-pointer">
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
          <p className="truncate text-sm text-gray-500">{stock.handle}</p>
        </div>
        <div>
          <a
            href={stock.href}
            className="inline-flex items-center rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            ${stock.price}
          </a>
        </div>
        <div>
          <div className="inline-flex items-center rounded-full bg-white px-2 py-1 text-xs font-semibold text-red-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 cursor-pointer">
            <AiFillCloseCircle onClick={handleStockDelete} />
          </div>
        </div>
      </div>
    </li>
  )
}

export default Stock
