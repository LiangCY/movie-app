$(function () {

    var tidInput = $('#toId'),
        cidInput = $('#commnetId');

    $('.comment').on('click', function (e) {
        var target = $(this);
        var toId = target.data('tid');
        var commentId = target.data('cid');


        if (tidInput.length > 0) {
            tidInput.val(toId);
        } else {
            $('<input>').attr({
                type: 'hidden',
                id: 'toId',
                name: 'comment[tid]',
                value: toId
            }).appendTo('#commentForm');
        }

        if (cidInput.length > 0) {
            cidInput.val(commentId);
        } else {
            $('<input>').attr({
                type: 'hidden',
                id: 'commentId',
                name: 'comment[cid]',
                value: commentId
            }).appendTo('#commentForm');
        }
    });
});