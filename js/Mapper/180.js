"use strict";


/**** Mapper180 ****/
var Mapper180 = function(nes) {
	Base.apply(this, arguments);
};

Mapper180.prototype = Object.create(Base.prototype);

Mapper180.prototype.Init = function() {
	this.nes.SetPrgRomPage(0, 0);
	this.nes.SetPrgRomPage(1, this.nes.PrgRomPageCount - 1);
	this.nes.SetChrRomPage(0);
};

Mapper180.prototype.Write = function(address, data) {
	this.nes.SetPrgRomPage(1, data);
};

