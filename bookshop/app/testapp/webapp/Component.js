/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "com/bookshop/testapp/model/models",
        "sap/f/library",
	    "sap/f/FlexibleColumnLayoutSemanticHelper"
    ],
    function (UIComponent, Device, models, library, FlexibleColumnLayoutSemanticHelper) {
        "use strict";

        const LayoutType = library.LayoutType;

        return UIComponent.extend("com.bookshop.testapp.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // enable routing
                this.getRouter().initialize();

                // set the device model
                this.setModel(models.createDeviceModel(), "device");
            },

            /**
             * Returns an instance of the semantic helper
             * @returns {sap.f.FlexibleColumnLayoutSemanticHelper} An instance of the semantic helper
             */
            getHelper: function () {
                var oFCL = this.getRootControl().byId("fcl"),
                    oParams = new URLSearchParams(window.location.search),
                    oSettings = {
                        defaultTwoColumnLayoutType: LayoutType.TwoColumnsMidExpanded,
                        defaultThreeColumnLayoutType: LayoutType.ThreeColumnsMidExpanded,
                        mode: oParams.get("mode"),
                        maxColumnsCount: oParams.get("max")
                    };

                return FlexibleColumnLayoutSemanticHelper.getInstanceFor(oFCL, oSettings);
            }
        });
    }
);