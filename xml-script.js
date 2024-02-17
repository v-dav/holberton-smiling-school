// //------------------------------XML CONVERSION------------------------------------//


// function convertJSONtoXML(jsonData) {
// 	let xmlData = '';

// 	// Vérification si le paramètre est un objet
// 	if (typeof jsonData === 'object') {
// 			// Commencer avec la balise racine
// 			xmlData += '<root>';

// 			// Ajouter les propriétés de l'objet en tant que balises
// 			Object.keys(jsonData).forEach(key => {
// 					xmlData += `<${key}>${convertJSONtoXML(jsonData[key])}</${key}>`;
// 			});

// 			// Fermer la balise racine
// 			xmlData += '</root>';
// 	} else {
// 			// Si le paramètre n'est pas un objet, renvoyer sa valeur comme texte de balise
// 			xmlData += jsonData;
// 	}

// 	return xmlData;
// }

//------------------------------QUOTES & TUTORIALS------------------------------------//

function ajaxRequestQuotes() {
	$('.quote-text .loader').show();
	$.ajax({
		url: "https://smileschool-api.hbtn.info/xml/quotes",
		method: "GET",
		dataType: "xml",
		success: function (data) {
			processDataQuotes(data);
			$('.quote-text .loader').hide();
		}
	})
}

function processDataQuotes(data) {
	let carouselItems = $(".carousel-item");

	// Utiliser $(data).find("quote") pour parcourir chaque balise <quote>
	$(data).find("quote").each(function (index, item) {
			let carouselItem = $(carouselItems[index]);

			// Utiliser $(item).find("tag_name").text() pour extraire la valeur de chaque balise à l'intérieur de <quote>
			carouselItem.find("img").attr("src", $(item).find("pic_url").text());
			carouselItem.find("p").text($(item).find("text").text());
			carouselItem.find("h4").text($(item).find("name").text());
			carouselItem.find("span").text($(item).find("title").text());
	});
}


function ajaxRequestTutorials() {
	$('#carouselExampleControls2').hide();
	$('.popular .container .loader').show()
	$.ajax({
		url: "https://smileschool-api.hbtn.info/xml/popular-tutorials",
		method: "GET",
		dataType: "xml",
		success: function (data) {
			processDataTutorials(data);
			$('#carouselExampleControls2').show();
			$('.popular .container .loader').hide()
		}
	})
}

function processDataTutorials(data) {
	let cards = $('.card');

	// Utiliser $(data).find("item") pour parcourir chaque balise <item>
	$(data).find("video").each(function (index, item) {
			let card = $(cards[index]);

			// Utiliser $(item).find("tag_name").text() pour extraire la valeur de chaque balise à l'intérieur de <item>
			card.find(".card-img-top").attr("src", $(item).find("thumb_url").text());
			card.find(".card-title").text($(item).find("title").text());
			card.find(".card-text").text($(item).find("sub-title").text());
			card.find(".rounded-circle").attr("src", $(item).find("author_pic_url").text());
			card.find("h6").text($(item).find("author").text());

			let rating = card.find("div.rating");

			// Utiliser $(item).find("star").text() pour obtenir la valeur de la balise <star>
			for (let i = 0; i < parseInt($(item).find("star").text()); i++) {
					let starImage = $("<img>", { src: "images/star_on.png", alt: "star on", width: "15px" });
					rating.append(starImage);
			}

			card.find("span").text($(item).find("duration").text());
	});
}


//------------------------------VIDEOS------------------------------------//

function ajaxRequestVideos() {
	$('#carouselExampleControls3').hide();
	$('.loader-videos').show()
	$.ajax({
		url: "https://smileschool-api.hbtn.info/xml/latest-videos",
		method: "GET",
		dataType: "xml",
		success: function (data) {
			console.log(data)
			processDataVideos(data);
			$('#carouselExampleControls3').show();
			$('.loader-videos').hide()
		}
	})
}

function processDataVideos(data) {
	let cards = $('.card-video');

	// Utiliser $(data).find("item") pour parcourir chaque balise <item>
	$(data).find("video").each(function (index, item) {
			let card = $(cards[index]);

			// Utiliser $(item).find("tag_name").text() pour extraire la valeur de chaque balise à l'intérieur de <item>
			card.find(".card-img-top").attr("src", $(item).find("thumb_url").text());
			card.find(".card-title").text($(item).find("title").text());
			card.find(".card-text").text($(item).find("sub-title").text());
			card.find(".rounded-circle").attr("src", $(item).find("author_pic_url").text());
			card.find("h6").text($(item).find("author").text());

			let rating = card.find("div.rating");

			// Utiliser $(item).find("star").text() pour obtenir la valeur de la balise <star>
			for (let i = 0; i < parseInt($(item).find("star").text()); i++) {
					let starImage = $("<img>", { src: "images/star_on.png", alt: "star on", width: "15px" });
					rating.append(starImage);
			}

			card.find("span").text($(item).find("duration").text());
	});
}


//-------------------------------COURSES-----------------------------------//
let topicButton = $('.dropdown .btn.topic-dropdown span');
let sortsButton = $('.dropdown .btn.sorts-dropdown span');

function ajaxRequestCourses() {
	// Store filter values
	let currentSearchValue = $('.search-text-area').val();
	let currentTopic = $('.topic-dropdown span').text();
	let currentSortBy = $('.sorts-dropdown span').text();

	if ($('.results .container .row').children().length > 0) {
		$('.results .container .row').empty();
	}

	if ($('.dropdown-menu.topics').children().length > 0) {
		$('.dropdown-menu.topics').empty();
	}

	if ($('.dropdown-menu.sorts').children().length > 0) {
		$('.dropdown-menu.sorts').empty();
	}

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
	topicButton.text(formatTopicsText(topics[0]));
	sortsButton.text(formatSortText(sorts[0]));

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
//------------------------------EVENT HANDLERS------------------------------------//

$('.dropdown-menu.topics').on('click', 'a', function () {
	let selectedTopic = $(this).text();  // Récupérez le texte de l'élément cliqué
	topicButton.text(selectedTopic);  // Mettez à jour le texte du bouton avec la sélection
	ajaxRequestCourses();
});

$('.dropdown-menu.sorts').on('click', 'a', function () {
	let selectedSort = $(this).text();  // Récupérez le texte de l'élément cliqué
	sortsButton.text(selectedSort);  // Mettez à jour le texte du bouton avec la sélection
	ajaxRequestCourses();
});

$('.search-text-area').on('input', function () {
	ajaxRequestCourses();
});

// Gestionnaire d'événements pour la touche "Enter" dans la valeur de recherche
$('.search-text-area').on('keyup', function(event) {
    if (event.key === 'Enter') {
        ajaxRequestCourses();
    }
});

//------------------------------CALLS------------------------------------//

ajaxRequestQuotes();
ajaxRequestTutorials();
ajaxRequestVideos();
ajaxRequestCourses()
