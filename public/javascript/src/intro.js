/* jshint browser:true,devel:true */

function addLoadEvent(newFunc) {
    var func = window.onload;
    
    if ( typeof func !== 'function' ) {
        window.onload = newFunc;
    } else {
        window.onload = function() {
            func();
            newFunc();
        };
    }
}

function menuShow() {
    var open = false;
    var menu = document.getElementById('menu');
    var menuToggle = document.getElementById('menu-toggle');

    menuToggle.onclick = function() {
        open = !open;
        if ( open ) {
            menu.style.display = 'block';
        } else {
            menu.style.display = 'none';
        }
    };
}

addLoadEvent(menuShow);
