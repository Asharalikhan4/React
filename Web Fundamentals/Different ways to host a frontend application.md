# Different ways to host a frontend application
Please remember there is no best way to host a frontend application, depending upon the usecase we can use any of these.

Before exploring different ways, we have to first understand the different nature of the frontend application as then only we will be able to decide how it can be hosted.

## Varities of frontend apps.
There are majorly three types of frontend applications for the web.
- Single-page application (client-side rendered).
- Multi-page application (server-side rendered).
- Hybrid application (partly client-side, partly server-side rendered).

## Single-page application
In single-page applications (SPA) client-side rendering is used. The browser loads the initial page from the server, along with the scripts (frameworks, libraries, app code) and stylesheets required for the whole app. When the user navigates to other pages, a page refresh is not triggered. The URL of the page is updated via the [HTML5 History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API). New data required for the new page, usually in JSON format, is retrieved by the browser via AJAX requests to the server. The SPA then dynamically updates the page with the data via JavaScript, which it has already downloaded in the initial page load. This model is like how native mobile apps work.
- With this approach, the frontend can be built separately and then can communicate to the backend using Rest APIs or GraphQL.
- As the HTML is loaded only once and thereafter DOM is updated through JavaScript there are major SEO issues with it as searching engines are not able to crawl the pages properly.
- It does not require a server as we are only serving static files.
- Example - React, Vue, etc.

## Server Side rendered application.
The website was built with server-side rendering. Browser used to receive HTML from the server and then render it. When the page refreshes or the user navigates to a different page, the servers are used to send new HTML. That is why it is also called as Multi-page application as for each page request new HTML page is generated.
- Both frontend and backend can be part of the same code base or decoupled.
- There is no issue with SEO.
- It requires a server as content (HTML) is generated first and then served to the browser.
- Example - WordPress, Spring boot, etc.

## Hybrid approach.
The third approach is a hybrid of both, we use the best of both and then create a web app. It will partly be rendered on server-side and partly on client-side.

The page when requested will be constructed on the server and returned and then it will keep hydrating or updating on the client-side.

This is the most optimized way currently and is supported by all the modern JavaScript frameworks.
- This way it can be developed independently. Frontend and Backend can be decoupled.
- SEO-related things cab be rendered on the server.
- The remaining UI/UX can be done on the client side.
- Example - Next.js, Nuxt.js, etc.

## Different ways to host a web app (Frontend).
### Static Site Hosting using CDN (content delivery network).
As the name itself suggest we can host the static sites using any file storage available over the cloud, Amazon’s S3 bucket, or Azures storage.

All we need to define is an entry file (index.html) that will be opened when the URL will be accessed.

The index.html will hold the reference to all other static files such as script, style, images, fonts. All these files are part of the static bundle, we call them static because they remain constant.

We can take it to next level by adding a CDN (Content Delivery Network) on top of it to make it blazing fast by caching the files.

In this approach Backend and Frontend are hosted separately and on different domains or subdomains.

For SPA’s there is no major configuration is required on the server’s end except for the case where 404 will be thrown, same as the static site hosting if you are trying to open any route directly it will throw 404, we can solve this by redirecting it back to the base URL or the index.html

In apache, you can use this setting within yours .htaccess file.
```javascript
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QSA,L]

# force ssl
RewriteCond     %{SERVER_PORT} ^80$
RewriteRule     ^(.*)$ https://%{SERVER_NAME}%{REQUEST_URI} [L,R]
```

- No server is required.
- Blazing fast as we don’t have to perform any processing, just serve the files.
- Very cost-effective and can be used for personal projects, portfolios, or MVPs.
- Routing problem: As the routing is done on the client-side through JavaScript and HTML5 History API, if we try to access any routes directly like https://example.com/route it will return 404. This route will be only rendered after the initial rendering of the index.html which is not yet done. To solve this we can add a 404.html page and redirect it to the index.html page every time.
- SEO issue: Similar to the routing problem we also have an issue with SEO as there is only one HTML file.
- CORs issue: If backend and frontend are hosted on two different domains, we need to open the COR’s of the backend so that frontend can communicate it with it.

## Frontend as a part of the Backend app.
The static frontend bundle can be served from the backend app. We have a CI in place that generates the frontend bundle and copies the build file to the backend application and then backend serves those files.

This way we can develop the frontend in any tech stack and we just have to copy the build files.

Backend application will be any way hosted on the server, we can leverage this and copy the static files (build files) of SPA or Hybrid, within the backend and serve the files.

There are two possibilities here.
- Backend and Frontend both are served on the same URL but on different routes which solve the CORs issue. backend on https://example.com/apis/* and frontend on https://example.com/.
- Both are served on different ports either on domain and subdomain and internally proxied.

## Hybrid
For the Hybrid app, you can run both the Frontend and Backend on the same server and serve them on different domains or subdomains or ports.

To serve them on the same domain you can use a reverse proxy and redirect the backend URLs to the backend app and the frontend URLs to the frontend app.

## Independent Frontend And Backend apps.
As backend and frontend both are built with a Microservice approach keeping them separate can be a good use case in certain scenarios.

It is not the most efficient way but still if you want to keep your frontend and backend separate you can host them separately on different servers.

For Hybrid app where we want to leverage the capabilities of both SPA as well as Server-side rendering.

Partly pre-generated static files and partly server-side capabilities can be hosted as serverless functions.

Following platforms allow serverless functions hosting: Vercel, Netlify, Layer0, etc.