$(document).ready(function () 
{
    $('.button-collapse').sideNav();

    // define the modal
    $('#noteModal').modal({
    });

    // onclick for the buttons for each note
    $('.noteButton').on('click', function (noteRet) 
    {

        // if we have a duplicate listener, stop it from listening
        noteRet.stopImmediatePropagation();

        // select button to work with
        var currentButton = $(this).attr('id');

        // call the populateNote function for the button
        populateNote(currentButton);

        // open the modal
        $('#noteModal').modal('open');

        // set up response of clicking the notebutton
        $('#noteButton').on('click', function (noteRet) {
            noteRet.preventDefault();

            // define the text we'll be saving
            var noteText = $('#noteText');

                $.post("/note/" + currentButton, $('#noteForm').serialize())
                    .done(function (data) {
                        populateNote(currentButton);
                    })
                    .fail(function (error) {
                        console.log("Cannot", error);
                    });

            // empty out the note
            noteText.val('');

            return false;
        });
    });

    // function to read in notes
    function populateNote(id) 
    {

        // first empty the div
        $('.messages').empty();

        // read in the note
        $.get("/note/" + id, function (data) 
        {

            // populate notes them
            for (var i = 0; i < data.length; i++) 
            {
                var note = $(
                    '<li class="note collection-item">'
                    + '<p>'
                    + (i+1) + ': ' + data[i].noteText + '</p>'
                    + '<button class="individualNoteButton waves-effect waves-red btn-flat blue" data-currentButtonId="' + data[i]._id + '">Delete ' + (i+1) + '</button>'
                    + '</li>'
                );

                // append the note to the div
                $('.messages').append(note);
            }

        })
        .then(function() 
        {

            // make a listener for deleting the notes
            $(".individualNoteButton").on("click", function() 
            {

                var currentButtonId = $(this).data(currentButtonId);

           
                $.post("/deleteNote/" + currentButtonId.currentbuttonid, $('#noteForm').serialize())
                    .done(function (data) {

                        // after deleting the note, close the modal
                        $('#noteModal').modal('close');
                    })

                .fail(function () {
                    console.log("Cannot get notes");
                });

        
            });
        })

    }

})