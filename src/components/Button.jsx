
import React from 'react'

const Button = ({children,bgcolor,margin,color}) => {
    console.log(bgcolor)
    // const my_style = {
    //     margin:margin,
    //     backgroundColor:bgcolor,
    //     padding:"10px",
    //     borderRadius:"5px"
    // }
    // console.log(my_style)
  return (
    <div style={{
        color:color?color:"blue",
        margin:margin,
        backgroundColor:bgcolor,
        padding:"10px",
        borderRadius:"5px"
    }} >
      
    {children}

    </div>
  )
}

export default Button
