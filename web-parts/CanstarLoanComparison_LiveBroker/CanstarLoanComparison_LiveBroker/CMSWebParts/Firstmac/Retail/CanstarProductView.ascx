<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMSWebParts_Firstmac_Retail_CanstarProductView" CodeFile="~/CMSWebParts/Firstmac/Retail/CanstarProductView.ascx.cs" %>

<script type="text/javascript" src="~/CMSWebParts/Firstmac/Retail/CanstarProductView_files/script.js"></script>

<style type="text/css">
</style>

<style type="text/css">
    .row {
        margin: 0;
    }

    .CanstarProductView {
        background: url('https://authoring.livebroker.com.au/media/LiveBroker/General/body_background.jpg');
        background-position: center;
        max-width: 1020px;
        width: 100%;
        margin-left: auto;
        margin-right: auto;
    }

    .bg-purple {
        background-color: #AE6AAB;
        min-height: 600px;
    }

    .main-label {
        color: #FFF;
        margin-top: 27px;
        margin-bottom: 14px;
    }

    .custom-inputbox {
        height: 49px;
        color: #7EBA9E;
        font-size: 27px;
    }

    .panel {
        background-color: transparent;
        border: 1px solid transparent;
        border-radius: 0;
        -webkit-box-shadow: none;
        box-shadow: none;
    }

    .panel-group .panel-heading {
        border-bottom: 1px solid #FFF;
    }

    .panel-default > .panel-heading {
        color: #F7F7F7;
        background-color: transparent;
        border-color: #ddd;
    }

    span.pull-right.glyphicon.glyphicon-chevron-down {
        right: -8px;
        background-image: url('/media/LiveBroker/General/arrow-down-white.png');
        background-repeat: no-repeat;
        text-indent: -9999px;
    }

    .panel-default > .panel-heading + .panel-collapse .panel-body {
        border-top-color: transparent;
    }

    span.imgCheckbox.tick {
        background-image: url('/media/LiveBroker/General/toggle-tick.png');
        background-repeat: no-repeat;
        display: inline-block;
        height: 25px;
        width: 27px;
    }

    span.imgCheckbox {
        background-image: url('/media/LiveBroker/General/toggle-untick.png');
        background-repeat: no-repeat;
        display: inline-block;
        height: 25px;
        width: 27px;
    }

    .panel-body label {
        color: #F7F7F7;
        padding-left: 0;
    }

    .custom-button-green, .custom-button-green:hover {
        margin-bottom: 20px;
        background-color: #75C49F;
        color: #FFF;
        border: 1px solid #62AA89;
        min-width: 224px;
        height: 50px;
        background-image: url('/media/LiveBroker/General/arrow-right-white.png');
        background-repeat: no-repeat;
        background-position: 14px;
        border-bottom: 3px solid #5C9D7B;
    }

    .productLabels {
        border-bottom: 1px solid #ccc;
        padding: 7px 0;
    }

        .productLabels.last {
            border-bottom: none;
        }

        .productLabels label {
            color: #3d3d3d;
            font-size: 17px;
            padding-left: 12px;
        }

        .productLabels p {
            color: #8F8F8F;
            font-size: 17px;
            margin: 0 0 5px;
            padding-left: 12px;
        }

    .border-left {
        border-right: 1px solid #ccc;
        padding-right: 0;
    }

    .noPaddingRight {
        padding-right: 0;
    }

    .noPaddingLeft {
        padding-left: 0;
    }
