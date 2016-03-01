$(document).ready(function() {
    var results; // object holding state of each letter
    var guesses; // object holding each letter guessed
    var word;    // word to guess
    var def_word;// word object for getting hints
    var count;   // number of incorrect guesses so far
    var MaxGuesses = 7; // max number of incorrect guesses


    function getDef(query) {
        if (query == false) {
            wordText = word;
        }
        else {
            wordText = query;
        }

        $.ajax({
            url: 'http://jameskominick.com:8080/words/hangman/definition/'+wordText+'/',
            dataType: 'json',
        }).done(function(data) {
            //alert(query+': '+data['definition']);
            showDef(data);
        });
    }

    function showDef(data) {
        def = data['definition'];
        if (def == null && def_word.substr(-1) === 's') {
            def_word = def_word.slice(0, -1);
            getDef(def_word);
        }
        else {
            if (def == null){
                $('#help').empty();
                $('#help').text('Sorry, no hint found...');
            }
            else {
                $('#help').empty();
                $('#help').text(def);
            }
        }
    }

    function updateBoard(letter) {
        // update the board with correct letters guessed
        if (letter != false) {
            // update result object
            results[letter] = letter;
            updateCount();
        }
        // clear and redraw word line
        $('#line').empty();
        for (i = 0; i < word.length; i++) {
            $('#board tr').append('<td>' + results[word[i]] + '</td>');
        }
        $('#user_in').focus();
    }

    function updateCount() {
        $('#caption').text('Guess Remaining: ' + count);
    }

    function resetButton(win) {
        /* after win or loss, show message
           and reset button */
        if (win == true) {
            $('#message').text('You Won!');
        }
        else {
            $('#message').text('You Lost! :(');
            for (i=0; i<word.length; i++) {
                results[word[i]] = word[i];
            }
            updateBoard(word[i]);
        }
        $('#user_in').hide();
        $('#message').show('slow');
        $('#reset_button').show('slow');
        $('#reset_button').focus();
    }


    function checkStatus() {
        /* Check status of each letter in results
           object and change input to a reset 
           button if user won or lost */
        win = true;
        if (count < 1) {
            resetButton(false);
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
            resetButton(true);
        }
    }

    function play() {
        alert('in play: ' + word);
    }
    
    function getNewWord() {
        // hide fields and query server for new word
        $('#user_in').show();
        $('#reset_button').hide();
        $('#message').hide();
        $.ajax({
            url: 'http://jameskominick.com:8080/words/hangman/word',
            dataType: 'json',
        }).done(function(data) {
            setBoard(data);
        });
    }

    function setBoard(data) {
        // 
        word = data['word'];
        def_word = data['word'];

        results = {};
        guesses = {};
        count = MaxGuesses;
        for (i = 0; i < word.length; i++) {
            if (!(word[i] in results)) {
                results[word[i]] = ' - ';
            }
        }
        updateBoard(false);
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

    $('#reset_button').click(function() {
        location.reload(true);
    });

    $('#hint').click(function() {
        getDef(false);
        $('#user_in').focus();
    });
});

