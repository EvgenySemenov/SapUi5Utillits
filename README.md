# Sap Ui5 Utills

<h3>Utilites for table</h3>

 <h4>How add to you project<h4>
 1) Create folder 'utills' in your project and add file TableUtills.js
 
 1) In index.html add tag script with src="utills/TableUtills.js" 
 
 3) After that you can use it in controller. 
 
 Examle: 
 
	if (typeof(TableUtills.setFilter) !== "undefined") {
					TableUtills.setFilter(this, "TableName", "FilterName");
		}

<h4>Attentinal</h4>


 <h4>Overview</h4>
 <p><b>setFilter</b> - creat dinami filter for Table on View, Table must have Model!!!!
 view -  this, TableId - Id Table, FilterId - Id Filter

<p>
<b>getValueFilterItems</b>
 core - sap.ui.core
 view - this
 FilterId
