/* ==========================================================
 * sco.modal.js
 * http://github.com/terebentina/sco.js
 * ==========================================================
 * Copyright 2013 Dan Caragea.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

/*jshint laxcomma:true, sub:true, browser:true, jquery:true, devel:true, eqeqeq:false */
/*global Spinner:true */

;(function($, undefined) {
	"use strict"; //严格模式

	var pluginName = 'scojs_modal'; //定义插件名称

	function Modal(options) {//定义一个函数对象
		this.options = $.extend({}, $.fn[pluginName].defaults, options); //如果当前插件名在jquery方法中有，option存在则 option继承这些。
		this.$modal = $(this.options.target).attr('class', 'modal fade').hide();//当前options中的target对象添加class样式
		var self = this; 

		function init() {
			if (self.options.title === '') {
				self.options.title = '&nbsp;';
			}
		};

		init();//如果option的title为空。那么title为一个空格
	}


	$.extend(Modal.prototype, {
		show: function() {
			var self = this
				,$backdrop;

			if (!this.options.nobackdrop) {
				$backdrop = $('.modal-backdrop');
			}
			if (!this.$modal.length) {//如果没有定义this.$model则创建并添加到要添加的dom中去，并且隐藏该模版
				this.$modal = $('<div class="modal fade" id="' + this.options.target.substr(1) + '"><div class="modal-header"><a class="close" href="#" data-dismiss="modal">×</a><h3>&nbsp;</h3></div><div class="inner"/></div>').appendTo(this.options.appendTo).hide();
			}

			this.$modal.find('.modal-header h3').html(this.options.title);//找到当前$modal的对应标签修改其html

			if (this.options.cssclass !== undefined) {//如果定义了附加class名 则添加上去
				this.$modal.attr('class', 'modal fade ' + this.options.cssclass);
			}

			if (this.options.width !== undefined) { //如果定义了宽度 则使用定义的宽度
				this.$modal.width(this.options.width);
			}

			if (this.options.left !== undefined) { //如果定义了left的值则使用left的值
				this.$modal.css({'left': this.options.left});
			}

			if (this.options.height !== undefined) {//如果定义了高度 则使用定义的高度
				this.$modal.height(this.options.height);
			}

			if (this.options.top !== undefined) {//如果定义了left的值则使用top的值
				this.$modal.css({'top': this.options.top});
			}

			if (this.options.keyboard) {//设置对应的键盘键来执行escape();
				this.escape();
			}

			if (!this.options.nobackdrop) {//如果背景未设置
				if (!$backdrop.length) {//背景不存在
					$backdrop = $('<div class="modal-backdrop fade" />').appendTo(this.options.appendTo);//那么生成一个背景层插入到dom中
				}
				$backdrop[0].offsetWidth; // force reflow
				$backdrop.addClass('in');//背景层增加class名in
			}
			
			this.$modal.off('close.' + pluginName).on('close.' + pluginName, function() {
				self.close.call(self);
			});//重新定义close.+插件名的绑定事件。

			if (this.options.remote !== undefined && this.options.remote != '' && this.options.remote !== '#') {//如果remote不为空切为一个类似的请求地址
				var spinner;
				if (typeof Spinner == 'function') { //如果Spinner存在则初始化一个spinner
					spinner = new Spinner({color: '#3d9bce'}).spin(this.$modal[0]);
				}
				this.$modal.find('.inner').load(this.options.remote, function() {//加载请求地址文本 当内容加载后移除停止spinner
					if (spinner) {
						spinner.stop();
					}
					if (self.options.cache) {
						self.options.content = $(this).html();//设置options.content的内容为上次加载的内容。
						delete self.options.remote;//加载完成后移除remote那么下次执行的时候就是else（避免重复请求加载）;
					}
				});
			} else {
				this.$modal.find('.inner').html(this.options.content);//.inner中的内容用制定的内容。
			}

			this.$modal.show().addClass('in'); //这个层显示出来，并且加上class名in.
			return this;//返回。
		}

		,close: function() {//关闭
			this.$modal.hide().off('.' + pluginName).find('.inner').html('');//清空inner里面的内容
			if (this.options.cssclass !== undefined) {//初始化class名
				this.$modal.removeClass(this.options.cssclass);
			}
			$(document).off('keyup.' + pluginName);//移除对应键盘事件
			$('.modal-backdrop').remove();//移除背景
			if (typeof this.options.onClose === 'function') {//如果关闭后的回调函数存在，则执行此函数，并将当前option传给它调用。
				this.options.onClose.call(this, this.options);
			}
			return this;//返回
		}

		,destroy: function() {//销毁
			this.$modal.remove();//移除整个层
			$(document).off('keyup.' + pluginName);//移除键盘事件
			$('.modal-backdrop').remove();//移除背景
			this.$modal = null;//彻底摧毁this.$modal;
			return this;//返回
		}

		,escape: function() {//键盘事件
			var self = this;
			$(document).on('keyup.' + pluginName, function(e) {
				if (e.which == 27) {
					self.close();
				}
			});
		}
	});


	$.fn[pluginName] = function(options) {//定义插件
		return this.each(function() {
			var obj;
			if (!(obj = $.data(this, pluginName))) {
				var  $this = $(this)
					,data = $this.data()
					,opts = $.extend({}, options, data)
					;
				if ($this.attr('href') !== '' && $this.attr('href') != '#') {
					opts.remote = $this.attr('href');
				}
				obj = new Modal(opts);
				$.data(this, pluginName, obj);
			}
			obj.show();
		});
	};


	$[pluginName] = function(options) {
		return new Modal(options);
	};


	$.fn[pluginName].defaults = {
		title: '&nbsp;'		// modal title
		,target: '#modal'	// the modal id. MUST be an id for now.
		,content: ''		// the static modal content (in case it's not loaded via ajax)
		,appendTo: 'body'	// where should the modal be appended to (default to document.body). Added for unit tests, not really needed in real life.
		,cache: false		// should we cache the output of the ajax calls so that next time they're shown from cache?
		,keyboard: false
		,nobackdrop: false
	};


	$(document).on('click.' + pluginName, '[data-trigger="modal"]', function() {
		console.log($(this))
		$(this)[pluginName]();
		if ($(this).is('a')) {
			return false;
		}
	}).on('click.' + pluginName, '[data-dismiss="modal"]', function(e) {
		e.preventDefault();
		$(this).closest('.modal').trigger('close');
	});
})(jQuery);
