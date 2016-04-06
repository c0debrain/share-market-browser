Template.body.events({
    'click span.clickable'(event, instance) {
        $(event.target).parents('.panel').find('.panel-collapse').collapse('toggle');
    },
    'show.bs.collapse .panel-collapse' (event, instance) {
        var $span = $(event.target).parents('.panel').find('.panel-heading span.clickable');
        $span.find('i').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
    },
    'hide.bs.collapse .panel-collapse' (event, instance) {
        var $span = $(event.target).parents('.panel').find('.panel-heading span.clickable');
        $span.find('i').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
    }
});

