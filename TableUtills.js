/* 
Utilites for table

---------------------------------------------------------
 How to 'add to you project'
 ------------------
 in index.html add <script src="util/TableUtills.js"></script>
 ------------------
Examle use in controller: 
	if (typeof(TableUtills.setFilter) !== "undefined") {
					TableUtills.setFilter(this, "TableName", "FilterName");
		}

 setFilter - creat dinami filter for Table on View, Table must have Model!!!!
 view -  this, TableId - Id Table, FilterId - Id Filter

getValueFilterItems
 core - sap.ui.core
view - this
 FilterId

*/
TableUtills = {

	getType: function(object) {
		return object.getMetadata()._sClassName;
	},

	getLineonClick: function(view, oEvent, TableId) {
		var oModel = view.getView().byId(TableId).getModel();
		var oTable = view.getView().byId(TableId);
		var oTableItem = oEvent.getSource().getParent();

		if (this.getType(oTable) === "sap.m.Table") {
			// for m.table
			var line = oModel.getProperty(oTableItem.getBindingContextPath());
		}

		if (this.getType(oTable)  === "sap.ui.Table") {
			// for sap.ui.table 
			var sPath = oTableItem.getBindingContext();
			oTable.getModel().getObject(sPath);
			var line = oTable.getModel().getObject(sPath.sPath);
		}

		return line;

	},

	getIdFromTableClick: function(view, oEvent, TableId, ColumdId) {

		//work only with sap.ui.table I dont know how it work with sap.m.table!
		var oModel = view.getView().byId(TableId).getModel();
		var oTable = view.getView().byId(TableId);
		var oTableItem = oEvent.getSource().getParent();
		//	var line = oModel.getProperty(oTableItem.getBindingContextPath());
		var sPath = oTableItem.getBindingContext();
		//	oTable.getModel().getObject(sPath);
		var line = oTable.getModel().getObject(sPath.sPath);

		return line[ColumdId];
	},

	getValueFilterItems: function(view, core, FilterId) {
		var oFilter = new sap.ui.comp.filterbar.FilterBar();
		oFilter = view.byId(FilterId);
		var oParameters = {};
		var arrGroup = oFilter.getFilterGroupItems();
		for (var n = 0; n < arrGroup.length; n++) {
			var id = arrGroup[n].getName();
			var id_inpt = "IdInpt" + arrGroup[n].getName();
			try {
				var val = "";
				if (view.byId(id_inpt)) {
					val = view.byId(id_inpt).getValue();
				} else {
					val = core.byId(id_inpt).getValue();
				}

			} catch (err) {
				var err = "Not value or item";
			}

			if (id_inpt === "InptDatefrom" || id_inpt === "InptDateto") {
				var oDate = new Date(val);
				var dateInst = core.format.DateFormat.getDateInstance({
					pattern: "yyyyMMdd"
				});
				val = dateInst.format(oDate);
			}

			oParameters[id] = val;
		}
		return oParameters;
	},

	setFilter: function(view, TableId, FilterId) {
		//check if Init!
		try {
			var prev_router = view.getRouter()._oRouter._prevRoutes;
			if (typeof(prev_router[0]) === "undefined") {
				return;
			}
		} catch (err) {
			return;
		}
		var oData = view.getView().byId(TableId).getModel().getData();

		if (this.getType(view.getView().byId(TableId)) === "sap.m.Table") {
			console.error("Method getIdFromTableClick use only sap.ui.table!");
			return;
		}

		if (oData.d.results[0]) {
			var sResultArr = oData.d.results[0];
			var arrKeys = [];
			for (var key in sResultArr) {
				var str = key;

				arrKeys.splice(0, 0, str);
			}

			//  add items to Filter
			var oFilter = new sap.ui.comp.filterbar.FilterBar();
			oFilter = view.getView().byId(FilterId);
			var arrGroup = oFilter.getFilterGroupItems();

			for (var i = 0; i < arrKeys.length; i++) {

				var mSettings = {
					label: "Filter :" + arrKeys[i],
					name: arrKeys[i],
					visible: true,
					partOfCurrentVariant: true,
					visibleInFilterBar: false
				};

				var id = "";
				var new_item = true;
				for (var n = 0; n < arrGroup.length; n++) {
					id = arrGroup[n].getName();
					if (id === arrKeys[i]) {
						new_item = false;
						break;
					}
				}
				if (new_item === true) {
					var sIdInput = 'IdInpt' + arrKeys[i];
					var sIdFilterItem = 'IdFilterItem' + arrKeys[i];
					var mSettingsInput = {};
					var oInput = new sap.m.Input(sIdInput, mSettingsInput);

					mSettings.control = oInput;
					var oFilterItem = new sap.ui.comp.filterbar.FilterItem(sIdFilterItem, mSettings);
					oFilter.addFilterItem(oFilterItem);
				}

			}

		}

	}

}
