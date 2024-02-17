//------------------------------QUOTES & TUTORIALS------------------------------------//

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

//------------------------------VIDEOS------------------------------------//

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

//-------------------------------COURSES-----------------------------------//

// Store filter values
let currentSearchValue = "";
let currentTopic = "all";
let currentSortBy = "most_popular";

function ajaxRequestCourses() {
	// Request parameters
	const queryParams = {
		q: currentSearchValue,
		topic: currentTopic,
		sort: currentSortBy
	};

	//Request
	$.ajax({
		url: "https://smileschool-api.hbtn.info/courses",
		method: "GET",
		dataType: "json",
		data: queryParams,
		success: function (data) {
			// Display courses
			processDataCourses(data);
			$('.loader-courses').hide()

			// Update dropdown menus
			updateDropdowns(data.topics, data.sorts);
		}
	})
}

function processDataCourses(data) {
	let courseCounter = 0;
	$(data.courses).each((index, course) => {
		createCourseCard(course.title, course["sub-title"], course.thumb_url, course.author, course.author_pic_url, course.star, course.duration);
		courseCounter++;
	});
	let s = '';
	if (courseCounter > 1) {
		s = 's';
	}
	let textVideoCount = `${courseCounter} video${s}`
	$("span.video-count").text(textVideoCount);
}

function createCourseCard(title, text, imageUrl, author, authorPicUrl, stars, duration) {
	// Elements
	let cardContainer = $("<div>").addClass('col-12 col-sm-4 col-lg-3 d-flex justify-content-center');
	let cardCourse = $("<div>").addClass("card courses");
	let cardImage = $("<img>").attr({ 'src': `${imageUrl}`, 'class': 'card-img-top courses', 'alt': 'Video thumbnail' });
	let cardOverlay = $("<div>").addClass('card-img-overlay text-center').append($('<img>').attr({ 'src': 'images/play.png', 'alt': 'Play', 'width': '64px' }).addClass('align-self-center play-overlay'));
	let cardBody = $("<div>").addClass("card-body courses");
	let cardTitle = $("<h5>").addClass("card-title courses font-weight-bold").text(title);
	let cardText = $("<p>").addClass("card-text courses text-muted").text(text);
	let cardCreator = $("<div>").addClass("creator d-flex align-items-center").append($("<img>").attr({ 'src': `${authorPicUrl}`, 'alt': 'Creator of video', 'width': "30px" }).addClass("rounded-circle courses"), $("<h6>").addClass("pl-3 m-0 main-color author courses").text(author));
	let divRatingCourses = $("<div>").addClass("info pt-3 d-flex justify-content-between div-rating-courses").append($("<div>").addClass("rating courses"), $("<span>").addClass("main-color duration courses").text(duration));

	// Organisation
	cardContainer.append(cardCourse);
	cardCourse.append(cardImage, cardOverlay, cardBody);
	cardBody.append(cardTitle, cardText, cardCreator, divRatingCourses);

	//Test append
	let row = $(".section.results .container .row");
	row.append(cardContainer);

	//Stars prepend
	for (let i = 0; i < stars; i++) {
		let starImage = $("<img>").attr({ 'src': 'images/star_on.png', 'alt': "star on", 'width': "15px" });
		$('.rating.courses', cardContainer).prepend(starImage);
	}
}

function updateDropdowns(topics, sorts) {
	topics.forEach(topic => {
		let formattedTopic = formatTopicsText(topic)
		let dropdownItemTopic = $('<a>').attr("href", "#").addClass("dropdown-item").text(formattedTopic);
		$('.dropdown-menu.topics').append(dropdownItemTopic);
	});

	sorts.forEach(sort => {
		let formattedSort = formatSortText(sort)
		let dropdownItemSort = $('<a>').attr("href", "#").addClass("dropdown-item").text(formattedSort);
		$('.dropdown-menu.sorts').append(dropdownItemSort);
	})
	console.log(topics)
	console.log(sorts)
}

function formatSortText(sort) {
  switch (sort) {
    case 'most_popular':
      return 'Most Popular';
    case 'most_recent':
      return 'Most Recent';
    case 'most_viewed':
      return 'Most Viewed';
    default:
      return sort;
  }
}

function formatTopicsText(topic) {
  switch (topic) {
    case 'all':
      return 'All';
    case 'novice':
      return 'Novice';
    case 'intermediate':
			return 'Intermediate';
			case 'expert':
				return 'Expert';
    default:
      return topic;
  }
}
//------------------------------CALLS------------------------------------//

ajaxRequestQuotes();
ajaxRequestTutorials();
ajaxRequestVideos();
ajaxRequestCourses()
