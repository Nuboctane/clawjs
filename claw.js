// author: @nuboctane
// version: 1.0
// license: None

// key codes to whenever key labels are rendered
let avaible = [113, 119, 101, 114, 116, 121, 117, 105, 111, 112, 108, 107, 106, 102, 100, 115, 97, 122, 120, 99, 118, 98, 110, 109, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57];
let occupied = [];
let made = false;
let held = [];
let timeouttime = 500; // time in ms to wait before re-rendering the key labels, *0.5 for scroll and wheel events

// style for the labels
let style = document.createElement('style');
style.innerHTML = `
.clawgrip {
    position: static !important;
    z-index: 999999999999999999 !important;
    pointer-events: none !important;
}

.claw {
    z-index: 999999999999999999 !important;
    outline: 2px solid rgb(2, 20, 183) !important;
    color: #ffffff00 !important;
    overflow: hidden !important;
    position: absolute !important;
    pointer-events: none !important;
}

.shortcut_key {
    outline: 2px solid rgb(2, 20, 183) !important;
    background-color: rgba(0, 20, 197, 0.562) !important;
    font-family: Arial, Helvetica, sans-serif !important;
    color: rgb(0, 251, 255) !important;
    overflow: visible !important;
    padding: 1px !important;
    font-size: 100% !important;
    float: left !important;
    text-align: center !important;
    -webkit-touch-callout: none !important;
    -webkit-user-select: none !important;
    -khtml-user-select: none !important;
    -moz-user-select: none !important;
    -ms-user-select: none !important;
    user-select: none !important;
    pointer-events: none !important;
}`;

document.body.appendChild(style);

console.log('loaded claw.js');

function isInFrame(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.body.clientHeight) &&
        rect.right <= (window.innerWidth || document.body.clientWidth)
    );
}

function getOffsetLeft(elem) {
    let offsetLeft = 0;
    do {
        if (!isNaN(elem.offsetLeft)) {
            offsetLeft += elem.offsetLeft;
        }
    } while (elem = elem.offsetParent);
    return offsetLeft;
}

function getOffsetTop(elem) {
    let offsetTop = 0;
    do {
        if (!isNaN(elem.offsetTop)) {
            offsetTop += elem.offsetTop;
        }
    } while (elem = elem.offsetParent);
    return offsetTop;
}

function make(what) {
    let claw_find = [];
    let alltags = document.querySelectorAll('button, input, textarea, select, a, submit, close, submit , open , click, onclick, on_click');
    let allclasses = document.getElementsByClassName('submit, open, close, click, onclick, on_click');

    if (what == 'all') {
        claw_find = [alltags];
    } else {
        let setw = document.getElementsByClassName(what);
        claw_find = [setw];
    }

    for (let cw = 0; cw < claw_find.length; cw++) {
        console.log(claw_find.length);
        for (let i = 0; i < claw_find[cw].length; i++) {
            if (isInFrame(claw_find[cw][i]) == true) {
                let assigned_keys = [];
                for (let b = 0; b < avaible.length; b++) {
                    if (avaible.length == occupied.length) {
                        occupied = [];
                    }
                    if (!occupied.includes(avaible[b])) {
                        occupied.push(avaible[b]);
                        assigned_keys.push(avaible[b]);
                        break;
                    }
                }

                let claw = document.createElement('span');
                let claw_content = document.createElement('span');

                claw.classList.add("claw");
                claw_content.classList.add("shortcut_key");
                claw.appendChild(claw_content);
                for (let k = 0; k < assigned_keys.length; k++) {
                    claw_content.innerText += String.fromCharCode(assigned_keys[k]).toUpperCase();
                }

                let pos = claw_find[cw][i].getBoundingClientRect();
                claw.style.width = pos.width + "px";
                claw.style.height = pos.height + "px";
                claw.style.left = pos.left + window.scrollX + "px";
                claw.style.top = pos.top + window.scrollY + "px";
                if (claw_find[cw][i].parentElement) {
                    if (claw_find[cw][i].parentElement.style.overflow == "scroll") {
                        claw.style.left = getOffsetLeft(claw_find[cw][i]) + "px";
                        claw.style.top = getOffsetTop(claw_find[cw][i]) + "px";
                    }
                }
                document.body.appendChild(claw);
                for (let o = 0; o < assigned_keys.length; o++) {
                    claw_find[cw][i].classList.add('clawed_with_key_' + String.fromCharCode(assigned_keys[o]).toUpperCase());
                }
            }
        }
    }
}

