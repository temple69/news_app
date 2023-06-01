import React from 'react'
import Navbar from '../Navbar'
Navbar

const Layout = (props:any) => {
  return (
 <>
    <Navbar/>
    <main>
        {props.children}
    </main>
    
    
    </>
  )
}

export default Layout