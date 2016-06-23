﻿var vm_CanstarProduct = function () {
    this.lender = ko.observable();
    this.productName = ko.observable();
    this.interestRate = ko.observable();
    this.comparisonRate = ko.observable();
    this.rateType = ko.observable();
    this.monthlyRepayment = ko.observable();
    this.totalRepayment = ko.observable();
    this.upFrontFees = ko.observable();
    this.maxLVR = ko.observable();
    this.loanTerm = ko.observable(30);
    this.isVisible = ko.observable(false);
    this.productID = ko.observable(0);

    this.lenderImage = ko.computed(function () {
        var filename = this.lender();
        if (filename == undefined || filename == "") { return ""; }
        filename = filename.toLowerCase().split(" ").join("-");
        return '/media/LiveBroker/Lenders/' + filename + '.jpg';
    }, this);
};

var vm_CanstarProductView = function () {
    self = this;
    self.productID = ko.observable();

    if (localStorage.LB_LoanAmount != null) {
        self.loanAmount = ko.observable(localStorage.LB_LoanAmount);
    } else {
        self.loanAmount = ko.observable("450000");
    }
    self.approvedLenders = ko.observableArray(approvedLenders);
    if (localStorage.LB_SelectedProviders != null && localStorage.LB_SelectedProviders != "") {
        self.showLenders = ko.observableArray(localStorage.LB_SelectedProviders.split(","));
    } else {
        self.showLenders = self.approvedLenders();
    }

    self.feedURL_Fixed = ko.observable("https://feeds.canstar.com.au/canstar_feeds/key/BD57100B2174C545CA7430226C6798B7/view/fixed-rate-home-loans?format=jsonp");
    self.feedURL_Variable = ko.observable("https://feeds.canstar.com.au/canstar_feeds/key/BD57100B2174C545CA7430226C6798B7/view/variable-home-loans?format=jsonp");

    self.feedResults = ko.observableArray([]);
    self.isLoading = ko.observable(true);

    self.filter_LoanType_Fixed = ko.observable(false);
    self.filter_LoanType_Variable = ko.observable(false);
    self.filter_LoanType_Any = ko.observable(false);
    if (localStorage.LB_InterestRateType != null) {
        self.filter_LoanType_Fixed(localStorage.LB_InterestRateType == "fixed");
        self.filter_LoanType_Variable(localStorage.LB_InterestRateType == "variable");
        self.filter_LoanType_Any(localStorage.LB_InterestRateType == "any");
    } else {
        self.filter_LoanType_Any(true);
    }

    self.filter_Features_InterestOnly = ko.observable(false);
    if (localStorage.LB_FeatureInterestOnly != null) {
        self.filter_Features_InterestOnly(localStorage.LB_FeatureInterestOnly == "true");
    }

    self.SelectLoanType = function (type) {
        self.filter_LoanType_Fixed(type == "fixed");
        self.filter_LoanType_Variable(type == "variable");
        self.filter_LoanType_Any(type == "any");
        localStorage.setItem("LB_InterestRateType", type);
    }

    self.RefreshResults = function () {
        localStorage.setItem("LB_LoanAmount", self.loanAmount());
        localStorage.setItem("LB_FeatureInterestOnly", self.filter_Features_InterestOnly());
        location.href = '/Choose-and-Compare';
    }

    self.isLoading(true);
    self.feedResults.removeAll();
    getFixedProducts(self.feedURL_Fixed(), self);
    getVariableProducts(self.feedURL_Variable(), self);
};

var ui_CanstarProductView;
jQuery(document).ready(function () {
    var productID = getParameterByName("id");
    ui_CanstarProductView = new vm_CanstarProductView();
    ui_CanstarProductView.productID(productID != "" ? productID : "0");
    ko.applyBindings(ui_CanstarProductView, document.getElementById('CanstarProductView'));

    jQuery('.collapse').on('shown.bs.collapse', function () {
        jQuery(this).parent().find(".glyphicon-chevron-down").removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up");
    }).on('hidden.bs.collapse', function () {
        jQuery(this).parent().find(".glyphicon-chevron-up").removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down");
    });
});

