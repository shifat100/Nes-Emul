var app = document.getElementById('app');
var header = document.getElementsByClassName('header')[0];
var f1 = document.getElementsByClassName('footerelement')[0];
var f2 = document.getElementsByClassName('footerelement')[1];
var f3 = document.getElementsByClassName('footerelement')[2];
var speed = 1;
var romname = '';







//get file extension
function fileExtention(filename) {
  var fsplit = filename.split('.');
  var extention = fsplit[fsplit.length - 1];
  return extention;
}

//get base file Name
function baseFileName(filename) {
  var s = filename.split('/');
  var name = s[s.length - 1];
  return name.replace('.nes', '');
}
//fullScreen
function openFullScreen(e) { e.requestFullscreen ? e.requestFullscreen() : e.webkitRequestFullscreen ? e.webkitRequestFullscreen() : e.msRequestFullscreen && e.msRequestFullscreen() }

var sdcards = navigator.getDeviceStorages('sdcard');

function main() {
  app.innerHTML = '';
  if (sdcards.length == 2) { externalCard(); }
  else { internalCard(); }
}

function internalCard() {
  var sd = navigator.getDeviceStorages('sdcard')[0];
  var ti = 0;
  var cursor = sd.enumerate();

  cursor.onsuccess = function () {
    if (this.result.name.lastIndexOf('.nes') === this.result.name.length - 4 || this.result.name.lastIndexOf('.NES') === this.result.name.length - 4) {
      var file = this.result;
      var filename = file.name;
      var filepath = filename.replace('/sdcard/', '');
      var item = document.createElement('div');
      item.className = 'listview file';
      item.tabIndex = ti;
      ti++;
      item.innerHTML = baseFileName(file.name.substring(file.name.lastIndexOf('/') + 1));
      item.addEventListener('click', function () {
        machine(file);
      });
      if (app.appendChild(item)) {
        app.style.display = 'block';
        document.getElementById('nofilenotice').style.display = 'none';
        app.appendChild(item);
        app.style = 'z-index: 1';
      } else {
        app.style.display = 'none';
        document.getElementById('nofilenotice').style.display = 'block';
        app.style = 'z-index: 0';
      }
    }
    if (!this.done) {
      this.continue();
    }
  }

  cursor.onerror = function () {
    console.warn('No file found: ' + this.error);
    app.innerHTML = 'No file found: ' + this.error;
  }

  header.innerHTML = 'Nes Emulator';
  f1.innerHTML = 'Help';
  f2.innerHTML = 'Ok';
  f3.innerHTML = 'Exit';
  document.body.removeEventListener('keydown', keydownhelp);
  document.body.addEventListener('keydown', keydownlistview);
}


function externalCard() {
  var sd = navigator.getDeviceStorages('sdcard')[0];
  var ti = 0;
  var cursor = sd.enumerate();

  cursor.onsuccess = function () {
    if (this.result.name.lastIndexOf('.nes') === this.result.name.length - 4 || this.result.name.lastIndexOf('.NES') === this.result.name.length - 4) {
      var file = this.result;
      var filename = file.name;
      var filepath = filename.replace('/sdcard/', '');
      var item = document.createElement('div');
      item.className = 'listview file';
      item.tabIndex = ti;
      ti++;
      item.innerHTML = baseFileName(file.name.substring(file.name.lastIndexOf('/') + 1));
      item.addEventListener('click', function () {
        machine(file);
      });
      if (app.appendChild(item)) {
        app.style.display = 'block';
        document.getElementById('nofilenotice').style.display = 'none';
        app.appendChild(item);
        app.style = 'z-index: 1';
      } else {
        app.style.display = 'none';
        document.getElementById('nofilenotice').style.display = 'block';
        app.style = 'z-index: 0';
      }
    }
    if (!this.done) {
      this.continue();
    }
  }

  cursor.onerror = function () {
    console.warn('No file found: ' + this.error);
    app.innerHTML = 'No file found: ' + this.error;
  }

  sd = navigator.getDeviceStorages('sdcard')[1];
  var cursor = sd.enumerate();

  cursor.onsuccess = function () {
    if (this.result.name.lastIndexOf('.nes') === this.result.name.length - 4 || this.result.name.lastIndexOf('.NES') === this.result.name.length - 4) {
      var file = this.result;
      var filename = file.name;
      var filepath = filename.replace('/sdcard/', '');
      var item = document.createElement('div');
      item.className = 'listview file';
      item.tabIndex = ti;
      ti++;
      item.innerHTML = baseFileName(file.name.substring(file.name.lastIndexOf('/') + 1));
      item.addEventListener('click', function () {
        machine(file);
      });
      if (app.appendChild(item)) {
        app.style.display = 'block';
        document.getElementById('nofilenotice').style.display = 'none';
        app.appendChild(item);
        app.style = 'z-index: 1';
      } else {
        app.style.display = 'none';
        document.getElementById('nofilenotice').style.display = 'block';
        app.style = 'z-index: 0';
      }
    }
    if (!this.done) {
      this.continue();
    }
  }

  cursor.onerror = function () {
    console.warn('No file found: ' + this.error);
    app.innerHTML = 'No file found: ' + this.error;
  }

  header.innerHTML = 'Nes Emulator';
  f1.innerHTML = 'Help';
  f2.innerHTML = 'Ok';
  f3.innerHTML = 'Exit';
  document.body.removeEventListener('keydown', keydownhelp);
  document.body.addEventListener('keydown', keydownlistview);
}



