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

function addScrollEvent(newFunc) {
    var func = window.onscroll;
    if ( typeof func !== 'function' ) {
        window.onscroll = newFunc;
    } else {
        window.onscroll = function() {
            func();
            newFunc();
        };
    }
}


function celShowAnimation() {
    var comments = document.getElementsByClassName('comment');
    var osTop = document.documentElement.scrollTop || document.body.scrollTop;
    var clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    for ( var i=0; i<comments.length; i++ ) {
        if ( comments[i].className.search('cel-hide') !== -1 ) {
            if ( clientHeight + osTop > comments[i].offsetTop ) {
                comments[i].className = comments[i].className.replace('hide', 'show');
            }
        }
    }
}

addLoadEvent(celShowAnimation);
addScrollEvent(celShowAnimation);


function changeFontStyle(header, opacityDegree) {
    var osTop = document.documentElement.scrollTop || document.body.scrollTop;
    header.style.transform = 'scale(' + (1 + osTop / 1000) + ')';
    header.style.opacity = opacityDegree.toString();
}

function headerFontAnimation() {
    var header = document.getElementById('scaleHead');
    var osTop = document.documentElement.scrollTop || document.body.scrollTop;
    var opacityDegree = 1;

    switch(true) {
        case osTop === 0:
            changeFontStyle(header, opacityDegree);
            break;
        case osTop>0 && osTop<100:
            changeFontStyle(header, opacityDegree - 0.2);
            break;
        case osTop<200:
            changeFontStyle(header, opacityDegree - 0.3);
            break;
        case osTop<300:
            changeFontStyle(header, opacityDegree - 0.4);
            break;
        case osTop<400:
            changeFontStyle(header, opacityDegree - 0.5);
            break;
        case osTop<500:
            changeFontStyle(header, opacityDegree - 0.6);
            break;
        case osTop<600:
            changeFontStyle(header, opacityDegree - 0.7);
            break;
        default:
            changeFontStyle(header, opacityDegree - 0.8);
            break;
    }
}

addLoadEvent(headerFontAnimation);
addScrollEvent(headerFontAnimation);


function getStrLen(str) {
    return str.replace(/[^\x00-\xff]/g, 'xx').length;
}

function formSubmit(nameIndication, commentIndication) {
    var form = document.forms[0];
    var formElements = form.elements;
    form.onsubmit = function() {
        var re = /\w\u4e00-\u9fa5/g;

        var name = formElements.name;
        if ( name.value === '' ) {
            nameIndication.innerHTML = '不能为空';
            nameIndication.style.visibility = 'visible';
            nameIndication.style.color = 'red';

            return false;
        } else if ( !re.test(name.value) ) {
            nameIndication.innerHTML = '含有非法字符';
            nameIndication.style.visibility = 'visible';
            nameIndication.style.color = 'red';

            return false;
        }

        var comment = formElements.comment;
        if (comment.value === '' ) {
            commentIndication.innerHTML = '说两句吧，亲';
            commentIndication.style.visibility = 'visible';
            commentIndication.style.color = 'red';

            return false;
        } else if ( getStrLen(comment.value) > 250 ) {
            commentIndication.innerHTML = '超过250个字符';
            commentIndication.style.visibility = 'visible';
            commentIndication.style.color = 'red';

            return false;
        }
        
        return true;
    };
}

function nameInteraction(element, nameIndication, nameCnt) {
    element.onfocus = function() { 
        nameIndication.innerHTML = '请输入汉字、字母、数字、下划线';
        nameIndication.style.visibility = 'visible';
        nameIndication.style.color = 'grey';
    };

    element.onkeyup = function() {
        var nameLength = getStrLen(this.value);
        
        if ( nameLength > 0 ) {
            nameCnt.innerHTML = nameLength + '个字符(汉字算两个字符)';
            nameCnt.style.visibility = 'visible';
        } else {
            nameCnt.style.visibility = 'hidden';
        }
    };

    element.onblur = function() {
        var re = /[^\w\u4e00-\u9fa5]/g;
        if ( re.test(this.value) ) {
            nameIndication.innerHTML = '含有非法字符';
            nameIndication.style.color = 'red';
        } else if ( this.value === '' ) {
            nameIndication.innerHTML = '不能为空';
            nameIndication.style.color = 'red';
        } else {
            nameIndication.innerHTML = 'OK!';
            nameIndication.style.color = 'green';
        }
    };
}

function commentInteraction(element, commentIndication, commentCnt) {
    element.onfocus = function() {
        commentIndication.innerHTML = '请输入不超过250个字符，汉字算两个字符';
        commentIndication.style.visibility = 'visible';
        commentIndication.style.color = 'grey';
    };
    
    element.onkeyup = function() {
        var commentLength = getStrLen(this.value);

        if ( commentLength > 0 ) {
            commentCnt.innerHTML = commentLength + '个字符(汉字算两个字符)';
            commentCnt.style.visibility = 'visible';
        } else {
            commentCnt.style.visibility = 'hidden';
        }
    };

    element.onblur = function() {
        var commentLength = getStrLen(this.value);

        if ( commentLength > 250 ) {
            commentIndication.innerHTML = '超过250个字符';
            commentIndication.style.color = 'red';
        } else if ( this.value === '' ) {
            commentIndication.innerHTML = '说两句吧，亲';
            commentIndication.style.color = 'red';
        } else {
            commentIndication.innerHTML = 'OK!';
            commentIndication.style.color = 'green';
        }
    };
}

function formInteraction() {
    var nameIndication = document.getElementById('nameIndication');
    var nameCnt = document.getElementById('nameCnt');
    var commentIndication = document.getElementById('commentIndication');
    var commentCnt = document.getElementById('commentCnt');
    var formElements = document.forms[0].elements;

    nameInteraction(formElements.name, nameIndication, nameCnt);
    commentInteraction(formElements.comment, commentIndication, commentCnt);

    formSubmit(nameIndication, commentIndication);

}

addLoadEvent(formInteraction);
