function SystemController() {
	this.linechart = {}
	this.piechart = {}

	// linechart
	this.linechart.labels = ["11.08", "12.08", "13.08", "14.08", "15.08", "16.08", "17.08"];
	this.linechart.series = ['API Calls', 'File Downloads', 'BibTex Downloads'];
	this.linechart.data = [
		[65, 59, 80, 81, 56, 55, 40],
		[28, 48, 40, 19, 33, 27, 30],
		[10, 20, 4, 6, 23, 12, 10]
	];
	this.linechart.colours = ['#002143', '#AEAEAE', '#4E4E4E'];
	this.linechart.options = {
		maintainAspectRatio: false,
		responsive: true
	};
	

	// piechart
	this.piechart.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
  	this.piechart.data = [300, 500, 100];
  	this.piechart.colours = ['#002143', '#AEAEAE', '#4E4E4E'];
  	this.piechart.options = {
		maintainAspectRatio: false,
		responsive: true,
		animation: false
	};
	
}

