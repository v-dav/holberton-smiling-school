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

ajaxRequestQuotes();
