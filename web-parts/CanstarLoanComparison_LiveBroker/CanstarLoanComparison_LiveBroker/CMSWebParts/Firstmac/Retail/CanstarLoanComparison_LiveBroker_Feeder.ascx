<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMSWebParts_CanstarLoanComparison_LiveBroker_Feeder" CodeFile="CanstarLoanComparison_LiveBroker_Feeder.ascx.cs" %>

<script type="text/javascript" src="~/CMSWebParts/Firstmac/Retail/CanstarLoanComparison_LiveBroker_Feeder_files/script.js"></script>

<div class="comparision-feeder">
    <div class="row">
        <div class="col-sm-12">
            <h1 class="content-heading text-center" style="color: #FFF;">Compare loans</h1>
        </div>
    </div>

    <div class="row addMargin compareLoans">
        <div class="col-sm-12">
            <p class="content-text text-center" style="color: #FFF; font-size: 17px;">How much do you want to borrow?</p>
        </div>

        <div class="compareLoan-container">
            <div class="row">
                <div class="col-sm-6 form-group">
                    <input class="form-control custom-inputbox" type="text" name="loanAmountValue" value="250000" />
                </div>
                <div class="col-sm-6 text-center">
                    <a href="/Choose-and-Compare" class="btn btn-custom-green icon-magnifyer" style="padding-top: 10px;" onclick="return CompareLoans()">Find me a loan</a>
                </div>
            </div>
        </div>

        <div class="row" style="margin-top: 15px;">
            <div class="col-sm-12 text-center mobile-alignment">
                <label class="custom-checkbox">
                    <input type="radio" name="interestRateType" value="variable" />
                    <span class="checkbox-ui">&nbsp;</span>Variable rate
                </label>
                <label class="custom-checkbox">
                    <input type="radio" name="interestRateType" value="fixed" />
                    <span class="checkbox-ui">&nbsp;</span>Fixed rate
                </label>
                <label class="custom-checkbox">
                    <input type="radio" name="interestRateType" value="any" checked="checked" />
                    <span class="checkbox-ui">&nbsp;</span>Look at fixed and variable
                </label>
            </div>
        </div>
    </div>
</div>
