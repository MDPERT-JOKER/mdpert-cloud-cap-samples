/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "com/bookshop/testapp/model/models",
        "sap/f/library",
	    "sap/f/FlexibleColumnLayoutSemanticHelper",
        "sap/ui/model/json/JSONModel"
    ],
    function (UIComponent, Device, models, library, FlexibleColumnLayoutSemanticHelper, JSONModel) {
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
                // var ooModel = new JSONModel();
                // this.setModel(ooModel);
                var oRouter;
                var ocModel = this;
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // await ocModel.read("/Books", {
                //     urlParameters: {
                //         "$expand": "genre",
                //     },
                //     success: async function (oData, oResponse) {
                //         var newModel = models.createNewModel(oData);
                //         //
                //         // I can use both of them
                //         //

                //         newModel.setSizeLimit(1000);

                //         if (newModel) {
                //             await ocModel.setModel(newModel, "books");
                //         }
                        
                //         // view.byId('booksTable').setModel(newModel, "books");
                //     },
                //     error: function (oError) {
                //         console.log('hello data', oError);
                //     }
                // });

                oRouter = this.getRouter();
                oRouter.attachBeforeRouteMatched(this._onBeforeRouteMatched, this);
                oRouter.initialize();
            },

            /**
             * Returns an instance of the semantic helper
             * @returns {sap.f.FlexibleColumnLayoutSemanticHelper} An instance of the semantic helper
             */
            getHelper: function () {
                return this._getFcl().then(function(oFCL) {
                    var oSettings = {
                        defaultTwoColumnLayoutType: library.LayoutType.TwoColumnsMidExpanded,
                        defaultThreeColumnLayoutType: library.LayoutType.ThreeColumnsMidExpanded
                    };
                    return (FlexibleColumnLayoutSemanticHelper.getInstanceFor(oFCL, oSettings));
                });
            },

            _onBeforeRouteMatched: function(oEvent) {
                var oModel = this.getModel(),
                    sLayout = oEvent.getParameters().arguments.layout,
                    oNextUIState;
    
                // If there is no layout parameter, set a default layout (normally OneColumn)
                if (!sLayout) {
                    this.getHelper().then(function(oHelper) {
                        oNextUIState = oHelper.getNextUIState(0);
                        oModel.setProperty("/layout", oNextUIState.layout);
                    });
                    return;
                }
    
                oModel.setProperty("/layout", sLayout);
            },

            _getFcl: function () {
                return new Promise(function(resolve, reject) {
                    var oFCL = this.getRootControl().byId('flexibleColumnLayout');
                    if (!oFCL) {
                        this.getRootControl().attachAfterInit(function(oEvent) {
                            resolve(oEvent.getSource().byId('flexibleColumnLayout'));
                        }, this);
                        return;
                    }
                    resolve(oFCL);
    
                }.bind(this));
            }
        });
    }
);