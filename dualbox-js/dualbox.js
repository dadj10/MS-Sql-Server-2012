(function($) {
	var _settings = new Array();
 	var _group1 = new Array();
 	var _group2 = new Array();
 	var _onSort = new Array();

	$.configureBoxes = function(options) {
		var index = _settings.push({
			box1View_: 'box1View_',
			box1Storage_: 'box1Storage_',
			box1Filter_: 'box1Filter_',
			box1Clear_: 'box1Clear_',
			box1Counter_: 'box1Counter_',
			box2View_: 'box2View_',
			box2Storage_: 'box2Storage_',
			box2Filter_: 'box2Filter_',
			box2Clear_: 'box2Clear_',
			box2Counter_: 'box2Counter_',
			to1_: 'to1_',
			allTo1_: 'allTo1_',
			to2_: 'to2_',
			allTo2_: 'allTo2_',
			transferMode_: 'move',
			sortBy_: 'text',
			useFilters_: true,
			useCounters_: true,
			useSorting_: true,
			selectOnSubmit_: true
		});
		index--;

		$.extend(_settings[index], options);
 		_group1.push({
 			view: _settings[index].box1View_,
 			storage: _settings[index].box1Storage_,
 			filter: _settings[index].box1Filter_,
 			clear: _settings[index].box1Clear_,
 			counter: _settings[index].box1Counter_,
 			index: index
 		});
 		_group2.push({
 			view: _settings[index].box2View_,
 			storage: _settings[index].box2Storage_,
 			filter: _settings[index].box2Filter_,
 			clear: _settings[index].box2Clear_,
 			counter: _settings[index].box2Counter_,
 			index: index 
 		});
 		
 		if (_settings[index].sortBy_ == 'text') {
 			_onSort.push(function(a, b) {
	 			var aVal = a.text.toLowerCase();
	 			var bVal = b.text.toLowerCase();
	 			
	 			if (aVal < bVal) { return -1; }
	 			
	 			if (aVal > bVal) { return 1; }

	 			return 0;
			});
 		}
 		else {
 			_onSort.push(function(a, b) {
 				var aVal = a.value.toLowerCase();
	 			var bVal = b.value.toLowerCase();
	 			
	 			if (aVal < bVal) { return -1; }

	 			if (aVal > bVal) { return 1; }

	 			return 0;
	 		});
 		}

 		if (_settings[index].useFilters_) {
 			$('#' + _group1[index].filter).keyup(function() {
 				Filter(_group1[index]);
 			});
			
			$('#' + _group2[index].filter).keyup(function() {
				Filter(_group2[index]);
			});

 			$('#' + _group1[index].clear).click(function() {
 				ClearFilter(_group1[index]);
 			});

 			$('#' + _group2[index].clear).click(function() {
 				ClearFilter(_group2[index]);
 			});
 		}

 		if (IsMoveMode(_settings[index])) {
 			$('#' + _group2[index].view).dblclick(function() {
 				MoveSelected(_group2[index], _group1[index]);
 			});

 			$('#' + _settings[index].to1_).click(function() {
 				MoveSelected(_group2[index], _group1[index]);
 			});

 			$('#' + _settings[index].allTo1_).click(function() {
 				MoveAll(_group2[index], _group1[index]);
 			});
		}
		else {
			$('#' + _group2[index].view).dblclick(function() {
				RemoveSelected(_group2[index], _group1[index]);
			});

 			$('#' + _settings[index].to1_).click(function() {
 				RemoveSelected(_group2[index], _group1[index]);
 			});

 			$('#' + _settings[index].allTo1_).click(function() {
 				RemoveAll(_group2[index], _group1[index]);
			}); 			
		}

		$('#' + _group1[index].view).dblclick(function() {
			MoveSelected(_group1[index], _group2[index]);
		});

		$('#' + _settings[index].to2_).click(function() {
			MoveSelected(_group1[index], _group2[index]);
		});
 			
		$('#' + _settings[index].allTo2_).click(function() {
			MoveAll(_group1[index], _group2[index]);
		});

		if (_settings[index].useCounters_) {
			UpdateLabel(_group1[index]);
			UpdateLabel(_group2[index]);
		}

		if (_settings[index].useSorting_) {
			SortOptions(_group1[index]);
			SortOptions(_group2[index]);
		}

		$('#' + _group1[index].storage + ',#' + _group2[index].storage).css('display', 'none');
			
		if (_settings[index].selectOnSubmit_) {
			$('#' + _settings[index].box2View_).closest('form').submit(function() {
				$('#' + _settings[index].box2View_).children('option').attr('selected', 'selected');
			});
		}
	};

	function UpdateLabel(group) {
		var showingCount = $("#" + group.view + " option").size();
		var hiddenCount = $("#" + group.storage + " option").size();
		$("#" + group.counter).text('Showing ' + showingCount + ' of ' + (showingCount + hiddenCount));
	}

	function Filter(group) {
		var index = group.index;
		var filterLower;
		
		if (_settings[index].useFilters_) {
			filterLower = $('#' + group.filter).val().toString().toLowerCase();
		} else {
			filterLower = '';
		}

		$('#' + group.view + ' option').filter(function(i) {
			var toMatch = $(this).text().toString().toLowerCase();
			return toMatch.indexOf(filterLower) == -1;
		}).appendTo('#' + group.storage);
		
		$('#' + group.storage + ' option').filter(function(i) {
			var toMatch = $(this).text().toString().toLowerCase();
			return toMatch.indexOf(filterLower) != -1;
		}).appendTo('#' + group.view);
		
		try {
			$('#' + group.view + ' option').removeAttr('selected');
		} catch (ex) { }

		if (_settings[index].useSorting_) {
			SortOptions(group);
		}

		if (_settings[index].useCounters_) {
			UpdateLabel(group);
		} 
	}

	function SortOptions(group) {
		var $toSortOptions = $('#' + group.view + ' option');
		$toSortOptions.sort(_onSort[group.index]);

		$('#' + group.view).empty().append($toSortOptions);
	}

	function MoveSelected(fromGroup, toGroup) {
		if (IsMoveMode(_settings[fromGroup.index])) {
			$('#' + fromGroup.view + ' option:selected').appendTo('#' + toGroup.view);
		} else {
			$('#' + fromGroup.view + ' option:selected:not([class*=copiedOption])').clone().appendTo('#' + toGroup.view).end().end().addClass('copiedOption');
		}

		try {
			$('#' + fromGroup.view + ' option,#' + toGroup.view + ' option').removeAttr('selected');
		} catch (ex) { }

		Filter(toGroup);
		
		if (_settings[fromGroup.index].useCounters_) {
			UpdateLabel(fromGroup);
		}
	}

	function MoveAll(fromGroup, toGroup) {
		if (IsMoveMode(_settings[fromGroup.index])) {
			$('#' + fromGroup.view + ' option').appendTo('#' + toGroup.view);
		} else {
			$('#' + fromGroup.view + ' option:not([class*=copiedOption])').clone().appendTo('#' + toGroup.view).end().end().addClass('copiedOption');
		}

		try {
			$('#' + fromGroup.view + ' option,#' + toGroup.view + ' option').removeAttr('selected');
		} catch (ex) { }

		Filter(toGroup);
		
		if (_settings[fromGroup.index].useCounters_) {
			UpdateLabel(fromGroup);
		}
	}

	function RemoveSelected(removeGroup, otherGroup) {
		$('#' + otherGroup.view + ' option.copiedOption').add('#' + otherGroup.storage + ' option.copiedOption').remove();
		
		try {
			$('#' + removeGroup.view + ' option:selected').appendTo('#' + otherGroup.view).removeAttr('selected');
		} catch (ex) { }

		$('#' + removeGroup.view + ' option').add('#' + removeGroup.storage + ' option').clone().addClass('copiedOption').appendTo('#' + otherGroup.view);
		
		Filter(otherGroup);

		if (_settings[removeGroup.index].useCounters_) {
			UpdateLabel(removeGroup);
		}
	}

	function RemoveAll(removeGroup, otherGroup) {
		$('#' + otherGroup.view + ' option.copiedOption').add('#' + otherGroup.storage + ' option.copiedOption').remove();
		
		try {
			$('#' + removeGroup.storage + ' option').clone().addClass('copiedOption').add('#' + removeGroup.view + ' option').appendTo('#' + otherGroup.view).removeAttr('selected');
		} catch (ex) { }

		Filter(otherGroup);
		
		if (_settings[removeGroup.index].useCounters_) {
			UpdateLabel(removeGroup);
		}
	}

	function ClearFilter(group) {
		$('#' + group.filter).val('');
		$('#' + group.storage + ' option').appendTo('#' + group.view);
		
		try {
			$('#' + group.view + ' option').removeAttr('selected');
		} catch (ex) { }

		if (_settings[group.index].useSorting_) {
			SortOptions(group);
		}

		if (_settings[group.index].useCounters_) {
			UpdateLabel(group);
		}
	}

	function IsMoveMode(currSettings) {
		return currSettings.transferMode_ == 'move';
	}
})(jQuery);
