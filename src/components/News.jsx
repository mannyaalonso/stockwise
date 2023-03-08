import { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'

const News = () => {
  const [news, setNews] = useState([])

  const getNews = async () => {
    const options = {
      method: "GET",
      url: "https://yahoo-finance15.p.rapidapi.com/api/yahoo/ne/news",
      headers: {
        "X-RapidAPI-Key": `${process.env.REACT_APP_RAPID_API_KEY}`,
        "X-RapidAPI-Host": "yahoo-finance15.p.rapidapi.com",
      },
    }

    axios
      .request(options)
      .then(function (response) {
        setNews(response.data)
      })
      .catch(function (error) {
        console.error(error)
      })
  }

  useEffect(() => {
    getNews()
  },[])

  return (
    news && (
      <section aria-labelledby="announcements-title">
        <div className="overflow-scroll rounded-lg bg-white dark:bg-slate-800 shadow h-[36.5rem]">
          <div className="p-6">
            <h2
              className="text-base font-medium text-gray-900 dark:text-slate-100"
              id="announcements-title"
            >
              Recent News
            </h2>
            <div className="mt-6 flow-root">
              <ul className="-my-5 divide-y divide-gray-200">
                {news.sort((b,a) => new Date(...a.pubDate.split('/')) - new Date(...b.pubDate.split('/'))).map((news) => (
                  <li key={news.title} className="py-5">
                    <div className="relative focus-within:ring-2 focus-within:ring-cyan-500">
                      <h3 className="text-sm font-semibold text-gray-800 dark:text-slate-100">
                        <a
                          target={"_blank"}
                          rel="noreferrer"
                          href={news.link}
                          className="hover:underline focus:outline-none"
                        >
                          {/* Extend touch target to entire panel */}
                          <span
                            className="absolute inset-0"
                            aria-hidden="true"
                          />
                          {news.source}{" "}
                          <span className="text-xs text-gray-400">
                            {moment((news.pubDate)).format("dddd, Do MMM YYYY, h:mm A")}
                          </span>
                        </a>
                      </h3>
                      <p className="mt-1 text-sm text-gray-600 dark:text-slate-200 line-clamp-2">
                        {news.title}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    )
  )
}

export default News
