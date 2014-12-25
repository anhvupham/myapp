if (Meteor.isClient) {
    Template.content.helpers({
        paragraphs: function() {
            return Paragraphs.find({});
        }
    });

    Template.story.helpers({
        stories: function() {
            return Stories.find({});
        }
    });

    Template.story.events({
        // 'click .addstory': function(event, template) {
        //     //Blaze.render(Template.createstory, document.body);
        //     $('paper-dialog')[0].toggle();
        // }
    });

    Template.createstory.events({
        'click core-overlay-layer overlay-host paper-dialog paper-button': function(event, template) {
            console.log('aaaa')
        }
    });

    Template.edit.events({
        'click #submit': function(event, template) {
            // var text = event.target.text.value;
            console.log($('#text').val())
            var text = $('#text').val();
            text = text.charAt(text.length - 1) == '.' ? text : text + '.';

            Paragraphs.insert({
                content: text,
                createdOn: new Date()
            });
            // Clear form 
            $('#text').val('');
        }
    });
}

if (Meteor.isServer) {
    Meteor.startup(function() {
        // code to run on server at startup
    });
}

Paragraphs = new Mongo.Collection("paragraph");
Stories = new Mongo.Collection("story");