Meteor.methods({
    addCode: function(doc){
        if (Meteor.isClient) Codes.update({code:doc.$set.code},doc, {upsert: true});
    }
});
