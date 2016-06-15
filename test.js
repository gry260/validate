(function ($) {
        $.fn.formValidate = function (options) {
            var ret = this.each(function () {
                        var selObj = this; // the original select object.
                        var $selObj = $(this); // the original select object.
                        var sumo = {
                            init: function () {
                                var that = this;
                                var count = 0;
                                $selObj.focusout(function () {
                                    if ($(this).val()) {
                                        var msg = '';
                                        msg = typeof($(this).attr("data-type")) !== "undefined" ? that.validateType($(this).attr("data-type")) : '';
                                        msg += typeof($(this).attr("data-chars")) !== "undefined"  ? that.validate($(this).attr("data-chars")) : '';
                                        msg += typeof($(this).attr("data-minlength")) !== "undefined"  ? that.validateMinLength($(this).attr("data-minlength")) : '';
                                        msg += typeof($(this).attr("data-maxlength")) !== "undefined"  ? that.validateMaxLength($(this).attr("data-maxlength")) : '';
                                        msg += typeof($(this).attr("data-regex")) !== "undefined"  ? that.validateRegex($(this).attr("data-regex")) : '';
                                        if(typeof($(this).attr("data-msg")) !== "undefined" && msg) msg = $(this).attr("data-msg");
                                        if(msg){
                                            $selObj.css("background-color", "#f2dede");
                                            $selObj.popover({
                                                placement: "bottom",
                                                content: function () {
                                                    return msg;
                                                }
                                            }).popover('show');
                                            $selObj.addClass("alert-danger");
                                        }
                                    }
                                    else {
                                        $selObj.css("background-color", "#ffffff");
                                        $selObj.popover("hide");
                                        $selObj.removeClass("alert-danger");
                                    }
                                }).focus(function () {
                                    $selObj.css("background-color", "#ffffff");
                                    $selObj.popover("hide");
                                    $selObj.removeClass("alert-danger");
                                }).change(function () {
                                    if ($selObj.is("select")) {
                                        $selObj.css("background-color", "#ffffff");
                                        $selObj.popover("hide");
                                        $selObj.removeClass("alert-danger");
                                    }
                                });
                            },

                            validate: function (chars) {
                                var that = this;
                                var chars = JSON.parse(chars);
                                var alphaExp = '[0-9a-zA-Z\S';
                                if (chars) {
                                    for (key in chars) {
                                        alphaExp += '\\' + chars[key];
                                    }
                                }
                                alphaExp += ']';
                                var str = $selObj.val().replace(new RegExp(alphaExp, 'g'), "");
                                if (/\S/.test(str))
                                    return "This field contains invalid characters. Please remove the following characters: " + $selObj.val().replace(new RegExp(alphaExp, 'g'), "");
                            },

                            validateRegex:function(regex) {
                                var patt = new RegExp(regex);
                                var res = patt.test($selObj.val());
                                return res === false  ? "The Javascript regular expression to not match a word." : '';
                            },

                            validateMinLength:function(min) {
                                return $selObj.val().length < min  ? "This field requires minimum "+min+" characters." : '';
                            },

                            validateMaxLength:function(max) {
                                return $selObj.val().length > max  ? "This characters in this field cannot be more than  "+max+" characters." : '';
                            },

                            validateType: function (type) {
                                var that = this;
                                switch (type) {
                                    case "email":
                                        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test($selObj.val()))
                                            return '';
                                        else
                                            return "Your email is not in the right format. Please provide a correct email.";
                                        break;
                                    case "zip":
                                        if (/^[0-9]{5}$/.test($selObj.val()))
                                            return '';
                                        else
                                            return "The field only allows 5 integers.";
                                        break;
                                    case "integer":
                                        if (that.isInteger($selObj.val()))
                                            return '';
                                        else
                                            return "The field only allows integers.";
                                        break;
                                    case "double":
                                        if ($.isNumeric($selObj.val()))
                                            return '';
                                        else
                                            return "The field is only allows numeric characters.";
                                        break;
                                }

                            },
                            isInteger: function (x) {
                                return x % 1 === 0;
                            }
                        }
                        sumo.init();
                    }
                );
        }
    }
    (jQuery)
);


