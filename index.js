//append input values to the queue list
//add object of the input values to use for local storage
//store the currently selected tab to use for checks upon submission
$(document).ready(function(){
var existingItems = JSON.parse(localStorage.getItem("allItems"));
if(existingItems == null) existingItems = [];
var letters = /^[A-Za-z]+$/g;  
var d = new Date();
var id = 0;
if (existingItems.length > 0) {
	for(var i = 0; i < existingItems.length; i++){
		if(i === (existingItems.length - 1)){
			id = existingItems[i].id;
		}
		$(".data").append(
				"<div class='row'><div class='col-xs-1'>" + existingItems[i].id + "</div><div class='col-xs-3'>" 
                + existingItems[i].type + "</div><div class='col-xs-3'>" + existingItems[i].name +
					"</div><div class='col-xs-3'></div><div class='col-xs-3'>" +
					existingItems[i].service +
					"</div><div class='col-xs-2'>" + existingItems[i].time + "</div></div>"
			);
	}
}
var activeTab = "#citizen";
$('a[data-toggle="tab"]').on("shown.bs.tab", function(e) {
	activeTab = $(e.target).attr("href");
});

$("button[type='submit']").on("click", function() {
	console.log("clicked");
	if (activeTab === "#citizen") {
		console.log("citizen");
		if ($("#firstname").val() === "" || $("#lastname").val() === "") {
			console.log("fail");
			alert("Please fill in all input fields!");
			return false;
		} else {
            if(letters.test($("#firstname").val()) || letters.test($("#lastname").val())){
			id++;
			var queueObject = {
				id: id,
				type: "Citizen",
				name: $("#title option:selected").val() +
					". " +
					$("#firstname").val() +
					" " +
					$("#lastname").val(),
				service: $("input[name=options]:checked").val(),
				time: d.getDate() + "/" + (d.getMonth() + 1) + "/"
                 + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes()
			};
		localStorage.setItem("queueObject", JSON.stringify(queueObject));
		existingItems.push(queueObject);
		localStorage.setItem("allItems", JSON.stringify(existingItems));
			$(".data").append(
				"<div class='row'><div class='col-xs-1'>" + id + "</div><div class='col-xs-3'>Citizen</div><div class='col-xs-3'>" +
					$("#title option:selected").val() +
					". " +
					$("#firstname").val() +
					" " +
					$("#lastname").val() +
					"</div><div class='col-xs-3'></div><div class='col-xs-3'>" +
					$("input[name=options]:checked").val() +
					"</div><div class='col-xs-2'>" + d.getDate() + "/" + (d.getMonth() + 1) + "/"
                 + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() +"</div></div>"
			);
            }
            else {
             alert("Please make sure names only contain letters");
                return false;
            }
		}
	} else if (activeTab === "#organisation") {
		console.log("organisation");
		if ($("#organisationname").val() === "") {
			console.log("fail");
			alert("Please fill in all input fields!");
			return false;
		} else {
			console.log("success");
			id++;
			var queueObject = {
				id: id,
				type: "Organisation",
				name: $("#organisationname").val(),
				service: $("input[name=options]:checked").val(),
				time: d.getDate() + "/" + (d.getMonth() + 1) + "/"
                 + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes()
			};
		localStorage.setItem("queueObject", JSON.stringify(queueObject));
		existingItems.push(queueObject);
		localStorage.setItem("allItems", JSON.stringify(existingItems));
			$(".data").append(
				"<div class='row'><div class='col-xs-1'>" + id + "</div><div class='col-xs-3'>Organisation</div><div class='col-xs-3'>" +
					$("#organisationname").val() +
					"</div><div class='col-xs-3'></div><div class='col-xs-3'>" +
					$("input[name=options]:checked").val() +
					"</div><div class='col-xs-2'>" + d.getDate() + "/" + (d.getMonth() + 1) + "/"
                 + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() +"</div></div>"
			);
		}
	} else if (activeTab === "#anonymous") {
		console.log("#anonymous");
		id++;
		var queueObject = {
			id: id,
			type: "Anonymous",
			name: "Anonymous",
			service: $("input[name=options]:checked").val(),
			time: d.getDate() + "/" + (d.getMonth() + 1) + "/"
                 + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes()
		};
		localStorage.setItem("queueObject", JSON.stringify(queueObject));
		existingItems.push(queueObject);
		localStorage.setItem("allItems", JSON.stringify(existingItems));
		$(".data").append(
			"<div class='row'><div class='col-xs-1'>" + id + "</div><div class='col-xs-3'>Anonymous</div><div class='col-xs-3'>Anonymous</div><div class='col-xs-3'>" +
				$("input[name=options]:checked").val() +
				"</div><div class='col-xs-2'>" + d.getDate() + "/" + (d.getMonth() + 1) + "/"
                 + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + "</div></div>"
		);
	}
});
});