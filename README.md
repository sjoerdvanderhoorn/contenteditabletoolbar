# ContentEditable Toolbar
Adds a simple floating toolbar to contentEditable elements, without the need to add any properties in your HTML code.

# Usage

Add the lines of code to your HTML. Adjust the settings as desired.

```html
<script src="https://cdn.jsdelivr.net/gh/sjoerdvanderhoorn/contenteditabletoolbar/contenteditabletoolbar.js"></script>
<script>
window.addEventListener("load", function()
{
	contentEditableToolbar(
	{
		buttons: ["bold", "italic", "underline", "link", "ordered", "unordered", "quote", "code"]
	});
});
</script>
```
