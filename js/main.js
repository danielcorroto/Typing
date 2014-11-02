score2 = ["á","é","í","ó","ú","Ñ",";",":","¿","?","\"","(",")","/"];
score3 = ["Á","É","Í","Ó","Ú","ü"];

// TIMER
var timer;

var time;
var started;
var count;
function printTimer() {
		if (time > 0) {
			$("#timer").text(time);
		} else {
			$("#timer").text(0);
			$("#text").removeClass();
			$("#text").addClass("end");
			$("#write").attr("disabled","disabled");
		}
	}
function resetTimer() {
	time = 60;
	started = false;
	printTimer();
	$("#write").val("");
	$("#text").removeClass();
	$("#write").prop('disabled',false);
	clearTimeout(timer);
}
function updateTimer() {
	time -= 1;
	printTimer();
	if (time > 0) {
		startTimer();
	}
}
function startTimer() {
	timer = setTimeout('updateTimer()', 1000);
}

function loadText() {
	// LOAD DATA
	$.getJSON("json/texts.es.json", function(data) {
		var selected = Math.floor((Math.random() * data.texts.length));
		$("#author").text(data.texts[selected].author)
		$("#title").text(data.texts[selected].title)
		$("#year").text(data.texts[selected].year)
		$("#text").text(data.texts[selected].text)
	});
}

function getScore(written) {
	var result = written.length;
	for (i = 0; i < written.length; i++) {
		var c = written.charCodeAt(i);
		if (c>=97 && c<=122) {
		} else if ((c>=65 && c<=90) || score2.indexOf(written[i]) > -1) {
			result += 1;
		} else if (score3.indexOf(written[i]) > -1) {
			result += 2;
		}
	}
	return result;
}

$(document).ready(function() {
	reset();
	
	// TEXT
	var etext = $("#text");
	var ewrite = $("#write");
	var ecount = $("#count");
	ewrite.keyup(function() {
		var text = etext.text();
	
		if (! started) {
			startTimer();
			started = true;
		}
		
		var write = ewrite.val();
		if (write.length > 0 && time > 0) {
			
			if (text.match("^"+write)) {
				etext.removeClass("ko");
				count = getScore(ewrite.val());
				ecount.text(count);
			} else {
				etext.addClass("ko");
			}
		}
	});
	
	// RESET
	$("#reset").click(function() {
		reset();
	});
	
	function reset() {
		resetTimer();
		$("#count").text("0");
		loadText();
		$("#write").focus();
	}
});
