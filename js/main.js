document.querySelector('input[type=file]').addEventListener('change', function (e) {
	read_local_file(e.target.files[0], nes_rom_change);
}, false)



try {

function gup(name, loc) { name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]"); var regexS = "[\\?&]" + name + "=([^&#]*)"; var regex = new RegExp(regexS); var results = regex.exec(loc); if (results == null) return ""; else return results[1]; }
function baseFileName(filepath) {
	var s = filepath.split('/');
	var name = s[s.length - 1];
	return name;
}


// canvas


function nes_pause() {
	if (nes.Pause()) {
		/*document.getElementById("pause").disabled = true;
		document.getElementById("start").disabled = false;*/
	}
}


function nes_start() {
	if (nes.Start()) {
		/*document.getElementById("pause").disabled = false;
		document.getElementById("start").disabled = true;*/
	}
}


function nes_reset() {
	if (nes.Reset()) {
		/*document.getElementById("pause").disabled = false;
		document.getElementById("start").disabled = true;*/
	}
}

function nes_rom_change(arraybuffer) {
	// 実行中のNESを停止
	nes_pause();

	if (!nes.SetRom(arraybuffer)) {
		alert("Can't get rom data (perhaps you don't set ArrayBuffer arguments or it's not nes rom format)");
		return;
	}

	/*document.getElementById("start").disabled = true;
	document.getElementById("pause").disabled = true;*/


	if (nes.Init())
		nes_start();
}

// ローカル上のROMを読み込み
var read_local_file = function (fileObj, cb) {
	var reader = new FileReader();
	reader.onload = function (e) { cb(e.target.result); };
	reader.readAsArrayBuffer(fileObj);
};

// URL からROMを読み込み
var read_url = function (url, cb) {
	var sdcard = navigator.getDeviceStorages("sdcard")[0];
	var request = sdcard.get(url); 

	request.onsuccess = function () {
		var fileReader = new FileReader();
		fileReader.onload = function() { document.getElementById("header").innerHTML=baseFileName(url); document.getElementById("footer").innerHTML='&copy; 2024'; cb(fileReader.result); }
	
	fileReader.readAsArrayBuffer(request.result);
}
	request.onerror = function (e) {
		alert('Unsupported Mapper: '+ nes.MapperNumber+' Not Found In Emulator');
	};
};

// 画面の高さに応じてcanvasサイズ変更
function resize_canvas() {
	var diameter = (parseInt)(window.innerHeight / canvas_height);
	canvas.style.width = canvas_width * diameter;//'100%';
	canvas.style.height = canvas_height * diameter;
}


function fullscreen() {
	if (canvas.requestFullscreen) {
		canvas.requestFullscreen();
	}
	else if (canvas.msRequestuestFullscreen) {
		canvas.msRequestuestFullscreen();
	}
	else if (canvas.mozRequestFullScreen) {
		canvas.mozRequestFullScreen();
	}
	else if (canvas.webkitRequestFullscreen) {
		canvas.webkitRequestFullscreen();
	}
}

// DOMのイベントを設定
var initialize_dom_events = function () {
	if (typeof window.FileReader !== "undefined") {
		// ドラッグ&ドロップでROM読み込み


		if (gup("f", window.location.href) != "") {
			read_url(gup("f", window.location.href), nes_rom_change);
			document.title = baseFileName(gup("f", window.location.href));
		}
		else {
			read_url('rom/dummy.nes', nes_rom_change); document.title = baseFileName('Bad Apple!! PV-FC 2.5');
		}


		window.addEventListener("dragenter",
			function (e) {
				e.preventDefault();
			}, false);

		window.addEventListener("dragover",
			function (e) {
				e.preventDefault();
			}, false);

		window.addEventListener("drop",
			function (e) {
				e.preventDefault();
				read_local_file(e.dataTransfer.files[0], nes_rom_change);
			}, false);
	/*	// input type="file" から ROM読み込み
		document.getElementById("file").addEventListener("change",
			function (e) {
				read_local_file(e.target.files[0], nes_rom_change);
			}, false);

		// プルダウンから ROM読み込み
		document.getElementById("romload").addEventListener("click",
			function (e) {
				e.preventDefault();

				// ROM の場所
				var url = document.getElementById("romlist").value;

				read_url(url, nes_rom_change);
			}, false);

		document.getElementById("pause").addEventListener("click", nes_pause, false);
		document.getElementById("start").addEventListener("click", nes_start, false);
		document.getElementById("reset").addEventListener("click", nes_reset, false);

		document.getElementById("fullscreen").addEventListener("click", fullscreen, false);

		document.getElementById("start").disabled = true;
		document.getElementById("pause").disabled = true;*/
	}

	// 画面の高さに応じてcanvasサイズ変更
	window.addEventListener('resize', resize_canvas);

	// Chrome ではイベント発生してから resume しないと音が再生されない。
	// よってマウスクリック時に resume を設定
	var ontouchendEventName = typeof window.document.ontouchend !== 'undefined' ? 'touchend' : 'mouseup';
	var resume_audio_func = function () {
		nes.webAudioContextResume();
		window.removeEventListener(ontouchendEventName, resume_audio_func);
	};

	window.addEventListener(ontouchendEventName, resume_audio_func);
};

// 初期化
window.onload = function () {
	// DOMのイベントを設定
	initialize_dom_events();

	// 画面の高さに応じてcanvasサイズ変更
	resize_canvas();
};



document.body.addEventListener('keydown', function(e) {
	if(e.key == 'Backspace') { window.location.href='/index.html'; }
	if(e.key == 'SoftRight') { window.location.href='/index.html'; }
})
document.body.addEventListener('click', function() {
	console.info('Width: '+window.innerWidth+'\nHeight: '+window.innerHeight);
	});

} catch(e) {
	alert('Error: '+e.message);
}

document.addEventListener('DOMContentLoaded', () => {
	getKaiAd({
		publisher: '080b82ab-b33a-4763-a498-50f464567e49',
		app: 'nes_emul',
		slot: 'nes_emul',
		onerror: err => console.error('Custom catch:', err),
		onready: ad => {
			ad.call('display');
		}
	})
});