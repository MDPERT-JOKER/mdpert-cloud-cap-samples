sap.ui.define([
  "sap/ui/core/mvc/Controller"
], function(BaseController) {
    "use strict";
  
    return BaseController.extend("com.bookshop.testapp.controller.App", {
      onInit: function () {
        this.oOwnerComponent = this.getOwnerComponent();
        this.oRouter = this.oOwnerComponent.getRouter();
        this.oRouter.attachRouteMatched(this.onRouteMatched, this);
      },
  
      onRouteMatched: function (oEvent) {
        var sRouteName = oEvent.getParameter("name"),
          oArguments = oEvent.getParameter("arguments");
  
        // Save the current route name
        this.currentRouteName = sRouteName;
        this.currentBook = oArguments.books;
      },
  
      onStateChanged: function (oEvent) {
        var bIsNavigationArrow = oEvent.getParameter("isNavigationArrow"),
          sLayout = oEvent.getParameter("layout");
  
        // Replace the URL with the new layout if a navigation arrow was used
        if (bIsNavigationArrow) {
          this.oRouter.navTo(this.currentRouteName, {layout: sLayout, books: this.currentBook}, true);
        }
      },

      // Update the close/fullscreen buttons visibility
      _updateUIElements: function () {
        var oModel = this.oOwnerComponent.getModel(),
          oUIState;
        this.oOwnerComponent.getHelper().then(function(oHelper) {
          oUIState = oHelper.getCurrentUIState();
          oModel.setData(oUIState);
        });
      },
  
      onExit: function () {
        this.oRouter.detachRouteMatched(this.onRouteMatched, this);
        this.oRouter.detachBeforeRouteMatched(this.onBeforeRouteMatched, this);
      }
    });
  }
);