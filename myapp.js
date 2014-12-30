if (Meteor.isClient) {
    Template.story.events({
        'click .story': function(event, template) {
            var id = $(event.target).attr('data-id')
            Router.go('/story/' + id);
        }
    });

    Template.modal.events({
        'click #createModal .save': function(event, template) {
            var title = $('.modal-content .title').val();
            Stories.insert({
                title: title,
                createdOn: new Date(),
                paragraphs: []
            });
            $('#createModal').modal('hide');
        },
        'click #deleteModal .yes': function(event, template) {
            Stories.remove({
                _id: template.data._id
            });
            $('#deleteModal').modal('hide');
        },
    });

    Template.content.events({
        'click #submit': function(event, template) {
            var text = $('#text').val();
            text = text.charAt(text.length - 1) == '.' ? text : text + '.';

            var story = Stories.findOne({
                _id: template.data._id
            });

            if (!story.paragraphs) {
                story.paragraphs = [];
            }

            story.paragraphs.push({
                content: text,
                createdOn: new Date()
            });

            Stories.update({
                _id: template.data._id
            }, story);

            $('#text').val('');
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