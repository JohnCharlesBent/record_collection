function undefinedVar(thisVar, dataObj) {
	if(thisVar === undefined) {
		thisVar = '';
	} else {
		thisVar = dataObj;
	}
}

var stickyNavTop = $('header').offset().top;

var stickyNav = function() {
	var scrollTop = $(window).scrollTop();

	if(scrollTop > stickyNavTop) {
		$('header').addClass('fixed');
	} else {
		$('header').removeClass('fixed');
	}
}

stickyNav();

$(window).scroll(function() {
	stickyNav();
});

// loads paginated list of albums into a div
function albumGrid(data) {
	var jsonData = $.parseJSON(data);
	$('.album_grid, .collection_total, .num_pages').empty();

	$('.album_data--back-btn').hide();


	// get pagination information
			var collectionItems = jsonData['pagination']['items'];
			var page = jsonData['pagination']['page'];
			
			var pages = jsonData['pagination']['pages'];
			var numPerPage = jsonData['pagination']['per_page'];
			var nextPage = jsonData['pagination']['urls']['next'];
			
			$('.random-btn').attr('data-page-total', pages);


			$('.next_page, .page_prev').attr('data-page', page);

			if(page == 1) {
				$('.page_prev').hide();
			} else {
				$('.page_prev').show();
			}

			if(page == pages) {
				$('.next_page').hide();
			}



			$('.collection_total').prepend(
				'<span class="bold">Number of items in collection: <strong>'+
					collectionItems +
				'</strong></span>'
				);

			$('.num_pages').prepend(
				'<span class="bold">Page <strong>'+
					page +
				'</strong> of ' + pages +
				'</span>'
				);

			// get release information
			var releases = jsonData['releases'];

			console.log(releases);

			$.each(releases, function(k,v) {
				var coverImg = v['basic_information']['cover_image'];
				var albumTitle = v['basic_information']['title'];
				var albumID = v['basic_information']['id'];
				var instanceID = v['basic_information']['instance_id'];
				var artistName = v['basic_information']['artists'][0]['name'];
				
				//var dateAdded = v['basic_information']['date_added'];

				$('.album_grid').append(
					'<div class="album_info--wrapper" data-id="'+albumID+'" data-page="'+page+'">'+
						'<div class="img_wrapper"><img src="'+coverImg+'" alt="' + albumTitle +' cover" /></div>'+
						'<div class="album-details--wrapper">'+
							'<div class="artist_name">'+artistName+'</div>'+
							'<div class="album_title">'+ albumTitle + '</div>'+
						'</div>'+
					'</div>'
					);
			});
}

$(document).ready(function() {
	$('.loading').slideDown(200);
	$.ajax({
		type: 'POST',
		url: 'collection/index.php',
		dataType: 'json',
		async: false,
		data: {
			page: 1,
			returned: 25,
			sort: 'artist',
			order: 'asc'
		},
		success: function(data) {
			var jsonData = $.parseJSON(data);
			albumGrid(data);
		},
		complete: function() {
			$('.loading').slideUp(200);
		}
	});
});

function album_data(page_num, album_id) {
	$('.album_grid').empty();
	$.ajax({
			type: 'POST',
			url: 'album/index.php',
			dataType: 'json',
			async: false,
			data: {
				album_id: album_id,
				page: page_num
			},
			success: function(data) {
				var jsonData = $.parseJSON(data);
				var artistName = jsonData['artists'][0]['name'];
				var artistUrl = jsonData['artists'][0]['resource_url'];

				var genres = jsonData['genres']; // array
				var styles = jsonData['styles']; // array

				var albumCover = jsonData['images'][0]['uri'];
				var albumTitle = jsonData['title'];

				var credits = jsonData['extraartists'];
				
				if(jsonData['notes'] != undefined) {
					albumNotes = '<div class="album_notes">'+ jsonData['notes']+'</div>'
				} else {
					albumNotes = '';
				}
				
				var tracklist = jsonData['tracklist']; //array
				var videos = jsonData['videos'];
				var videoWrapper = '';
				if(videos != 'undefined' || videos != '') {
					var videoWrapper = '<div class="videos"></div>';
				}
				

				$('.album_data--back-btn').attr('data-page', page_num);

				$('.album_data--wrapper').prepend(
					'<h2 class="band_name" data-url="'+artistUrl+'">'+artistName+' | '+albumTitle+'</h2>'+
					'<img src="'+albumCover+'" alt="'+artistName+' '+albumTitle+' cover" class="album_cover" />'+
					'<div class="genres"><strong>Genres: </strong> </div>'+
						albumNotes+
					'<div class="album_credits"></div>'+
					'<div class="tracklist--wrapper"><ol></ol></div>'+
					videoWrapper
					);

				$.each(genres, function(k,v) {
					var genre = v;

					if(v != 'undefined') {

						$('.album_data--wrapper .genres').append(
							'<span class="genre">'+v+'</span>'
							);
					}
				});

				$.each(tracklist, function(k,v) {
					var duration = '';
					if(v['duration'] != '' || v['duration'] != 'undefined') {
							druation =	'</span>'+
							'<span class="duration"><strong>Length: </strong>'
								+v['duration']+
							'</span>';
							}
					$('.tracklist--wrapper ol').append(
						'<li class="album_track">'+
							'<span class="track_name"><strong>Title: </strong>'
								+v['title']+
							'</span>'+
							'<span class="side"><strong>Side: </strong>'
								+v['position']+
							duration+
						'</li>'
						);
				});
				if(videos != 'undefined' || videos != '') {
					$.each(videos, function(k,v) {
						var uri = v['uri'];
						var uri = uri.replace('watch?v=', 'embed/');
						$('.album_data--wrapper .videos').append(
							'<div class="video-wrapper"><iframe width="560" height="349" src="'+uri+'" class="video_embed" frameborder="0" allowfullscreen="1"></iframe></div>'
							);
					});
				}
				$.each(credits, function(k,v) {

				});

			

			},
			complete: function() {
				$('.loading').slideUp(200);
			}
		});
				
		
}

