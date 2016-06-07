var CompareLoans = function () {
    localStorage.LB_InterestRateType = jQuery(".comparision-feeder input[name='interestRateType']:checked").val();
    var loanAmount = jQuery(".comparision-feeder input[name='loanAmountValue']").val();
    if (isNaN(parseInt(loanAmount, 10)) || loanAmount.trim() == "") {
        alert("Please enter a loan amount without cents");
        return false;
    }
    localStorage.LB_LoanAmount = loanAmount;
    return true;
};
jQuery(document).ready(function () {
    if (localStorage.getItem("LB_InterestRateType") != null) {
        jQuery(".comparision-feeder input[name='interestRateType'][value='" + localStorage.LB_InterestRateType + "']").prop("checked", true);
    }
    if (localStorage.getItem("LB_LoanAmount") != null) {
        jQuery(".comparision-feeder input[name='loanAmountValue']").val(localStorage.LB_LoanAmount);
    }
});