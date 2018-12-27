"use strict"

let body = document.body

body.style = `
    font-family: monospace, Arial;
    font-size: 14px;
    margin: 0;
`

let lastUpdate

let getData = function ( ref ) {
    return fetch ( 'http://localhost:3000/' + ref )
        .then ( response => response.json () )
}
let appElem = ( tagName, container ) => 
    ( container ? container : body )
        .appendChild ( document.createElement ( tagName ) )

let chat
let posts
let users

let currentUser

// Добавление юзера --- НАЧАЛО ---

let regBtn = appElem ( 'button' )
regBtn.innerText = "Регистрация"
regBtn.style = `
    position: fixed;
    right: 20px;
    width: 30%;
    bottom: 10px;
    height: 33px;
    outline: none;
`

class RegForm extends HTMLElement {
    constructor () {
        super ()
        let shadow = this.attachShadow ( { mode: "open" } )
        let style = document.createElement ( "style" )
        style.textContent = `
            *,
            *:before,
            *:after {
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                box-sizing: border-box;
            }

            #wrapper {
                position: relative;
                z-index: 9999;
                width: 100vw;
                height: 100vh;
                background-color: #00118260;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            #form {
                max-width: 300px;
                padding: 10px;
                border: 1px solid cyan;
                border-radius: 10px;
                background-color: #293a75;
            }

            input {
                width: 100%;
                margin-bottom: 5px;
                outline: none;
                border: 1px solid transparent;
            }

            button {
                border: 1px solid #00ffee;
                width: 45%;
                outline: none;
                border-radius: 10px;
                padding: 5px;
                background-color: #00ffee40;
            }

            #btn-cancel {
                float: right;
            }

        `
        function btnHover ( event ) {
            let style = event.currentTarget.style
            event.currentTarget.style = `
                background-color: #fff;
                cursor: pointer;
            `
            function reset (event) {
                event.currentTarget.style = style
            }
            event.currentTarget.addEventListener ("mouseleave", reset)
        }

        function remove ( event ) {
                document.querySelector("reg-form").remove()
        }

        function register ( event ) {
            let inputs = shadow.querySelectorAll ("input")
            let log = true
            for ( let elem of inputs ) {
                elem.value === "" ?
                    elem.style = "border: 1px solid red;" : elem.style.border = null
                elem.value === "" ?
                    log = false : null
            }
            if ( !log ) return

            fetch ("http://localhost:3000/users", {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify ({
                    name: shadow.getElementById("inputName").value,
                    lastName: shadow.getElementById("inputLastName").value,
                    email: shadow.getElementById("inputEmail").value,
                    photoURL: shadow.getElementById("inputURL").value
                })
            })
            .then ( response => {
                let mess = appElem("p", chat)
                mess.style.color = "red"
                response.status === 201 ? 
                    mess.innerText = `${ shadow.getElementById("inputName").value }, вы зарегистрированы!` :
                        mess.innerText = `Регистрация завершилась неудачей!`
                chat.scrollTop = chat.scrollHeight
            })
            remove()
        }

        let pageElems = [
            {
                tagName: "div",
                placeIn: "shadow",
                attrs: {
                    id: "wrapper"
                }
            },
            {
                tagName: "div",
                placeIn: "#wrapper",
                attrs: {
                    id: "form"
                }
            },
            {
                tagName: "input",
                placeIn: "#form",
                attrs: {
                    id: "inputName",
                    placeholder: "Name"
                }
            },
            {
                tagName: "input",
                placeIn: "#form",
                attrs: {
                    id: "inputLastName",
                    placeholder: "Last Name"
                }
            },
            {
                tagName: "input",
                placeIn: "#form",
                attrs: {
                    id: "inputEmail",
                    placeholder: "E-mail",
                    type: "email"
                }
            },
            {
                tagName: "input",
                placeIn: "#form",
                attrs: {
                    id: "inputURL",
                    placeholder: "URL avatar"
                }
            },
            {
                tagName: "button",
                placeIn: "#form",
                attrs: {
                    id: "btn-reg",
                    innerText: "Register"
                },
                callbacks: {
                    mouseover: btnHover,
                    click: register
                }
            },
            {
                tagName: "button",
                placeIn: "#form",
                attrs: {
                    id: "btn-cancel",
                    innerText: "Cancel"
                },
                callbacks: {
                    mouseover: btnHover,
                    click: remove
                }
            }
        ]

        let createPage = function createPage () {
            shadow.appendChild ( style )
            for ( let elem of pageElems ) {
                let place = !(elem.placeIn === "shadow") ?
                    shadow.querySelector ( elem.placeIn ) : shadow
                let tag = place.appendChild (
                    document.createElement ( elem.tagName )
                )
                for ( var attr in elem.attrs ) {
                    tag[attr] = elem.attrs[attr]
                }
                for ( var event in elem.callbacks ) {
                    tag.addEventListener ( event, elem.callbacks[event] )
                }

            }
        }
        createPage()
    }
}

