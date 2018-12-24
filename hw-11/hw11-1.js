// Загрузить данные с https://api.github.com/users?since=250
// в переменную usersList

// Написать код, асинхронно загружающий данные о репозиториях каждого пользователя
// из полученного списка usersList

// Например,

// https://api.github.com/users/mojombo/repos
// где mojombo - login юзера github из списка usersList

// и выводящий на страницу по мере загрузки данных 
// ( с использованием асинхронной функции )
// фото каждого юзера из полученного списка usersList
// и названия его репозиториев

"use strict"

async function getData (url) {
    var usersList = await fetch (url)
        .then ( response => response.json() )
    usersList.forEach ( item => {
        fetch ( item.repos_url )
            .then ( response => response.json()
                .then ( json => {
                    var name = document.createElement ("p")
                    name.innerText = item.login
                    name.style = `
                        font-weight: bold;
                        text-transform: uppercase;
                    `
                    var pic = document.createElement ("img")
                    pic.width = "200"
                    pic.src = item.avatar_url     
                    var repos = document.createElement ("p")
                    document.body.appendChild (name)
                    document.body.appendChild (pic)
                    document.body.appendChild (repos)
                    json.forEach ( item => {
                        repos.innerText += ` ${item.name} |`
                    } )
                })
            )
        
    } )
}

getData("https://api.github.com/users?since=250")