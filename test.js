function inputSupportsType(type) {
    if ( !document.createElement ) {
        return false;
    }
    var input = document.createElement('input');
    input.setAttribute('type', type);
    if ( input.type === 'text' && type !== 'text' ) {
        return false;
    }
    return true;
}


function elementSupportsAttribute(elementName, attribute) {
    if ( !document.createElement ) {
        return false;
    }
    var element = document.createElement(elementName);
    return (attribute in element);
}


if ( !Modernizr.input.placeholder ) {
    var input = document.getElementById('first-name');
    var text = input.placeholder || input.getAttribute('placeholder');
    input.onfocus = function() {
        if ( this.value === text ) {
            this.value = '';
        }
    };
    input.onblur = function() {
        if ( this.value === '' ) {
            this.value = text;
        }
    };
    input.onblur();
}


function focusLabels() {
    if ( !document.getElementsByTagName ) {
        return false;
    }
    var id;
    var labels = document.getElementsByTagName('label');
    for ( var i=0; i<labels.length; i++ ) {
        id = labels[i].getAttribute('for');
        if ( id ) {
            (function(id) {
                labels[i].onclick = function() {
                    var element = document.getElementById(id);
                    if ( !element ) {
                        return false;
                    }
                    element.focus();
                };
            })(id);
        }
    }
}


function resetField(whichform) {
    var element;
    var placeholder;

    if ( !Modernizr.input.placeholder ) {
        for ( var i=0, length=whichform.elements.length; i<length; i++ ) {
            element = whichform.elements[i];
            if ( element.type !== 'submit' ) {
                placeholder = element.placeholder || element.getAttribute('placeholder');
                if ( placeholer ) {
                    (function(placeholder) {
                        element.onfocus = function() {
                            if ( this.value === placeholder ) {
                                this.className = '';
                                this.value = '';
                            }
                        };
                        element.onblur = function() {
                            if ( this.value === '' ) {
                                this.className = 'placeholder';
                                this.value = placeholder;
                            }
                        };
                        element.onblur();
                    })(placeholder);
                }
            }
        }
    }
}

function prepareForms() {
    for ( var i=0, length=document.forms.length; i<length; i++ ) {
        resetField(document.forms[i]);
    }
}

JavaScript DOM 编程艺术（2th) 表单学习总结
function isFilled(field) {
    if ( field.value.replace(' ', '').length === 0 ) {
        return false;
    }
    var placeholder = field.placeholder || field.getAttribute('placeholder');
    return (field.value !== placeholder);
}


function isEmail(field) {
    return (field.value.indexOf('@') !== -1 && field.value.indexOf('.') !== -1);
}


function validateForm(whichform) {
    var element;
    for ( var i=0, length=whichform.elements.length; i<length; i++ ) {
        element = whichform.elements[i];
        if ( element.required ) {
            if ( !isFilled(element) ) {
                alert('Please fill in the ' + element.name + ' field.');
                return false;
            }
        }
        if ( element.type === 'email' ) {
            if ( !isEmail(element) ) {
                alert('The ' + element.name + ' field must be filled with a valid email address.');
                return false;
            }
        }
    }
    return true;
}


function prepareForms() {
    var thisform;

    for ( var i=0, length=document.forms.length; i<length; i++ ) {
        thisform = document.forms[i];
        resetField(thisform);
        thisform.onsubmit = function() {JavaScript DOM 编程艺术（2th) 表单学习总结
            return validateForm(thisform);
        };
    }
}


function getXMLObject() {
    if ( typeof XMLHttpRequest === 'undefined' ) {
        try {
            return new ActiveXObject('Microsoft.XMLHTTP');
        } catch(error) {
        }
    }
    return new XMLHttpRequest();
}

function displayAjaxLoading(element) {
    while ( element.hasChildNodes() ) {
        element.removeChild(element.lastChild);
    }

    var img = document.createElement('img');
    img.setAttribute('src', 'images/loading.gif');
    img.setAttribute('alt', 'loading...');
    element.appendChild(img);
}


function submitFormWithAjax(whichform, thetarget) {
    var xhr = getXMLObject();
    if ( !xhr ) {
        return false;
    }
    displayAjaxLoading(thetarget);
    var dataParts = [];
    var element;
    for ( var i=0, len=whichform.elements.length; i<len; i++ ) {
        element = whichform.elements[i];
        dataParts[i] = element.name + '=' + encodeURIComponent(element.value);
    }
    var data = dataParts.join('&');
    xhr.onreadystatechange = function() {
        if ( xhr.readyState === 4 ) {
            if ( xhr.status === 200 ) {
                var matches = xhr.responseText.match(/<article>([\s\S]+)<\/article>/);
                if ( matches.length > 0 ) {
                    thetarget.innerHTML = matches[1];
                } else {
                    thetarget.innerHTML = '<p>Oops, there was an error. Sorry.</p>';
                }
            } else {
                thetarget.innerHTML = '<p>' + xhr.status + '</p>';
            }
        }
    };
    xhr.open('POST', whichform.getAttribute('action'), true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(data);
    return true;
}


function prepareForms() {
    var thisform;
    var article = document.getElementsByTagName('article')[0];
    for ( var i=0, len=document.forms.length; i<len; i++ ) {
        thisform = document.forms[i];
        resetField(thisform);
        thisform.onsubmit = function() {
            if ( !validateForm(this) ) {
                return false;
            }
            if ( submitFormWithAjax(this, article) ) {
                return false;
            }
            return true;
        };
    }
}
