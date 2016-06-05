Meteor.methods({
    addCode: function(doc){
        doc.$set._id = doc.$set.code;
        if (Meteor.isClient) Codes.update({_id:doc.$set.code},doc, {upsert: true});
    }
});
