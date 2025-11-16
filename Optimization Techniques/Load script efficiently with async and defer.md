- Async vs Defer, which is better to load a script?

- Loading the web page fast is so critical right now because of the various impact that it creates. SEO, UX, User Satisfaction are the various things that are affected.

- So we want our web page to load as fast as possible or at least want the first paint to happen as soon as possible.

- In the current web development, we cannot think of building a web app that does not contain javascript. It is a must and we should always think to handle its loading/execution carefully for better performance.

Because –
> JavaScript is considered a "parser blocking resource".  
> This means that the parsing of the HTML document itself is blocked by JavaScript.

- HTML Parsing
- HTML Parsing Paused
- Script Download
- Script Execution

## Loading script in the head
- As a beginner, we have been taught to import or load our external script in the head HTML element.

- The HTML parsing starts from the top and moves to the bottom. Whenever it hits the script tag it stops the parsing of the DOM and starts fetching the script (If it is external) and then executes it and later resumes the parsing of DOM.

![Related Image](../public/images/Script-1.png)

- Now if script takes longer to load and execute if the network connection is slow or you are on a mobile device then the user will see a blank page which is not we want.

## Loading script at the end of the body
- To fix this, it is advised to place our script tags at the bottom of the body tag to load it at the end.

- This will render the DOM and then load the script which gives us much better user experience.

- But it is still not a perfect solution because for long HTML documents there can be noticeable delays.

- This is how we used to fix the issues earlier in older browsers. But now with HTML5 we have two extra attributes for script tag, async and defer.

- Both of these are boolean values and drastically affect how the script should be loaded and executed.

## Loading script without any attributes
- When we load the script with any attributes. It pauses the parsing of DOM whenever script tag is hit and only resumes the parsing after downloading and executing the script.

![Related Image](../public/images/Script-1.png)

## Loading script with async
- async downloads the script while the DOM is parsing and only pauses the DOM for execution of the script.

![Related Image](../public/images/Async-1.png)

-  **Async** scripts follow "load-first" order. Which means if a second script of suppose 5kb loads before first script of 10kb then the second will execute first.

- That is why we should not use async when there is dependency on other script like Jquery.

- The DOMContentLoaded event may fire before and after an async script is loaded. There is no guarantee.

## Loading script with defer
- **defer** downloads the script while the DOM is still parsing but executes them only after the parsing is finished.

![Related Image](../public/images/defer-1.png)

- Using defer is same as loading the script at the end of the body tag.

- It executes the script in the order they are placed.

- defer scripts are executed only after the domInteractive event which is fired when the HTML is loaded and executed and DOM is built.

- CSS and Images are still being parsed and loaded and once done domComplete event will be triggered followed by onLoad.

## async or defer, best way to load script?
- If script is not depended on any other script then async is good. Because order of script execution will not affect anything.
- If script depends upon another script then go with defer. Also if the script is depended on DOM.
- If the script is small and is relied upon by an async script then use an inline script with no attributes placed above the async scripts.
- The DOMContentLoaded event fires only after the defer script is loaded and executed.