</style>
<div class="CanstarProductView" id="CanstarProductView">
    <div class="row">
        <div class="col-sm-3 col-xs-12 bg-purple CanstarProductView_Filter">
            <div class="form-group">
                <label class="main-label">Loan amount</label>
                <input type="text" class="form-control custom-inputbox" data-bind="value: loanAmount" />
            </div>
            <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                <div class="panel panel-default">
                    <div class="panel-heading top-heading" role="tab" id="headingLoanType">
                        <h4 class="panel-title">
                            <a data-toggle="collapse" data-parent="#accordion" href="#PanelLoanType" aria-expanded="true" aria-controls="PanelLoanType">Loan type
                            <span class="pull-right glyphicon glyphicon-chevron-down">&nbsp;</span></a>
                        </h4>
                    </div>
                    <div id="PanelLoanType" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingLoanType">
                        <div class="panel-body">
                            <div class="checkbox">
                                <label>
                                    <span class="imgCheckbox" data-bind="css: { tick: filter_LoanType_Fixed() }, click: function () { SelectLoanType('fixed'); }">&nbsp;</span>
                                    Fixed
                                </label>
                            </div>
                            <div class="checkbox">
                                <label>
                                    <span class="imgCheckbox" data-bind="css: { tick: filter_LoanType_Variable() }, click: function () { SelectLoanType('variable'); }">&nbsp;</span>
                                    Variable
                                </label>
                            </div>
                            <div class="checkbox">
                                <label>
                                    <span class="imgCheckbox" data-bind="css: { tick: filter_LoanType_Any() }, click: function () { SelectLoanType('any'); }">&nbsp;</span>
                                    Any / Split
                                </label>
                            </div>
                            <div class="checkbox">
                                <label>
                                    <span class="imgCheckbox" data-bind="css: { 'tick': filter_Features_InterestOnly }, click: function () { filter_Features_InterestOnly(!filter_Features_InterestOnly()); }">&nbsp;</span>
                                    Interest only
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <!--<div class="panel panel-default">
                    <div class="panel-heading" role="tab" id="headingFeatures">
                        <h4 class="panel-title">
                            <a data-toggle="collapse" data-parent="#accordion" href="#PanelFeatures" aria-expanded="true" aria-controls="PanelFeatures">Features
                            <span class="pull-right glyphicon glyphicon-chevron-down">&nbsp;</span></a>
                        </h4>
                    </div>
                    <div id="PanelFeatures" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingFeatures">
                        <div class="panel-body">
                            <div class="checkbox">
                                <label>
                                    <span class="imgCheckbox" data-bind="css: { 'tick': filter_Features_InterestOnly }, click: function () { filter_Features_InterestOnly(!filter_Features_InterestOnly()); }">&nbsp;</span>
                                    Interest only
                                </label>
                            </div>
                        </div>
                    </div>
                </div>-->
            </div>
            <div class="form-group text-center">
                <button class="btn pull-right custom-button-green" data-bind="click: RefreshResults">Refresh results</button>
            </div>
        </div>

        <div class="col-sm-9 col-xs-12" data-bind="foreach: feedResults">
            <div class="row">
                <div class="col-sm-12">
                    <h1 data-bind="text: productName">Product Name</h1>
                </div>
            </div>

            <div class="row">
                <div class="col-sm-6 col-xs-6 border-left">
                    <div class="row">
                        <div class="col-sm-12 noPaddingRight">
                            <div class="productLabels">
                                <label>Company</label>
                            </div>
                        </div>

                        <div class="col-sm-12 noPaddingRight">
                            <div class="productLabels">
                                <label>Initial Monthly Repayment</label>
                            </div>
                        </div>

                        <div class="col-sm-12 noPaddingRight">
                            <div class="productLabels">
                                <label>Total Repayment</label>
                            </div>
                        </div>

                        <div class="col-sm-12 noPaddingRight">
                            <div class="productLabels">
                                <label>Advertised Rate</label>
                            </div>
                        </div>

                        <div class="col-sm-12 noPaddingRight">
                            <div class="productLabels">
                                <label>Comparison Rate</label>
                            </div>
                        </div>

                        <div class="col-sm-12 noPaddingRight">
                            <div class="productLabels">
                                <label>Rate Type</label>
                            </div>
                        </div>

                        <div class="col-sm-12 noPaddingRight">
                            <div class="productLabels">
                                <label>Up Front Fees</label>
                            </div>
                        </div>

                        <div class="col-sm-12 noPaddingRight">
                            <div class="productLabels last">
                                <label>Max LVR</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-sm-6 col-xs-6 noPaddingLeft">
                    <div class="row">
                        <div class="col-sm-12 noPaddingLeft">
                            <div class="productLabels">
                                <p data-bind="text: lender">Company Logo</p>
                            </div>
                        </div>

                        <div class="col-sm-12 noPaddingLeft">
                            <div class="productLabels">
                                <p><span data-bind="text: monthlyRepayment">$1,265.23</span> per month</p>
                            </div>
                        </div>

                        <div class="col-sm-12 noPaddingLeft">
                            <div class="productLabels">
                                <p data-bind="text: totalRepayment">$456,136.25</p>
                            </div>
                        </div>

                        <div class="col-sm-12 noPaddingLeft">
                            <div class="productLabels">
                                <p><span data-bind="text: interestRate">4.49%</span> <span data-bind="    text: rateType">Variable</span></p>
                            </div>
                        </div>

                        <div class="col-sm-12 noPaddingLeft">
                            <div class="productLabels">
                                <p data-bind="text: comparisonRate">4.53%</p>
                            </div>
                        </div>

                        <div class="col-sm-12 noPaddingLeft">
                            <div class="productLabels">
                                <p data-bind="text: rateType">Variable</p>
                            </div>
                        </div>

                        <div class="col-sm-12 noPaddingLeft">
                            <div class="productLabels">
                                <p data-bind="text: upFrontFees">$450</p>
                            </div>
                        </div>

                        <div class="col-sm-12 noPaddingLeft">
                            <div class="productLabels last">
                                <p data-bind="text: maxLVR">95%</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
