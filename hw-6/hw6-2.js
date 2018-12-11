var tagNames = [ "div", "div", "div", "div", "button" ]
var divStyle = `
    display: inline-block;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: solid 1px green;
    font-size: 25px;
`
elements = tagNames.map ( function ( x ) {
    return document.body.appendChild ( 
        document.createElement ( x ) 
    )
})

elements.filter ( function ( element ) {
    return element.tagName === "DIV"
})
.forEach ( function ( element, num ) {
            element.style = divStyle
            element.innerText = num
})

elements.filter ( function ( element ) {
    return element.tagName === "BUTTON"
})
.forEach ( function ( element ) {
    element.innerHTML = "remove DIVs"
    element.onclick = function ( event ) {
            recursRemove ()
    }
})

var recursRemove = ( function ( tagName ) {
    var i = 0
    var elements = document.querySelectorAll ( tagName )
    return function remove () {
        if ( elements.length === i ) {
            var btn = document.querySelector ("button")
            btn.remove ()
            return
        } else {
            elements [ i ].parentNode.removeChild ( elements [ i++ ] )
            remove ()
        }
    }    
}) ( "div" )