function help() {
  var e = document.createElement('div');
  e.className = 'flex';
  e.id = 'helpScreen';
  e.innerHTML = '<div class="header" style="position: fixed; top: 0px;left: 0px;">Help (default keys)</div><div class="content"><center><table width="100%" style="border: 0px solid #ccc;font-size: 14px;margin:5px 0px" cellspadding="0" cellspacing = "0"><tr><td>A</td><td> = </td><td>Enter</td></tr><tr><td>B</td><td> = </td><td>5</td></tr><tr><td>SELECT</td><td> = </td><td>2</td></tr><tr><td> START</td><td> = </td><td>0</td></tr><tr><td>UP</td><td> = </td><td>ArrowUp</td></tr><tr><td>DOWN</td><td> = </td><td>ArrowDown</td></tr><tr><td>LEFT</td><td> = </td><td>ArrowLeft</td></tr><tr><td>RIGHT</td><td> = </td><td>ArrowRight</td></tr><tr><td>1</td><td> = </td><td>Decrese Speed</td></tr><tr><td>3</td><td> = </td><td>Increase Speed</td></tr><tr><td>*</td><td> = </td><td>Save State</td></tr><tr><td style="border-bottom: 0px solid transparent">#</td><td style="border-bottom: 0px solid transparent"> = </td><td style="border-bottom: 0px solid transparent">Load State</td></tr></table><center> <div class="footer"><span class="footerelement">Set</span><span class="footerelement">OK</span><span class="footerelement">Back</span></div></div>';

  document.body.appendChild(e);

  document.body.removeEventListener('keydown', keydownlistview);
  document.body.addEventListener('keydown', keydownhelp);
}



function keydownlistview(e) {
  switch (e.key) {
    case 'ArrowUp':
      nav(-1);
      break;
    case 'ArrowDown':
      nav(1);
      break;
    case 'ArrowLeft':
      nav(-1);
      break;
    case 'ArrowRight':
      nav(1);
      break;
    case 'SoftLeft':
      help();
      break;
    case 'F1':
      help();
      break;
    case 'SoftRight':
      window.close();
      break;
    case 'F2':
      window.close();
      break;
    case 'Enter':
      document.activeElement.click();
      break;
  }
  function nav(move) {
    var currentIndex = document.activeElement.tabIndex;
    var next = currentIndex + move;
    var items = document.querySelectorAll('.file');
    var targetElement = items[next];
    targetElement.focus();
    targetElement.scrollIntoView({ block: 'center', behavior: 'smooth' })
  }
}

function keydownhelp(e) {
  if (e.key == 'SoftRight' || e.key == 'Backspace' || e.key == 'F2') {
    document.body.removeChild(document.querySelector('#helpScreen'));
    main();
  }
  if (e.key == 'SoftLeft' || e.key == 'F1') {
    window.location.href = 'keybind.html';
  }
}


