if (Meteor.isClient) {
    Template.story.events({
        'click .story': function(event, template) {
            var id = $(event.target).attr('data-id')
            Router.go('/story/' + id);
        }
    });

    Template.modal.events({
        'click #createModal .save': function(event, template) {
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
        'click #deleteModal .yes': function(event, template) {
            Stories.remove({
                _id: template.data._id
            });
            $('#deleteModal').modal('hide');
        },
        'keyup #createModal .title': function(event, template) {
            var title = $(' #createModal .modal-content .title').val(),
                savebtn = $(' #createModal .modal-content .save');

            if (title.length > 0) {
                savebtn.removeAttr('disabled');
            } else {
                savebtn.attr('disabled', true);
            }
        }
    });

    Template.content.events({
        'click #submit': function(event, template) {
            var text = $('.bottom .new-para #text').val(),
                savebtn = $('.bottom .new-para #submit');

            text = text.charAt(text.length - 1) == '.' ? text : text + '.'; //concat the text

            var story = Stories.findOne({
                _id: template.data._id
            });

            if (!story.paragraphs) {
                story.paragraphs = [];
            }

            story.paragraphs.push({ //add new text
                content: text,
                createdOn: new Date()
            });

            Stories.update({ //update the story
                _id: template.data._id
            }, story);

            $('.bottom .new-para #text').val('');
            savebtn.attr('disabled', true);
        },
        'keyup .bottom .new-para #text': function(event, template) {
            var title = $('.bottom .new-para #text').val(),
                savebtn = $('.bottom .new-para #submit');

            if (title.length > 0) {
                savebtn.removeAttr('disabled');
            } else {
                savebtn.attr('disabled', true);
            }
        }
    });

    Router.route('/', function() { //home page route
        this.render('story', {
            to: 'aside',
            data: function() {
                return {
                    stories: function() {
                        return Stories.find();
                    }
                }
            }
        });

        this.render('modal', {
            to: 'bottom'
        });
    });

    Router.route('/story/:_id', function() { //story content route
        var story = Stories.findOne({
            _id: this.params._id
        });

        this.render('story', {
            to: 'aside',
            data: function() {
                return {
                    stories: function() {
                        return Stories.find();
                    }
                }
            }
        });

        this.render('content', {
            data: function() {
                return story;
            }
        });

        this.render('modal', {
            data: function() {
                return story;
            },
            to: 'bottom'
        });
    });

    Router.configure({ //config layout default for all page
        layoutTemplate: 'ApplicationLayout'
    });
}

if (Meteor.isServer) {
    Meteor.startup(function() {
        // code to run on server at startup
    });
}

Paragraphs = new Mongo.Collection("paragraph");
Stories = new Mongo.Collection("story");
