sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/Sorter",
	"sap/m/MessageBox",
    "sap/f/library",
    "com/bookshop/flexibleapp/model/models",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, FilterOperator, Sorter, MessageBox, library, models) {
        "use strict";

        return Controller.extend("com.bookshop.flexibleapp.controller.List", {
            onInit: async function () {
                var currentView = this.oView;
                currentView = this.getView();
                this._bDescendingSort = false;

                const oModel = this.getOwnerComponent().getModel();

                await oModel.read("/Books", {
                    urlParameters: {
                        $expand: "genre"
                    },
                    success: (oData, res) => {
                        console.log('oData:', oData);
                        const newModel = models.createModel(oData);

                        currentView.setModel(newModel, "books");
                    },
                    error: (oError) => {
                        console.log('[Error]', oError);
                    }
                });

                this.oProductsTable = this.oView.byId("booksTable");
            },
            onSearch: function (oEvent) {
                var oTableSearchState = [],
                    sQuery = oEvent.getParameter("query");
    
                if (sQuery && sQuery.length > 0) {
                    oTableSearchState = [new Filter("title", FilterOperator.Contains, sQuery)];
                }
    
                this.oBooksTable.getBinding("items").filter(oTableSearchState, "Application");
            },
    
            onAdd: function () {
                MessageBox.information("This functionality is not ready yet.", {title: "Aw, Snap!"});
            },
    
            onSort: function () {
                this._bDescendingSort = !this._bDescendingSort;
                var oBinding = this.oBooksTable.getBinding("items"),
                    oSorter = new Sorter("title", this._bDescendingSort);
    
                oBinding.sort(oSorter);
            },
            onListItemPress: function () {
                var oFCL = this.oView.getParent().getParent();
    
                oFCL.setLayout(library.LayoutType.TwoColumnsMidExpanded);
            }
        });
    });
