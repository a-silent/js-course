var selector = document.body.appendChild (
    document.createElement ( 'input' )
)
selector.type = 'file'
selector.multiple = true
selector.id = 'selectImages'
selector.style.display = 'none'

var label = document.body.appendChild (
    document.createElement ( 'label' )
)
label.htmlFor = 'selectImages'
label.innerText = 'Select images'

var promise = function ( imageFile ) {
    var type = imageFile.type.split("/")[0]
    return new Promise ( function ( resolve, reject ) {
        if ( type === "image" ) {
            resolve ( URL.createObjectURL ( imageFile ) )
        } else reject ( "Выбранный файл не является изображением" )
    } )
}

selector.onchange = function ( event ) {
    for ( var file of event.target.files ) {
        promise ( file )
            .then ( result => {
                var picture = document.createElement ( "img" )
                document.body.appendChild( picture )
                picture.src = result
            })
            .catch ( error => console.error ( error ) )
    }
}