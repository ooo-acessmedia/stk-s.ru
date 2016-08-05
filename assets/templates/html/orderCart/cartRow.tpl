<div id="[[+key]]">
    <div class="image"><a href="[[~[[+id]]]]"><img src="[[+thumb:default=`[[++assets_url]]components/minishop2/img/web/ms2_small.png`]]" /></a></div>
    <div class="title"><a href="[[~[[+id]]]]">[[+pagetitle]]</a><br/>
        <!--<small><i>[[+option.color]] [[+option.size]]</i></small>-->
    </div>
    <div class="count">
        <form method="post" class="ms2_form form-inline" role="form">
            <input type="hidden" name="key" value="[[+key]]" />
            <div class="form-group">
                <input type="number" name="count" min="1" value="[[+count]]" max-legth="4" class="input-sm form-control" />
                [[%ms2_frontend_count_unit]]
                <button class="btn btn-default" type="submit" name="ms2_action" value="cart/change"></button>
            </div>
        </form>
    </div>
    <!--<div class="weight"><span>[[+weight]]</span> [[%ms2_frontend_weight_unit]]</div>-->
    <div class="price"><span>[[+price]]</span><span> [[%ms2_frontend_currency]]</span></div>
    <div class="remove">
        <form method="post" class="ms2_form">
            <input type="hidden" name="key" value="[[+key]]">
            <button class="btn btn-default" type="submit" name="ms2_action" value="cart/remove" title="[[%ms2_cart_remove]]">Удалить</button>
        </form>
    </div>
</div>
<!--minishop2_option.color [[%ms2_frontend_color]]: [[+option.color]];-->
<!--minishop2_option.size [[%ms2_frontend_size]]: [[+option.size]];-->
<!--minishop2_old_price <br/><span class="old_price">[[+old_price]] [[%ms2_frontend_currency]]</span>-->