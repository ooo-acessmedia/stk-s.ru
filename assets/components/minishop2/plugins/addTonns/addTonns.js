miniShop2.plugin.addTonns = {
    getFields: function (config) {
        return {
            weight: {
                xtype: 'minishop2-combo-autocomplete',
                description: '<b>[[+tonns]]</b><br />' + _('ms2_product_tonns_help')
            }
        }
    }
    , getColumns: function () {
        return {
            weight: {width: 20, sortable: false, editor: {xtype: 'minishop2-combo-autocomplete', name: 'tonns'}}
        }
    }
};