fetch ("https://avatars0.githubusercontent.com/u/40037502?v=4")
    .then ( response => response.blob()
        .then ( response => {
            var pic = document.createElement ("img")
            pic.width = "300"
            pic.src = URL.createObjectURL ( response )
            document.body.appendChild (pic)
        })
    )