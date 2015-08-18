function StatisticsController() {
	this.linechart = {}
	this.piechart = {}

	// linechart
	this.linechart.labels = [
		"29.06 - 05.08",
		"06.07 - 12.07",
		"13.07 - 19.07",
		"20.07 - 26.07",
		"27.07 - 02.08",
		"03.08 - 09.08",
		"10.08 - 16.08"];
	this.linechart.series = ['API Calls', 'File Downloads', 'BibTeX Downloads'];
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
}