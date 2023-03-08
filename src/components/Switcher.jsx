import { useState } from "react"
import { MdOutlineDarkMode } from "react-icons/md"
import { BsSun } from "react-icons/bs"
import useDarkSide from "../hooks/useDarkSide"

export default function Switcher() {
  const [colorTheme, setTheme] = useDarkSide()
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  )

  const toggleDarkMode = (checked) => {
    setTheme(colorTheme)
    setDarkSide(checked)
  }

  return (
    <>
      {colorTheme === "light" ? (
        <BsSun
          style={{ color: "4abea3" }}
          checked={darkSide}
          onClick={toggleDarkMode}
          size={30}
        />
      ) : (
        <MdOutlineDarkMode
          style={{ color: "0f182a" }}
          checked={darkSide}
          onClick={toggleDarkMode}
          size={30}
        />
      )}
    </>
  )
}
