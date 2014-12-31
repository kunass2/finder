/**
 * Copyright (c) 2014 Bartłomiej Semańczyk - bartekss2@gmail.com| http://www.blue-world.pl
 * @version 0.9, Friday, 18 April 2014
 */

(function($){
	$.fn.finder = function(myopts) {
		'use script';
		var myopts = myopts || {};
		var opts = {
			items: '',
			value: function() { },
			onfalse: function() { $(this).slideUp(); },
			ontrue: function() { $(this).slideDown(); },
			on: 'keyup',
			delay: 100
		};
		$.extend(opts, myopts);

		function Finder(input) {
			var interval;
			var that = this;
			this.opts = opts;
			this.init = (function() {
				input.on(that.opts.on, function(){
					var query = $(this).val();
					var regex = new RegExp(query, 'gi');
					clearTimeout(interval);

					interval = setTimeout(function(){

						$(that.opts.items).each(function(){
							// console.log('dupa',$(this));
							var elem = that.opts.value.call($(this));
							var s;
							elem.find('em').each(function(e){
								$(this).replaceWith($(this).html());
							});
							s = elem.html();
							var compare = regex.test(s);

							if (compare) {
								that.opts.ontrue.call($(this));
								s = s.replace(regex, '<em>$&</em>');
								elem.html(s);
							} else {
								that.opts.onfalse.call($(this));
							}
							query.length == 0 ? elem.find('em').remove() : '';
						});
					}, that.opts.delay);

				});
			}).call(this);
		};
 		this.each(function(){
			var finder = new Finder($(this));
		});
	}
})(jQuery);





//end of the file



//usage
// $('input[data-type=static]').finder({
// 				items: '.navi-box .unit',
// 				value: function(){ return $(this).find('h2'); }
// 			});




//end of the file