$(document).ready(function () {
    $('.button-collapse').sideNav();

    // define the modal
    $('#noteModal').modal({
    });

    // set up the onclick for the buttons for each note
    $('.noteButton').on('click', function (ret) 
    {

        // if we have a duplicate listener, stop it from listening
        ret.stopImmediatePropagation();

        // select button to work with
        var currentButton = $(this).attr('id');

        // call the populateNote function for the button
        populateNote(currentButton);

        // open the modal
        $('#noteModal').modal('open');

       ]
        $('#noteButton').on('click', function (ret) {
            ret.preventDefault();

            var noteText = $('#noteText');

                $.post("/note/" + currentButton, $('#noteForm').serialize())
                    .done(function (data) {
                        populateNote(currentButton);
                    })
                    .fail(function (error) {
                        console.log("Cannot Post", error);
                    });

            // empty the note
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

            // roll over the notes and populate them
            for (var i = 0; i < data.length; i++) 
            {
                var note = $(
                    '<li class="note collection-item">'
                    + '<p>'
                    + (i+1) + ': ' + data[i].noteText + '</p>'
                    + '<button class="individualNoteButton waves-effect waves-red btn-flat blue" data-currentButtonId="' + data[i]._id + '">Delete ' + '</button>'
                    + '</li>'
                );

                
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
                    .done(function (data) 
                    {

                        // close the modal 
                        $('#noteModal').modal('close');
                    })

                .fail(function () {
                    console.log("Cannot get notes");
                });

        
            });
        })

    }

})