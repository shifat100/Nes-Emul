"use strict";


/**** Mapper94 ****/
var Mapper94 = function(nes) {
	Base.apply(this, arguments);
};

Mapper94.prototype = Object.create(Base.prototype);

Mapper94.prototype.Init = function() {
	this.nes.SetPrgRomPage(0, 0);
	this.nes.SetPrgRomPage(1, this.nes.PrgRomPageCount - 1);
	this.nes.SetChrRomPage(0);
};

Mapper94.prototype.Write = function(address, data) {
	this.nes.SetPrgRomPage(0, data >> 2);
};


