import React from 'react'
import "./Error.scss";

export default function Error404() {
  return (
    <div className='ErrorPage'>
      <h1 class="w3-jumbo w3-animate-top w3-center"><code>Page Not Found</code></h1>
      <h3 class="w3-center w3-animate-zoom">🚫🚫🚫🚫</h3>
      <h6 class="w3-center w3-animate-zoom">error code: 404 forbidden</h6>
    </div>
  )
}
