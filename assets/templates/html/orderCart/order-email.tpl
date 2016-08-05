[[!msGetOrder?id=`[[+id]]` &tplRow=`get-order-email-row.tpl`]]
<div class="cart-email-wrap" style="background: #D8AD7E; padding: 50px 100px;">
    <div style="font-size: 20px; margin-bottom: 15px;">[[%ms2_email_subject_sent_user]]</div>

    <div id="msCart">
        <div class="page-cart-block">
            <!-- <div class="page-cart-header" style="display: flex; justify-content: space-between;">
                <div class="title">[[%ms2_cart_title]]</div>
                <div class="count">[[%ms2_cart_count]]</div>
                <div class="price">[[%ms2_cart_cost]]</div>
            </div> -->

            <div class="page-cart-product">[[+goods]]</div>

            <div class="page-cart-footer" style="font-size: 18px; font-weight: bold; border-top: 1px dashed black; margin-top: 20px;">
                <span class="total" colspan="2">[[%ms2_cart_total]]: </span>
                <span class="total_count">[[+cart_count]] [[%ms2_frontend_count_unit]] - </span>
                <span class="total_cost">[[+cart_cost]] [[%ms2_frontend_currency]]</span>
            </div>
        </div>
    </div>
</div>