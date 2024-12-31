'use client'

import { useEffect } from "react"

function page() {
    useEffect(() => {
      window.location.href = "/dashboard"
    }, [])
    
  return (
    <div>page</div>
  )
}

export default page