$(document).ready(function() {
    var results;
    var guesses;
    var word;
    var count;
    var MaxGuesses = 7;

    function updateBoard(letter) {
        if (!(letter === false)) {
            results[letter] = letter;
            updateCount();
        }

        $('#line').empty();
        for (i = 0; i < word.length; i++) {
            $('#board tr').append('<td>' + results[word[i]] + '</td>');
        }
    }

    function updateCount() {
        $('#caption').text('Guess Remaining: ' + count);
    }


    function checkStatus() {
        // Change input to a reset button if user won or lost
        win = true;
        if (count < 1) {
            alert('you lost');
            win = false;
        }
        else {
            for (i = 0; i < word.length; i++) {
                if (results[word[i]] == ' - ') {
                    win = false;
                    break;
                }
            }
        }
        if (win == true) {
            alert('you won!');
        }
    }


    function play() {
        alert('in play: ' + word);
    }
    
    function getNewWord() {
        $.ajax({
            url: 'http://jameskominick.com:8080/words/hangman/word',
            dataType: 'json',
        }).done(function(data) {
            setBoard(data, true);
        });
    }

    function setBoard(data, reset) {
        word = data['word'];
        alert('word: ' + word);
        if (reset === true) {
            results = {};
            guesses = {};
            count = MaxGuesses;
            for (i = 0; i < word.length; i++) {
                if (!(word[i] in results)) {
                    results[word[i]] = ' - ';
                }
            }
            updateBoard(false);
        }
        play();
    }

    getNewWord();
    
    $('#user_in').keyup(function() {
        user_in = $('#user_in').val();
        $('#user_in').val('');
        letter = $.trim(user_in).toLowerCase();
        if (letter.length && !(letter[0] in guesses)) {
            regex  = new RegExp(letter[0]);
            if (word.match(regex)) {
                updateBoard(letter[0]);
            }
            else {
                count = count - 1;
                updateCount();
            }

            
            $('#guesses').append('<li>'+letter[0]+'</li>');
            guesses[letter[0]] = letter[0];
            checkStatus();
        }
    });
});

