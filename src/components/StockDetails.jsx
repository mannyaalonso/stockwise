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
      display: true,
    },
    title: {
      display: false,
    },
  },
}

const StockDetails = ({ data }) => {

  return (
    <div className="h-36 w-full flex justify-center items-center">
        <Line className="w-full mx-auto" options={chartOptions} data={data} />
    </div>
  )
}

export default StockDetails
