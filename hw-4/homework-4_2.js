var LibraryBook = function ( title, year, author ) {
	var pin = prompt ("Создайте пароль доступа") || "0000"
	var title = title || "название не указано"
	var year = year || "год не указан"
	var author = author || "автор не указан"
	var readerName = null
	var readerData = null

	function giveTheBook ( client ) {
		if ( prompt ( "Введите пароль" ) === pin ) {
			readerName = client
			readerData = new Date ().toLocaleString ()
			console.log ( `Книга выдана: ${readerName}, дата выдачи: ${readerData}` )
			return true
		} else {
			console.log ( "Пароль введен не верно! Книга не выдана!" )
			return false
		}
	}

	this.getBookInfo = function () {
		console.log ( readerData )
	}

	this.getTheBook = function ( client ) {
		if ( readerName === null ) {
			return giveTheBook ( client ) ? title : null	
		} else {
			return null
		}
	}

	this.returnBook = function () {
		readerName = null
		readerData = null
	}
}
