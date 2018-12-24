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

let regForm = function () {
    var wrapper = appElem ( 'div' )
    wrapper.style = `
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        z-index: 5;
        height: 100vh;
        width: 100vw;
        background-color: #30303090;
    `
    var form = appElem ( 'div', wrapper )
    form.style = `
        position: fixed;
        z-index: 6;
        max-width: 200px;
        background-color: #4a56ff60;
        padding: 10px;
    `

    var nameInput = appElem ( 'input', form )
    var lastNameInput = appElem ( 'input', form )
    var emailInput = appElem ( 'input', form )
    var imgUrlInput = appElem ( 'input', form )

    var elems = form.querySelectorAll ('input')
    var placeHolder = [
        "Name",
        "Last name",
        "E-mail",
        "URL avatar"
    ]
    for ( var elem of elems ) {
        elem.style = `
            margin-bottom: 5px;
            width: 100%;
        `
        elem.placeholder = placeHolder.shift()
    }

    var addUserBtn = appElem ( 'button', form )
    addUserBtn.innerText = "Добавить"
    addUserBtn.style = `
        width: 100%;
        margin-top: 10px;
    `

    function postNewUser (event) {
        fetch ("http://localhost:3000/users", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify ({
                name: nameInput.value || "noname",
                lastName: lastNameInput.value || "nolastname",
                email: emailInput.value || "noemail",
                photoURL: imgUrlInput.value || "http://s1.iconbird.com/ico/0912/MetroUIDock/w512h5121347464813UserNoFrame.png"
            })
        })

        var mess = appElem("p", chat)
        mess.style.color = "red"
        mess.innerText = `${ nameInput.value || "noname" }, вы зарегистрированы!`
        chat.scrollTop = chat.scrollHeight
        
        event.target.removeEventListener ('click', postNewUser)
        wrapper.remove()
    }

    addUserBtn.addEventListener ( 'click', postNewUser ) 
}

regBtn.onclick = function ( event ) {
    regForm()
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