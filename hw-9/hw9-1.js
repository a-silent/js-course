var elements = [
    {
        tagName: "div",
        placeIn: "body",
        attrs: {
            id: "wrapper",
            style: `
                margin: 0 auto;
                max-width: 300px;
                border: 2px solid cyan;
                border-radius: 10px;
                padding: 10px;
                text-align: center;
            `
        }
    },
    {
        tagName: "input",
        placeIn: "#wrapper",
        attrs: {
            id: "inputName",
            placeholder: "Name",
            value: getCookies ( "Name" ),
            style: `
                margin-bottom: 10px;
                width: 100%;
            `
        }
    },
    {
        tagName: "input",
        placeIn: "#wrapper",
        attrs: {
            id: "inputAge",
            placeholder: "Age",
            value: getCookies ( "Age" ),
            style: `
                margin-bottom: 10px;
                width: 100%;
            `
        }
    },
    {
        tagName: "input",
        placeIn: "#wrapper",
        attrs: {
            id: "inputCity",
            placeholder: "City",
            value: getCookies ( "City" ),
            style: `
                margin-bottom: 10px;
                width: 100%;
            `
        }
    },
    {
        tagName: "button",
        placeIn: "#wrapper",
        attrs: {
            id: "btnSave",
            innerText: "Сохранить",
            onclick: saveCookie
        }
    }
]

function saveCookie () {
    document.getElementById ("wrapper").childNodes
        .forEach ( item => {
            item.nodeName === "INPUT" && item.value !== "" ? 
                document.cookie = `${item.placeholder}=${item.value}` :
                    null
        } )
}

elements.forEach ( elemObj => {
    var elem = document.querySelector( [ elemObj.placeIn ] ).appendChild (
        document.createElement ( elemObj.tagName )
    )
    for ( var attr in elemObj.attrs ) {
        elem [ attr ] = elemObj.attrs [ attr ]
    }
} )

function getCookies ( param ) {
    var cookie = document.cookie.split ( "; " )
        .map ( x => Object.assign ( {}, { [ x.split ( "=" )[0] ] : x.split ( "=" )[1] } ) )
    var result = null
    cookie.forEach ( item => {
        item[param] ? result = item[param] : null
    } )
    return result
}

