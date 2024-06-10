
const TopNav = ({children,title,login_link,}) => {
    console.log(title)
    console.log(children)
  return (
    <div>
      {title}
      <ul>
        {children}
      </ul>
      <a href={login_link}> CLICK HERE </a>

    </div>
  )
}

export {TopNav} 
