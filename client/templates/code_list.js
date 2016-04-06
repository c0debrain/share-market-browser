Template.codeList.helpers({
    codes() {
        return Codes.find();
    },
    seenClass() {
        return (this.seen) ? "eye-close" : "eye-open";
    },
    settings() {
        return {
            collection: Codes,
            rowsPerPage: 20,
            showRowCount: true,
//            showColumnToggles: true,
            fields: [
                { key: 'code', label: 'Code' },
                { key: 'name', label: 'Company Name' },
                { key: 'description', label: 'Industry' },
                { key: 'seen', label: Template.seenTitle, tmpl: Template.codeStatus },
                { key: 'remove', label: '', tmpl: Template.removeItem }
            ]
        };
    }
});

Template.codeList.events({
    'click .remove-all'(event) {
       var confirmRemove = window.confirm("Are you sure you want to remove all the list?");
       if (confirmRemove) Codes.remove({});
    },
    'click .all-seen'(event) {
        Codes.update({},{$set: {seen: true}}, {multi: true});
    },
    'click .reset'(event) {
        Codes.update({},{$set: {seen: false}}, {multi: true});
    },
    'click td.code'(event, template) {
        var code = event.target.innerHTML;
        var win, open = false;

        if ($('#linkA1').val()) {
            var link = $('#linkA1').val() + code + $('#linkA2').val();
            win = window.open(link, '_blank');
            win.focus();
            open = true;
        }

        if ($('#linkB1').val()) {
            var link = $('#linkB1').val() + code + $('#linkB2').val();
            win = window.open(link, '_blank');
            win.focus();
            open = true;
        }

        if (open) Codes.update({code: code},{$set: { seen: true}});
    },
    'click .remove-item' (event) {
        var confirmRemove = window.confirm("Are you sure you want to remove this item?");
        if (confirmRemove) Codes.remove({_id:$(event.target).attr('item')});
    }

});


Template.codeStatus.events({
    'click .glyphicon-eye-close'(event) {
        Codes.update({_id:event.target.id},{$set: {seen: false}});
    },
    'click .glyphicon-eye-open'(event) {
        Codes.update({_id:event.target.id},{$set: {seen: true}});
    }
});

