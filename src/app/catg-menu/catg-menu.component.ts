import { Component, OnInit } from '@angular/core';
import { GlobalServiceService } from '../global-service.service';
import { NavigationExtras, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorModalComponent } from '../authentication-views/error-modal/error-modal.component';
declare var $: any;
interface Resources {
	subcategory: any;
	category: any,
	detail: any
}
@Component({
	selector: 'app-catg-menu',
	standalone: false,
	templateUrl: './catg-menu.component.html',
	styleUrls: ['./catg-menu.component.scss']

})
export class CatgMenuComponent implements OnInit {
	showDropdown = false;         // Controls the main dropdown visibility
	hoveredCategory: String = '';
	resources: Resources[] = [];
	categoryList: any;
	hoverTimeout: any;
	b: string;
	constructor(private service: GlobalServiceService, private router: Router, private dialog: MatDialog, private spinner: NgxSpinnerService) {
		this.service.getresource.subscribe(data => {
			this.resources = data
			if (this.resources.length == 0) {
				this.getprodimg();

			}
		});
	}
	toggleDrop(state: boolean) {
		this.showDropdown = state;
		console.log('Dropdown visible:', this.showDropdown);
	}
	ngOnInit() {
		// this.getprodimg();
		// this.getData1();


		// duration of scroll animation
		var scrollDuration = 300;
		// paddles
		var leftPaddle = document.getElementsByClassName('left-paddle');
		var rightPaddle = document.getElementsByClassName('right-paddle');
		// get items dimensions
		var itemsLength = $('.item').length;
		var itemSize = $('.item').outerWidth(true);
		// get some relevant size for the paddle triggering point
		var paddleMargin = 20;

		// get wrapper width
		var getMenuWrapperSize = function () {
			return $('.menu-wrapper').outerWidth();
		}
		var menuWrapperSize = getMenuWrapperSize();
		// the wrapper is responsive
		$(window).on('resize', function () {
			menuWrapperSize = getMenuWrapperSize();
		});
		// size of the visible part of the menu is equal as the wrapper size 
		var menuVisibleSize = menuWrapperSize;

		// get total width of all menu items
		var getMenuSize = function () {
			return itemsLength * itemSize;
		};
		var menuSize = getMenuSize();
		// get how much of menu is invisible
		var menuInvisibleSize = menuSize - menuWrapperSize;

		// get how much have we scrolled to the left
		var getMenuPosition = function () {
			return $('.menu').scrollLeft();
		};

		// finally, what happens when we are actually scrolling the menu
		$('.menu').on('scroll', function () {

			// get how much of menu is invisible
			menuInvisibleSize = menuSize - menuWrapperSize;
			// get how much have we scrolled so far
			var menuPosition = getMenuPosition();

			var menuEndOffset = menuInvisibleSize - paddleMargin;

			// show & hide the paddles 
			// depending on scroll position
			if (menuPosition <= paddleMargin) {
				$(leftPaddle).addClass('hidden');
				$(rightPaddle).removeClass('hidden');
			} else if (menuPosition < menuEndOffset) {
				// show both paddles in the middle
				$(leftPaddle).removeClass('hidden');
				$(rightPaddle).removeClass('hidden');
			} else if (menuPosition >= menuEndOffset) {
				$(leftPaddle).removeClass('hidden');
				$(rightPaddle).addClass('hidden');
			}

			// print important values
			// $('#print-wrapper-size span').text(menuWrapperSize);
			// $('#print-menu-size span').text(menuSize);
			// $('#print-menu-invisible-size span').text(menuInvisibleSize);
			// $('#print-menu-position span').text(menuPosition);

		});

		// scroll to left
		$(rightPaddle).on('click', function () {
			$('.menu').animate({ scrollLeft: menuInvisibleSize }, scrollDuration);
		});

		// scroll to right
		$(leftPaddle).on('click', function () {
			$('.menu').animate({ scrollLeft: '0' }, scrollDuration);
		});
	}
	getprodimg() {
		this.spinner.show();
		this.service.getdata1().subscribe((resp: any) => {
			this.spinner.hide();
			this.resources = resp.data;
			// this.service.resources.next(resp);
		},
			error => {
				this.spinner.hide();
				this.dialog.open(ErrorModalComponent, {
					data: { errorModal: true }
				});
				// console.log(error);
			});
	}
	modal: any = [1];



	selected_Sub(cat: any, sub: any) {

		const c = sub;


		console.log("Navigating to-----subcategory: ", c);

		this.router.navigate(['/category', c]).then(success => {
			if (success) {
				console.log("Navigation successful");
			} else {
				console.error("Navigation failed");
			}
		});
	}


	selected_catg(cat: any) {
		const c = cat;
		

		this.router.navigate(['/category', c]).then(success => {
			if (success) {
				console.log("Navigation successful");
			} else {
				console.error("Navigation failed");
			}
		});
	}




	get hoveredSubcategories() {
		const found = this.resources.find(r => r.category === this.hoveredCategory);
		return found?.subcategory || [];
	}

	onHoverEnter(category: string) {
		clearTimeout(this.hoverTimeout); // cancel any pending close
		this.hoveredCategory = category;
	}

	onHoverLeave() {
		this.hoverTimeout = setTimeout(() => {
			this.hoveredCategory = '';
		}, 300); // 300ms delay before closing dropdown
	}

}
