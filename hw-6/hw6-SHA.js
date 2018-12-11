var sha256 = document.head.appendChild (
    document.createElement ("script")
)
sha256.src = "https://cdn.rawgit.com/chrisveness/crypto/4e93a4d/sha256.js"

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
        tagName: "p",
        placeIn: "#wrapper",
        attrs: {
            id: "textTop",
            style: `
                display: none;
                margin: 0 0 10px 0;
            `
        }
    },
    {
        tagName: "input",
        placeIn: "#wrapper",
        attrs: {
            id: "inputName",
            placeholder: "Имя",
            style: `
                margin-bottom: 10px;
                width: 100%;
                display: none;
            `
        }
    },
    {
        tagName: "input",
        placeIn: "#wrapper",
        attrs: {
            type: "email",
            id: "inputEmail",
            placeholder: "E-mail",
            style: `
                margin-bottom: 10px;
                width: 100%;
                display: none;
            `
        }
    },
    {
        tagName: "input",
        placeIn: "#wrapper",
        attrs: {
            type: "password",
            id: "inputPass",
            placeholder: "Пароль",
            style: `
                margin-bottom: 10px;
                width: 100%;
                display: none;
            `
        }
    },
    {
        tagName: "div",
        placeIn: "#wrapper",
        attrs: {
            id: "clearfix",
            style: `
                overflow: auto;
            `
        }
    },
    {
        tagName: "button",
        placeIn: "#clearfix",
        attrs: {
            id: "btnEnter",
            innerText: "Вход",
            style: `
                display: inline-block;
                float: left;
            `
        }
    },
    {
        tagName: "button",
        placeIn: "#clearfix",
        attrs: {
            id: "btnEndEnter",
            innerText: "Войти",
            style: `
                display: none;
                float: left;
            `
        }
    },
    {
        tagName: "button",
        placeIn: "#clearfix",
        attrs: {
            id: "btnReg",
            innerText: "Регистрация",
            style: `
                display: inline-block;
                float: right;
            `
        }
    },
    {
        tagName: "button",
        placeIn: "#clearfix",
        attrs: {
            id: "btnEndReg",
            innerText: "Зарегестрироваться",
            style: `
                display: none;
                float: right;
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

var div = document.querySelector ( "#wrapper" )
var inputName = document.querySelector ( "#inputName" )
var inputPass = document.querySelector ( "#inputPass" )
var inputEmail = document.querySelector ( "#inputEmail" )
var btnEnter = document.querySelector ( "#btnEnter" )
var btnReg = document.querySelector ( "#btnReg" )
var btnEndReg = document.querySelector ( "#btnEndReg" )
var textTop = document.querySelector ( "#textTop" )

var users = []

var text = [
    "Заполните форму:",
    "Все поля обязательны для заполнения!",
    "Вы зарегестрированы!",
    "Введите свои данные:",
    "Такой e-mail уже зарегестрирован!",
    "Пользователь не зарегистрирован!",
    "Пароль введен не верно!"
]

function replacementBtn ( bool, btn1, btn2 ) {
    bool ? btn1.style.display = "none" :
        btn1.style.display = "inline-block"
    bool ? btn2.style.display = "inline-block" :
        btn2.style.display = "none"
}

function regStart () {
    textTop.style.color = "black"
    textTop.style.display = "inline-block"
    textTop.innerText = text [ 0 ]

    inputName.value = null
    inputEmail.value = null
    inputPass.value = null

    inputName.style.display = "inline-block"
    inputPass.style.display = "inline-block"
    inputEmail.style.display = "inline-block"

    replacementBtn ( true, btnReg, btnEndReg )
    replacementBtn ( false, btnEnter, btnEndEnter )
}

function regEnd () {
    if ( inputName.value && inputEmail.value && inputPass.value ) {
        if ( !( users.some ( item => item.email === inputEmail.value )) ) {
            users.push (
                {
                    name: inputName.value,
                    email: inputEmail.value,
                    password: Sha256.hash ( inputPass.value ) 
                }
            )
            inputName.style.display = "none"
            inputPass.style.display = "none"
            inputEmail.style.display = "none"

            replacementBtn ( false, btnReg, btnEndReg )

            textTop.style.color = "black"
            textTop.innerText = text [ 2 ]
        } else {
            textTop.style.color = "red"
            textTop.innerText = text [ 4 ]
        }
        
    } else {
        textTop.style.color = "red"
        textTop.innerText = text [ 1 ]
    }
}

btnReg.addEventListener ( "click", regStart )
btnEndReg.addEventListener ( "click", regEnd )

function enter () {
    replacementBtn ( false, btnReg, btnEndReg )
    replacementBtn ( true, btnEnter, btnEndEnter )


    inputName.style.display = "none"
    inputPass.style.display = "inline-block"
    inputEmail.style.display = "inline-block"

    inputEmail.value = null
    inputPass.value = null
    
    textTop.style.display = "block"
    textTop.style.color = "black"
    textTop.innerText = text [ 3 ]
}

function enterEnd () {
    var user = users.filter ( item => item.email === inputEmail.value )
    
    if ( user.length !== 0 ) {
        if ( user[0].password === Sha256.hash ( inputPass.value ) ) {
            document.querySelector("#wrapper").remove()
            document.body.innerText = `Привет, ${ user[0].name } !!!`
        } else {
            textTop.style.color = "red"
            textTop.innerText = text [ 6 ]
        }
    } else {
        textTop.style.color = "red"
        textTop.innerText = text [ 5 ]
    }
}

btnEnter.addEventListener ( "click", enter )
btnEndEnter.addEventListener ( "click", enterEnd )