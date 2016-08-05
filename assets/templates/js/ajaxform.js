var AjaxForm = {

    initialize: function(afConfig) {
        if(!jQuery().ajaxForm) {
            document.write('<script src="'+afConfig.assetsUrl+'js/lib/jquery.form.min.js"><\/script>');
        }
        if(!jQuery().jGrowl) {
            document.write('<script src="'+afConfig.assetsUrl+'js/lib/jquery.jgrowl.min.js"><\/script>');
        }

        $(document).ready(function() {
            $.jGrowl.defaults.closerTemplate = '<div>[ '+afConfig.closeMessage+' ]</div>';
        });

        $(document).on('submit', afConfig.formSelector, function(e) {
            $(this).ajaxSubmit({
                dataType: 'json'
                ,data: {pageId: afConfig.pageId}
                ,url: afConfig.actionUrl
                ,beforeSerialize: function(form, options) {
                    form.find(':submit').each(function() {
                        if (!form.find('input[type="hidden"][name="' + $(this).attr('name') + '"]').length) {
                            $(form).append(
                                $('<input type="hidden">').attr({
                                    name: $(this).attr('name'),
                                    value: $(this).attr('value')
                                })
                            );
                        }
                    })
                }
                ,beforeSubmit: function(fields, form) {
                    if (typeof(afValidated) != 'undefined' && afValidated == false) {
                        return false;
                    }
                    form.find('.error').html('');
                    form.find('.error').removeClass('error');
                    form.find('input,textarea,select,button').attr('disabled', true);
                    return true;
                }
                ,success: function(response, status, xhr, form) {
                    form.find('input,textarea,select,button').attr('disabled', false);
                    response.form=form;
                    $(document).trigger('af_complete', response);
                    if (!response.success) {
                        AjaxForm.Message.error(response.message);
                        if (response.data) {
                            var key, value;
                            for (key in response.data) {
                                if (response.data.hasOwnProperty(key)) {
                                    value = response.data[key];
                                    form.find('.error_' + key).html(value).addClass('error');
                                    form.find('[name="' + key + '"]').addClass('error');
                                }
                            }
                        }
                    }
                    else {
                        AjaxForm.Message.success(response.message);
                        form.find('.error').removeClass('error');
                        form[0].reset();
                    }
                }
            });
            e.preventDefault();
            return false;
        });

        $(document).on('reset', afConfig.formSelector, function(e) {
            $(this).find('.error').html('');
            AjaxForm.Message.close();
        });
    }

};

//JGrowl Popup Form

var messageLive = 1000,
    winWidth = $(window).width(),
    $formPopup = $('.form-popup'),
    $formFade = $('.form-fade'),
    formWidth = 500;

var wrapFuction = function () {
    $('#jGrowl').wrap('<div class="form-message-wrap"></div>');
};

var successMessageShow = function () {
    $('#jGrowl').css({'left': winWidth / 2 - formWidth / 2});
    $formPopup.add($formFade).addClass('form-fade-out');
    setTimeout(function () {
        $formPopup.add($formFade).removeClass('is-visible form-fade-out');
    }, 300);
    wrapFuction();
};

var adaptiveMessage = function () {
    if (winWidth <= formWidth) {
        $('.jGrowl-notification').addClass('adaptive-message');
    }
    wrapFuction();
};


AjaxForm.Message = {
    success: function(message, sticky) {
        if (message) {
            if (!sticky) {sticky = false;}
            $.jGrowl(message, {theme: 'af-message-success', sticky: sticky, life: messageLive});
            successMessageShow();
            adaptiveMessage();
        }
    }
    ,error: function(message, sticky) {
        if (message) {
            if (!sticky) {sticky = false;}
            $.jGrowl(message, {theme: 'af-message-error', sticky: sticky, life: messageLive});
            adaptiveMessage();
        }
    }
    ,info: function(message, sticky) {
        if (message) {
            if (!sticky) {sticky = false;}
            $.jGrowl(message, {theme: 'af-message-info', sticky: sticky, life: messageLive});
            adaptiveMessage();
        }
    }
    ,close: function() {
        $.jGrowl('close');
    }
};
