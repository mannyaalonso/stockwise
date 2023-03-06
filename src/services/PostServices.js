import Client from './api'

export const CheckWatchlist = async () => {
  try {
    const res = await Client.get(
      `/api/watchlists/${localStorage.getItem("userId")}`
    )
    if (res.data == "") {
      const res = await Client.post(
        `/api/watchlists/${localStorage.getItem("userId")}`, {
          name: "Watchlist"
        }
      )
      localStorage.setItem("watchlistId", res.data.id)
    } else {
      localStorage.setItem("watchlistId", res.data.id)
    }
  } catch (err) {
      console.log(err)
    }
}

export const PostStock = async (stock) => {
    try {
        const res = await Client.post(
            `/api/stocks/${localStorage.getItem('watchlistId')}/${stock.name}}`,
            { name: stock.name,
            ticker: stock.ticker }
        )
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const GetAllStocks = async () => {
    try {
        const res = await Client.get(
            `/api/stocks/${localStorage.getItem('watchlistId')}`
        )
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const DestroyStock = async (id) => {
    try {
        const res = await Client.delete(`/api/stocks/${id}`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}
