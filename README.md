# ContentEditable Toolbar
Adds a simple floating toolbar to contentEditable elements, without the need to add any extra properties to your HTML code. As text is selected, a popup toolbar shows, allowing the user to format the selection. The toolbar displays the current formatting that is applied and follows the cursor. 

# Example

![contenteditabletoolbar](https://user-images.githubusercontent.com/24693534/218323621-9dca9837-5d1d-4eec-b59c-a8cfc1b2e261.png)

# Usage

Add below lines of code to your HTML. Adjust the `buttons`-setting as desired.

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

# Available formatting options

When calling the contentEditableToolbar, the below buttons can be added in any order:

* `bold`
* `italic`
* `underline`
* `link`
* `ordered`
* `unordered`
* `quote`
* `code`
