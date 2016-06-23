<%@ control language="C#" autoeventwireup="true" codefile="CanstarLoanComparison_LiveBroker.ascx.cs" inherits="CMSWebParts_Firstmac_Retail_CanstarLoanComparison_LiveBroker" %>

<script type="text/javascript" src="~/CMSWebParts/Firstmac/Retail/CanstarLoanComparison_LiveBroker_files/CanstarLoanComparison.js"></script>
<link type="text/css" rel="stylesheet" href="~/CMSWebParts/Firstmac/Retail/CanstarLoanComparison_LiveBroker_files/CanstarLoanComparison.css" />

<style type="text/css">
</style>

<div class="CanstarLoanComparison container" id="CanstarLoanComparison">
    <div class="row">
        <div class="col-sm-3 col-xs-12 bg-purple CanstarLoanComparison_Filter">
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
                        </div>
                    </div>
                </div>







                <div class="panel panel-default">
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
                                    <span class="imgCheckbox" data-bind="css: { 'tick': filter_Features_AdditionalRepayments }, click: function () { filter_Features_AdditionalRepayments(!filter_Features_AdditionalRepayments()); }">&nbsp;</span>
                                    Additional repayments
                                </label>
                            </div>

                            <div class="checkbox">
                                <label>
                                    <span class="imgCheckbox" data-bind="css: { 'tick': filter_Features_InterestOnly }, click: function () { filter_Features_InterestOnly(!filter_Features_InterestOnly()); }">&nbsp;</span>
                                    Interest only
                                </label>
                            </div>

                            <div class="checkbox">
                                <label>
                                    <span class="imgCheckbox" data-bind="css: { 'tick': filter_Features_LumpSumRepayments }, click: function () { filter_Features_LumpSumRepayments(!filter_Features_LumpSumRepayments()); }">&nbsp;</span>
                                    Lump sum repayments
                                </label>
                            </div>

                            <div class="checkbox">
                                <label>
                                    <span class="imgCheckbox" data-bind="css: { 'tick': filter_Features_OffsetAccount }, click: function () { filter_Features_OffsetAccount(!filter_Features_OffsetAccount()); }">&nbsp;</span>
                                    Offset account
                                </label>
                            </div>

                            <div class="checkbox">
                                <label>
                                    <span class="imgCheckbox" data-bind="css: { 'tick': filter_Features_PreApproval }, click: function () { filter_Features_PreApproval(!filter_Features_PreApproval()); }">&nbsp;</span>
                                    Pre-approval
                                </label>
                            </div>

                            <div class="checkbox">
                                <label>
                                    <span class="imgCheckbox" data-bind="css: { 'tick': filter_Features_Redraw }, click: function () { filter_Features_Redraw(!filter_Features_Redraw()); }">&nbsp;</span>
                                    Redraw
                                </label>
                            </div>

                            <div class="checkbox">
                                <label>
                                    <span class="imgCheckbox" data-bind="css: { 'tick': filter_Features_SplitLoanOptions }, click: function () { filter_Features_SplitLoanOptions(!filter_Features_SplitLoanOptions()); }">&nbsp;</span>
                                    Split loan options
                                </label>
                            </div>


                        </div>
                    </div>
                </div>







                <div class="panel panel-default">
                    <div class="panel-heading" role="tab" id="headingPurpose">
                        <h4 class="panel-title">
                            <a data-toggle="collapse" data-parent="#accordion" href="#PanelPurpose" aria-expanded="true" aria-controls="PanelPurpose">Purpose
                            <span class="pull-right glyphicon glyphicon-chevron-down">&nbsp;</span></a>
                        </h4>
                    </div>
                    <div id="PanelPurpose" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingPurpose">
                        <div class="panel-body">
                            <div class="checkbox">
                                <label>
                                    <span class="imgCheckbox" data-bind="css: { 'tick': filter_Features_FirstHomeBuyer }, click: function () { filter_Features_FirstHomeBuyer(!filter_Features_FirstHomeBuyer()); }">&nbsp;</span>
                                    First home buyer
                                </label>
                            </div>
                            <div class="checkbox">
                                <label>
                                    <span class="imgCheckbox" data-bind="css: { 'tick': filter_Features_Investment }, click: function () { filter_Features_Investment(!filter_Features_Investment()); }">&nbsp;</span>
                                    Investment
                                </label>

                            </div>
                            <div class="checkbox">
                                <label>
                                    <span class="imgCheckbox" data-bind="css: { 'tick': filter_Features_OwnerOccupier }, click: function () { filter_Features_OwnerOccupier(!filter_Features_OwnerOccupier()); }">&nbsp;</span>
                                    Owner occupier
                                </label>
                            </div>
                        </div>
                    </div>
                </div>











            </div>
            <div class="form-group text-center">
                <button class="btn pull-right custom-button-green" data-bind="click: RefreshResults">Refresh results</button>
            </div>
        </div>
        <div class="col-sm-9 col-xs-12">
            <div class="row hidden-xs">
                <div class="col-sm-12">
                    <h1>Choose and compare home loans</h1>
                    <p>Results are sorted by comparison interest rate.</p>
                </div>
            </div>


            <div class="row" data-bind="visible: feedResults().length < 1 && !isLoading()">
                <div class="col-sm-12" style="padding-top: 26px; color: indianred;">
                    <p>We didn’t find any home loans to match your search. Please try again.</p>
                </div>
            </div>





            <div class="row" data-bind="visible: feedResults().length > 0">
                <div class="col-sm-3 hidden-xs move-padding-right">
                    <!-- LABLES -->
                    <div class="border-bottom tbl-header">&nbsp;<!-- EMPTY --></div>
                    <div class="border-bottom tbl-rate">
                        <label>Interest rate</label>
                    </div>
                    <div class="border-bottom tbl-rate">
                        <label>Comparison rate*</label>
                    </div>
                    <div class="border-bottom tbl-info hidden-xs">

                        <span class="small">*please click <a data-target="#comparisonRateDisclaimer" data-toggle="modal" class="purple-link">here</a> to see how our comparison rates are calculated</span>

                    </div>
                    <div class="tbl-info">
                        <label>Select 2 products:</label><br />
                        <button class="btn btn-default custom-button-orange  hidden-xs" onclick="return CompareLoans(false);">Compare</button>
                    </div>
                </div>
                <div class="col-sm-9 col-xs-12 custPadding">
                    <div class="row" data-bind="foreach: feedResults">
                        <div class="productData col-sm-3 col-xs-6 border-left move-padding-left move-padding-right" data-bind="visible: isVisible()">
                            <div class="text-center border-bottom tbl-header">
                                <span data-bind="text: lender"></span>
                                <br />
                                <br />
                                <span data-bind="text: productName"></span>
                            </div>
                            <div class="text-center border-bottom tbl-rate">
                                <!-- Interest Rate -->
                                <label class="visible-xs">Interest rate</label>
                                <span class="other-product-inRate" data-bind="text: interestRate"></span>
                            </div>
                            <div class="text-center border-bottom tbl-rate">
                                <!-- Comparison rate* -->
                                <label class="visible-xs">Comparison rate*</label>
                                <span class="other-product-coRate" data-bind="text: comparisonRate"></span>
                            </div>
                            <div class="text-center border-bottom tbl-info">
                                <!-- Pre-qualify / Get in touch -->
                                <a class="purple-link" data-bind="attr: { href: '/Products?id=' + productID() }">Details</a><br />
                                <button class="btn btn-default custom-button-purple" data-bind="click: $parent.getInTouch">Get in touch</button>
                            </div>
                            <div class="text-center mobile-border-bottom tbl-info">
                                <div class="checkbox">
                                    <label>
                                        <input type="checkbox" style="display: none;" data-bind="value: $index" />
                                        <span class="imgCheckbox">&nbsp;</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--Button for mobile-->
            <div class="row visible-xs">
                <div class="col-xs-12 text-center">
                    <button class="btn btn-default custom-button-orange  visible-xs-inline-block" onclick="return CompareLoans(false);">Compare</button>
                </div>
            </div>
            <div class="row addMargin" data-bind="visible: feedResults().length > 0">
                <div class="col-sm-12 text-center">
                    <span class="compareScroll_first" data-bind="click: gotoFirst">
                        <img src="/media/LiveBroker/General/previous-button.png" style="margin-right: -6px;" />
                        <img src="/media/LiveBroker/General/previous-button.png" />
                    </span><span class="scrollSpacer">&nbsp;</span>
                    <span class="compareScroll_prev" data-bind="click: gotoPrevious">
                        <img src="/media/LiveBroker/General/previous-button.png" />
                    </span><span class="scrollSpacer">&nbsp;</span>
                    <span class="compareScroll_text">Viewing results <span data-bind="text: paging_viewFrom">1</span> - <span data-bind="    text: paging_viewTo">1</span> of <span data-bind="    text: feedResults().length">1</span>
                    </span><span class="scrollSpacer">&nbsp;</span>
                    <span class="compareScroll_next" data-bind="click: gotoNext">
                        <img src="/media/LiveBroker/General/next-button.png" />
                    </span><span class="scrollSpacer">&nbsp;</span>
                    <span class="compareScroll_last" data-bind="click: gotoLast">
                        <img src="/media/LiveBroker/General/next-button.png" style="margin-right: -6px;" />
                        <img src="/media/LiveBroker/General/next-button.png" />
                    </span>
                </div>
            </div>
        </div>
    </div>

    <!-- Compare Loans Modal -->
    <div aria-hidden="true" class="modal fade" id="CompareLoan_modal" role="dialog" style="display: none;" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content banner-livebroker">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title" id="myModalLabel">Which is the right loan for me?</h4>
                </div>
                <div class="modal-body">
                    <!--<button class="close" data-dismiss="modal" type="button"><span class="glyphicon glyphicon-remove">&nbsp;</span></button>-->
                    <div class="modal-content-box">
                        <div class="row">
                            <div class="col-sm-12">
                                <!--<h2 class="text-center">Which is the right loan for me?</h2>-->
                                <div class="row">
                                    <div class="col-sm-3">
                                        <label>Loan amount</label>
                                    </div>
                                    <div class="col-sm-5">
                                        <input class="form-control" type="text" data-bind="value: loanAmount" />
                                    </div>
                                    <div class="col-sm-4">
                                        <button class="btn custom-button-green" onclick="return CompareLoans(true);">Refresh results</button>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-4" id="CompareP0">
                                <!-- Template Inserts Here -->
                            </div>
                            <div class="col-sm-4 text-center">
                                <div class="text-center">
                                    <h4>&nbsp;</h4>
                                    <p>
                                        &nbsp;<br />
                                        &nbsp;
                                    </p>
                                </div>
                                <div class="text-center">
                                    <h4>Rate</h4>
                                    <h4>Comparison rate</h4>
                                </div>
                                <div class="text-center">
                                    <h4>Monthly repayments</h4>
                                    <h4>Interest per year</h4>
                                </div>
                            </div>
                            <div class="col-sm-4" id="CompareP1">
                                <!-- Template Inserts Here -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


<div id="ComparisionProductTemplate" style="display: none;">
    <div class="text-center">
        <h4>{#Bank}</h4>
        <p>
            {#Product}
        </p>
    </div>
    <div class="text-center">
        <h3>{#Rate}</h3>
        <h3>{#Comp}</h3>
    </div>
    <div class="text-center">
        <h4>{#Repayments}</h4>
        <h4>{#TotalInterest}</h4>
    </div>
    <div class="text-center">
        <button class="btn custom-button-purple" onclick="$('#LoanPurpose_modal').modal('toggle'); return false;">Get in touch</button>
    </div>
</div>
