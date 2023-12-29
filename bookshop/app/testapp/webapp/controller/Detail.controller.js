sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("com.bookshop.testapp.controller.Detail", {
		onInit: function () {
			var oOwnerComponent = this.getOwnerComponent();

			this.oRouter = oOwnerComponent.getRouter();
			this.oModel = oOwnerComponent.getModel();

			this.oRouter.getRoute("list").attachPatternMatched(this._onBookMatched, this);
			this.oRouter.getRoute("detail").attachPatternMatched(this._onBookMatched, this);
			this.oRouter.getRoute("detailDetail").attachPatternMatched(this._onBookMatched, this);
		},
		onSupplierPress: function (oEvent) {
			var supplierPath = oEvent.getSource().getBindingContext("books").getPath(),
				supplier = supplierPath.split("/").slice(-1).pop(),
				oNextUIState;

			this.oOwnerComponent.getHelper().then(function (oHelper) {
				oNextUIState = oHelper.getNextUIState(2);
				this.oRouter.navTo("detailDetail", {
					layout: oNextUIState.layout,
					supplier: supplier,
					book: this._book
				});
			}.bind(this));
		},

		_onBookMatched: function (oEvent) {
			this._book = oEvent.getParameter("arguments").book || this._book || "0";
			this.getView().bindElement({
				path: this._book,
				model: "books"
			});
		},

		onEditToggleButtonPress: function() {
			var oObjectPage = this.getView().byId("ObjectPageLayout"),
				bCurrentShowFooterState = oObjectPage.getShowFooter();

			oObjectPage.setShowFooter(!bCurrentShowFooterState);
		},

		handleFullScreen: function () {
			var sNextLayout = this.oModel.getProperty("/actionButtonsInfo/midColumn/fullScreen");
			this.oRouter.navTo("detail", {layout: sNextLayout, book: this._book});
		},

		handleExitFullScreen: function () {
			var sNextLayout = this.oModel.getProperty("/actionButtonsInfo/midColumn/exitFullScreen");
			this.oRouter.navTo("detail", {layout: sNextLayout, book: this._book});
		},

		handleClose: function () {
			var sNextLayout = this.oModel.getProperty("/actionButtonsInfo/midColumn/closeColumn");
			this.oRouter.navTo("list", {layout: sNextLayout});
		},

		onExit: function () {
			this.oRouter.getRoute("list").detachPatternMatched(this._onBookMatched, this);
			this.oRouter.getRoute("detail").detachPatternMatched(this._onBookMatched, this);
		}
	});
});
