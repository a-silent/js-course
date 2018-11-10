var p = document.body.appendChild (
    document.createElement (`p`)
)

p.innerText = `Click`

p.onclick = function (event) {
    var pic = document.createElement (`img`)
    pic.src = `https://www.google.com.ua/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png`
    pic.width = `100`
    document.body.appendChild (pic)
    pic.onmouseover = function (event) {
        pic.style = `
            width: 200px;
            transition: all 1s;
        `
    }

    pic.onclick = function (event) {
        pic.remove()
    }
}