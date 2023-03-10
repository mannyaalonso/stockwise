import { ReactSearchAutocomplete } from "react-search-autocomplete"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid"
import { Menu, Popover, Transition } from "@headlessui/react"
import { CheckWatchlist } from "../services/PostServices"
import { DestroyStock } from "../services/PostServices"
import { GetAllStocks } from "../services/PostServices"
import { Fragment, useState, useEffect } from "react"
import { PostStock } from "../services/PostServices"
import Watchlist from "../components/Watchlist"
import { AiOutlineStock } from "react-icons/ai"
import { Triangle } from "react-loader-spinner"
import profile1 from "../assets/profile1.png"
import profile2 from "../assets/profile2.png"
import profile3 from "../assets/profile3.png"
import profile4 from "../assets/profile4.png"
import profile5 from "../assets/profile5.png"
import profile6 from "../assets/profile6.png"
import Switcher from "../components/Switcher"
import Trending from "../components/Trending"
import ChatGPT from "../components/ChatGPT"
import Profile from "../components/Profile"
import News from "../components/News"
import data from "../data/data"

const navigation = [{ name: "Dashboard", href: "", current: true }]

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

const Dashboard = ({ user, handleLogOut }) => {
  const [watchlist, setWatchlist] = useState([])
  const [toggle, setToggle] = useState(true)
  const userNavigation = [{ name: "Sign out" }]

  const handleOnSelect = async (item) => {
    await PostStock(item)
    callGetStocks()
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

  const handleStockDelete = async (id) => {
    await DestroyStock(id)
    callGetStocks()
  }

  const callGetStocks = async () => {
    await CheckWatchlist()
    const data = await GetAllStocks()
    setWatchlist(data)
  }

  const chooseProfilePic = [
    profile1,
    profile2,
    profile3,
    profile4,
    profile5,
    profile6,
  ]
  let [profilePic, setProfilePic] = useState()

  function getRandomPicture() {
    let picture = Math.floor([1 + Math.random() * (6 - 1)])
    setProfilePic(chooseProfilePic[picture])
  }

  useEffect(() => {
    callGetStocks()
    getRandomPicture()
  }, [])

  return user ? (
    <>
      <div className="min-h-full dark:bg-slate-900">
        <Popover
          as="header"
          className="bg-gradient-to-r from-[#4abea3] to-[#64fcd9] pb-24"
        >
          {({ open }) => (
            <>
              <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="relative flex flex-wrap items-center justify-center lg:justify-between">
                  {/* Logo */}
                  <div className="absolute left-0 flex-shrink-0 py-5 lg:static">
                    <a href="#">
                      <span className="sr-only">Stockwise</span>
                      <AiOutlineStock className="mx-auto h-12 w-auto  text-white dark:text-slate-900 rounded-full p-2" />
                    </a>
                  </div>

                  {/* Right section on desktop */}
                  <div className="hidden lg:ml-4 lg:flex lg:items-center lg:py-5 lg:pr-0.5">
                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-4 flex-shrink-0">
                      <div>
                        <Menu.Button className="flex rounded-full bg-white text-sm ring-2 ring-white ring-opacity-20 focus:outline-none focus:ring-opacity-100">
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src={profilePic}
                            alt=""
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute -right-2 z-10 mt-2 w-48 origin-top-right rounded-md bg-slate-900 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <button
                                  onClick={handleLogOut}
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-white hover:text-black w-full"
                                  )}
                                >
                                  {item.name}
                                </button>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>

                  <div className="w-full py-5 lg:border-t lg:border-white lg:border-opacity-20">
                    <div className="lg:grid lg:grid-cols-3 lg:items-center lg:gap-8">
                      {/* Left nav */}
                      <div className="hidden lg:col-span-2 lg:block">
                        <nav className="flex space-x-4">
                          {navigation.map((item) => (
                            <button
                              key={item.name}
                              className={classNames(
                                item.current ? "text-white dark:text-slate-900" : "text-cyan-100",
                                "rounded-md bg-white bg-opacity-0 px-3 py-2 text-sm font-medium hover:bg-opacity-10"
                              )}
                              aria-current={item.current ? "page" : undefined}
                            >
                              {item.name}
                            </button>
                          ))}
                        </nav>
                      </div>
                      <div className="px-12 lg:px-0">
                        {/* Search */}
                        <div className="mx-auto w-full max-w-xs lg:max-w-md">
                          <label htmlFor="search" className="sr-only">
                            Search a stock to save it
                          </label>
                          <div className="relative text-white focus-within:text-gray-600">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                              <MagnifyingGlassIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </div>
                            <ReactSearchAutocomplete
                              items={data}
                              onSelect={handleOnSelect}
                              formatResult={formatResult}
                              styling={{
                                zIndex: 4,
                              }}
                              placeholder="Search a stock to save it"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Menu button */}
                  <div className="absolute right-0 flex-shrink-0 lg:hidden">
                    {/* Mobile menu button */}
                    <Popover.Button className="inline-flex items-center justify-center rounded-md bg-transparent p-2 text-cyan-200 hover:bg-white hover:bg-opacity-10 hover:text-black focus:outline-none focus:ring-2 focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6 text-white dark:text-slate-900"
                          aria-hidden="true"
                        />
                      )}
                    </Popover.Button>
                  </div>
                </div>
              </div>

              <Transition.Root as={Fragment}>
                <div className="lg:hidden">
                  <Transition.Child
                    as={Fragment}
                    enter="duration-150 ease-out"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="duration-150 ease-in"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Popover.Overlay className="fixed inset-0 z-20 bg-black bg-opacity-25" />
                  </Transition.Child>

                  <Transition.Child
                    as={Fragment}
                    enter="duration-150 ease-out"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="duration-150 ease-in"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Popover.Panel
                      focus
                      className="absolute inset-x-0 top-0 z-30 mx-auto w-full max-w-3xl origin-top transform p-2 transition"
                    >
                      <div className="divide-y divide-gray-200 rounded-lg bg-white dark:bg-slate-800 shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="pt-3 pb-2">
                          <div className="flex items-center justify-between px-4">
                            <div>
                              <AiOutlineStock className="mx-auto h-12 w-auto  text-[#4abea3] rounded-full p-2" />
                            </div>
                            <div className="-mr-2">
                              <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white dark:bg-slate-700 dark:text-slate-100 p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#4abea3]">
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon
                                  className="h-6 w-6"
                                  aria-hidden="true"
                                />
                              </Popover.Button>
                            </div>
                          </div>
                          <div className="mt-3 space-y-1 px-2">
                            {navigation.map((item) => (
                              <button
                                key={item.name}
                                className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 dark:text-slate-100 hover:bg-gray-100 hover:text-gray-800"
                              >
                                {item.name}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="pt-4 pb-2">
                          <div className="flex items-center px-5">
                            <div className="flex-shrink-0">
                              <img
                                className="h-10 w-10 rounded-full"
                                src={profilePic}
                                alt=""
                              />
                            </div>
                            <div className="ml-3 min-w-0 flex-1">
                              <div className="truncate text-base font-medium text-gray-800 dark:text-slate-100">
                                {user.name}
                              </div>
                              <div className="truncate text-sm font-medium text-gray-500">
                                {user.email}
                              </div>
                            </div>
                            <button
                              type="button"
                              className="ml-auto flex-shrink-0 rounded-full bg-white dark:bg-slate-800 p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                            >
                              <span className="sr-only">
                                View notifications
                              </span>
                              {/* <BellIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              /> */}
                            </button>
                          </div>
                          <div className="mt-3 space-y-1 px-2">
                            {userNavigation.map((item) => (
                              <button
                                key={item.name}
                                onClick={handleLogOut}
                                className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 dark:text-slate-100 hover:bg-black hover:text-white"
                              >
                                {item.name}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition.Child>
                </div>
              </Transition.Root>
            </>
          )}
        </Popover>
        <main className="-mt-24 pb-8">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <h1 className="sr-only">Profile</h1>
            {/* Main 3 column grid */}
            <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
              {/* Left column */}
              <div className="grid grid-cols-1 gap-4 lg:col-span-2">
                {/* Welcome panel */}
                <section aria-labelledby="profile-overview-title">
                  <div className="overflow-hidden rounded-lg bg-white dark:bg-slate-800 shadow">
                    <h2 className="sr-only" id="profile-overview-title">
                      Profile Overview
                    </h2>
                    <div className="bg-white dark:bg-slate-800 p-6">
                      <div className="sm:flex sm:items-center sm:justify-between">
                        <div className="sm:flex sm:space-x-5">
                          <div className="flex-shrink-0">
                            <img
                              className="mx-auto h-20 w-20 rounded-full"
                              src={profilePic}
                              alt=""
                            />
                          </div>
                          <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                            <p className="text-sm font-medium text-gray-600 dark:text-slate-200">
                              Welcome back,
                            </p>
                            <p className="text-xl font-bold text-gray-900 dark:text-slate-100 sm:text-2xl">
                              {user.name}
                            </p>
                            <p className="text-sm font-medium text-gray-600 dark:text-slate-400">
                              {user.email}
                            </p>
                          </div>
                        </div>
                        <div className="mt-5 flex justify-center sm:mt-0">
                          <button
                            onClick={() => setToggle(!toggle)}
                            className="flex items-center justify-center rounded-md bg-white dark:bg-slate-700 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-slate-100 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                          >
                            {toggle ? "View Profile" : "Go back"}
                          </button>
                        </div>
                        <div className="mt-5 flex justify-center sm:mt-0">
                          <Switcher />
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                {toggle ? (
                  <>
                    <Watchlist
                      watchlist={watchlist}
                      handleStockDelete={handleStockDelete}
                    />
                    <Trending />
                    <ChatGPT />
                  </>
                ) : (
                  <Profile user={user} />
                )}
              </div>

              {/* Right column */}
              <div className="grid grid-cols-1 gap-4">
                <News />
              </div>
            </div>
          </div>
        </main>
        <footer>
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="border-t border-gray-200 py-8 text-center text-sm text-gray-500 sm:text-left">
              <span className="block sm:inline">
                &copy; 2023 Stockwise, Inc.
              </span>{" "}
              <span className="block sm:inline">All rights reserved.</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  ) : (
    <div className="flex items-center justify-center mt-3 h-screen">
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
  )
}

export default Dashboard
