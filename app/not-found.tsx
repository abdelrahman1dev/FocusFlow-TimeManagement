"use client"

import { redirect } from "next/navigation"

function NotFound() {

    redirect('/');
  return (
    <div>
      {/* Redirecting... */}
    </div>
  )
}

export default NotFound
