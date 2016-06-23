<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMSWebParts_Firstmac_Retail_CanstarLoanComparison_LiveBroker_Mini" CodeFile="~/CMSWebParts/Firstmac/Retail/CanstarLoanComparison_LiveBroker_Mini.ascx.cs" %>

<script type="text/javascript" src="~/CMSWebParts/Firstmac/Retail/CanstarLoanComparison_LiveBroker_Mini_files/script.js"></script>

<style type="text/css">
</style>

<div class="row hidden-xs">
    <div class="col-sm-9 col-xs-12">
        <h2 class="text-center content-title" style="font-size: 16px;">Which is the right loan for me? Compare loans from our wide variety of lenders.</h2>

        <div class="row IC-rate">
            <div class="col-sm-2 noPadding bordered-right">
                <div class="row-cell bordered-bottom">
                    <p>&nbsp;</p>
                </div>

                <div class="row-cell bordered-bottom">
                    <label>Interest rate</label></div>

                <div class="row-cell">
                    <label>Comparison rate*</label></div>
            </div>
            <!-- ko foreach: otherOffers -->
            <div class="col-sm-2 noPadding bordered-right">
                <div class="row-cell bordered-bottom">
                    <p class="productName" data-bind="text: lender">A</p>
                </div>

                <div class="row-cell bordered-bottom">
                    <h1 class="rateA" data-bind="text: interestRate, css: { 'rateC': lender() == 'Special offer' }">X.XX%</h1>
                </div>

                <div class="row-cell">
                    <h1 class="rateB" data-bind="text: comparisonRate">X.XX%</h1>
                    <a data-bind="attr: { href: '/Products?id=' + productID() }"><span>View</span></a>
                </div>
            </div>
            <!-- /ko -->
            <!-- ko foreach: specialOffer -->
            <div class="col-sm-2 noPadding bordered-right">
                <div class="row-cell bordered-bottom">
                    <p class="productName" data-bind="text: lender">A</p>
                </div>

                <div class="row-cell bordered-bottom">
                    <h1 class="rateA rateC" data-bind="text: interestRate">X.XX%</h1>
                </div>

                <div class="row-cell">
                    <h1 class="rateB" data-bind="text: comparisonRate">X.XX%</h1>
                    <a data-bind="attr: { href: '/Products?id=' + productID() }"><span>View</span></a>
                </div>
            </div>
            <!-- /ko -->
        </div>

        <p style="font-family: 'lato'; font-size: 10px; color: #323232;">*please click <a data-target="#comparisonRateDisclaimer" data-toggle="modal" style="color: #ac68a9;">here</a> to see how our comparison rates are calculated</p>
    </div>

    <div class="col-sm-3 col-xs-12 noPadding purplebg">
        <h2 class="content-title" style="color: #fff; font-size: 16px; font-weight: 300; line-height: 22px; margin-left: 20px;">How much do you want to borrow?</h2>

        <div class="form-group" style="margin: 25px auto; width: 210px;">
            <div class="input-group">
                <div class="input-group-addon">$</div>
                <input class="form-control" style="border-left: none;" type="text" id="compareMini_LoanAmount1" data-bind="value: loanAmount" />
            </div>
        </div>

        <div class="form-group text-center" style="margin-top: 25px;"><a class="btn btn-custom-orange icon-arrow-right" href="#" data-bind="click: RefreshResults">Find me a loan</a></div>
    </div>
</div>

<div class="row visible-xs">
    <div class="col-xs-12">
        <h2 class="content-heading text-center">Which is the right loan for me? Compare loans from our wide variety of lenders.</h2>

        <div class="row">
            <table class="table IC-rate">
                <thead>
                    <tr>
                        <th class="bordered-right">&nbsp;</th>
                        <th class="bordered-right">
                            <label class="text-center">Interest rate</label></th>
                        <th class="bordered-right">
                            <label class="text-center">Comparison rate</label></th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody data-bind="foreach: feedResults">
                    <tr>
                        <td class="bordered-right productName" data-bind="text: lender">special offer</td>
                        <td class="bordered-right rateA" data-bind="text: interestRate, css: { 'rateC': lender() == 'Special offer' }">4.54%</td>
                        <td class="bordered-right rateB" data-bind="text: comparisonRate">4.55%</td>
                        <td><a data-bind="attr: { href: '/Products?id=' + productID() }"><span>View</span></a></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <div class="col-xs-12">
        <p><strong>Disclaimer:</strong> *Comparison rate is based on a $150,000 loan over 25 years. Warning
                    this comparison rate is true only for this example and may not include
                    all fees and charges. Different terms, fees or other loan amounts might
                    result in a different comparison rate. Interest rates, fees and
                    conditions are indicative and subject to change without notice.</p>
        <p>Financial data is provided by CANSTAR Pty Ltd AFSL 312804.
                    CANSTAR&rsquo;s FSG and AFSL disclosure statement apply. Monthly
                    payments and total cost are based on a 30 year loan term. Different loan
                    terms, amounts, interest rates, fees and charges may result in a
                    different amounts.</p>
    </div>

    <div class="col-xs-12 purplebg">
        <h2 class="content-maintitle text-center">How much do you want to borrow?</h2>

        <div class="form-group" style="margin: 25px auto; width: 210px;">
            <div class="input-group">
                <div class="input-group-addon">$</div>
                <input class="form-control" style="border-left: none;" type="text" id="compareMini_LoanAmount2" data-bind="value: loanAmount" />
            </div>
        </div>

        <div class="form-group text-center" style="margin-top: 25px;"><a class="btn btn-custom-orange icon-arrow-right" href="#" data-bind="click: RefreshResults">Find me a loan</a></div>
    </div>
</div>
