sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/mvc/Controller",
	"sap/f/library"
], function (JSONModel, Controller, library) {
	"use strict";

	return Controller.extend("com.bookshop.testapp.controller.DetailDetail", {
		onInit: function () {
			var oOwnerComponent = this.getOwnerComponent();

			this.oRouter = oOwnerComponent.getRouter();
			this.oModel = oOwnerComponent.getModel();

			this.oRouter.getRoute("detailDetail").attachPatternMatched(this._onPatternMatch, this);
		},

		handleAboutPress: function () {
			var oNextUIState;
			this.oOwnerComponent.getHelper().then(function (oHelper) {
				oNextUIState = oHelper.getNextUIState(3);
				this.oRouter.navTo("page2", {layout: oNextUIState.layout});
			}.bind(this));
		},

		_onPatternMatch: function (oEvent) {
			this._supplier = oEvent.getParameter("arguments").supplier || this._supplier || "0";
			this._book = oEvent.getParameter("arguments").book || this._book || "0";

			this.getView().bindElement({
				path: this._supplier,
				model: "books"
			});
		},

		handleFullScreen: function () {
			var sNextLayout = this.oModel.getProperty("/actionButtonsInfo/endColumn/fullScreen");
			this.oRouter.navTo("detailDetail", {layout: sNextLayout, book: this._book, supplier: this._supplier});
		},

		handleExitFullScreen: function () {
			var sNextLayout = this.oModel.getProperty("/actionButtonsInfo/endColumn/exitFullScreen");
			this.oRouter.navTo("detailDetail", {layout: sNextLayout, book: this._book, supplier: this._supplier});
		},

		handleClose: function () {
			var sNextLayout = this.oModel.getProperty("/actionButtonsInfo/endColumn/closeColumn");
			this.oRouter.navTo("detail", {layout: sNextLayout, book: this._book});
		},

		onExit: function () {
			this.oRouter.getRoute("detailDetail").detachPatternMatched(this._onPatternMatch, this);
		}
	});
});