customElements.define ("reg-form", RegForm)

regBtn.onclick = function ( event ) {
    customElements.whenDefined ( "reg-form" )
        .then ( () => {
            document.body.appendChild (
                document.createElement ("reg-form")
            )
        })
}


// Добавление юзера --- КОНЕЦ ---


let chatInput = appElem ( 'input' )
    chatInput.style = `
        position: fixed;
        left: 20px;
        width: 60%;
        bottom: 10px;
        border: inset 1px;
        background-color: #af9;
        overflow: auto;
    `

let buildChat = function () {
    chat = appElem ( 'section' )
    chat.style = `
        position: fixed;
        top: 30px;
        left: 20px;
        right: 20px;
        bottom: 70px;
        border: inset 1px;
        overflow: auto;
        padding: 10px;
    `
}

let updateChat = async function () {
    
    let updated = await getData ( "lastUpdate" )

    if ( lastUpdate &&
         updated.data === lastUpdate.data && 
         updated.time === lastUpdate.time )
        return

    await Promise.all ( [
        getData ( "users" ).then ( x => users = x ) , 
        getData ( "posts" ).then ( x => posts = x )
    ] )
    if ( !currentUser ) {
        currentUser = users [
            Math.floor ( Math.random () * users.length )
        ]
        let currentUserId = currentUser.id
    }

    initChat ()

    lastUpdate = {
        data: updated.data,
        time: updated.time
    }

    chat.scrollTop = chat.scrollHeight
}

let initChat = async function () {
    chat.innerHTML = ""
    posts.forEach ( post => {
        let user = users.filter ( x => x.id === post.userId )[0]
        chat.appendChild (
            ( function () {
                let cont = appElem ( 'div' )
                let ava = appElem ( 'img', cont )
                ava.src = user.photoURL
                ava.width = "40"
                ava.title = ` ${user.name} ${user.lastName}`
                appElem ( 'span', cont ).innerHTML = ` <small> ${post.date} ${post.time}</small>`
                appElem ( 'p', cont ).innerText = post.body
                return cont
            }) ( user )
        )
    })
}

buildChat ()
updateChat ()
setTimeout ( function () {
    chat.scrollTop = chat.scrollHeight
}, 200 )

let interval = setInterval ( function () {
    updateChat ()
}, 500 )

chatInput.onchange = function ( event ) {
    let postTime = new Date().toLocaleString ().split ( ', ' )
    fetch ( 'http://localhost:3000/lastUpdate', {
        method: 'POST',
        body: JSON.stringify ({
            data: postTime [0],
            time: postTime [1]
        }),
        headers: {
            "Content-type": "application/json"
        }
    })
    fetch ( 'http://localhost:3000/posts', {
        method: 'POST',
        body: JSON.stringify ({
            date: postTime [0],
            time: postTime [1],
            userId: currentUser.id,
            body: event.target.value
        }),
        headers: {
            "Content-type": "application/json"
        }
    })
}