function ajaxRequestQuotes() {
	$('.quote-text .loader').show();
	$.ajax({
		url: "https://smileschool-api.hbtn.info/quotes",
		method: "GET",
		dataType: "json",
		success: function (data) {
			processDataQuotes(data);
			$('.quote-text .loader').hide();
		}
	})
}

function processDataQuotes(data) {
	let carouselItems = $(".carousel-item");
	$(data).each(function (index, item) {
		let carouselItem = $(carouselItems[index]);
		carouselItem.find("img").attr("src", item.pic_url);
		carouselItem.find("p").text(item.text);
		carouselItem.find("h4").text(item.name);
		carouselItem.find("span").text(item.title);
	})
}

function ajaxRequestTutorials() {
	$('#carouselExampleControls2').hide();
	$('.popular .container .loader').show()
	$.ajax({
		url: "https://smileschool-api.hbtn.info/popular-tutorials",
		method: "GET",
		dataType: "json",
		success: function (data) {
			processDataTutorials(data);
			$('#carouselExampleControls2').show();
			$('.popular .container .loader').hide()
		}
	})
}

function processDataTutorials(data) {
	let cards = $('.card');

	$(data).each(function (index, item) {
		let card = $(cards[index]);

		card.find(".card-img-top").attr("src", item.thumb_url)
		card.find(".card-title").text(item.title)
		card.find(".card-text").text(item["sub-title"])
		card.find(".rounded-circle").attr("src", item.author_pic_url)
		card.find("h6").text(item.author)
		let rating = card.find("div.rating")

		for (let i = 0; i < item.star; i++) {
			let starImage = $("<img>", { src: "images/star_on.png", alt: "star on", width: "15px" });
			rating.append(starImage);
		}

		card.find("span").text(item.duration);
	})
}

function ajaxRequestVideos() {
	$('#carouselExampleControls3').hide();
	$('.loader-videos').show()
	$.ajax({
		url: "https://smileschool-api.hbtn.info/latest-videos",
		method: "GET",
		dataType: "json",
		success: function (data) {
			processDataVideos(data);
			$('#carouselExampleControls3').show();
			$('.loader-videos').hide()
		}
	})
}

function processDataVideos(data) {
	let cards = $('.card-video');

	$(data).each(function (index, item) {
		let card = $(cards[index]);

		card.find(".card-img-top").attr("src", item.thumb_url)
		card.find(".card-title").text(item.title)
		card.find(".card-text").text(item["sub-title"])
		card.find(".rounded-circle").attr("src", item.author_pic_url)
		card.find("h6").text(item.author)
		let rating = card.find("div.rating")

		for (let i = 0; i < item.star; i++) {
			let starImage = $("<img>", { src: "images/star_on.png", alt: "star on", width: "15px" });
			rating.append(starImage);
		}

		card.find("span").text(item.duration);
	})
}

function ajaxRequestCourses() {

}

function processDataCourses(data) {
	
}

ajaxRequestQuotes();
ajaxRequestTutorials();
ajaxRequestVideos();
ajaxRequestCourses()
