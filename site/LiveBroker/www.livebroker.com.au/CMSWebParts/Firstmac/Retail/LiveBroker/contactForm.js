

jQuery(document).ready(function () {
    jQuery(".loan-purpose-selection").click(function () {
        global_loanPurpose = jQuery(this).val();
        jQuery("#Calendar_modal").modal('show');

        initialiseContactForm(this);
    });
})

var initialiseContactForm = function (elem) {
    var $elem = $(elem);
    var loanPurposeId = $elem.attr('data-loan-purpose-id');
    var loanPurposeDescription = $elem.attr('data-loan-purpose');
    jQuery("[id$='LoanPurposeTypeIdHdn']").val(loanPurposeId);
    jQuery("[id$='LoanPurposeDescriptionHdn']").val(loanPurposeDescription);
}