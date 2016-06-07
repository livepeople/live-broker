function totalCheckABN(n){jQuery.tcServiceEndpoint="/abn";var t={criteria:{abn:"",businessName:"",postcode:"",state:""},beforeSend:function(){},onComplete:function(){}},n=jQuery.extend(t,n),i=this;return jQuery.ajax({dataType:"json",url:jQuery.endPoint+jQuery.tcServiceEndpoint,data:{abn:n.criteria.abn,business_name:n.criteria.businessName,postcode:n.criteria.postcode,state:n.criteria.state},beforeSend:function(){n.beforeSend()},success:function(t){n.onComplete(t)}}),this}function totalCheckEmail(n){$.tcServiceEndpoint="/email";var t={criteria:{email:""},beforeSend:function(){},onComplete:function(){}},n=$.extend(t,n);return jQuery.ajax({dataType:"json",url:$.endPoint+$.tcServiceEndpoint,async:!0,cache:!0,data:{email_address:n.criteria.email},beforeSend:function(){n.beforeSend()},success:function(t){t&&(t.email_valid||t.result&&t.result.email_valid)||(t={email_valid:"VALID",mailserver_exists:"UNKNOWN"});n.onComplete(t)}}),this}function totalCheckPhone(n){$.tcServiceEndpoint="/phone";var t={criteria:{number:"",country:"AU"},beforeSend:function(){},onComplete:function(){}},n=jQuery.extend(t,n),i=this;return jQuery.ajax({dataType:"json",url:$.endPoint+$.tcServiceEndpoint,async:!0,cache:!0,data:{number:n.criteria.number,country:n.criteria.country},beforeSend:function(){n.beforeSend()},success:function(t){t&&(t.phone_status||t.result&&t.result.phone_status)||(t={phone_status:"UNKNOWN",country_code:n.criteria.country});n.onComplete(t)}}),this}function totalCheckReversePhoneNumber(n){jQuery.tcServiceEndpoint="/reverse_phone";var t={includePaf:!1,criteria:{phoneNumber:""},beforeSend:function(){},onComplete:function(){}},n=jQuery.extend(t,n),i=this;return jQuery.ajax({dataType:"json",url:jQuery.endPoint+jQuery.tcServiceEndpoint,data:{phone_number:n.criteria.phoneNumber,include_paf:n.includePaf},beforeSend:function(){n.beforeSend()},success:function(t){n.onComplete(t)}}),this}function totalCheckDNCR(n){jQuery.tcServiceEndpoint="/dncr";var t={criteria:{number:""},beforeSend:function(){},onComplete:function(){}},n=jQuery.extend(t,n);return jQuery.ajax({dataType:"json",url:jQuery.endPoint+jQuery.tcServiceEndpoint,data:{number:n.criteria.number},beforeSend:function(){n.beforeSend()},success:function(t){n.onComplete(t)}}),this}$.endPoint="/API/TotalCheckProxy/api/Validation";jQuery.fn.totalCheckSearchAddress=function(n){var r,i,t;jQuery.tcServiceEndpoint="/address";var u=null,e={title:"Search Address",includePaf:!0,includeListing:!0,nameMinLength:2,criteria:{listingType:"",country:"AU"},mode:"formatted",onSelectAddress:function(){}},n=jQuery.extend(e,n),f=this;jQuery("#searchAddressModal").length!=0&&jQuery("#searchAddressModal").remove();r="<!-- Address SearchModal --> \t\t<div id='searchAddressModal' class='totalcheck modal hide fade' tabindex='-1' role='dialog' aria-labelledby='searchAddressModalLabel' aria-hidden='true'> \t\t  <div class='modal-header'> \t\t\t<button type='button' class='close' data-dismiss='modal' aria-hidden='true'>X<\/button> \t\t\t<h3 id='myModalLabel'>"+n.title+"<\/h3> \t\t  <\/div> \t\t  <div class='modal-body'>";r+=n.criteria.country=="NZ"?"<p><label>Name<\/label><input type='text' placeholder='Name' data-address-attr='primary_name' /><\/p> \t\t\t<div class='row'><div class='span3'><label>Address<\/label><input type='text' placeholder='Address' class='searchAddressInput' data-address-attr='street_address' /><\/div> \t\t\t<div class='span3'><label>Suburb<\/label><input type='text' placeholder='Suburb' class='searchAddressInput' data-address-attr='suburb' /><\/div><\/div> \t\t\t<div class='row'><div class='span3'><label>City<\/label><input type='text' placeholder='City' class='searchAddressInput' data-address-attr='city' /><\/div> \t\t\t<div class='span3'><label>Postcode<\/label><input type='text' placeholder='Postcode' class='searchAddressInput' data-address-attr='postcode' /><\/div><\/div>":"<p><label>Name<\/label><input type='text' placeholder='Name' data-address-attr='primary_name' /><\/p> \t\t\t<p><label>Address<\/label><input type='text' placeholder='Address' class='searchAddressInput' data-address-attr='formatted_address' /><\/p>";r+="<div id='searchAddressResultsContainer'><table id='searchAddressResults'><tbody><\/tbody><\/table><\/div> \t\t  <\/div> \t\t  <div class='modal-footer'> \t\t\t<button class='btn' data-dismiss='modal' aria-hidden='true'>Close<\/button> \t\t  <\/div> \t\t<\/div>";f.after(r);jQueryaddressContainer=jQuery("#searchAddressModal");i=jQueryaddressContainer.find('*[data-address-attr="primary_name"]');t={formatted_address:jQueryaddressContainer.find('*[data-address-attr="formatted_address"]'),street_address:jQueryaddressContainer.find('*[data-address-attr="street_address"]'),suburb:jQueryaddressContainer.find('*[data-address-attr="suburb"]'),city:jQueryaddressContainer.find('*[data-address-attr="city"]'),postcode:jQueryaddressContainer.find('*[data-address-attr="postcode"]'),country:jQueryaddressContainer.find('*[data-address-attr="country"]')};n.criteria.country!="NZ"&&i.length>0&&i.totalCheckName({listingType:n.criteria.listingType,minLength:n.nameMinLength});jQueryaddressContainer.find(".searchAddressInput").keyup(function(){jQuery.ajax({url:jQuery.endPoint+"/address",data:{listing_type:n.criteria.listingType,primary_name:i.length>0?i.val():"",formatted_address:t.formatted_address.length>0?t.formatted_address.val():"",street_address:t.street_address.length>0?t.street_address.val():"",suburb:t.suburb.length>0?t.suburb.val():"",city:t.city.length>0?t.city.val():"",postcode:t.postcode.length>0?t.postcode.val():"",country:n.criteria.country,search_result_id:u,include_paf:n.includePaf,include_listing:n.includeListing},dataType:"json",success:function(n){jQuery("#searchAddressResults tbody").html("");n.result_count==0?jQuery("#searchAddressResults tbody").append("<tr><td>No results found<\/td><td><\/td><\/tr>"):jQuery.each(n.results,function(n,t){var i="<tr data-contains-subpremise='"+t.contains_subpremises+"' data-result-id='"+t.search_result_id+"'><td>"+t.formatted_address+"<\/td><td>";t.is_listing&&(i+="<i class='tc-icon-listing' style='float:right; font-size:14px; color: #0055C3;'>(S)<\/i>");t.contains_subpremises&&(i+="<i class='tc-icon-subpremise'><\/i>");i+="<\/td><\/tr>";jQuery("#searchAddressResults tbody").append(i)});u=null}})});jQuery("#searchAddressResults").on("click","tr",function(){var r=jQuery(this).attr("data-contains-subpremise")=="true",i=jQuery(this).attr("data-result-id");r?(u=i,n.criteria.country=="NZ"?t.street_address.trigger("keyup"):t.formatted_address.trigger("keyup")):jQuery.getJSON(jQuery.endPoint+"/address/"+i,function(t){n.onSelectAddress(t);jQueryaddressContainer.modal("hide")})});return jQueryaddressContainer.modal(n),i.focus(),f};jQuery.fn.totalCheckAddress=function(n){var u=null,o={includePaf:!0,includeListing:!0,addressMinLength:0,nameMinLength:2,delay:200,limit:10,criteria:{country:"AU",postcode:"",state:"",city:"",listingType:""},onSelectAddress:function(){},onSelectName:function(){}},n=jQuery.extend(o,n),i=this,r=i.find('*[data-address-attr="primary_name"]'),t,e,f;if(n.includePaf==!1&&r.length==0||n.includeListing==!0&&r.length==0)return console.error("TC Error: Address autocomplete requires a primary name element if configured to exclude PAF"),this;t={subpremise:i.find('*[data-address-attr="subpremise"]'),street_number:i.find('*[data-address-attr="street_number"]'),street_name:i.find('*[data-address-attr="street_name"]'),street_type:i.find('*[data-address-attr="street_type"]'),suburb:i.find('*[data-address-attr="suburb"]'),state:i.find('*[data-address-attr="state"]'),city:i.find('*[data-address-attr="city"]'),postcode:i.find('*[data-address-attr="postcode"]'),street_address:i.find('*[data-address-attr="street_address"]'),formatted_address:i.find('*[data-address-attr="formatted_address"]'),country:i.find('*[data-address-attr="country"]')};r.length>0&&r.totalCheckName({listingType:n.criteria.listingType,limit:n.limit,minLength:n.nameMinLength,onSelect:n.onSelectName});for(e in t)(f=t[e],f.length!=0)&&(f.autocomplete({source:function(i,f){jQuery.ajax({url:jQuery.endPoint+"/address",data:{listing_type:n.criteria.listingType,primary_name:r.length>0?r.val():"",subpremise:t.subpremise.length>0?t.subpremise.val():"",street_number:t.street_number.length>0?t.street_number.val():"",street_name:t.street_name.length>0?t.street_name.val():"",street_type:t.street_type.length>0?t.street_type.val():"",street_address:t.street_address.length>0?t.street_address.val():"",formatted_address:t.formatted_address.length>0?t.formatted_address.val():"",suburb:t.suburb.length>0?t.suburb.val():"",state:n.criteria.state!=""&&t.state.length==0?n.criteria.state:t.state.val(),city:n.criteria.city!=""&&t.city.length==0?n.criteria.city:t.city.val(),postcode:n.criteria.postcode!=""&&t.postcode.length==0?n.criteria.postcode:t.postcode.val(),country:n.criteria.country!=""&&t.country.length==0?n.criteria.country:t.country.val(),search_result_id:u,include_paf:n.includePaf,include_listing:n.includeListing},dataType:"json",success:function(t){u=null;f(jQuery.map(t.results.slice(0,n.limit),function(n){return{value:n.street_address,label:n.formatted_address,contains_subpremises:n.contains_subpremises,search_result_id:n.search_result_id,street_address:n.street_address,formatted_address:n.formatted_address,postcode:n.postcode,suburb:n.suburb,state:n.state,city:n.city,is_listing:n.is_listing,data:n}}))}})},delay:n.delay,minLength:n.addressMinLength,search:function(){if(n.includePaf==!1&&r.val()=="")return!1},open:function(){jQuery(".ui-menu").width(366)},select:function(i,r){if(i.keyCode==9)return!1;r.item.contains_subpremises?u=r.item.search_result_id:jQuery.getJSON(jQuery.endPoint+"/address/"+r.item.data.search_result_id,function(i){t.subpremise.val(i.result.subpremise);t.street_number.val(i.result.street_number);t.street_name.val(i.result.street_name);t.street_type.val(i.result.street_type);t.suburb.val(i.result.suburb);t.postcode.val(i.result.postcode);t.state.val(i.result.state);t.street_address.val(i.result.street_address);t.formatted_address.val(i.result.formatted_address);n.onSelectAddress(f,i);return!1})},close:function(){u!=null&&jQuery(this).autocomplete("search")},create:function(){jQuery(".ui-autocomplete").wrap('<span class="totalcheck"><\/span>')},messages:{noResults:"",results:function(){}}}).bind("focus",function(){var n=jQuery(this);setTimeout(function(){n.autocomplete("search");isNameSelected=!1},100)}).data("ui-autocomplete")._renderItem=function(n,t){var i="<a><table width='100%'><tr><td>";return i+=t.label+"<\/td><td width='60' valign='middle'>",t.is_listing&&(i+="<i class='tc-icon-listing' style='float:right; font-size:14px; color: #0055C3;'>(S)<\/i>"),t.contains_subpremises&&(i+="<i class='tc-icon-subpremise'><\/i>"),i+="<\/td><\/tr><\/table><\/a>",jQuery("<li>").append(i).appendTo(n)});return this};jQuery.fn.totalCheckName=function(n){var i={listingType:"",minLength:2,limit:10,criteria:{country:"AU"},onSelect:function(){},mapping:{}},n=jQuery.extend(i,n),r=this,t={country:r.find('*[data-address-attr="country"]')};return this.each(function(){var i=jQuery(this);i.autocomplete({source:function(r,u){jQuery.ajax({url:jQuery.endPoint+"/name",data:{listing_type:n.listingType,primary_name:i.val(),fuzzy_search:n.fuzzy_search,country:n.criteria.country!=""&&t.country.length==0?n.criteria.country:t.country},dataType:"json",success:function(t){u(jQuery.map(t.results.slice(0,n.limit),function(n){return{label:n.primary_name,value:n.primary_name,data:n}}))}})},minLength:n.minLength,select:function(t,i){return n.onSelect(jQuery(this),i.item.data)},create:function(){jQuery(".ui-autocomplete").wrap('<span class="totalcheck"><\/span>')},messages:{noResults:"",results:function(){}}})})}