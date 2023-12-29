sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    // "com/bookshop/testapp/model/models",
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	'sap/ui/model/Sorter',
    "sap/f/library",
	'sap/m/MessageBox'
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (
        Controller,
        JSONModel,
        // models,
        Filter,
        FilterOperator,
        Sorter,
        library,
        MessageBox
    ) {
        "use strict";

        return Controller.extend("com.bookshop.testapp.controller.List", {
            
            onInit: function () {
                const ocModel = this.getOwnerComponent().getModel();
                const view = this.getView();
			    this._bDescendingSort = false;
                this.oRouter = this.getOwnerComponent().getRouter();

                // await ocModel.read("/Books", {
                //     urlParameters: {
                //         "$expand": "genre",
                //     },
                //     success: function (oData, oResponse) {
                //         let newModel = models.createNewModel(oData);
                //         //
                //         // I can use both of them
                //         //

                //         if (newModel) {
                //             view.setModel(newModel, "books");
                //         }
                        
                //         // view.byId('booksTable').setModel(newModel, "books");
                //     },
                //     error: function (oError) {
                //         console.log('hello data', oError);
                //     }
                // });
            },
            
            onSearch: function (oEvent) {
                var oTableSearchState = [],
                    sQuery = oEvent.getParameter("query");
    
                if (sQuery && sQuery.length > 0) {
                    oTableSearchState = [new Filter("title", FilterOperator.Contains, sQuery)];
                }
    
                this.getView().byId("booksTable").getBinding("items").filter(oTableSearchState, "Application");
            },
            onAdd: function (oEvent) {
                MessageBox.show("This functionality is not ready yet.", {
                    icon: MessageBox.Icon.INFORMATION,
                    title: "Aw, Snap!",
                    actions: [MessageBox.Action.OK]
                });
            },
            onSort: function (oEvent) {
                this._bDescendingSort = !this._bDescendingSort;
                var oView = this.getView(),
                    oTable = oView.byId("booksTable"),
                    oBinding = oTable.getBinding("items"),
                    oSorter = new Sorter("title", this._bDescendingSort);
    
                oBinding.sort(oSorter);
            },
            onListItemPress: function (oEvent) {
                // var oNextUIState = this.getOwnerComponent().getHelper().getNextUIState(1),
                var bookPath = oEvent.getSource().getSelectedItem().getBindingContext("books").getPath(),
                    book = bookPath.split("/").slice(-1).pop(),
                    oNextUIState;
    
                this.getOwnerComponent().getHelper().then(function (oHelper) {
                    oNextUIState = oHelper.getNextUIState(1);
                    this.oRouter.navTo("detail", {
                        layout: oNextUIState.layout,
                        book: book
                    });
                }.bind(this));
            }
        });
    });
