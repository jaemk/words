$(document).ready(function() {
    var word;
    var results = {};
    function getWord() {
        $.ajax({
            url: 'http://jameskominick.com:8080/words/hangman/word',
            dataType: 'json',
        }).done(function(data) {
            word = data['word'];
            alert('word: '+word);
        });
    }

    function setBoard(word, item) {
        total = word.length;
        // put letter in correct spot
    }

    getWord();

    $('#user_in').keyup(function() {
        var user_in = $('#user_in').val();
        $('#user_in').val('');
        var letter = $.trim(user_in).toLowerCase();
        if (letter.length && !(letter[0] in results)) {
            regex  = new RegExp(letter[0]);
            if (word.match(regex)) {
                //setBoard(word, letter[0])
               $('#board tr').append('<td>'+letter[0]+'</td>'); 
            }
            $('#guesses').append('<li>'+letter[0]+'</li>');
            results[letter[0]] = letter[0];
        }
    });

});
