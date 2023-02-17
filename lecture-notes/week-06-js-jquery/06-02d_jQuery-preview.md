# jQuery Preview

Tonight's homework will be to watch videos which introduce jQuery. Here's some context, to help you better understand the videos.


## What is jQuery?

jQuery is a **javascript library**. In other words, it's javascript code that someone else wrote and kindly made available for us to use freely. Take a look:

> [https://code.jquery.com/jquery-3.6.1.js](https://code.jquery.com/jquery-3.6.1.js)

While some of it might look kind of weird, it's nothing but a bunch of functions, variables, conditionals, arrays, loops... in other words, javascript code!

### Downloading jQuery

We can download the `jquery.js` file online, and then source it in like any other javascript file.

- Fork and clone tonight's assignment repo: https://github.com/PrimeAcademy/jquery-fundamentals-video
- Go to [jquery.com/download](https://jquery.com/download/)
- Click on the link that says _Download the uncompressed, development jQuery_
- Press `CMD-S`, and save the file to your Desktop as `jquery.js`

We're saving jquery to your Desktop, so that you can easily find and reuse it for every new project we create. 

Let's try loading the jquery file you just downloaded:

- Clone this repo
- copy the jquery file you just downloaded into your project folder
- Open the `index.html` file
- Add a `<script src="jquery.js"></script>` element to load the jquery file. 

Note that you must load jquery before any other scripts!

```html
<!-- jquery.js must be before app.js -->
<script src="jquery.js"></script>
<script src="app.js"></script>
```

To test that jquery is loaded, take a look at the Chrome Dev Tools console. You should a message that says:

> We have jQuery! 💲💲💲

If you're not seeing this message, make sure you've followed all the steps above!

## What is the DOM?

The magic of jQuery is that it lets users **change the HTML that they see in the browser**, as the user interacts with the page.

Try clicking the "Secret Button", and see how it adds a new HTML element to the page!

To be clear, **jQuery is not actually changing your `index.html` file,** it's just changing the HTML elements as you see them in your browser. **This dynamic, changing HTML structure is called the DOM**, or _Document Object Model_.

There's plenty more to say about the DOM, but we'll dive deeper into that topic tomorrow.
