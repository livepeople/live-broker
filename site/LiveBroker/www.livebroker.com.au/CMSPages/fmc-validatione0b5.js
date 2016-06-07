var FMC_addInvalid=function(n,t){(n.attr("type")=="checkbox"||n.attr("type")=="radio")&&(n=n.parent());n.addClass("invalid");n.parents(".field").addClass("invalid");typeof n.qtip!="undefined"&&n.qtip({content:t,style:{tip:!0,classes:"ui-tooltip-red"},position:{at:"bottom center",my:"top center"}})},FMC_removeInvalid=function(n){(n.attr("type")=="checkbox"||n.attr("type")=="radio")&&(n=n.parent());n.removeClass("invalid");n.parents(".field").removeClass("invalid");typeof n.qtip!="undefined"&&(n.qtip("hide"),n.qtip("disable"))},FMC_checkField=function(n,t){jQuery.parseJSON(t)!=null&&(t=jQuery.parseJSON(t));var u=n.split("$"),f=u[u.length-1],i=jQuery("*[id$='"+f+"']"),r=i.val().trim();return r==""?(FMC_addInvalid(i,t.errorMsg),!1):t.defaultText!=null&&t.defaultText!="undefined"&&r==t.defaultText?(FMC_addInvalid(i,t.errorMsg),!1):t.minlength>-1&&r.length<t.minlength?(FMC_addInvalid(i,t.errorMsg),!1):t.maxlength>-1&&r.length>t.maxlength?(FMC_addInvalid(i,t.errorMsg),!1):(FMC_removeInvalid(i),!0)},FMC_checkFullName=function(n,t){if(FMC_checkField(n,t)){jQuery.parseJSON(t)!=null&&(t=jQuery.parseJSON(t));var r=n.split("$"),u=r[r.length-1],i=jQuery("*[id$='"+u+"']"),f=i.val().trim();return f.trim().indexOf(" ")==-1?(FMC_addInvalid(i,t.errorMsg),!1):(FMC_removeInvalid(i),!0)}},FMC_checkEmail=function(n,t){jQuery.parseJSON(t)!=null&&(t=jQuery.parseJSON(t));var u=n.split("$"),f=u[u.length-1],i=jQuery("*[id$='"+f+"']"),r=i.val().trim();return r==""?(FMC_addInvalid(i,t.errorMsg),!1):t.defaultText!=null&&t.defaultText!="undefined"&&r==t.defaultText?(FMC_addInvalid(i,t.errorMsg),!1):/^([_a-zA-Z0-9-]+)(\.[_a-zA-Z0-9-]+)*@([a-zA-Z0-9-]+\.)+([a-zA-Z]{2,9})$/.test(r)?t.minlength>-1&&r.length<t.minlength?(FMC_addInvalid(i,t.errorMsg),!1):t.maxlength>-1&&r.length>t.maxlength?(FMC_addInvalid(i,t.errorMsg),!1):(FMC_removeInvalid(i),!0):(FMC_addInvalid(i,t.errorMsg),!1)},FMC_checkNumber=function(n,t){jQuery.parseJSON(t)!=null&&(t=jQuery.parseJSON(t));var u=n.split("$"),f=u[u.length-1],i=jQuery("*[id$='"+f+"']"),r=i.val().trim();return r==""?(FMC_addInvalid(i,t.errorMsg),!1):t.defaultText!=null&&t.defaultText!="undefined"&&r==t.defaultText?(FMC_addInvalid(i,t.errorMsg),!1):/^([0-9]+)$/.test(r)?t.minlength>-1&&r.length<t.minlength?(FMC_addInvalid(i,t.errorMsg),!1):t.maxlength>-1&&r.length>t.maxlength?(FMC_addInvalid(i,t.errorMsg),!1):(FMC_removeInvalid(i),!0):(FMC_addInvalid(i,t.errorMsg),!1)},FMC_checkDate=function(n,t){jQuery.parseJSON(t)!=null&&(t=jQuery.parseJSON(t));var u=n.split("$"),f=u[u.length-1],r=jQuery("*[id$='"+f+"']"),i=r.val().trim();return i==""?(FMC_addInvalid(r,t.errorMsg),!1):t.defaultText!=null&&t.defaultText!="undefined"&&i==t.defaultText?(FMC_addInvalid(r,t.errorMsg),!1):validateDate(i)?t.plus18&&(inputDate=new Date(i.split("index.html")[2],i.split("index.html")[1]-1,i.split("index.html")[0]),compareDate=(new Date).setFullYear((new Date).getFullYear()-18),inputDate>compareDate)?(FMC_addInvalid(r,t.errorMsg),!1):t.pastonly&&(inputDate=new Date(i.split("index.html")[2],i.split("index.html")[1]-1,i.split("index.html")[0]),compareDate=new Date,inputDate>=compareDate)?(FMC_addInvalid(r,t.errorMsg),!1):t.futureonly&&(inputDate=new Date(i.split("index.html")[2],i.split("index.html")[1]-1,i.split("index.html")[0]),compareDate=new Date,inputDate<compareDate)?(FMC_addInvalid(r,t.errorMsg),!1):parseInt(i.split("index.html")[2],10)<1e3?(FMC_addInvalid(r,t.errorMsg),!1):(inputDate=new Date(i.split("index.html")[2],i.split("index.html")[1]-1,i.split("index.html")[0]),compareDate=(new Date).setFullYear((new Date).getFullYear()-120),inputDate<compareDate)?(FMC_addInvalid(r,t.errorMsg),!1):(FMC_removeInvalid(r),!0):(FMC_addInvalid(r,t.errorMsg),!1)},FMC_checkCurrency=function(n,t){jQuery.parseJSON(t)!=null&&(t=jQuery.parseJSON(t));var u=n.split("$"),f=u[u.length-1],i=jQuery("*[id$='"+f+"']"),r=i.val().trim().split("$").join("").split(",").join("");return(i.val(r),r=="")?(FMC_addInvalid(i,t.errorMsg),!1):t.defaultText!=null&&t.defaultText!="undefined"&&r==t.defaultText?(FMC_addInvalid(i,t.errorMsg),!1):/^\d{0,9}(\.\d{2})?$/.test(r)?t.minlength>-1&&r.length<t.minlength?(FMC_addInvalid(i,t.errorMsg),!1):t.maxlength>-1&&r.length>t.maxlength?(FMC_addInvalid(i,t.errorMsg),!1):r<0?(FMC_addInvalid(i,t.errorMsg),!1):(FMC_removeInvalid(i),!0):(FMC_addInvalid(i,t.errorMsg),!1)},FMC_checkStreetNumber=function(n,t){jQuery.parseJSON(t)!=null&&(t=jQuery.parseJSON(t));var u=n.split("$"),f=u[u.length-1],i=jQuery("*[id$='"+f+"']"),r=i.val().trim();return r==""?(FMC_addInvalid(i,t.errorMsg),!1):t.defaultText!=null&&t.defaultText!="undefined"&&r==t.defaultText?(FMC_addInvalid(i,t.errorMsg),!1):/^[0-9a-zA-Z\\\/ -]+$/.test(r)?t.minlength>-1&&r.length<t.minlength?(FMC_addInvalid(i,t.errorMsg),!1):t.maxlength>-1&&r.length>t.maxlength?(FMC_addInvalid(i,t.errorMsg),!1):(FMC_removeInvalid(i),!0):(FMC_addInvalid(i,t.errorMsg),!1)},FMC_checkStreetName=function(n,t){jQuery.parseJSON(t)!=null&&(t=jQuery.parseJSON(t));var u=n.split("$"),f=u[u.length-1],i=jQuery("*[id$='"+f+"']"),r=i.val().trim();return r==""?(FMC_addInvalid(i,t.errorMsg),!1):t.defaultText!=null&&t.defaultText!="undefined"&&r==t.defaultText?(FMC_addInvalid(i,t.errorMsg),!1):/^(?!G?PO Box)[a-zA-Z0-9].+/i.test(r)?t.minlength>-1&&r.length<t.minlength?(FMC_addInvalid(i,t.errorMsg),!1):t.maxlength>-1&&r.length>t.maxlength?(FMC_addInvalid(i,t.errorMsg),!1):(FMC_removeInvalid(i),!0):(FMC_addInvalid(i,t.errorMsg),!1)},FMC_keyupNumber=function(n){var t=n.val().trim();/^([0-9]+)$/.test(t)||t==""||n.val(n.attr("oldtext"))},FMC_keyupCurrency=function(n){var t=n.val().trim();/^\d{0,9}(\.\d{2})?$/.test(t)||t==""||n.val(n.attr("oldtext"))},FMC_keyupLettersOnly=function(n){var t=n.val().trim();/^([a-zA-Z- ]+)$/.test(t)||t==""||n.val(n.attr("oldtext"))},FMC_attach_field_blur=function(n){var t,i;for(i in n)t=n[i],t.type=="text"?(jQuery("*[id$='"+i+"']").attr("fmc_validate",'{"minlength": "'+t.minlength+'", "maxlength": "'+t.maxlength+'", "": "'+t.lettersOnly+'", "errorMsg": "'+t.errorMsg+'", "defaultText": "'+t.defaultText+'"}'),jQuery("*[id$='"+i+"']").blur(function(){FMC_checkField(jQuery(this).attr("name"),jQuery(this).attr("fmc_validate"))}),t.lettersOnly&&(jQuery("*[id$='"+i+"']").keyup(function(n){FMC_keyupLettersOnly(jQuery(this),n)}),jQuery("*[id$='"+i+"']").keydown(function(){jQuery(this).attr("oldtext",jQuery(this).val())}))):t.type=="email"?(jQuery("*[id$='"+i+"']").attr("fmc_validate",'{"minlength": "'+t.minlength+'", "maxlength": "'+t.maxlength+'", "errorMsg": "'+t.errorMsg+'", "defaultText": "'+t.defaultText+'"}'),jQuery("*[id$='"+i+"']").blur(function(){FMC_checkEmail(jQuery(this).attr("name"),jQuery(this).attr("fmc_validate"))})):t.type=="number"?(jQuery("*[id$='"+i+"']").attr("fmc_validate",'{"minlength": "'+t.minlength+'", "maxlength": "'+t.maxlength+'", "errorMsg": "'+t.errorMsg+'", "defaultText": "'+t.defaultText+'"}'),jQuery("*[id$='"+i+"']").blur(function(){FMC_checkNumber(jQuery(this).attr("name"),jQuery(this).attr("fmc_validate"))}),jQuery("*[id$='"+i+"']").keyup(function(n){FMC_keyupNumber(jQuery(this),n)}),jQuery("*[id$='"+i+"']").keydown(function(){jQuery(this).attr("oldtext",jQuery(this).val())})):t.type=="currency"?(jQuery("*[id$='"+i+"']").attr("fmc_validate",'{"minlength": "'+t.minlength+'", "maxlength": "'+t.maxlength+'", "errorMsg": "'+t.errorMsg+'", "defaultText": "'+t.defaultText+'"}'),jQuery("*[id$='"+i+"']").blur(function(){FMC_checkCurrency(jQuery(this).attr("name"),jQuery(this).attr("fmc_validate"))}),jQuery("*[id$='"+i+"']").keyup(function(n){FMC_keyupCurrency(jQuery(this),n)}),jQuery("*[id$='"+i+"']").keydown(function(){jQuery(this).attr("oldtext",jQuery(this).val())})):t.type=="date"?(jQuery("*[id$='"+i+"']").attr("fmc_validate",'{"plus18": "'+t.plus18+'", "pastonly": "'+t.pastonly+'", "furuteonly": "'+t.furuteonly+'", "errorMsg": "'+t.errorMsg+'", "defaultText": "'+t.defaultText+'"}'),jQuery("*[id$='"+i+"']").blur(function(){FMC_checkDate(jQuery(this).attr("name"),jQuery(this).attr("fmc_validate"))})):t.type=="streetnumber"?(jQuery("*[id$='"+i+"']").attr("fmc_validate",'{"minlength": "'+t.minlength+'", "maxlength": "'+t.maxlength+'", "errorMsg": "'+t.errorMsg+'", "defaultText": "'+t.defaultText+'"}'),jQuery("*[id$='"+i+"']").blur(function(){FMC_checkStreetNumber(jQuery(this).attr("name"),jQuery(this).attr("fmc_validate"))})):t.type=="streetname"&&(jQuery("*[id$='"+i+"']").attr("fmc_validate",'{"minlength": "'+t.minlength+'", "maxlength": "'+t.maxlength+'", "errorMsg": "'+t.errorMsg+'", "defaultText": "'+t.defaultText+'"}'),jQuery("*[id$='"+i+"']").blur(function(){FMC_checkStreetName(jQuery(this).attr("name"),jQuery(this).attr("fmc_validate"))}))},validateDate;(function($){var escapeable=/["\\\x00-\x1f\x7f-\x9f]/g,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"};jQuery.toJSON=typeof JSON=="object"&&JSON.stringify?JSON.stringify:function(n){var t,c,h,l,v,a,r;if(n===null)return"null";if(t=typeof n,t==="undefined")return undefined;if(t==="number"||t==="boolean")return""+n;if(t==="string")return jQuery.quoteString(n);if(t==="object"){if(typeof n.toJSON=="function")return jQuery.toJSON(n.toJSON());if(n.constructor===Date){var u=n.getUTCMonth()+1,f=n.getUTCDate(),y=n.getUTCFullYear(),e=n.getUTCHours(),o=n.getUTCMinutes(),s=n.getUTCSeconds(),i=n.getUTCMilliseconds();return u<10&&(u="0"+u),f<10&&(f="0"+f),e<10&&(e="0"+e),o<10&&(o="0"+o),s<10&&(s="0"+s),i<100&&(i="0"+i),i<10&&(i="0"+i),'"'+y+"-"+u+"-"+f+"T"+e+":"+o+":"+s+"."+i+'Z"'}if(n.constructor===Array){for(c=[],h=0;h<n.length;h++)c.push(jQuery.toJSON(n[h])||"null");return"["+c.join(",")+"]"}a=[];for(r in n){if(t=typeof r,t==="number")l='"'+r+'"';else if(t==="string")l=jQuery.quoteString(r);else continue;(t=typeof n[r],t!=="function"&&t!=="undefined")&&(v=jQuery.toJSON(n[r]),a.push(l+":"+v))}return"{"+a.join(",")+"}"}};jQuery.evalJSON=typeof JSON=="object"&&JSON.parse?JSON.parse:function(src){return eval("("+src+")")};jQuery.secureEvalJSON=typeof JSON=="object"&&JSON.parse?JSON.parse:function(src){var filtered=src.replace(/\\["\\\/bfnrtu]/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"");if(/^[\],:{}\s]*$/.test(filtered))return eval("("+src+")");throw new SyntaxError("Error parsing JSON, source is not valid.");};jQuery.quoteString=function(n){return n.match(escapeable)?'"'+n.replace(escapeable,function(n){var t=meta[n];return typeof t=="string"?t:(t=n.charCodeAt(),"\\u00"+Math.floor(t/16).toString(16)+(t%16).toString(16))})+'"':'"'+n+'"'}})(jQuery);validateDate=function(n){var i=n.match(/^((?:3[0-1])|(?:[0-2]?[0-9]))[\/](1[0-2]|0?[0-9])[\/]([0-9][0-9][0-9][0-9])$/);if(i==null||i.length===0)return!1;var r=parseInt(i[1],10),t=parseInt(i[2],10),u=parseInt(i[3],10);if(r<=0||t<=0||u<=0||(t==4||t==6||t==9||t==11)&&r>30||(t==1||t==3||t==5||t==7||t==8||t==10||t==11)&&r>31)return!1;if(t==2){var f=u%4==0,e=u%100==0,o=u%400==0;if(!f&&r>28||f&&(o||!e)&&r>29)return!1}return!0}