var getFixedProducts = function (dataURL, ui) {
    jQuery.ajax({
        url: dataURL,
        dataType: "jsonp",
        crossDomain: true,
        success: function (data, self) {
            var tempProduct;
            var interestRate;
            var comparisonRate;
            var lenderName;
            var productName;
            var canShowRecord;
            var lendersUsed = []

            for (var i = 0; i < data.length; i++) {
                interstRate = parseFloat(data[i].ADVT_INTEREST_ARTE);
                comparisonRate = parseFloat(data[i].COMPARISON_250K);
                upFrontFees = parseFloat(data[i].AAPRUF25);
                maxLVR = parseFloat(data[i].LVR);
                lenderName = data[i].NAME;
                productName = data[i].TYPE_PROD_NAME;
                canShowRecord = true;

                if (ui.showLenders.indexOf(data[i].NAME.toLowerCase()) == -1) { canShowRecord = false; }
                if (data[i].TERM != '3') { canShowRecord = false; }
                if (data[i].ID != ui.productID()) { canShowRecord = false; }

                if (canShowRecord) {
                    interestRate = AddTrailingZeros(interstRate) + "%pa";
                    comparisonRate = AddTrailingZeros(round(comparisonRate)) + "%pa";
                    monthlyRepayment = getMonthlyRepayment(ui.loanAmount(), parseFloat(data[i].ADVT_INTEREST_ARTE), 30);
                    totalRepayment = getTotalInterest(ui.loanAmount(), parseFloat(data[i].ADVT_INTEREST_ARTE), 30) + parseFloat(ui.loanAmount());
                    if (lenderName.toLowerCase() == "firstmac") {
                        lenderName = "Special Offer";
                        productName = "Mystery Variable Product";
                    }
                    tempProduct = new vm_CanstarProduct();
                    tempProduct.productID(data[i].ID);
                    tempProduct.lender(lenderName);
                    tempProduct.productName(productName);
                    tempProduct.interestRate(interestRate);
                    tempProduct.comparisonRate(comparisonRate);
                    tempProduct.rateType("Variable");
                    tempProduct.monthlyRepayment(FormatToCurrency(monthlyRepayment, true));
                    tempProduct.totalRepayment(FormatToCurrency(totalRepayment, true));
                    tempProduct.upFrontFees(FormatToCurrency(upFrontFees, false));
                    tempProduct.maxLVR(maxLVR + "%");
                    ui.feedResults.push(tempProduct);
                    lendersUsed.push(data[i].NAME.toLowerCase());
                }
            }
            ui.feedResults.sort(function (left, right) {
                return parseFloat(left.interestRate()) == parseFloat(right.interestRate()) ? 0 : (parseFloat(left.interestRate()) < parseFloat(right.interestRate()) ? -1 : 1)
            });
            ui.isLoading(false);
        }
    });
};

var getVariableProducts = function (dataURL, ui) {
    jQuery.ajax({
        url: dataURL,
        dataType: "jsonp",
        crossDomain: true,
        success: function (data, self) {
            var tempProduct;
            var interestRate;
            var comparisonRate;
            var lenderName;
            var productName;
            var canShowRecord;
            var lendersUsed = []

            for (var i = 0; i < data.length; i++) {
                interstRate = parseFloat(data[i].ADVT_INTEREST_ARTE);
                comparisonRate = parseFloat(data[i].COMPARISON_250K);
                upFrontFees = parseFloat(data[i].UPFRONTFEE_250K_75LVR);
                maxLVR = parseFloat(data[i].LVR);
                lenderName = data[i].NAME;
                productName = data[i].TYPE_PROD_NAME;
                canShowRecord = true;

                if (ui.showLenders.indexOf(data[i].NAME.toLowerCase()) == -1) { canShowRecord = false; }
                if (data[i].ID != ui.productID()) { canShowRecord = false; }

                if (canShowRecord) {
                    interestRate = AddTrailingZeros(interstRate) + "%pa";
                    comparisonRate = AddTrailingZeros(round(comparisonRate)) + "%pa";
                    monthlyRepayment = getMonthlyRepayment(ui.loanAmount(), parseFloat(data[i].ADVT_INTEREST_ARTE), 30);
                    totalRepayment = getTotalInterest(ui.loanAmount(), parseFloat(data[i].ADVT_INTEREST_ARTE), 30) + parseFloat(ui.loanAmount());
                    if (lenderName.toLowerCase() == "firstmac") {
                        lenderName = "Special Offer";
                        productName = "Mystery Variable Product";
                    }
                    tempProduct = new vm_CanstarProduct();
                    tempProduct.productID(data[i].ID);
                    tempProduct.lender(lenderName);
                    tempProduct.productName(productName);
                    tempProduct.interestRate(interestRate);
                    tempProduct.comparisonRate(comparisonRate);
                    tempProduct.rateType("Variable");
                    tempProduct.monthlyRepayment(FormatToCurrency(monthlyRepayment, true));
                    tempProduct.totalRepayment(FormatToCurrency(totalRepayment, true));
                    tempProduct.upFrontFees(FormatToCurrency(upFrontFees, false));
                    tempProduct.maxLVR(maxLVR + "%");
                    ui.feedResults.push(tempProduct);
                    lendersUsed.push(data[i].NAME.toLowerCase());
                }
            }
            ui.feedResults.sort(function (left, right) {
                return parseFloat(left.interestRate()) == parseFloat(right.interestRate()) ? 0 : (parseFloat(left.interestRate()) < parseFloat(right.interestRate()) ? -1 : 1)
            });
            ui.isLoading(false);
        }
    });
};

