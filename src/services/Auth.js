import Client from "./api"

export const SignInUser = async (data) => {
  try {
    const res = await Client.post("/auth/login", data)
    localStorage.setItem("token", res.data.token)
    localStorage.setItem("userId", res.data.user.id)
    return res.data.user
  } catch (error) {
    console.log(error)
  }
}

export const RegisterUser = async (data) => {
  try {
    const res = await Client.post("/auth/register", data)
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export const CheckSession = async () => {
  try {
    // Checks if the current token if it exists is valid
    const res = await Client.get("/auth/session")
    return res.data
  } catch (error) {
    console.log(error)
  }
}