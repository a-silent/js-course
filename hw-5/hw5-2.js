var h1 = document.body.appendChild (
    document.createElement ("h1")
)

var h2 = document.body.appendChild (
    document.createElement ("h2")
)

var p = document.body.appendChild (
    document.createElement ("p")
)

h1.innerText = "Hello!"

h2.innerText = "It is text h2"

p.innerText = "Lorem ipsum dolor sit amet."

var collection = document.body.children

function clickHandler ( event ) {
    this.style.color = "red"
}

var events = [
    function rotate ( event ) {
        this.style.display = "inline-block"
        this.style.transform = "rotate( 180deg )"
        this.style.transition = "all 1s"
    },
    function underLine ( event ) {
        this.style.textDecoration = "underline"
        this.style.transition = "all 1s"
    },
    function letterSpacing ( event ) {
        this.style.letterSpacing = "0.15rem"
        this.style.transition = "all 1s"
    }
]

var i = 0

for ( var elem of collection ) {
    elem.addEventListener ( `click`, clickHandler, false )
    elem.onclick = events[ i ]
    ++i
}