function machine(file) {
  app.innerHTML = '<br><canvas id="mainCanvas" width="256" height="224">Unsupported CANVAS</canvas>';
  app.style = 'background: black';
  header.style = 'background: #888';
  f1.style = 'background: #888';
  f2.style = 'background: #888';
  f3.style = 'background: #888';

  var canvas = document.getElementById('mainCanvas');
  var canvas_width = canvas.width;
  var canvas_height = canvas.height;
  var diameter = (parseInt)(window.innerHeight / canvas_height);
  canvas.style.width = canvas_width * diameter; //'100%';
  canvas.style.height = canvas_height * diameter;

  var nes = new NES(canvas);

  nes.initCanvas();

  window.onkeydown = function (e) { nes.handleKeyDown(e); };
  window.onkeyup = function (e) { nes.handleKeyUp(e); };



  var reader = new FileReader();
  reader.onload = function (e) {
    nes.Pause()

    if (!nes.SetRom(e.target.result)) {
      alert('Can\'t get rom data (perhaps you don\'t set ArrayBuffer arguments or it\'s not nes rom format)');
      return;
    }


    if (nes.Init())
      nes.Start();
  }
  reader.readAsArrayBuffer(file);
  romname = baseFileName(file.name);
  header.innerHTML = romname;
  f1.innerHTML = '';
  f2.innerHTML = '1.00x';
  f3.innerHTML = 'Back';

  document.body.removeEventListener('keydown', keydownlistview);
  document.body.addEventListener('keydown', keydownmachine);



  document.body.addEventListener('keydown', function (event) {
    switch (event.key) {
      case '3':
        nes.speedUp();
        speed += .1;
        f2.innerHTML = '<span style="color: yellow">' + speed.toFixed(2) + 'x</span>';
        break;
      case '1':
        nes.speedDown();
        speed -= .1;
        f2.innerHTML = '<span style="color: yellow">' + speed.toFixed(2) + 'x</span>';
        break;
      case '*':
        if (navigator.getDeviceStorages('sdcard')[0]) {
          var sdcard = navigator.getDeviceStorages('sdcard')[0];
          sdcard.delete('nes_emul/state_' + romname + '.data');
          var file = new Blob([JSON.stringify(nes.saveState())], { type: 'application/json' });
          var req = sdcard.addNamed(file, 'nes_emul/state_' + romname + '.data');
          req.onsuccess = function () {
            alert('State Saved Successfully.');
          }
          req.onerror = function () {
            alert(this.error);
          }
        } else {
          createTextFile('state_' + romname + '.data', nes.saveState());
        }
        break;
      case '#':
        if (navigator.getDeviceStorages('sdcard')[0]) {
          var sdcard = navigator.getDeviceStorages('sdcard')[0];
          var request = sdcard.get('nes_emul/state_' + romname + '.data');

          request.onsuccess = function () {
            var reader = new FileReader()
            reader.onload = function () {
              nes.loadState(JSON.parse(reader.result));
            }
            reader.readAsBinaryString(request.result);
          }
          request.onerror = function (e) {
            alert('No State Saved For This Rom');
          }

        }

        else {
          var e = document.createElement('input');
          e.type = 'file';
          e.addEventListener('change', function () {
            file = this.files[0];
            filename = this.files[0].name.replace('.data', '');
            var reader = new FileReader()
            reader.onload = function () {
              nes.loadState(JSON.parse(reader.result));
            }
            reader.readAsBinaryString(this.files[0]);
          });
          document.body.appendChild(e);
          e.click();
          document.body.removeChild(e);
        }
        break;
      case 'F1':
        openFullScreen(canvas);
        break;
      case 'SoftLeft':
        openFullScreen(canvas);
        break;
    }
  });
}


function keydownmachine(e) {
  if (e.key == 'F2' || e.key == 'SoftRight') { window.location.href = '/index.html'; }

}

function relasenote() {
  if (localStorage.getItem('viewrelesenote') == null) {
    document.body.style = 'background:#fff; padding:10px';
    document.body.innerHTML = '<b><center>- Relese -</center></b><br><font style="font-size: 12px"><b>Version <span id="version">1.0.0</span></b><br><br><small>* Added Game Emulation Speed Feature<br>* Fix State Save And Load</small></font><div style="width: 100%;text-align: center; font-weight: bold;background: #dedede; padding:5px 0px; margin-top:10px; position: fixed; left: 0px;bottom: 0px;">Ok</div>';
    document.addEventListener('keydown', function (e) {
      if (e.key == 'Enter') {
        localStorage.setItem('viewrelesenote', 'yes');
        if (window.confirm('Restart Required. Want To Continue ?')) { window.close(); }
      }
    });

    var xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
      var json = JSON.parse(this.responseText);
      var v = json.version;
      document.getElementById('version').innerHTML = v;
    }
    xhttp.open('GET', 'manifest.webapp', true);
    xhttp.send();
  } else { main(); }

}

try { relasenote(); } catch (e) { alert(e.message); }


document.addEventListener('DOMContentLoaded', () => { getKaiAd({ publisher: '080b82ab-b33a-4763-a498-50f464567e49', app: 'nes_emul', slot: 'nes_emul', onerror: err => console.error('Custom catch:', err), onready: ad => { ad.call('display'); } }); });

document.body.addEventListener('keyup', () => { getKaiAd({ publisher: '080b82ab-b33a-4763-a498-50f464567e49', app: 'nes_emul', slot: 'nes_emul', onerror: err => console.error('Custom catch:', err), onready: ad => { ad.call('display'); } }); });



document.body.addEventListener('click', function () {
  console.info('Width: ' + window.innerWidth + '\nHeight: ' + window.innerHeight);
});




