Router.route('/', function () { //home page route
    this.render('menu', {
        to: 'aside'
    });
    this.render('story', {
        data: function () {
            return {
                stories: function () {
                    return Stories.find();
                }
            }
        }
    });
    this.render('modal', {
        to: 'bottom'
    });
});
Router.route('/story/:_id', function () { //story content route
    var story = Stories.findOne({
        _id: this.params._id
    });
    this.render('menu', {
        to: 'aside'
    });
    this.render('content', {
        data: function () {
            return story;
        }
    });
    this.render('modal', {
        data: function () {
            return story;
        },
        to: 'bottom'
    });
});
Router.configure({ //config layout default for all page
    layoutTemplate: 'master'
});
