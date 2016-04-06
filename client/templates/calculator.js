var totalToPay = function(){
    var out = (parseFloat($('#share-buy-price').val())||0) * (parseFloat($('#share-buy-qty').val())||0);
    out += (parseFloat($('#broker-buying-cost').val())||0);
    return out;
};

var minSellPrice_Profit = function(){
    var brokerSellCost = (parseFloat($('#broker-selling-cost').val())||0),
        brokerBuyCost = (parseFloat($('#broker-buying-cost').val())||0),
        shareBuyPrice = (parseFloat($('#share-buy-price').val())||0),
        desiredProfit = (parseFloat($('#desired-profit').val())||0),
        shareSellQty = (parseFloat($('#share-sell-qty').val())||0);

    var totalCost = brokerBuyCost + brokerSellCost + shareSellQty * shareBuyPrice;
    var desiredRevenue = totalCost * ( 1 + desiredProfit / 100 );
    var minSellingPrice = desiredRevenue / shareSellQty;

    return {
        minSellPrice: minSellingPrice,
        profit: desiredRevenue - totalCost,
        increaseNeeded: ( minSellingPrice - shareBuyPrice ) / shareBuyPrice * 100
    };
};

Template.calculator.onCreated( function() {
    this.totalPurchase = new ReactiveVar(100);
    this.minSellingPrice = new ReactiveVar(0);
    this.profitAtMinSellPrice = new ReactiveVar(0);
    this.shareIncreaseNeeded = new ReactiveVar(0);
});

Template.calculator.onRendered( function() {
    // Default Inputs
    $('#broker-buying-cost').val(19.95);
    $('#broker-selling-cost').val(19.95);
    $('#share-buy-price').val(0.10);
    $('#share-buy-qty').val(1000);
    $('#desired-profit').val(5);
    $('#share-sell-qty').val(1000);

    // Initial Calculation
    this.totalPurchase.set(totalToPay());
    var calc = minSellPrice_Profit();
    this.minSellingPrice.set(calc.minSellPrice);
    this.profitAtMinSellPrice.set(calc.profit);
    this.shareIncreaseNeeded.set(calc.increaseNeeded);
});

Template.calculator.helpers({
    totalPurchase() {
        return accounting.formatNumber(Template.instance().totalPurchase.get(),2,",");
    },
    minSellingPrice() {
        return accounting.formatNumber(Template.instance().minSellingPrice.get(),3,",");
    },
    profitAtMinSellPrice() {
        return accounting.formatNumber(Template.instance().profitAtMinSellPrice.get(),2,",");
    },
    shareIncreaseNeeded() {
        return accounting.formatNumber(Template.instance().shareIncreaseNeeded.get(),2);
    }
});

Template.calculator.events({
    'keyup #share-buy-price, keyup #share-buy-qty, change #share-buy-price, change #share-buy-qty'(event,template) {
        template.totalPurchase.set(totalToPay());
    },
    'keyup .total-factor, change .total-factor'(event,template) {
        var calc = minSellPrice_Profit();
        template.minSellingPrice.set(calc.minSellPrice);
        template.profitAtMinSellPrice.set(calc.profit);
        template.shareIncreaseNeeded.set(calc.increaseNeeded);
    },
    'change #same-as-buy'(event, template){
        if(event.target.checked) {
            $('#share-sell-qty').val($('#share-buy-qty').val());
            $('#share-sell-qty').prop('disabled', true);
        } else {
            $('#share-sell-qty').prop('disabled', false);
        }
    },
    'keyup #share-buy-qty, change #share-buy-qty'(event, template) {
        if($('#same-as-buy').prop('checked')) {
            $('#share-sell-qty').val($('#share-buy-qty').val());
        }
    },
    'change #same-as-broker-buy'(event, template){
        if(event.target.checked) {
            $('#broker-selling-cost').val($('#broker-buying-cost').val());
            $('#broker-selling-cost').prop('disabled', true);
        } else {
            $('#broker-selling-cost').prop('disabled', false);
        }
    },
    'keyup #broker-buying-cost, change #broker-buying-cost'(event, template) {
        if($('#same-as-broker-buy').prop('checked')) {
            $('#broker-selling-cost').val($('#broker-buying-cost').val());
        }
    },
});
