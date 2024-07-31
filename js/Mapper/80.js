"use strict";


/**** Mapper80 ****/
var Mapper80 = function(nes) {
	Base.apply(this, arguments);
	this.MAPPER_REG = new Array(11);
	this.EX_RAM = new Array(128);
};

Mapper80.prototype = Object.create(Base.prototype);

Mapper80.prototype.Init = function() {
	var i;
	for(i=0; i<this.MAPPER_REG.length; i++)
		this.MAPPER_REG[i] = 0;

	for(i=0; i<this.EX_RAM.length; i++) {
		this.EX_RAM[i] = 0x00;
	}

	this.nes.SetPrgRomPages8K(0, 1, 2, this.nes.PrgRomPageCount * 2 - 1);
	this.nes.SetChrRomPages1K(0, 1, 2, 3, 4, 5, 6, 7);
};

Mapper80.prototype.ReadSRAM = function(address) {
	if(address >= 0x7F00 && address <= 0x7FFF)
		return this.EX_RAM[address & 0x007F];

	switch(address) {
		case 0x7EF0:
			return this.MAPPER_REG[0];
		case 0x7EF1:
			return this.MAPPER_REG[1];
		case 0x7EF2:
			return this.MAPPER_REG[2];
		case 0x7EF3:
			return this.MAPPER_REG[3];
		case 0x7EF4:
			return this.MAPPER_REG[4];
		case 0x7EF5:
			return this.MAPPER_REG[5];
		case 0x7EF6:
		case 0x7EF7:
			return this.MAPPER_REG[6];
		case 0x7EF8:
		case 0x7EF9:
			return this.MAPPER_REG[7];
		case 0x7EFA:
		case 0x7EFB:
			return this.MAPPER_REG[8];
		case 0x7EFC:
		case 0x7EFD:
			return this.MAPPER_REG[9];
		case 0x7EFE:
		case 0x7EFF:
			return this.MAPPER_REG[10];
	}

	return 0x00;
};

Mapper80.prototype.WriteSRAM = function(address, data) {
	if(address >= 0x7F00 && address <= 0x7FFF) {
		this.EX_RAM[address & 0x007F] = data;
		return;
	}

	switch(address) {
		case 0x7EF0:
			this.MAPPER_REG[0] = data;
			this.nes.SetChrRomPage1K(0, data & 0xFE);
			this.nes.SetChrRomPage1K(1, (data & 0xFE) + 1);
			break;
		case 0x7EF1:
			this.MAPPER_REG[1] = data;
			this.nes.SetChrRomPage1K(2, data & 0xFE);
			this.nes.SetChrRomPage1K(3, (data & 0xFE) + 1);
			break;
		case 0x7EF2:
			this.MAPPER_REG[2] = data;
			this.nes.SetChrRomPage1K(4, data);
			break;
		case 0x7EF3:
			this.MAPPER_REG[3] = data;
			this.nes.SetChrRomPage1K(5, data);
			break;
		case 0x7EF4:
			this.MAPPER_REG[4] = data;
			this.nes.SetChrRomPage1K(6, data);
			break;
		case 0x7EF5:
			this.MAPPER_REG[5] = data;
			this.nes.SetChrRomPage1K(7, data);
			break;
		case 0x7EF6:
		case 0x7EF7:
			this.MAPPER_REG[6] = data;
			if((data & 0x01) === 0x01)
				this.nes.SetMirror(false);
			else
				this.nes.SetMirror(true);
			break;
		case 0x7EF8:
		case 0x7EF9:
			this.MAPPER_REG[7] = data;
			break;
		case 0x7EFA:
		case 0x7EFB:
			this.MAPPER_REG[8] = data;
			this.nes.SetPrgRomPage8K(0, data);
			break;
		case 0x7EFC:
		case 0x7EFD:
			this.MAPPER_REG[9] = data;
			this.nes.SetPrgRomPage8K(1, data);
			break;
		case 0x7EFE:
		case 0x7EFF:
			this.MAPPER_REG[10] = data;
			this.nes.SetPrgRomPage8K(2, data);
			break;
	}
};
