var body = document.body

var images = [
    "https://images.pexels.com/photos/736842/pexels-photo-736842.jpeg",
    "https://images.pexels.com/photos/736843/pexels-photo-736843.jpeg",
    "https://images.pexels.com/photos/736840/pexels-photo-736840.jpeg"
]

var saveStorage = (function () {
    var boxTime = []
    return function () {
        boxTime.push ({
            pageId: location.hash,
            startTime: new Date().getTime()
        })
        localStorage.setItem ( "history", JSON.stringify (boxTime) )
        console.log ( "hash was changed" )
        console.log ( localStorage.getItem ( "history" ) )
    }
})()

window.onhashchange = function ( event ) {
       
    switch ( location.hash ) {
        case "#0":            
            saveStorage()
            body.innerHTML = null
            body.style.backgroundImage = "none"
            images.forEach ( (item, index) => {
                var link = document.createElement ("a")
                link.href = `#`
                link.innerHTML = `Picture ${index+1}<br>`
                link.onclick = function (event) {
                    event.preventDefault()
                    location.hash = `#${index+1}`
                }
                body.appendChild (link)
            } )
            break

        case "#1":
        case "#2":
        case "#3":
            saveStorage ()
            body.innerHTML = null
            var hash = +location.hash.substr(1)
            var pic = document.createElement ("img")
            var btn = document.createElement ("button")
            pic.src = `${images[hash-1]}`
            pic.width = "300"
            btn.innerText = "<<< back to main page"
            btn.onclick = (event) => history.back()
            body.appendChild (pic)
            body.appendChild (btn)
            break

        default:
            location.hash = "#0"
            break
    }
}

location.hash = "#0"