$('.album_grid').on('click', '.album_info--wrapper', function() {
		$('.loading').slideDown(200);
		$('.pagination').hide();
		$('.collection_info--wrapper').hide();
		$('.album_grid').hide();
		$('.album_data--back-btn').show();

		var album_id = $(this).attr('data-id');
		var page_num = $(this).attr('data-page');
		album_data(page_num, album_id);
});

$('.next_page').on('click', function() {
	var currPage = $(this).attr('data-page');
	currPage = parseInt(currPage);
	var next_page = '';


	if(currPage >= 1) {
		next_page = currPage + 1;
	} else {
		next_page = 1;
	}

	$('.loading').show();
	$.ajax({
		type: 'POST',
		url: 'collection/index.php',
		dataType: 'json',
		async: false,
		data: {
			page: next_page,
			returned: 25
		},
		success: function(data) {
			
			var jsonData = $.parseJSON(data);


			albumGrid(data);
		},
		complete: function() {
			$('.loading').slideUp(200);
		}
	});
});

$('.page_prev').on('click', function() {
	var currPage = $(this).attr('data-page');
	currPage = parseInt(currPage);
	var prev_page = '';

	if(currPage <= 1) {
		prev_page = '';
	} else {
		prev_page = currPage - 1;
	}

	$('.loading').show();
	$.ajax({
		type: 'POST',
		url: 'collection/index.php',
		dataType: 'json',
		async: false,
		data: {
			page: prev_page,
			returned: 25
		},
		success: function(data) {
		
			var jsonData = $.parseJSON(data);

			albumGrid(data);
		},
		complete: function() {
			$('.loading').slideUp(200);
		}
	});
})

$('.album_data--back-btn').on('click', function() {
	$('.loading').show();
	
	var page = $(this).attr('data-page');
	

	$('.album_data--wrapper').empty();
	$('.artist_info--wrapper').empty();
	
	$.ajax({
		type: 'POST',
		url: 'collection/index.php',
		dataType: 'json',
		async: false,
		data: {
			page: page,
			returned: 25,
			sort: 'artist'
		},
		success: function(data) {
			
			var jsonData = $.parseJSON(data);

			albumGrid(data);

			$('.album_grid, .pagination').show();
		},
		complete: function() {
			$('.loading').slideUp(200);
		}
	});

});

$('.random-btn').on('click', function() {
	$('.pagination').hide();
	$('.album_data--back-btn').show();
	$('.loading').show();
	$('.album_data--wrapper').empty();
	$('.album_grid').empty();
	$('.album_info--wrapper').empty();
	var pages = $(this).attr('data-page-total');
	var randomPage = Math.floor(Math.random() * (parseInt(pages) - 1  + 1)) + 1;
	
	$.ajax({
		type: 'POST',
		url: 'random/index.php',
		dataType: 'json',
		async: false,
		data: {
			page: randomPage,
			returned: 25,
			sort: 'artist',
		},
		success: function(data) {
			var jsonData = $.parseJSON(data);
			var releases = jsonData['releases'].length;
			var randomRelease = Math.floor(Math.random() * (24 - 1 + 1)) + 1;
			console.log(randomRelease);
			var album_id = jsonData['releases'][randomRelease]['basic_information']['id'];
			var page_num = 1;
			album_data(page_num, album_id);
		},
		complete: function() {
			$('.loading').slideUp(200);
		}
	});
});