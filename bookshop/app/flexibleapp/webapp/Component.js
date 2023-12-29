/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "com/bookshop/flexibleapp/model/models",
        "sap/f/library",
    ],
    function (UIComponent, Device, models, library) {
        "use strict";

        return UIComponent.extend("com.bookshop.flexibleapp.Component", {
            metadata: {
                manifest: "json"
            },
            
            init: function () {
                var oRouter;
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);
                
                // set the device model
                this.setModel(models.createDeviceModel(), "device");

                this.setModel(models.createModel(), "books");
                
                // enable routing
                oRouter = this.getRouter();
			    oRouter.attachBeforeRouteMatched(this._onBeforeRouteMatched, this);
                oRouter.initialize();

            },

            _onBeforeRouteMatched: function(oEvent) {
                var oModel = this.getModel(),
                    sLayout = oEvent.getParameters().arguments.layout;
    
                // If there is no layout parameter, set a default layout (normally OneColumn)
                if (!sLayout) {
                    sLayout = library.LayoutType.OneColumn;
                }
    
                oModel.setProperty("/layout", sLayout);
            }
        });
    }
);