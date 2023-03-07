import Stock from "./Stock"

const Watchlist = ({ watchlist, handleStockDelete }) => {

  return watchlist && (
    <section aria-labelledby="recent-hires-title">
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="p-6">
          <h2
            className="text-base font-medium text-gray-900 flex items-center justify-between"
            id="recent-hires-title"
          >
            Watchlist
            <span className="text-xs text-gray-400">
              Search a stock to save it
            </span>
          </h2>
          <div className="mt-6 flow-root">
            <ul className="-my-5 divide-y divide-gray-200">
              {watchlist.map((stock) => (
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
