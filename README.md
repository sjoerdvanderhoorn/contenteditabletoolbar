# ContentEditable Toolbar
Adds a simple floating toolbar to contentEditable elements, without the need to add any properties in your HTML code.

# Example

![contenteditabletoolbar](https://user-images.githubusercontent.com/24693534/218323621-9dca9837-5d1d-4eec-b59c-a8cfc1b2e261.png)

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