/* UTILS */
function round(x) {
    return Math.round(x * 100) / 100;
}
function AddTrailingZeros(x) {
    if (x.toString().indexOf('.') == -1) {
        return x.toString() + '.00';
    }
    else if (x.toString().indexOf('.') == x.toString().length - 2) {
        return x.toString() + '0';
    }
    return x;
}
function getMonthlyRepayment(amount, rate, years) {
    amount = parseFloat(amount);
    rate = parseFloat(rate);
    years = parseFloat(years);
    // Convert interest from a percentage to a decimal, and convert from
    // an annual rate to a monthly rate. Convert payment period in years
    // to the number of monthly payments.
    var principal = amount;
    var interest = rate / 100 / 12;
    var payments = years * 12;

    // Now compute the monthly payment figure, using esoteric math.
    var x = Math.pow(1 + interest, payments);
    var monthly = (principal * x * interest) / (x - 1);

    // Check that the result is a finite number. If so, display the results.
    if (!isNaN(monthly) &&
        (monthly != Number.POSITIVE_INFINITY) &&
        (monthly != Number.NEGATIVE_INFINITY)) {

        return round(monthly);
    }
        // Otherwise, the user's input was probably invalid, so don't do anything.
    else {
        return "unknown";
    }
}
function getTotalInterest(amount, rate, years) {
    amount = parseFloat(amount);
    rate = parseFloat(rate);
    years = parseFloat(years);
    // Convert interest from a percentage to a decimal, and convert from
    // an annual rate to a monthly rate. Convert payment period in years
    // to the number of monthly payments.
    var principal = amount;
    var interest = rate / 100 / 12;
    var payments = years * 12;

    // Now compute the monthly payment figure, using esoteric math.
    var x = Math.pow(1 + interest, payments);
    var monthly = (principal * x * interest) / (x - 1);

    // Check that the result is a finite number. If so, display the results.
    if (!isNaN(monthly) &&
        (monthly != Number.POSITIVE_INFINITY) &&
        (monthly != Number.NEGATIVE_INFINITY)) {

        return round((monthly * payments) - amount);
    }
        // Otherwise, the user's input was probably invalid, so don't
        // display anything.
    else {
        return "unknown";
    }
}
function FormatToCurrency(num, showCents) {
    num = num.toString().replace(/\$|\,/g, '');
    if (isNaN(num))
        num = "0";
    sign = (num == (num = Math.abs(num)));
    num = Math.floor(num * 100 + 0.50000000001);
    cents = num % 100;
    num = Math.floor(num / 100).toString();
    if (cents < 10)
        cents = "0" + cents;
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3) ; i++)
        num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
    if (!showCents) {
        return (((sign) ? '' : '-') + '$' + num);
    } else {
        return (((sign) ? '' : '-') + '$' + num + '.' + cents);
    }
}
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}