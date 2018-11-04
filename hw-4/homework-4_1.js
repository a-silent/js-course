var girl = {
	name: "Ann",
	age: 25,
	handBag: [],
	addItem: function ( nameItem ) {
		this.handBag.includes( nameItem ) ? console.log (`${nameItem} уже есть в сумочке!`) : this.handBag.push ( nameItem ) 
	},
	removeItem: function ( nameItem ) {
		if ( this.handBag.includes( nameItem ) ) {
			for ( var x in this.handBag ) this.handBag[x] == nameItem ? this.handBag.splice ( x, 1 ) : null
		} else console.log ( `В сумочке нет ${nameItem} !` )
	}
}