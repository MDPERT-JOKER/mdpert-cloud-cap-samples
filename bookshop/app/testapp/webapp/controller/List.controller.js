sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/odata/v2/ODataModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, ODataModel) {
        "use strict";

        return Controller.extend("testapp.testapp.controller.List", {
            onInit: function () {

                const oc = this.getOwnerComponent();
                const metadata = oc.getMetadata();
                const model = metadata.getModels();

                console.log('2323');
                console.log('oc', oc);
                console.log('md', metadata);
                console.log('model', model);
                const hello = this.getOwnerComponent().getModel();
                hello.read("/Books", {
                    success: function (oData) {
                        console.log(oData);
                        console.log(this.Controller);
                    },
                    error: (oData) => {
                        console.log('error');
                    }
                });
                console.log('1313');
            }
        });
    });
