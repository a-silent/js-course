var elements = [
    {
        tagName: "div",
        placeIn: "body",
        attrs: {
            id: "wrapper",
            style: `
                margin: 0 auto;
                max-width: 300px;
                min-height: 230px;
                border: 5px solid cyan;
                border-radius: 10px;
                padding: 10px;
                background-color: black;
                position: relative;
            `
        }
    },
    {
        tagName: "img",
        placeIn: "#wrapper",
        attrs: {
            id: "avatar",
            style: `
                width: 50px;
            `
        }
    },
    {
        tagName: "span",
        placeIn: "#wrapper",
        attrs: {
            id: "name",
            style: `
                color: #fff;
                margin-left: 10px;
            `
        }
    },
    {
        tagName: "textarea",
        placeIn: "#wrapper",
        attrs: {
            id: "textarea",
            style: `
                width: calc(100% - 20px);
                height: 150px;
                position: absolute;
                left: 10px;
                bottom: 10px;
                padding: 10px;
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

var User = function ( name, email, photoURL ) {
    this.name = name || "noname"
    this.email = email || "nomail"
    this.photoURL = photoURL || User.getAvatar ()
    
}

User.avatars = [
        "https://pre00.deviantart.net/50f9/th/pre/i/2011/217/e/8/pikachu_2_by_nostalgiaattack-d45jd3i.png",
        "https://cdn.diversityavatars.com/wp-content/uploads/2018/01/Vector-Smart-Object-5.png",
        "https://cdn4.iconfinder.com/data/icons/user-avatar-flat-icons/512/User_Avatar-31-512.png",
        "http://icons.iconarchive.com/icons/hopstarter/face-avatars/256/Male-Face-L3-icon.png",
        "https://findicons.com/files/icons/1072/face_avatars/300/i05.png",
        "http://www.iconarchive.com/download/i51043/hopstarter/halloween-avatars/Gomez.ico",
        "http://icons.iconarchive.com/icons/hopstarter/halloween-avatars/256/Zombie-2-icon.png",
        "https://vignette.wikia.nocookie.net/yogscast/images/8/8a/Avatar_Turps_2015.jpg"
]

User.admin = {
        photoURL: "https://i.pinimg.com/originals/3d/47/4f/3d474f82ff71595e8081f9a120892ae8.gif",
        name: "admin"
}

User.getAvatar = function () {
    return this.avatars.shift ()
}

Object.defineProperty ( User.prototype, "messageBox", {
    value: document.querySelector ("#wrapper"),
    writable: false,
    enumerable: false
} )

User.prototype.write = function ( someText ) {
    this.messageBox.childNodes
        .forEach ( function (item) {
            item.id === "avatar" ? item.src = this.photoURL :
                item.id === "name" ? item.innerText = this.name :
                    item.id === "textarea" ? item.value = someText || "текс не введен" : null
        }.bind (this) )
}

User.prototype.read = function () {
    console.log (`
        ${ this.name } прочитал сообщение:
        ${ this.messageBox.lastChild.value }
    `)
    this.messageBox.childNodes
        .forEach ( function (item) {
            item.id === "avatar" ? item.src = this.photoURL :
                item.id === "name" ? item.innerText = this.name :
                    item.id === "textarea" ? item.value = "OK" : null
        }.bind (this) )
}

function adminWrite ( event ) {
    event.target.value = null
    event.target.parentNode.childNodes
        .forEach ( function ( item ) {
            item.id === "avatar" ? item.src = User.admin.photoURL :
                item.id === "name" ? item.innerText = User.admin.name : null
        } )
    
}

document.getElementById ("textarea").addEventListener ( "focus", adminWrite )

var users = []
users.push ( new User ( "Иван" ) )
users.push ( new User ( 'Alex', "alex@gmail.com" ) )
users.push ( new User ( 'Bob', "bob777@gmail.com" ) )
users.push ( new User ( 'Dima', "dima888@gmail.com" ) )
users.push ( new User ( 'Fima', "fima999@gmail.com" ) )

var k = 1
users.forEach ( 
    function ( user ) {
        setTimeout ( 
            function () {
                user.write ( `Hello, I'm ${user.name}` )
            }, 3000 * k++
        )
    }
)