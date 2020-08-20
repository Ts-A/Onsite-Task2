let pattern =  /^(o|re)*(o|re|&)*(o|re)$/i

const submit = document.querySelector('#submit'),
      oreo   = document.querySelector('#oreo'),
      cookie = document.querySelector('.cookie')

submit.addEventListener('click', () => {
  cookie.innerHTML = ''
  if( validate( oreo.value , pattern  ) )
    console.log("Proceed")
  else{
    oreo.value = ''
    oreo.placeholder = 'Enter only from O,RE,& and do not start with or end with &'
    oreo.focus()
    return console.log("Try AGAIN")  
}

let encoded  = encoder( oreo.value.toUpperCase() )
  let children = decoder( encoded )
  
  console.log(cookie)
  for( i of children ){
    cookie.appendChild(i)
  }
  cookie.style.height = `${ ( children.length+2 )*10 + 100}px`
  html.style.height = "100px"
})

const validate = ( value  , regex ) => {
  return regex.test( value )
}

const encoder = ( elem ) => {
  let content = elem.split('')

  while( content.includes('E') ){
    content.splice( content.indexOf( 'E' ) , 1 )
  } 
 
  return content
}

const decoder = ( elem ) => {
  let array = []
  let length = 100
  let z = elem.length
  for( i of elem ){
    let x = ( document.createElement("img") )
    if( i == 'O' ){
      if( array.length == elem.length - 1 ){
        x.src = 'bottom.png'
        x.classList.add("new")
        length -= 90
        x.style.top = `${length}px`
        x.style.zIndex = z-- 
      } else{
        x.classList.add("new")
        x.src = 'top.png'
        length -= 90
        x.style.top = `${length}px`
        x.style.zIndex = z-- 
      }
    }
    else if( i == 'R' ){
      x.classList.add("new")
      x.src = 'middle.png'
      length -= 90
      x.style.top = `${length}px`
      x.style.zIndex = z-- 
    }
    else{
      x.classList.add("new")
      x.src = ''
      x.alt = ''
      length -= 50
      x.style.top = `${length}px`
      x.style.zIndex = z-- 
      x.style.opacity = 0
    }
    console.log(length)
    array.push(x)
  } 
  console.log(array)
  return array
}
