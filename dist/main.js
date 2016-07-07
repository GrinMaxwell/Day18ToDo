var userName = 'Christian';

var headerHeight = $('header').height();
var sidebarHeight = $(window).height() - headerHeight;

var itemHTML = '<li class="list-item"><input type="checkbox" class="checkbox"/><p class="to-do-text"></p><span class="times"> (Added <time class="added"></time></span>) <button type="delete"><i class="fa fa-trash-o fa-inverse"></i></button></li>';
var completedHTML = '<span class="completion">, Completed <time class="completed"></time></span>';

var incomplete = 0;
var complete = 0;
var total = 0;

function getRender(response) {
    response.forEach(function(listPost, i, arr) {

        response[i].data.forEach(function(listItem) {

            var $item = $(itemHTML);
            $item.children('p').text(listItem.toDoText);
            $item.find('.added').text(listItem.toDoAdded);
            $item.attr('data-id', response[i]._id);

            if (listItem.toDoCompleted) {
                $item.children('.times').append(completedHTML);
                $item.find('.completed').text(listItem.toDoCompleted);
                $item.children('input').attr('checked', true);
                complete++;
                $('.comp-num').text(complete);

            } else {
                incomplete++;
                $('.inc-num').text(incomplete);
            }

            total = complete + incomplete;
            $('.all-num').text(total);

            $('.to-do-list').append($item);

            $item.find('button').on('click', outWithIt);
            $item.find('input').on('change', checkboxListener);
        });

    });

} //end of success function

function outWithIt(evt) {
    var target = evt.target;
    var targetParent = $(target).parent();
    var html = targetParent[0].innerHTML.split(' ');
    var $outside;
    if (html[0] === '<i') {
        $outside = $(targetParent).parent();
    } else {
        $outside = $(targetParent);
    }
    var specificID = String($outside.attr('data-id'));
    var specificURL = 'http://tiny-za-server.herokuapp.com/collections/jcsjday18todolist/' + specificID;
    $.ajax({
        url: specificURL,
        dataType: 'json',
        type: 'DELETE',
        success: function() {
            $outside.remove();
        },
    });
} //end of outWithIt

function goGetIt() {
    $('ul').empty();
    incomplete = 0;
    complete = 0;
    $.ajax({
        url: 'http://tiny-za-server.herokuapp.com/collections/jcsjday18todolist',
        dataType: 'json',
        type: 'GET',
        success: getRender,
    });
}

// checkbox event listener
function checkboxListener() {
    var $item = $(this).parent();
    var $toDo = $item.children('p').text();
    var $added = $item.find('.added').text();
    var timestamp = new Date;

    $item.children('.times').append(completedHTML);
    $item.find('.completed').text(timestamp);

    var specificURL = 'http://tiny-za-server.herokuapp.com/collections/jcsjday18todolist/' + $item.attr('data-id');


    if ($(this).is(':checked')) {
        $.ajax({
            url: specificURL,
            dataType: 'json',
            contentType: 'application/json',
            type: 'PUT',
            success: function() {
                incomplete--;
                complete++;
                $('.comp-num').text(complete);
                $('.inc-num').text(incomplete);
            },
            data: JSON.stringify({
                data: [{
                    "toDoText": $toDo,
                    "toDoCompleted": timestamp,
                    "toDoAdded": $added
                }]
            })
        });

    } else {

        $item.find('.completion').empty();

        $.ajax({
            url: specificURL,
            dataType: 'json',
            contentType: 'application/json',
            type: 'PUT',
            success: function() {
                incomplete++;
                complete--;
                $('.comp-num').text(complete);
                $('.inc-num').text(incomplete);
            },
            data: JSON.stringify({
                data: [{
                    "toDoText": $toDo,
                    "toDoCompleted": false,
                    "toDoAdded": timestamp
                }]
            })
        });

    }
}


$(document).ready(function() {


$('h1').prepend(userName);


$('aside').height(sidebarHeight);
$(window).resize(function() {
    sidebarHeight = $(window).height() - headerHeight;
    $('aside').height(sidebarHeight);
});


$.ajax({
    url: 'http://tiny-za-server.herokuapp.com/collections/jcsjday18todolist',
    dataType: 'json',
    type: 'GET',
    success: getRender,
});

$('html').on('keyup', function(evt) {
    var newItem = $('.new-item').val();
    if (evt.keyCode === 13 && newItem) {
        var timestamp = new Date;
        $.ajax({
            url: 'http://tiny-za-server.herokuapp.com/collections/jcsjday18todolist',
            dataType: 'json',
            contentType: 'application/json',
            type: 'POST',
            success: goGetIt,
            data: JSON.stringify({
                data: [{
                    "toDoText": newItem,
                    "toDoCompleted": false,
                    "toDoAdded": timestamp
                }]
            })
        });
    }

});


window.onhashchange = function(hash) {

    var $target = hash.newURL.split('#');
    var $filterTerm = $target[1];

    var $todos = $('li');
    console.log($todos);
    var $searchedFor;
    var $notSearchedFor;

    if ($filterTerm === 'incomplete') {

      $todos.forEach(function(line, i) {
        console.log($todos[i]);
        if ($todos[i]) {

        }
      });
        // $notSearchedFor = $todos.filter(function(line,i) {
        //     return ($(line).children('input').attr('checked') === true);
        // });
        // $notSearchedFor.addClass('hide');
        //
        // $searchedFor = $todos.filter(function(line) {
        //     return ($(line).children('input').attr('checked') === false);
        // });
        // $searchedFor.removeClass('hide');

    } else if ($filterTerm === 'complete') {

        // $notSearchedFor = $todos.filter(function(line) {
        //     return ($(line).children('input').attr('checked') === false);
        // });
        // $notSearchedFor.addClass('hide');
        //
        // $searchedFor = $todos.filter(function(line) {
        //     return ($(line).children('input').attr('checked') === true);
        // });
        // $searchedFor.removeClass('hide');

    } else if ($filterTerm === 'all') {
        $todos.removeClass('hide');
    }
};


}); //end of docready
