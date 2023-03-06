import React from 'react'

const Profile = ({ user }) => {
  console.log("USER", user)
  return (
    <section aria-labelledby="recent-hires-title">
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="p-6">
          <h2
            className="text-base font-medium text-gray-900 flex items-center justify-between"
            id="recent-hires-title"
          >
            Your profile
            <span className="text-xs text-gray-400">Update your profile</span>
          </h2>
          <div className="mt-10 flow-root">
            <ul className="-my-5 divide-y divide-gray-200">
              <span className="font-medium">Name:</span> {user.name}
            </ul>
          </div>
          <div className="mt-10 flow-root">
            <ul className="-my-5 divide-y divide-gray-200">
              <span className="font-medium">Email:</span> {user.email}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Profile
