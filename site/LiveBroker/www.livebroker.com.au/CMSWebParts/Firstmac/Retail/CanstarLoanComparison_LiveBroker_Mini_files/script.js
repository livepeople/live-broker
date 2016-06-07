var vm_ComparisonProduct = function () {
    this.lender = ko.observable();
    this.productName = ko.observable();
    this.interestRate = ko.observable();
    this.comparisonRate = ko.observable();
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

var vm_CanstarLoanComparison = function () {
    self = this;

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
    self.otherOffers = ko.observableArray([]);
    self.specialOffer = ko.observableArray([]);
    self.otherOfferLimit = ko.observable(4);
    self.isLoading = ko.observable(true);

    self.filter_LoanType_Fixed = ko.observable(false);
    self.filter_LoanType_Variable = ko.observable(true);
    self.filter_LoanType_Any = ko.observable(false);
    /*if (localStorage.LB_InterestRateType != null) {
        self.filter_LoanType_Fixed(localStorage.LB_InterestRateType == "fixed");
        self.filter_LoanType_Variable(localStorage.LB_InterestRateType == "variable");
        self.filter_LoanType_Any(localStorage.LB_InterestRateType == "any");
    } else {
        self.filter_LoanType_Any(true);
    }*/

    self.filter_Features_InterestOnly = ko.observable(false);
    if (localStorage.LB_FeatureInterestOnly != null) {
        self.filter_Features_InterestOnly(localStorage.LB_FeatureInterestOnly == "true");
    }

    self.SelectLoanType = function (type) {
        self.filter_LoanType_Fixed(type == "fixed");
        self.filter_LoanType_Variable(type == "variable");
        self.filter_LoanType_Any(type == "any");
    }

    self.RefreshResults = function () {
        localStorage.setItem("LB_LoanAmount", self.loanAmount());
        location.href = '/Choose-and-Compare';
    }

    self.isLoading(true);
    self.feedResults.removeAll();
    if (self.filter_LoanType_Fixed() || self.filter_LoanType_Any()) {
        getFixedProducts(self.feedURL_Fixed(), self);
    }
    if (self.filter_LoanType_Variable() || self.filter_LoanType_Any()) {
        getVariableProducts(self.feedURL_Variable(), self);
    }
};

var ui_CanstarLoanComparison;
jQuery(document).ready(function () {
    ui_CanstarLoanComparison = new vm_CanstarLoanComparison();
    ko.applyBindings(ui_CanstarLoanComparison, document.getElementById('CanstarLoanComparison'));

    jQuery('.collapse').on('shown.bs.collapse', function () {
        jQuery(this).parent().find(".glyphicon-chevron-down").removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up");
    }).on('hidden.bs.collapse', function () {
        jQuery(this).parent().find(".glyphicon-chevron-up").removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down");
    });

    jQuery('#compareMini_LoanAmount1').keypress(function (event) {
        if (isNaN(parseInt(jQuery(this).val(), 10))) {
            jQuery(this).val(0);
        }
        if (event.keyCode == 13) {
            event.preventDefault();
            localStorage.setItem("LB_LoanAmount", parseInt(jQuery(this).val(), 10));
            location.href = '/Choose-and-Compare';
        }
    });

    jQuery('#compareMini_LoanAmount2').keypress(function (event) {
        if (isNaN(parseInt(jQuery(this).val(), 10))) {
            jQuery(this).val(0);
        }
        if (event.keyCode == 13) {
            event.preventDefault();
            localStorage.setItem("LB_LoanAmount", parseInt(jQuery(this).val(), 10));
            location.href = '/Choose-and-Compare';
        }
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
                lenderName = data[i].NAME;
                productName = data[i].TYPE_PROD_NAME;
                canShowRecord = true;

                if (ui.showLenders.indexOf(data[i].NAME.toLowerCase()) == -1) { canShowRecord = false; }
                if (interstRate == undefined || isNaN(interstRate)) { canShowRecord = false; }
                if (comparisonRate == undefined || isNaN(comparisonRate) || comparisonRate == "") { canShowRecord = false; }
                if (interstRate >= 6) { canShowRecord = false; }
                if ((ui.loanAmount() < parseFloat(data[i].MIN_AMOUNT)) || (ui.loanAmount() > parseFloat(data[i].MAX_AMOUNT))) { canShowRecord = false; }
                if (jQuery.inArray(data[i].NAME.toLowerCase(), lendersUsed) != -1) { canShowRecord = false; }
                if (data[i].TERM != '3') { canShowRecord = false; }
                if (ui.filter_Features_InterestOnly() && data[i].INT_PAYMENT_TYPE.toLowerCase() == "p+i") { canShowRecord = false; }
                if (ui.feedResults().length >= 5) { canShowRecord = false; }

                if (lenderName.toLowerCase() == "firstmac" && jQuery.inArray("firstmac", lendersUsed) == -1) {
                    interestRate = AddTrailingZeros(interstRate) + "%";
                    comparisonRate = AddTrailingZeros(round(comparisonRate)) + "%";
                    if (lenderName.toLowerCase() == "firstmac") {
                        lenderName = "Special offer";
                        productName = "Mystery Variable Product";
                    }
                    specProduct = new vm_ComparisonProduct();
                    specProduct.productID(data[i].ID);
                    specProduct.lender(lenderName);
                    specProduct.productName(productName);
                    specProduct.interestRate(interestRate);
                    specProduct.comparisonRate(comparisonRate);
                    if (ui.feedResults().length >= 5) {
                        ui.feedResults.pop();
                    }
                    ui.feedResults.push(specProduct);
                    lendersUsed.push(data[i].NAME.toLowerCase());
                }
                else if (canShowRecord) {
                    interestRate = AddTrailingZeros(interstRate) + "%";
                    comparisonRate = AddTrailingZeros(round(comparisonRate)) + "%";
                    if (lenderName.toLowerCase() == "firstmac") {
                        lenderName = "Special Offer";
                        productName = "Mystery Fixed Product";
                    }
                    tempProduct = new vm_ComparisonProduct();
                    tempProduct.productID(data[i].ID);
                    tempProduct.lender(lenderName);
                    tempProduct.productName(productName);
                    tempProduct.interestRate(interestRate);
                    tempProduct.comparisonRate(comparisonRate);
                    ui.feedResults.push(tempProduct);
                    lendersUsed.push(data[i].NAME.toLowerCase());
                }
            }
            ui.feedResults.sort(function (left, right) {
                return parseFloat(left.interestRate()) == parseFloat(right.interestRate()) ? 0 : (parseFloat(left.interestRate()) < parseFloat(right.interestRate()) ? -1 : 1)
            });

            jQuery(".productData input[type='checkbox']").click(function () {
                var imagecheck = jQuery(this).parent().find(".imgCheckbox");
                if (!jQuery(this).prop("checked")) {
                    imagecheck.removeClass('tick');
                    return true;
                }
                var c = jQuery(".productData input[type='checkbox']:checked");
                if (c.length == 3) {
                    imagecheck.removeClass('tick');
                    return false;
                } else {
                    imagecheck.addClass('tick');
                    return true;
                }
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
            var tempProduct = new vm_ComparisonProduct();
            var specProduct = new vm_ComparisonProduct();
            var interestRate;
            var comparisonRate;
            var lenderName;
            var productName;
            var canShowRecord;
            var lendersUsed = []

            for (var i = 0; i < data.length; i++) {
                interstRate = parseFloat(data[i].ADVT_INTEREST_ARTE);
                comparisonRate = parseFloat(data[i].COMPARISON_250K);
                lenderName = data[i].NAME;
                productName = data[i].TYPE_PROD_NAME;
                canShowRecord = true;

                if (ui.showLenders.indexOf(data[i].NAME.toLowerCase()) == -1) { canShowRecord = false; }
                if (interstRate == undefined || isNaN(interstRate)) { canShowRecord = false; }
                if (comparisonRate == undefined || isNaN(comparisonRate) || comparisonRate == "") { canShowRecord = false; }
                if (interstRate >= 6) { canShowRecord = false; }
                if ((ui.loanAmount() < parseFloat(data[i].MIN_AMOUNT)) || (ui.loanAmount() > parseFloat(data[i].MAX_AMOUNT))) { canShowRecord = false; }
                if (ui.filter_Features_InterestOnly() && data[i].INT_PAYMENT_TYPE.toLowerCase() == "p+i") { canShowRecord = false; }

                if (canShowRecord) {
                    interestRate = AddTrailingZeros(interstRate) + "%";
                    comparisonRate = AddTrailingZeros(round(comparisonRate)) + "%";
                    tempProduct = new vm_ComparisonProduct();
                    tempProduct.productID(data[i].ID);
                    tempProduct.lender(lenderName);
                    tempProduct.productName(productName);
                    tempProduct.interestRate(interestRate);
                    tempProduct.comparisonRate(comparisonRate);
                    ui.feedResults.push(tempProduct);
                }
            }
            ui.feedResults.sort(function (left, right) {
                return parseFloat(left.interestRate()) == parseFloat(right.interestRate()) ? 0 : (parseFloat(left.interestRate()) < parseFloat(right.interestRate()) ? -1 : 1)
            });
            var specialInterestRate = 0;
            //Get Special Product
            for (var i = 0; i < ui.feedResults().length; i++) {
                tempProduct = ui.feedResults()[i];
                if (tempProduct.lender().toLowerCase() == "firstmac" && jQuery.inArray("firstmac", lendersUsed) == -1) {
                    tempProduct.lender("Special offer");
                    tempProduct.productName("Mystery Variable Product");
                    specialInterestRate = parseFloat(tempProduct.interestRate());
                    ui.specialOffer.push(tempProduct);
                    lendersUsed.push("firstmac");
                    i = ui.feedResults().length;
                }
            }
            //Get Other Products
            for (var i = 0; i < ui.feedResults().length; i++) {
                tempProduct = ui.feedResults()[i];
                if (jQuery.inArray(tempProduct.lender().toLowerCase(), lendersUsed) == -1 && ui.otherOffers().length < ui.otherOfferLimit() && parseFloat(tempProduct.interestRate()) > specialInterestRate) {
                    ui.otherOffers.push(tempProduct);
                    lendersUsed.push(tempProduct.lender().toLowerCase());
                }
            }

            jQuery(".productData input[type='checkbox']").click(function () {
                var imagecheck = jQuery(this).parent().find(".imgCheckbox");
                if (!jQuery(this).prop("checked")) {
                    imagecheck.removeClass('tick');
                    return true;
                }
                var c = jQuery(".productData input[type='checkbox']:checked");
                if (c.length == 3) {
                    imagecheck.removeClass('tick');
                    return false;
                } else {
                    imagecheck.addClass('tick');
                    return true;
                }
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
function FormatToCurrency(num) {
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
    return (((sign) ? '' : '-') + '$' + num + '.' + cents);
}