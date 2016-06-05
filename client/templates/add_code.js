Template.addCode.onRendered(function(){
    $('#addcode-panel-content').collapse('toggle');
});

Template.addCode.events({
    'change [name="code"], keyup [name="code"]' (event) {
        //console.log(event.target.value);
        if(Codes.findOne({_id:event.target.value})) {
            console.log('Exists');
        }
    }
});
