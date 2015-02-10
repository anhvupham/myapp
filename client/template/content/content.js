Template.content.events({
    'click #submit': function (event, template) {
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
    'keyup .bottom .new-para #text': function (event, template) {
        var title = $('.bottom .new-para #text').val(),
            savebtn = $('.bottom .new-para #submit');
        if (title.length > 0) {
            savebtn.removeAttr('disabled');
        } else {
            savebtn.attr('disabled', true);
        }
    }
});
