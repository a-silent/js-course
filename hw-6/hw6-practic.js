var sourceArray = [
        {  id: "http",  ref:  "https://www.w3schools.com/" },
        {  id: "translate",  ref:  "https://translate.google.com" },
        {  id: "develop",  ref:  "https://stackoverflow.com/questions" },
        {  id: "vue",  ref:  "https://garevna.github.io/vue-course.github.io/#/" },
        {  id: "W3C",  ref:  "https://www.w3.org/" },
        {  id: "JS",  ref:  "https://www.w3schools.com/js/default.asp" },
        {  id: "git",  ref:  "https://github.com" },
]

var array_1 = sourceArray.map ( item => item.id )
console.log ( array_1 )

var array_2 = sourceArray.filter ( item => item.ref.indexOf("www") >= 0 )
console.log ( array_2 )

sourceArray.forEach ( item => {
    var a = document.createElement ("a")
    document.body.appendChild ( a )
    a.style = "display: block;"
    a.href = item.ref
    a.innerText = item.id
} )