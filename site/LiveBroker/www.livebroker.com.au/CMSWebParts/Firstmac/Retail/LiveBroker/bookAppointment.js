var externalLeadId = '';

jQuery(document).ready(function () {
    initialiseEvents();    
});

var initialisePage = function (externalLeadId) {
    initialiseEvents();
    initialiseAppointments(externalLeadId);
}

var initialiseEvents = function () {
    jQuery("#next-button").click(function () {
        jQuery("#modalSetContactNumber").modal('show');
    });
    jQuery("#modalSetContactNumber").on("click", ".submit", function () {
        var $modal = jQuery("#modalSetContactNumber");
        $modal.modal('hide');
        jQuery(".state-panel").hide();
        jQuery("#submitting-panel").show();
    });
}

var initialiseAppointments = function (externalLeadId) {
    if (typeof (externalLeadId) === undefined) {
        externalLeadId = jQuery("#hdnExternalLeadID").val();
    }
    formatDates(jQuery(document));
    
    var defaultStart = jQuery("#defaultStartDate").val();
    var defaultEnd = jQuery("#defaultEndDate").val();
    var appointmentSlotsUrl = jQuery("#appointmentSlotsUrl").val();
    var numDays = jQuery("#defaultNumDays").val();
    appointmentSlotsUrl = appointmentSlotsUrl
        .replace('START_PLACEHOLDER', defaultStart)
        .replace('END_PLACEHOLDER', defaultEnd)
        .replace('LEADID_PLACEHOLDER', externalLeadId)
        .replace('NUMDAYS_PLACEHOLDER', numDays);

    loadAppointments(appointmentSlotsUrl, jQuery(".appointment-slots-container"));
        
}

var setAppointmentConfirmationDetails = function (details) {
    var format = 'dddd, Do MMMM, hh:mm A';
    var start = moment(details.start).format(format);
    var end = moment(details.end).format(format);

    jQuery(".assignee-first-name").not(":input").html(details.assigneeFirstName);
    jQuery("input.assignee-first-name").val(details.assigneeFirstName);
    jQuery(".assignee-last-name").not(":input").html(details.assigneeLastName);
    jQuery("input.assignee-last-name").val(details.assigneeLastName);
    jQuery(".appointment-start").not(":input").html(start);
    jQuery("input.appointment-start").val(start);
    jQuery(".appointment-end").not(":input").html(end);
    jQuery("input.appointment-end").val(end);
    jQuery(".loan-purpose").hide();
    jQuery(".loan-purpose." + details.loanPurpose).show();
    jQuery("img.assignee-portrait").error(function () {
        var $this = jQuery(this);
        $this.off("error"); //remove this error handler to avoid loop in case this handler errors
        this.src = '/media/LiveBroker/Banners/portrait-default.png';
    });
    jQuery("img.assignee-portrait").attr("src", "/media/LiveBroker/Banners/" + details.assigneeFirstName.toLowerCase() + details.assigneeLastName.toLowerCase() + ".png");
}

var showWaitingUi = function () {
    jQuery(".state-panel").hide();
    jQuery("#waitingPanel").show();
    if (typeof disableExitDetection == 'function') {
        disableExitDetection(true);
    }
}

var hideWaitingUi = function () {
    jQuery("div#waitingPanel").hide();
}


