sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("com.bookshop.flexibleapp.controller.Detail", {
		onInit: function () {
			var oOwnerComponent = this.getOwnerComponent();

			this.oRouter = oOwnerComponent.getRouter();
			this.oModel = oOwnerComponent.getModel();

			this.oRouter.getRoute("TargetList").attachPatternMatched(this._onBookMatched, this);
			this.oRouter.getRoute("Detail").attachPatternMatched(this._onBookMatched, this);
		},

		_onBookMatched: function (oEvent) {
			this._book = oEvent.getParameter("arguments")._book || this._book || "0";
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

		onExit: function () {
			this.oRouter.getRoute("TargetList").detachPatternMatched(this._onBookMatched, this);
			this.oRouter.getRoute("Detail").detachPatternMatched(this._onBookMatched, this);
		}
	});
});
