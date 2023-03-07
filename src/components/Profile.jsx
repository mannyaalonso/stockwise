import { ExclamationCircleIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'

const Profile = ({ user }) => {
    const initialState = {
        oldPassword: '',
        newPassword: '',
    }
    const [formState, setFormState] = useState(initialState)

    const handleChange = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value })
        console.log(formState)
    }

    const handleUpdate = async () => {
        try {
            const token = localStorage.getItem('token')
            console.log(localStorage.getItem('userId'))
            const userId = localStorage.getItem('userId')
            console.log(formState)
            const res = await fetch(
                `http://localhost:3001/auth/update/${userId}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        oldPassword: formState.oldPassword,
                        newPassword: formState.newPassword,
                    }),
                }
            )
            const data = await res.json()
            console.log(data)
            setFormState(initialState)
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <section aria-labelledby="recent-hires-title">
            <div className="overflow-hidden rounded-lg bg-white shadow">
                <div className="p-6">
                    <h2
                        className="text-base font-medium text-gray-900 flex items-center justify-between"
                        id="recent-hires-title">
                        Your profile
                        <span className="text-xs text-gray-400">
                            Update your profile
                        </span>
                    </h2>
                    <div className="mt-10 flow-root">
                        <ul className="-my-5 divide-y divide-gray-200">
                            <span className="font-medium">Name:</span>{' '}
                            {user.name}
                        </ul>
                    </div>
                    <div className="mt-10 flow-root">
                        <ul className="-my-5 divide-y divide-gray-200">
                            <span className="font-medium">Email:</span>{' '}
                            {user.email}
                        </ul>
                    </div>
                    <div className="mt-10 flow-root">
                        <ul className="-my-5 divide-y divide-gray-200">
                            <div>
                                <label
                                    htmlFor="oldPassword"
                                    className="block text-sm font-medium leading-6 text-gray-900">
                                    Old Password
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={handleChange}
                                        value={formState.oldPassword}
                                        type="text"
                                        name="oldPassword"
                                        id="oldPassword"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-400 sm:text-sm sm:leading-6"
                                        placeholder="Old password"
                                    />
                                </div>
                            </div>
                        </ul>
                    </div>
                    <div className="mt-10 flow-root">
                        <ul className="-my-5 divide-y divide-gray-200 mt-2 mb-2">
                            <div>
                                <label
                                    htmlFor="newPassword"
                                    className="block text-sm font-medium leading-6 text-gray-900">
                                    New Password
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={handleChange}
                                        value={formState.newPassword}
                                        type="text"
                                        name="newPassword"
                                        id="newPassword"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-400 sm:text-sm sm:leading-6"
                                        placeholder="New password"
                                    />
                                </div>
                            </div>
                        </ul>
                    </div>
                    <div className="mt-10 flow-root">
                        <button
                            onClick={handleUpdate}
                            type="button"
                            className="rounded bg-black py-1 px-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-400">
                            Update Password
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Profile

{
    /* <p className="mt-2 text-sm text-red-600" id="email-error">
                  Not a valid email address.
                </p> */
}
