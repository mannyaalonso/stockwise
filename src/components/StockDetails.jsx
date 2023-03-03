import { Triangle } from "react-loader-spinner"
import { useState, useEffect } from "react"
import axios from "axios"
import React from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Line } from "react-chartjs-2"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const chartOptions = {
  responsive: true,
  scales: {
    x: {
      display: true,
    },
    y: {
      display: true,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
}

const StockDetails = ({ ticker }) => {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const options = {
    method: "GET",
    url: `https://yahoo-finance15.p.rapidapi.com/api/yahoo/hi/history/${ticker}/15m`,
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
    <div className="h-36 w-full flex justify-center items-center">
      {!isLoading ? (
        <Line className="w-full mx-auto" options={chartOptions} data={data} />
      ) : (
        <Triangle
          height="80"
          width="80"
          color="#0889AC"
          ariaLabel="triangle-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      )}
    </div>
  )
}

export default StockDetails
