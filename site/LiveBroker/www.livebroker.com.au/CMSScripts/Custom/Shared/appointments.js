
var loadAppointments = function (url, container) {
	jQuery("#BookSelectedTime_Submit").attr("disabled", "disabled");
	container.html("<div class='col-sm-12 text-center'><img src='/media/LiveBroker/General/spinner.gif' style='margin-top: 40px;'></div>");
	jQuery.ajax(url, {
		success: function (result) {
		    try {
		        container.find(".modal-open").modal('hide');
				container.html(jQuery(result).find("#bookAppointmentWrapper").html());
			} catch (e) { }
			wireEvents(container);
			formatDates(container);
		    //move the modal contact number pop up outside of the current popup if applicable.
			var $modalParent = $("#modalSetContactNumber")
                .closest(".modal") //modal container of set contact number, skip this one and look for any other modal containers
                .parent() //.closest checks current node, so get parent before the search
                .closest(".modal").parent();
			if ($modalParent.length > 0) {
			    $modalParent.children("#modalSetContactNumber").remove();
			    $("#modalSetContactNumber").appendTo($modalParent);
			}
		},
		error: function (result) {
			wireEvents(container);
			formatDates(container);
		}
	})
}

var formatDates = function (scope) {
	jQuery(".time-pill", scope).each(function (elem) {
		var $this = jQuery(this);
		var start = moment($this.attr("data-appointment-start-time"));
		var end = moment($this.attr("data-appointment-end-time"));

		$this.html(start.format("h:mma") + " - " + end.format("h:mma"))
	});

	jQuery("[data-date]", scope).each(function (elem) {
		var $this = jQuery(this);
		var date = moment($this.attr('data-date'));
		var format = $this.attr('data-date-format');
		var dateStr = '';
		if (format) {
			dateStr = date.format(format);
		} else {
			dateStr = date.ToString();
		}
		$this.html(dateStr);
	});
}

var wireEvents = function (container) {

	var isTomorrow = function (aDate, tDate) {
		if (aDate.date() == tDate.date() && aDate.month() == tDate.month() && aDate.year() == tDate.year()) {
			return true;
		}
		return false
	}
	jQuery(".book-selection").attr('disabled', 'disabled');

	jQuery(".appointment-selection[type='checkbox']", container).change(function () {
		//var container = $this.closest(".appointment-scheduler");
		jQuery(".appointment-selection[type='checkbox']").not(this).prop('checked', false);

		var startDate = '';
		var endDate = '';
		var $this = jQuery(this);
		if ($this.prop('checked')) {
			startDate = $this.attr("data-appointment-start-time");
			endDate = $this.attr("data-appointment-end-time");
			jQuery(".book-selection").removeAttr('disabled');
		} else {
			jQuery(".book-selection").attr('disabled', 'disabled');
		}
		jQuery("#selected-appointment-start>input[type='hidden']").val(startDate);
		jQuery("#selected-appointment-end>input[type='hidden']").val(endDate);


		if (jQuery(this).prop('checked') == true) {
			jQuery("#BookSelectedTime_Submit").removeAttr("disabled");
		} else {
			jQuery("#BookSelectedTime_Submit").attr("disabled", "disabled");
		}

		//format date for confirmation panel
		jQuery(".calltime").html(moment(startDate).format("h:mm a") + " - " + moment(endDate).format("h:mm a"));
		var outDate = '';
		if (isTomorrow(moment(startDate), moment().add('days', 1))) {
			outDate = "tomorrow";
		} else {
			outDate = "on " + moment(startDate).format("dddd D MMMM");
		}
		jQuery(".callDate").html(outDate);
	});
	jQuery("a.appointment-range-nav").click(function (event) {
		event.preventDefault();
		loadAppointments(jQuery(this).attr("href"), jQuery(this).closest(".appointment-slots-container"));
	});
	jQuery(".submit").click(function (evt) {
		var actionContainer = jQuery(this).closest("hardsell-action");
		if (!validate(actionContainer)) {
			evt.preventDefault();
			return false;
		}
	});
	jQuery('.opt_checkbox').click(function () {
		jQuery('.opt_checkbox.selected').not(this).removeClass('selected');
		jQuery(".appointment-selection[type='checkbox']").prop('checked', false);
		jQuery(this).toggleClass('selected');
		var chkBox = jQuery(this).parent().find("input[type='checkbox']");
		if (jQuery(this).hasClass('selected')) {
			chkBox.prop('checked', true);
		}
		chkBox.trigger('change');
	});
	$(".accordion").accordion({ header: ".dayPartHeader", collapsible: true, active:false });
}

var validate = function (container) {
	var valid = true;
	hideError();

	jQuery(".phone-number").each(function (i, elem) {
		if (!FMC_checkMobileNumber_totalCheck(elem.id, jQuery.toJSON(ValidationSettings["phone-number-total-check"]), null, 'AU', false)) {
			valid = false;
			showError(container, ValidationSettings["phone-number-total-check"].errorMsg);
		} else {
			hideError(container);
		}
	});
	return valid;
}

var showError = function (container, errorMessage) {
	jQuery(".error-message", container).html(errorMessage);
	jQuery(".form-error").show();
}
var hideError = function (container) {
	jQuery(".form-error").hide();
}

var ValidationSettings = {
	"phone-number-total-check": {
		"errorMsg": "Can you check that the number you entered is correct? Please enter a valid mobile phone number."
	}
};
