Template.modal.events({
    'click #createModal .save': function (event, template) {
        var title = $(' #createModal .modal-content .title').val();
        Stories.insert({
            title: title,
            createdOn: new Date(),
            paragraphs: []
        });
        $('#createModal').modal('hide');
        var savebtn = $(' #createModal .modal-content .save');
        savebtn.attr('disabled', true); //add disable state to the save button
        $(' #createModal .modal-content .title').val(''); //set input to blank   
    },
    'click #deleteModal .yes': function (event, template) {
        Stories.remove({
            _id: template.data._id
        });
        $('#deleteModal').modal('hide');
    },
    'keyup #createModal .title': function (event, template) {
        var title = $(' #createModal .modal-content .title').val(),
            savebtn = $(' #createModal .modal-content .save');
        if (title.length > 0) {
            savebtn.removeAttr('disabled');
        } else {
            savebtn.attr('disabled', true);
        }
    },
    'click #logoutModal .yes': function (event, template) {
        Meteor.logout(function (err) {
            if (err) {
                console.log(err);
            }
        });
    }
});
