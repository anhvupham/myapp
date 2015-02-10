Stories = new Mongo.Collection("story");
if (Meteor.isServer) {
    // Stories.allow({
    //     insert: function () {
    //         return Meteor.user() ? true : false;
    //     },
    //     update: function () {
    //         return Meteor.user() ? true : false;
    //     },
    //     remove: function () {
    //         return Meteor.user() ? true : false;
    //     }
    // });
}