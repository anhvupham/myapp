Template.story.events({
    'click .story': function (event, template) {
        var id = $(event.target).attr('data-id')
        Router.go('/story/' + id);
    }
});