function hide(what) {
    let claws = document.getElementsByClassName('claw');
    if (what == 'all') {
        occupied = [];
        for (let b = 0; b < claws.length; b++) {
            claws[b].remove();
            b--;
        }
        let infected = document.querySelectorAll('button, input, textarea, select, a');
        for (let b = 0; b < avaible.length; b++) {
            for (let c = 0; c < infected.length; c++) {
                infected[c].classList.remove('clawed_with_key_' + String.fromCharCode(avaible[b]).toUpperCase());
            }
        }
    } else {
        for (let b = 0; b < claws.length; b++) {
            if (!claws[b].innerText.includes(String.fromCharCode(what).toUpperCase())) {
                claws[b].remove();
                b--;
            }
        }
    }
}

document.onkeypress = async function(e) {
    e = e || window.event;
    console.log(e.keyCode);
    if (!held.includes(e.keyCode)) {
        held.push(e.keyCode);
    }
    // note that G and H key codes are not included in the avaible array on top of the script
    // when G and H keys are pressed simultaneously, feel free to edit:
    if (held.includes(103) && held.includes(104)) {
        if (made == false) {
            make('all');
            held = [];
            made = true;
        } else if (made == true) {
            hide('all');
            made = false;
            let clwed = document.getElementsByClassName('claw_this_one');
            for (let cl = 0; cl < clwed.length; cl++) {
                clwed[cl].classList.remove('claw_this_one');
            }
        }
    } else {
        if (made == false) {
            return
        }
        let key = String.fromCharCode(e.keyCode).toUpperCase();
        let clawed = document.getElementsByClassName('clawed_with_key_' + key);
        if (clawed.length > 0) {
            if (clawed.length == 1) {
                clawed[0].focus();
                clawed[0].click();
                let clwed = document.getElementsByClassName('claw_this_one');
                for (let cl = 0; cl < clwed.length; cl++) {
                    clwed[cl].classList.remove('claw_this_one');
                }
                if (!clawed[0] instanceof HTMLInputElement) {
                    await new Promise(r => setTimeout(r, timeouttime));
                    that();
                } else {
                    hide('all');
                    made = false;
                }
            } else if (clawed.length > 1) {
                let infected = document.querySelectorAll('button, input, textarea, select, a');
                let broken = false;
                for (let a = 0; a < avaible.length; a++) {
                    if (broken == false) {
                        for (let c = 0; c < infected.length; c++) {
                            if (avaible[a] != e.keyCode) {
                                for (let k = 0; k < clawed.length; k++) {
                                    clawed[k].classList.add('claw_this_one');
                                }
                                hide('all');
                                made = false;
                                make('claw_this_one');
                                made = true;
                                broken = true
                                break;
                            }
                        }
                    } else {
                        break
                    }
                }
            }
        }
    }
};

function that() {
    if (made == false) {
        return
    }
    hide("all");
    make('all');
}
window.onresize = function(event) {
    that();
};

window.addEventListener("wheel", async function() {
    await new Promise(r => setTimeout(r, timeouttime / 2));
    that();
});

window.addEventListener("scroll", async function() {
    await new Promise(r => setTimeout(r, timeouttime / 2));
    that();
});

document.addEventListener("click", async function() {
    await new Promise(r => setTimeout(r, timeouttime));
    that();
});

document.onkeyup = function(e) {
    e = e || window.event;
    held = [];
}