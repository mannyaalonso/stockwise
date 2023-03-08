import { Configuration, OpenAIApi } from "openai"
import { ReactSearchAutocomplete } from "react-search-autocomplete"
import { Triangle } from "react-loader-spinner"
import { useState } from "react"
import data from "../data/data"

const ChatGPT = () => {
    const [result, setResult] = useState("")
      const [isLoading, setIsLoading] = useState(false)

    const configuration = new Configuration({
      apiKey: process.env.REACT_APP_OPENAI_API_KEY,
      organization: process.env.REACT_APP_OPENAI_ORG_KEY,
    })
    const openai = new OpenAIApi(configuration)

    const triggerChatGPTResponse = async (stock) => {
      setIsLoading(true)
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Give me a 3 sentence summary on ${stock}`,
        temperature: 0.5,
        max_tokens: 150,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      })
      setResult(response.data.choices[0].text)
      setIsLoading(false)
    }

    const handleOnSelect = (item) => {
      triggerChatGPTResponse(item.name)
    }

    const formatResult = (item) => {
      return (
        <>
          <span className="">
            {item.ticker} {item.name}
          </span>
        </>
      )
    }

     const handleOnSearch = (string, results) => {
       setResult("")
     }

  return (
    <section aria-labelledby="recent-hires-title">
      <div className=" rounded-lg bg-white dark:bg-slate-800 shadow">
        <div className="p-6">
          <h2
            className="text-base font-medium text-gray-900 dark:text-slate-100 flex items-center justify-between"
            id="recent-hires-title"
          >
            Chat GPT
            <span className="text-xs text-gray-400">
              Search a stock to trigger a summary
            </span>
          </h2>
          <div className="mt-6 flow-root">
            <ReactSearchAutocomplete
              className=""
              items={data}
              onSelect={handleOnSelect}
              onSearch={handleOnSearch}
              formatResult={formatResult}
              styling={{ zIndex: 4 }}
              placeholder="Search a stock"
            />
            {!isLoading ? (
              <ul className="my-5 divide-y divide-gray-200">{result}</ul>
            ) : (
              <div className="flex items-center justify-center mt-3">
              <Triangle
                height="40"
                width="40"
                color="#4abea3"
                ariaLabel="triangle-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
              />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ChatGPT
