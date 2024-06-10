import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import {TopNav} from './components/TopNav.jsx'
import Button from './components/Button.jsx'
function App() {

  const [username,setUsername] = useState()
  const [password,setPassword] = useState()
  const [isLoggedin,setIsLoggedIn] = useState(false)
  const [user,setUser] = useState()
  const [count,setCount] = useState(0)
  // const [count, setCount] = useState(0)
  let nav_links = ['HOME','SERVICES','PRODUCTS','CONTACT US']
  let products = [
    {name:'product1',price:100},
    {name:'product2',price:200},
    {name:'product3',price:300},
    {name:'product4',price:400},
    {name:'product5',price:500},
  ]

  useEffect(()=>{

    console.log('useEffect called')
    const token = localStorage.getItem("token")  
    if(!token){
      setIsLoggedIn(false)
      return
      
    }
    /* providing token in bearer */
fetch('https://dummyjson.com/auth/me', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`, 
  }, 
})
.then(res => res.json())
.then((data)=>{
  setUser(data)
  setIsLoggedIn(true)
});

  },[])



const handleLogin = (e)=>{
  e.preventDefault()
  console.log("User:",username," pass:",password)

  fetch('https://dummyjson.com/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    
    username:username ,
    password: password,
    expiresInMins: 30, // optional, defaults to 60
  })
})
.then(res => res.json())
.then((data)=>{
  console.log(data)
  setUser(data)
  localStorage.setItem("token",data.token)
  setIsLoggedIn(true)
});
}

  return (
    <>

<button onClick={()=>{     setCount(count+1)  }}  disabled={count>=10?true:false}>
  count is {count}
</button>

<div>
{username}
  {password}

</div>

{user && isLoggedin && (
<div>
<p>{user.firstName} {user.lastName}</p> 
<img src={user.image} />
<p>{user.gender}</p>
</div>
)}

<form onSubmit={handleLogin} >

  
<label htmlFor="username">Username</label>
<input type="text" id="username" name="username" onChange={(e)=>{
  console.log(e.target.value)
  setUsername(e.target.value)

}} />
<label htmlFor="password">Password</label>
<input type="password" id="password" name="password" onChange={(e)=>{

  setPassword(e.target.value)

}} />

<button type='submit' >Submit</button>

</form>



      <div style={{display:'flex',flexDirection:'row'}}>
        {products.map((product,index)=>{
          return (
            <div key={index} style={{
              border:'1px solid white',
              padding:'10px',
              margin:'10px',
              borderRadius:'10px'
            }}>
            <h1>{product.name}</h1> 
            <p> Rs. {product.price}</p>
            </div>
          )
        })}

      </div>
      <div>
      {nav_links.map((nav,index)=>{
        return (
          <li key={index} >{nav}</li>
        )
      })}
      </div>

    <Button bgcolor="red" margin="0px" color="yellow" >
      THIS IS MY BUTTON
    </Button>
    <Button bgcolor="cyan" margin="5px"  color="black" >
      HI HOW ARE YOU
    </Button>
    <TopNav title="MERO NEW sITE" login_link="/login" >

     <li>HOME</li>
     <li>ABOUT</li>
     <li>CONTACT</li>
     <li>LOGIN</li>


    </TopNav>

    <TopNav title="SOCIAL LINKS" login_link="/social" >
      
     <li>GOOGLE</li>
     <li>LINKEDIN</li>
     <li>FACEBOOK</li>
     <li>TWITTER</li>


    </TopNav>

    
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      </>
  )
}

export default App
