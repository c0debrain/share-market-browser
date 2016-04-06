Template.export.onRendered( function() {
    $('#export-panel-content').collapse('toggle');
});

Template.export.events({
    'click .export-data' (event, template) {
        var expBtn = $(event.target);
        expBtn.button('loading');

        var codes = Codes.find().map(function(q) {
                return {
                    code: q.code,
                    company: q.name,//name: q.name,
                    industry: q.description,//description: q.description,
                    seen: q.seen,
                }
        });
            //console.log(questions);
        var result = json2csv(codes);
//        var result = JSON.stringify(codes);

//        console.log(result);
        var blob = new Blob([result], {type: "text/plain;charset=utf-8"});
        var d = new Date();
        saveAs(blob, d.getDate()+'-'+(d.getMonth()+1)+'-'+d.getFullYear()+".csv");
        expBtn.button('reset');
    }

});
