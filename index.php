<?php
include('inc/header.php');
?>
	<header class="page_header">
		<div class="site_title">
			Record Collection | JB + AG
		</div>
		<div class="site_logo--wrapper">
			<?php include('dist/svg/loading_graphic.php'); ?>
		</div>
		<div class="collection-stats">
			<div class="collection_total"></div>
			<div class="collection_value"></div>
		</div>
	</header><!-- end header -->

	<div class="filter-sort-options">
		<div class="album_data--back-btn btn" style="display:none;"> <i class="fas fa-arrow-left" aria-hidden="true"></i> Back to collection</div>

		<div class="random-btn btn">
			<i class="fas fa-random"></i> Select a random album</div>
	</div>

	<div class="filters"></div>
	
	<div class="pagination">
		<div class="page_prev btn" data-page="<?php echo $page_num; ?>">
			<i class="fas fa-arrow-left" aria-hidden="true"></i> Prev
		</div>
		<div class="num_pages"></div>
		<div class="next_page btn" data-page="<?php echo $next_page; ?>">
			Next <i class="fas fa-arrow-right"></i>
		</div>
	</div><!-- end pagination -->

	<div class="album_grid"></div>

	<div class="artist_info--wrapper"></div>

	<div class="album_data--wrapper"></div>

	<div class="pagination">
		<div class="page_prev btn" data-page="<?php echo $page_num; ?>">
			<i class="fas fa-arrow-left" aria-hidden="true"></i> Prev
		</div>
		<div class="num_pages"></div>
		<div class="next_page btn" data-page="<?php echo $next_page; ?>">
			Next <i class="fas fa-arrow-right"></i>
		</div>
	</div><!-- end pagination -->

	<div class="loading">
		<div class="loading_graphic--wrapper">
			<?php include('dist/svg/loading_graphic.php');
			?>
		</div>
	</div>

<?php
include('inc/footer.php');
?>