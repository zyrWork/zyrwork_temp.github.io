function Index(dom, house24) { 
	this.dom = Array.from(dom);
    this.classList = ["visible", "close", "far", "far", "disfar", "disfar"];
    this.house24 = house24;
    this.start(); 
}
Index.prototype.start = function() {
    var self = this;
    setInterval(function() {
        var nowDate = self.getClock();
        self.dom.forEach(function(columnElement, columnIndex) {
            var nowDateNum = +nowDate[columnIndex];
            var offset = nowDateNum * 86;
            $(columnElement).css({ "transform": "translateY(calc(50vh - " + offset + "px - " + 43 + "px))" })
            Array.from(columnElement.children).forEach(function(numElement, numIndex) { var className = self.getClassName(nowDateNum, numIndex);
                $(numElement).attr("class", className); })
        })
    }, 200)
}
Index.prototype.getClock = function() { 
	var date = new Date();
    return [date.getHours() ? date.getHours() : date.getHours % 12 || 12, date.getMinutes(), date.getSeconds()].reduce(function(nowElement, nowIndex) { return (nowElement + ("0" + nowIndex).slice(-2)); }, "") 
}
Index.prototype.getClassName = function(nowNumIndex, numIndex) {
    var className = this.classList.find(function(classListElement, classListIndex) { return numIndex - classListIndex === nowNumIndex || numIndex + classListIndex === nowNumIndex; })
    return className || "";
}
new Index($(".column"), true);