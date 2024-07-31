"use strict";


/**** Mapper66 ****/
var Mapper66 = function(nes) {
	Base.apply(this, arguments);
};

Mapper66.prototype = Object.create(Base.prototype);

Mapper66.prototype.Init = function() {
	this.nes.SetPrgRomPage(0, 0);
	this.nes.SetPrgRomPage(1, 1);
	this.nes.SetChrRomPage(0);
};

Mapper66.prototype.Write = function(address, data) {
	var tmp = (data & 0x30) >> 3;
	this.nes.SetPrgRomPage(0, tmp);
	this.nes.SetPrgRomPage(1, tmp + 1);

	this.nes.SetChrRomPage(data & 0x03);
};


