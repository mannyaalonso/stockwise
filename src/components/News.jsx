import { useState, useEffect } from 'react'
import axios from 'axios'


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
        const top5 = response.data.slice(0, 5)
        setNews(top5)
      })
      .catch(function (error) {
        console.error(error)
      })
  }

  useEffect(() => {
    getNews()
  },[])

  return news && (
    <section aria-labelledby="announcements-title">
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="p-6">
          <h2
            className="text-base font-medium text-gray-900"
            id="announcements-title"
          >
            Recent News
          </h2>
          <div className="mt-6 flow-root">
            <ul className="-my-5 divide-y divide-gray-200">
              {news.map((news) => (
                <li key={news.title} className="py-5">
                  <div className="relative focus-within:ring-2 focus-within:ring-cyan-500">
                    <h3 className="text-sm font-semibold text-gray-800">
                      <a
                        target={'_blank'}
                        rel="noreferrer"
                        href={news.link}
                        className="hover:underline focus:outline-none"
                      >
                        {/* Extend touch target to entire panel */}
                        <span className="absolute inset-0" aria-hidden="true" />
                        {news.source}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-600 line-clamp-2">
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
}

export default News
