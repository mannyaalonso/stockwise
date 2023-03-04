import Client from "./api"

export const CheckWatchlist = async () => {
  try {
    const res = await Client.get(`/api/watchlists/${localStorage.getItem('userId')}`)
    if (res.data == "") {
      const res = await Client.post(
        `/api/watchlists/${localStorage.getItem("userId")}`
        )
        localStorage.setItem("watchlistId", res.data.id)
    } else {
      localStorage.setItem('watchlistId', res.data.id)
    }
  } catch (error) {
    throw error
  }
}

export const PostStock = async (stock) => {
  try {
    const res = await Client.post(
      `/api/stocks/${localStorage.getItem("watchlistId")}`,
      { name: stock }
    )
    return res.data
  } catch (error) {
    throw error
  }
}
