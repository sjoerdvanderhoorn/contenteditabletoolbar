var contentEditableToolbar = function(settings)
{
	// Load default settings when settings are missing.
	if (!settings)
	{
		settings = {
			buttons: ["bold", "italic", "underline", "link", "ordered", "unordered", "quote", "code"]
		}
	}
	
	// Define toolbar.
	var toolbar = document.createElement("div");
	toolbar.style.cssText = `
		display: none;
		position: absolute;
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
			code: "bold", 
			content: "B", 
			title: "Bold",
			action: function()
			{
				document.execCommand("bold");
			}
		},
		{
			code: "italic", 
			content: "<i>I</i>", 
			title: "Italic", 
			action: function()
			{
				document.execCommand("italic");
			}
		},
		{
			code: "underline", 
			content: "<u>U</u>", 
			title: "Underline", 
			action: function()
			{
				document.execCommand("underline");
			}
		},
		{
			code: "link", 
			content: "&zigrarr;", 
			title: "Link",
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
			action: function()
			{
				document.execCommand("insertOrderedList");
			}
		},
		{
			code: "unordered", 
			content: "*", 
			title: "Unordered list", 
			action: function()
			{
				document.execCommand("insertUnorderedList");
			}
		},
		{
			code: "quote", 
			content: "&ldquo;", 
			title: "Quote", 
			action: function()
			{
				formatBlock("blockquote");
			}
		},
		{
			code: "code", 
			content: "&lt;/&gt;", 
			title: "Code", 
			action: function()
			{
				formatBlock("pre");
			}
		},
	];
	
	// Add buttons to toolbar.
	settings.buttons.forEach(buttonCode =>
	{
		var buttonProperty = buttonProperties.find(b => b.code == buttonCode);
		var el = document.createElement("button");
		// Set button properties.
		el.innerHTML = buttonProperty.content;
		el.title = buttonProperty.title;
		el.style.cssText = `
			min-width: 34px;
			height: 34px;
			border: none;
			border-radius: 20px;
			margin: 4px;
			color: #ffffff;
			background-color: rgba(118, 181, 197, 1);
			font-family: 'Courier New', monospace;
			font-size: 20px;
			font-weight: bold;
			text-align: center;
		`;
		toolbar.appendChild(el);
		// Process click event.
		el.onclick = function()
		{
			buttonProperty.action();
			return false;
		}
	});
	
	function formatBlock(nodeName)
	{
		// Remove existing block
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
		// Add block
		document.execCommand("formatBlock", false, nodeName.toLowerCase());
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
