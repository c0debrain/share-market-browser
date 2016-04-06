Template.randomCode.onRendered(function(){
    // Initialization
    $('#linkA1').val("https://au.finance.yahoo.com/q/bc?s=");
    $('#linkA2').val(".AX");

    $('#linkB1').val("http://www.asx.com.au/asx/research/company.do#!/");

    $('#links-number').val(3);

});

Template.randomCode.events({
    'submit form'(event) {
        event.preventDefault();
//        console.log(event.target.linkA1.value);

        for(var i=0; i < parseInt(event.target['links-number'].value); i += 1) {
            // Count collection
            var count = Codes.find({seen: false}).count();
            if (count < 1) return;
            var n = Random.fraction()*count;
            var c = Codes.find({seen: false}, {skip: n, limit: 1}).fetch();
            //console.log(count, n, c[0].code);
            var win;// = window.self;

            if (event.target.linkA1.value) {
                var link = event.target.linkA1.value + c[0].code + event.target.linkA2.value;
    //            console.log(link);
                win = window.open(link, '_blank');
                win.focus();
            }

            if (event.target.linkB1.value) {
                var link = event.target.linkB1.value + c[0].code + event.target.linkB2.value;
                win = window.open(link, '_blank');
                win.focus();
            }

            Codes.update({_id:c[0]._id},{$set: { seen: true}});
        }
    }
});
