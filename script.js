const pattern =  /^(o|re)*(o|re|&)*(o|re)$/i,
      submit = document.querySelector('#submit'),
      oreo   = document.querySelector('#oreo'),
      cookie = document.querySelector('.cookie'),
      stack = document.querySelector('.stack'),
      select = document.querySelector('#select')

var cookies      = document.querySelectorAll('.cookie'),
    selectCookie = 0

select.addEventListener("change",() => {
  let sv = Number(select.value)
  selectCookie = sv - 1
  if( sv > cookies.length ){
    let element = document.createElement("div")
    
    element.classList.add('cookie')
    stack.appendChild(element)
    cookies = document.querySelectorAll('.cookie')
    
    let option = document.createElement("option")
    
    option.appendChild( document.createTextNode(`${sv+1}`) )
    option.value = `${sv+1}`
    select.appendChild(option)
  }
  else{
  }
})

submit.addEventListener('click', () => {
  cookies[selectCookie].innerHTML = ''
  if( !validate( oreo.value , pattern  ) ){
    oreo.value = ''
    oreo.placeholder = 'Enter only from O,RE,& and do not start or end with &'
    return oreo.focus()
  }

  let encoded  = encoder( oreo.value.toUpperCase() ),
      children = decoder( encoded )
  for( i of children ){
    cookies[selectCookie].appendChild( i )
  }
  cookies[selectCookie].style.height = `${ ( children.length + 2 )*10 + 100}px`
  dragElement( cookies[selectCookie] );
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
  let array = [],
      length = 100,
      z = elem.length
  for( i of elem ){
    let x = ( document.createElement("img") )
    if( i == 'O' ){
      if( array.length == elem.length - 1 ){
        x.src = 'bottom.png'
        x.classList.add("new")
        length -= 90
        x.style.top = `${length}px`
        x.style.zIndex = z-- 
        x.draggable = true
      } else{
        x.classList.add("new")
        x.src = 'top.png'
        length -= 90
        x.style.top = `${length}px`
        x.style.zIndex = z--
        x.draggable = true
      }
    }
    else if( i == 'R' ){
      x.classList.add("new")
      x.src = 'middle.png'
      length -= 90
      x.style.top = `${length}px`
      x.style.zIndex = z--
      x.draggable = true
    }
    else{
      x.classList.add("new")
      x.src = ''
      x.alt = ''
      length -= 50
      x.style.top = `${length}px`
      x.style.zIndex = z-- 
      x.style.opacity = 0
      x.draggable = true
    }
    array.push(x)
  } 
  return array
}

const dragElement = ( oreo ) => {
  var fx = 0, 
      fy = 0, 
      ix = 0, 
      iy = 0

  // oreo.addEventListener('mousedown',dragMouseDown)    
  oreo.onmousedown = dragMouseDown;     //ClickDown

  function dragMouseDown( e ) {
    e.preventDefault()
    ix = e.clientX
    iy = e.clientY
    document.onmouseup = closeDragElement
    document.onmousemove = elementDrag
  }

  function elementDrag( e ) {
    e.preventDefault() 
    fx = ix - e.clientX
    fy = iy - e.clientY
    ix = e.clientX
    iy = e.clientY
    oreo.style.top = `${oreo.offsetTop - fy}px`
    oreo.style.left = `${oreo.offsetLeft - fx}px`
  }

  function closeDragElement() {
    document.onmouseup = null
    document.onmousemove = null
  }
}
