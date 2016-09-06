# SapUi5Utillits

<h3>Utilites for table</h3>

 <h4>How to 'add to you project'<h4>
 1) Add script src="util/TableUtills.js" in index.html use tag script
 
 2) After that you can use it in controller. 
 Examle: 
 
	if (typeof(TableUtills.setFilter) !== "undefined") {
					TableUtills.setFilter(this, "TableName", "FilterName");
		}

<h4>Attentinal</h4>
In all function use THIS, you must move it from your controller!

 <h4>Overview</h4>
 <p><b>setFilter</b> - creat dinami filter for Table on View, Table must have Model!!!!
 view -  this, TableId - Id Table, FilterId - Id Filter

<p>
<b>getValueFilterItems</b>
 core - sap.ui.core
 view - this
 FilterId
