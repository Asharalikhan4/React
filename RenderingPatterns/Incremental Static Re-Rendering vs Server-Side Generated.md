# Incremental Static Re-Rendering vs Server-Side Generated

Let us learn the difference between Static site generation (SSG) and Incremental Static regeneration (ISR).

We have already seen the difference between server-side rendered and client-side rendered, still, let me summarize it for you.

**- Server-side rendered:-** In SSR, every time a page is navigated in the browser, the request is sent to the server and the server generates a new HTML page with data pre-filled and sends it back to the browser. This HTML is then parsed and rendered in the browser.

**- Client-side rendered:-** In CSR, Only the HTML page is there which is loaded initially, after that the page navigation is handled on the client itself (browser) and only the data is fetched from the server through any means like Rest APIs and then the UI is updated with the help of JavaScript.

While both of these suffice different use cases and have their pros and cons, if we understand them better, we see a way to optimize them.

## What is static site generation (SSG)?
In the SSR, every time a request is made, the server generates a new HTML page, which is time and resource-consuming as re-computation would take place. What if we could generate all the HTML pages beforehand and then just serve them on request?

This would remove the need for re-computation thus we can remove the dependency of the server itself and also be faster as we are just returning pre-generated things.

Static site generation does exactly the same and the modern JavaScript frameworks like Gatsby and Nextjs provide this under the hood. All the HTML pages will be generated at the build time and then they can be served promptly.

With this we can take advantage of both SSR as HTML is pre-generated thus SEO won't be affected as well as CSR as HTML has to be rendered and shown in the browser.

### Advantages of static site generation
**- Blazing speed -** As the HTML pages are pre-generated they can be served through CDN, Because of caching, we will have faster response and that will result in better user experience.

**- Server load reduction -** Because we are avoiding the re-computation, it will remove the load from the server.

### Disadvantages of static site generation
**- Not ideal for large applications:-** For the large applications that have lots of pages, it could take some time to generate all the pages before hand.

### Applications of static site generation
Best suited for applications that have static content but use SEO like Blogs.

## What is incremental site regeneration (ISR)?
While SSG, boots the performance, it is not suitable for all the scenarios, especially when we want to have the partial dynamic content in the pages at the runtime.

For this, we can make use of the incremental site regeneration that makes use of both SSG and SSR. As the name suggests, it allows to update the pre-generated static HTML pages incrementally.

Rather than complete generation, we will do a partial update of the already generated page. This provides the speed of the static site generation with the capabilities of the server-side rendered.

Incremental Static Regeneration is provided by the Nextjs framework.

## Advantages of incremental site regeneration
**- Blazing speed with dynamic content:-** Once the page is generated on the initial request, it can be cached and served through CDN, while on the subsequent request, the content can be gradually updated.
**- No load time:-** Because the page is already generated, the user is served with the new page instantly, while the dynamic contents can be lazy loaded.

### Disadvantages of incremental site regeneration
**- Slower initial response:-** For the large applications, if there are lots of pages, then we will see a slower initial response while generating the pages.
**- Not ideal for Real-Time:-** It is not ideal for the applications that requires real-time update of the data, as frequent updates will affect the performance.

### Applications of incremental site regeneration
Best suited for applications that have to rely on minor dynamic updates of the contents. like food ordering site, where the page structure remains universal, but the menu or restaurant data keep changing on the location served.