import React from 'react'

export default function Error403() {
  return (
    <div className='ErrorPage'>
      <h1 class="w3-jumbo w3-animate-top w3-center"><code>Access Denied</code></h1>
      <h3 class="w3-center w3-animate-right">You dont have permission to view this site.</h3>
      <h3 class="w3-center w3-animate-zoom">🚫🚫🚫🚫</h3>
      <h6 class="w3-center w3-animate-zoom">error code:403 forbidden</h6>
    </div>
  )
}
