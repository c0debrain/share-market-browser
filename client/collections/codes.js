Codes = new Meteor.Collection(null);

SchemaCodes = new SimpleSchema({
    code: {
        type: String,
        label: "Code"
    },
    name: {
        type: String,
        label: "Company",
        optional: true
    },
    description: {
        type: String,
        label: "Industry",
        optional: true
    },
    seen: {
        type: Boolean,
        label: "Seen?",
        optional: true,
        defaultValue: false
    }
});

Codes.attachSchema(SchemaCodes);
