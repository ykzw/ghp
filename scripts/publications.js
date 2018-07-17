function toggle(cj, bc, bc_hover) {
    var swtch = $('span.' + cj);
    var state = swtch.attr('state');
    var fc, disp;
    if (state == 'on') {
        swtch.attr('state', 'off');
        bc_hover = '#3f3f3f';
        bc = '#0f0f0f';
        fc = '#fff';
        disp = 'none';
    } else {
        swtch.attr('state', 'on');
        fc = '#000';
        disp = '';
    }
    swtch.css({
        'background-color': bc_hover,
        'color': fc
    });
    swtch.hover(
        function() {
            $(this).css('background', bc_hover);
        },
        function() {
            $(this).css('background', bc);
        }
    );

    $('li.' + cj).each(function() {
        $(this).css('display', disp);
    });

    search($('li.' + cj));
}

function toggle_j() {
    toggle('J', '#fffaff', '#ffeaff');
}

function toggle_c() {
    toggle('C', '#faffff', '#eaffff');
}


function search(lis) {
    if (!lis) {
        var ol = document.getElementById('thelist');
        lis = ol.getElementsByTagName('li');
    }

    // Clear highlights
    for (var i = 0; i < lis.length; i++) {
        lis[i].innerHTML = lis[i].innerHTML.replace(/<\/?span[^>]*>/g, '');
    }
    
    var input = document.getElementById('search_form');
    var filter = new RegExp(input.value, 'gi');
    for (i = 0; i < lis.length; i++) {
        var text = lis[i].innerText || lis[i].textContent;  // Without html elements
        var index = text.search(filter);
        if (index >= 0 && $('span.' + lis[i].className).attr('state') == 'on') {
            if (input.value.length >= 2) {
                lis[i].innerHTML = highlight(lis[i].innerHTML, filter);
            }
            lis[i].style.display = '';
        } else {
            lis[i].style.display = 'none';
        }
    }
}


function highlight(html, filter) {
    html = html.replace(/&amp;/g, '&');
    return html.replace(filter, function(match, offset) {
        var beg = html.indexOf('<', offset);
        var end = html.indexOf('>', offset);
        if (end <= beg) {
            // innerHTML has a form of "... < ... 'match' ... > ... <";
            // i.e., the match is inside a html tag, so do not highlight it.
            return match;
        } else {
            // innerHTML has a form of "... 'match' ... < ... > ..."
            return '<span class="highlight">' + match + '</span>';
        }
    }).replace(/&/g, '&amp;');
}