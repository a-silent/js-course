var mass = []

var elements = [
    {
        tagName: "div",
        placeIn: "body",
        attrs: {
            id: "wrapper",
            style: `
                margin: 0 auto;
                width: 300px;
                border: 2px solid cyan;
                border-radius: 10px;
                padding: 10px;
                background-color: rgba(255, 255, 0, 0.6);
                text-align: center;
            `
        }
    },
    {
        tagName: "p",
        placeIn: "#wrapper",
        attrs: {
            id: "textArr",
            innerText: `Массив: [ ${mass.join(", ")} ]`,
            style: `
                color: blue;
            `
        }
    },
    {
        tagName: "input",
        placeIn: "#wrapper",
        attrs: {
            id: "inputIndex",
            placeholder: placeHolderIndex (),
            style: `
                width: 100%;
                margin-bottom: 10px;
            `
        }
    },
    {
        tagName: "input",
        placeIn: "#wrapper",
        attrs: {
            id: "inputValue",
            placeholder: "Введите значение",
            style: `
                width: 100%;
                margin-bottom: 10px;
            `
        }
    },
    {
        tagName: "button",
        placeIn: "#wrapper",
        attrs: {
            id: "btnAdd",
            innerText: "Добавить элемент"
        }
    },
    {
        tagName: "p",
        placeIn: "#wrapper",
        attrs: {
            id: "textInfo",
            style: `
                display: none;
                color: red;
            `
        }
    }
]

elements.forEach ( elemObj => {
    var elem = document.querySelector( [ elemObj.placeIn ] ).appendChild (
        document.createElement ( elemObj.tagName )
    )
    for ( var attr in elemObj.attrs ) {
        elem [ attr ] = elemObj.attrs [ attr ]
    }
} )

var text = [
    "Индекс задан неверно !"
]

var textArr = document.querySelector("#textArr")
var inputIndex = document.querySelector("#inputIndex")
var inputValue = document.querySelector("#inputValue")
var textInfo = document.querySelector("#textInfo")
var btnAdd = document.querySelector("#btnAdd")

function placeHolderIndex () {
    var index = mass.length
    return index > 0 ? 
        `Индекс от 0 до ${index}` : 
        `Индекс только 0`
}

function addItem () {
    if ( !isNaN ( inputIndex.value ) &&
        inputIndex.value !== "" &&
        inputIndex.value >= 0 &&
        inputIndex.value <= mass.length ) {
            mass.splice( inputIndex.value, 0, inputValue.value )
            textArr.innerText = `Массив: [ ${mass.join(", ")} ]`
            textInfo.style.display = "none"
            inputIndex.placeholder = placeHolderIndex ()
            inputIndex.value = null
            inputValue.value = null
    } else {
        textInfo.style.display = "block"
        textInfo.innerText = text [ 0 ]
    }     
}

btnAdd.addEventListener ( "click", addItem )