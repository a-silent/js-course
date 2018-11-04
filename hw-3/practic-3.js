var users = [
        {
                userId: 14587,
                name: "Ivan",
                email: "ivan78@gmail.com"
        },
        {
                userId: 28419,
                name: "Georg",
                email: "georg.klep@gmail.com"
        },
        {
                userId: 41457,
                name: "Stephan",
                email: "stephan.borg@gmail.com"
        }
]
var posts = [
        {
                postId: 7891451,
                author: 14587,
                text: "Imagine we can encapsulate these secondary responsibilities in functions"
        },
        {
                postId: 7891452,
                author: 28419,
                text: `В конструкторе ключевое слово super используется как функция, вызывающая родительский конструктор. 
                        Её необходимо вызвать до первого обращения к ключевому слову this в теле конструктора. 
                        Ключевое слово super также может быть использовано для вызова функций родительского объекта`
        },
        {
                postId: 7891453,
                author: 28419,
                text: `DOM не обрабатывает или не вынуждает проверять пространство имен как таковое. 
                        Префикс пространства имен, когда он связан с конкретным узлом, не может быть изменен`
        },
        {
                postId: 7891454,
                author: 14587,
                text: "Ключевое слово super используется для вызова функций, принадлежащих родителю объекта"
        }
]
var comments = [
        {
                commentId: 91078454,
                postId: 7891451,
                author: 28419,
                text: `The static String.fromCharCode() method returns a string created 
                        from the specified sequence of UTF-16 code units`
        },
        {
                commentId: 91078455,
                postId: 7891451,
                author: 41457,
                text: `HTML элемент <template> — это механизм для отложенного рендера клиентского контента, 
                        который не отображается во время загрузки, но может быть инициализирован при помощи JavaScript`
        },
        {
                commentId: 91078457,
                postId: 7891452,
                author: 41457,
                text: "Глобальный объект String является конструктором строк, или, последовательностей символов"
        },
        {
                commentId: 91078458,
                postId: 7891452,
                author: 14587,
                text: `The Element.namespaceURI read-only property returns the namespace URI of the element, 
                        or null if the element is not in a namespace`
        }
]

function getCurrentPostComments ( postId ) {
        var res = []
        users.searchName = function (id) {
                for ( var y in this ) {
                        if ( this[y]["userId"] === id ) {
                                var userName = this[y]["name"]
                        }
                }
                return userName
        }

        posts.searchPost = function (postId) {
        		for (var z in this[z])
        }

        while ()
        
        for ( var x in comments ) {
                if ( comments [x]["postId"] === postId ) {
                        res.push ( { "author" : users.searchName ( comments[x]["author"] ), "text" : comments[x]["text"] } )
                }
        }
        return res
}

console.log ( getCurrentPostComments ( 7891451 ) )
