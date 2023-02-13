var contentEditableToolbar = function(settings)
{

	// Default settings.
	defaultSettings = {
		button: {
			textColor: "rgba(255, 255, 255, 1)",
			backgroundColor: "rgba(118, 181, 197, 1)",
			selectedTextColor: "rgba(255, 255, 255, 1)",
			selectedBackgroundColor: "rgba(226, 135, 67, 1)"
		},
		buttons: [{code:"bold"}, {code:"italic"}, {code:"underline"}, {code:"link"}, {code:"ordered"}, {code:"unordered"}, {code:"quote"}, {code:"code"}]
	}
	if (!settings)
	{
		settings = {}
	}

	// Overlay default settings over provided settings.
	settings.button = Object.assign(defaultSettings.button, settings.button);
	settings.buttons = Object.assign(defaultSettings.buttons, settings.buttons);
	
	
	// Define toolbar.
	var toolbar = document.createElement("div");
	toolbar.style.cssText = `
		display: none;
		position: absolute;
		z-index: 99999;
		background-color: rgba(21, 76, 121, 0.8);
		border-radius: 28px;
		padding: 8px;
		text-align: center;
	`;
	document.body.appendChild(toolbar);
	
	// Define button properties.
	var buttonProperties =
	[
		{
			code: "unformat", 
			content: "x", 
			title: "Remove all formatting",
			selector: "unformat", 
			action: function()
			{
				document.execCommand("removeFormat");
			}
		},
		{
			code: "bold", 
			content: "B", 
			title: "Bold",
			selector: "b",
			action: function()
			{
				document.execCommand("bold");
			}
		},
		{
			code: "italic", 
			content: "<i>I</i>", 
			title: "Italic",
			selector: "i", 
			action: function()
			{
				document.execCommand("italic");
			}
		},
		{
			code: "underline", 
			content: "<u>U</u>", 
			title: "Underline",
			selector: "u", 
			action: function()
			{
				document.execCommand("underline");
			}
		},
		{
			code: "strikethrough", 
			content: "<s>S</s>", 
			title: "Strike-through",
			selector: "s", 
			action: function()
			{
				document.execCommand("strikeThrough");
			}
		},
		{
			code: "link", 
			content: "&zigrarr;", 
			title: "Link",
			selector: "a",
			action: function()
			{
				// Find any link in the selection that may already exist.
				var el = window.getSelection().baseNode;
				while (el)
				{
					if (el.nodeName == "A")
					{
						var link = prompt("Link:", el.href);
						if (link === "")
						{
							// Remove existing link by replacing the element by its content.
							el.outerHTML = el.innerHTML;
							//document.execCommand("unlink", false, false);
						}
						else if (link)
						{
							// Update link.
							el.href = link;
						}
						else
						{
							// Cancelled the prompt, no change.
						}
						return false;
					}
					el = el.parentNode;
				}
				// Add new link.
				var link = prompt("Link:");
				if (link)
				{
					document.execCommand("createLink", false, link);
				}
			}
		},
		{
			code: "ordered", 
			content: "1.", 
			title: "Ordered list", 
			selector: "ol",
			action: function()
			{
				document.execCommand("insertOrderedList");
			}
		},
		{
			code: "unordered", 
			content: "*", 
			title: "Unordered list", 
			selector: "ul",
			action: function()
			{
				document.execCommand("insertUnorderedList");
			}
		},
		{
			code: "quote", 
			content: "&ldquo;", 
			title: "Quote", 
			selector: "blockquote",
			action: function()
			{
				formatBlock("blockquote");
			}
		},
		{
			code: "pre", 
			content: "&lt;/&gt;", 
			title: "Pre code block", 
			selector: "pre",
			action: function()
			{
				formatBlock("pre");
			}
		},
		{
			code: "code", 
			content: "&lt;/&gt;", 
			title: "Code", 
			selector: "code",
			action: function()
			{
				formatInline("code");
			}
		},
		{
			code: "color", 
			content: "C", 
			title: "Text color",
			selector: "font", 
			action: function()
			{
				document.execCommand("foreColor", false, prompt("Text color:"));
			}
		},
		{
			code: "background", 
			content: "BG", 
			title: "Background color",
			selector: "span", 
			action: function()
			{
				document.execCommand("backColor", false, prompt("Background color:"));
			}
		},
		{
			code: "h1", 
			content: "H1", 
			title: "H1 heading",
			selector: "h1", 
			action: function()
			{
				formatBlock("h1");
			}
		},
		{
			code: "h2", 
			content: "H2", 
			title: "H2 heading",
			selector: "h2", 
			action: function()
			{
				formatBlock("h2");
			}
		},
		{
			code: "h3", 
			content: "H3", 
			title: "H3 heading",
			selector: "h3", 
			action: function()
			{
				formatBlock("h3");
			}
		},
		{
			code: "h4", 
			content: "H4", 
			title: "H4 heading",
			selector: "h4", 
			action: function()
			{
				formatBlock("h4");
			}
		},
		{
			code: "h5", 
			content: "H5", 
			title: "H5 heading",
			selector: "h5", 
			action: function()
			{
				formatBlock("h5");
			}
		},
		{
			code: "h6", 
			content: "H6", 
			title: "H6 heading",
			selector: "h6", 
			action: function()
			{
				formatBlock("h6");
			}
		},
		{
			code: "left", 
			content: "L", 
			title: "Left align text",
			selector: "p[style*='left']", 
			action: function()
			{
				document.execCommand("justifyLeft");
			}
		},
		{
			code: "center", 
			content: "C", 
			title: "Center align text",
			selector: "p[style*='center']", 
			action: function()
			{
				document.execCommand("justifyCenter");
			}
		},
		{
			code: "right", 
			content: "R", 
			title: "Right align text",
			selector: "p[style*='right']", 
			action: function()
			{
				document.execCommand("justifyRight");
			}
		},
		{
			code: "justify", 
			content: "J", 
			title: "Justify align text",
			selector: "p[style*='justify']", 
			action: function()
			{
				document.execCommand("justifyFull");
			}
		},
	];
	
	// Add buttons to toolbar.
	settings.buttons.forEach(button =>
	{
		var buttonProperty = buttonProperties.find(b => b.code == button.code);
		button.properties = buttonProperty;
		button.el = document.createElement("button");
		// Set button properties.
		button.el.innerHTML = button.content ?? buttonProperty.content;
		button.el.title = button.title ?? buttonProperty.title;
		button.el.style.cssText = `
			min-width: 34px;
			height: 34px;
			border: none;
			border-radius: 20px;
			margin: 4px;
			color: ${settings.button.textColor};
			background-color: ${settings.button.backgroundColor};
			font-family: 'Courier New', monospace;
			font-size: 20px;
			font-weight: bold;
			text-align: center;
		`;
		toolbar.appendChild(button.el);
		// Process click event.
		button.el.onclick = function()
		{
			buttonProperty.action();
			return false;
		}
	});
	
	function formatBlock(nodeName)
	{
		// Remove existing block.
		var el = window.getSelection().baseNode;
		while (el)
		{
			if (el.nodeName.toLowerCase() == nodeName.toLowerCase())
			{
				document.execCommand("formatBlock", false, "p");
				return;
			}
			el = el.parentNode;
		}
		// Add block.
		document.execCommand("formatBlock", false, nodeName.toLowerCase());
	}

	function formatInline(nodeName)
	{
		// Remove existing inline.
		var el = window.getSelection().baseNode;
		while (el)
		{
			if (el.nodeName.toLowerCase() == nodeName.toLowerCase())
			{
				el.outerHTML = el.innerHTML;
				return;
			}
			el = el.parentNode;
		}
		// Add inline.
		var selection = window.getSelection();
		var range = selection.getRangeAt(0);
		var wrapper = document.createElement(nodeName);
		range.surroundContents(wrapper);
		selection.removeAllRanges();
		selection.addRange(range);
	}
	
	// Listen for selection change events.
	document.addEventListener("selectionchange", (event) =>
	{
		if (event.target.activeElement.contentEditable == "true")
		{
			// Grab selection.
			var selection = document.getSelection();
			var range = selection.getRangeAt(0);
			// Check if at least one character is selected.
			if (range.toString())
			{
				// Show toolbar below current selection.
				var rects = range.getClientRects();
				toolbar.style.display = "block";
				toolbar.style.left = parseInt(rects[0].left) + "px";
				toolbar.style.top = parseInt(window.scrollY + rects[0].top + rects[0].height) + "px";
				// Reset all button colors.
				settings.buttons.forEach(button =>
					{
						button.el.style.color = settings.button.textColor;
						button.el.style.backgroundColor = settings.button.backgroundColor;
					})
				// Toggle buttons based on selection.
				var el = range.startContainer;
				while (el)
				{
					settings.buttons.forEach(button =>
					{
						if (el.matches && el.matches(button.properties.selector))
						{
							button.el.style.color = settings.button.selectedTextColor;
							button.el.style.backgroundColor = settings.button.selectedBackgroundColor;
						}
					});
					el = el.parentNode;
				}
				// Wait until the contentEditable field no longer has focus, then hide the toolbar.
				event.target.activeElement.addEventListener("focusout", (event) =>
				{
					var el = event.relatedTarget;
					while (el)
					{
						// When el comes across the toolbar element, keep the toolbar visible.
						if (el == toolbar)
						{
							return;
						}
						el = el.parentNode;
					}
					toolbar.style.display = "none";
				});
			}
			else
			{
				// When no text is selected, hide the toolbar.
				toolbar.style.display = "none";
			}
		}
	});

}
