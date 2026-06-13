# 55 Frontend System Design Concepts (React Focused)

## A practical cheat sheet covering Rendering, Architecture, Component Patterns, Data, APIs, and Optimizations

Just like Backend APIs need to be fast, scalable, and reliable, frontend apps also have to handle millions of users, load content quickly, manage complex data, and stay observable and secure.

This article is a deep-dive cheat sheet for frontend system design — specifically React-focused, and structured using the **RADIO pattern:** Requirements & Rendering, Architecture, Data Model, Interfaces & APIs, and Optimizations.

We will not cover every edge case for each topic — We have covered that individually, you search for the concept and you will find detailed article on each in the course. Instead, we will cover the core of each concept, the decision behind it, and where it fits in a production system. This will give you a reference to think through any frontend system design problem end to end.

We will first cover how pages reach users, then how systems are structured, then the five essential component rendering patterns every React engineer should know, then how data is modeled and stored, then how the client talks to the server, and finally how we make it all fast.

## Requirements & Rendering
One of the first decisions in any frontend system design is how pages reach your users. The rendering strategy you choose affects speed, SEO, infrastructure cost, and how fresh your content can be. This is not a frontend-only concern — it directly maps to backend decisions around caching, compute, and deployment.

Let us start from the most static and move toward the most dynamic.

### 1. SSG — Static Site Generation
Before SSG, websites worked in two fundamental ways. Either the server built the page fresh for every request, or the browser built it entirely on the client side. Both had costs: server computation per request, or a slow initial load while the browser fetched data.

SSG solves this by pre-building HTML at deploy time. The framework executes data-fetching code during the build, queries the database, and generates complete HTML files for each route. Those files are then uploaded to a CDN.

When a user requests a page, they receive a fully formed HTML document immediately — no server computation, no client-side data fetching for the initial render. It is as fast as a file download.

```javascript
// Next.js App Router — static generation with data fetching at build time
export async function generateStaticParams() {
  const posts = await fetchAllPosts();
  return posts.map(post => ({ slug: post.slug }));
}

export default async function PostPage({ params }) {
  const post = await fetchPost(params.slug); // runs at build time
  return <article>{post.content}</article>;
}
```

The trade-off is content freshness. If your data changes, the old HTML lives on the CDN until you redeploy. This is why SSG is best for content with low update frequency.

Why it matters:
- Pages load from the nearest CDN edge — no server round-trip.
- Handles massive traffic spikes without scaling infrastructure.
- Search engines index fully-rendered HTML immediately, which directly improves SEO rankings.

**Use case:** Documentation sites, marketing landing pages, personal blogs. Vercel's own homepage is statically generated.

### 2. ISR — Incremental Static Regeneration
Static Site Generation is fast, but rebuilding the entire site every time content changes is painful. A site with 100,000 product pages cannot redeploy every time a price changes.

ISR solves this by giving each page its own revalidation window. The page is pre-built and served from the CDN like SSG. After the revalidation time expires, the next visitor triggers a background rebuild of that specific page — not a full site rebuild. The visitor sees the old version instantly; the next visitor gets the fresh one.

This is exactly the HTTP stale-while-revalidate cache pattern, applied to full HTML pages.

```javascript
// Next.js App Router — revalidate every 60 seconds
export async function generateStaticParams() { ... }

export default async function ProductPage({ params }) {
  const product = await fetch(`/api/products/${params.id}`, {
    next: { revalidate: 60 } // rebuild in background after 60s
  }).then(r => r.json());

  return <ProductDetail product={product} />;
}
```

Why it matters:
- Same CDN speed as SSG, but content can update without a full redeploy.
- Different pages can have different revalidation intervals — a news article might revalidate every 5 minutes; a product description every hour.

**Use case:** E-commerce product pages (Shopify storefronts), news article pages, event listings. The homepage stays static; individual product pages revalidate on their own schedule.

### 3. SSR — Server-Side Rendering
SSR generates the page on the server for every request. The server fetches fresh data, renders the full HTML, and sends it to the browser. Unlike SSG and ISR, content is always up-to-date and can be personalised to the user making the request.

The cost is compute. Every page view requires a server to do work. Under heavy traffic, SSR servers can become a bottleneck — which is why caching headers like Cache-Control: s-maxage=30, stale-while-revalidate are important even for SSR responses.

```javascript
// Next.js App Router — Server Component with per-request data fetching
export default async function DashboardPage() {
  const session = await getServerSession(); // personalised per user
  const data = await fetchDashboardData(session.userId);
  return <Dashboard metrics={data} user={session.user} />;
}
```

Why it matters:
- Content is always fresh and can include user-specific data.
- Full HTML reaches the browser before any JavaScript runs — better for slower devices.
- SEO crawlers see complete content without needing to execute JavaScript.

**Note:** Under high traffic, SSR adds latency compared to CDN-cached responses. Combine SSR with edge caching where personalisation allows it.

**Use case:** Social media feeds, admin dashboards, checkout pages, user profile pages — anywhere the content is unique to the requesting user.

### 4. CSR — Client-Side Rendering
CSR means the server sends an HTML shell and a JavaScript bundle. The browser downloads the bundle, React mounts, fetches data, and builds the page. The server does almost nothing.

This makes CSR excellent for apps where users spend long sessions on a single page — rich editors, dashboards, internal tools. The first load is slower (blank screen until JS executes), but every subsequent navigation is instant because the app is already in memory.

You can review the difference by opening Figma in your browser with slow 3G network throttling. The initial load is a loading spinner for several seconds — that is CSR at work. Once it loads, every panel opens instantly.

```javascript
// Vite + React — pure CSR, data fetched entirely in the browser
function App() {
  const { data, isLoading } = useQuery(['dashboard'], fetchDashboard);
  if (isLoading) return <Skeleton />;
  return <Dashboard data={data} />;
}
```

Why it matters:
- No server infrastructure needed — deploy to any static file host.
- Navigation between views is instantaneous after initial load.
- Works well when SEO is not a concern.

**Note:** First-load performance and SEO are the main weaknesses. Without pre-rendering, search crawlers may not index content correctly.

**Use case:** Figma, Notion, Linear, internal SaaS dashboards — highly interactive apps where users stay for long sessions and SEO is irrelevant.

### 5. Hybrid Rendering
Most real applications need different strategies for different parts. The homepage needs to be fast and SEO-optimised (SSG). The product catalog needs fresh prices (ISR). The checkout needs user-specific data (SSR). The cart updates in real time (CSR).

Hybrid rendering is the practice of mixing these strategies at the route level — and in React Server Components, even at the component level within a single page.

Next.js App Router makes this the default. Server Components render on the server (SSR or SSG depending on config). Client Components render in the browser. A single page can have a server-rendered product description alongside a client-rendered "Add to Cart" button.

Why it matters:
- You get speed where you need it, freshness where you need it, and interactivity where you need it — without compromising any of the three.
- Avoids the trap of applying one strategy to an entire app.

**Use case:** Any production-scale e-commerce or content platform. Vercel, Shopify, and The New York Times all use hybrid rendering across their properties.

### 6. React Server Components (RSC)
React Server Components run on the server and send a serialised React tree to the browser — not HTML, not JSON, but a special wire format called the RSC payload. They have zero JavaScript footprint on the client.

The boundary is explicit: "use client" at the top of a file marks it as a Client Component. Everything else is a Server Component by default in the App Router. Server Components can read databases, call internal services, and access secrets. Client Components handle interactivity, hooks, and browser APIs.

The common mistake is marking a large component tree as "use client" because one small child needed a useState. Instead, push the interactive leaf down as far as possible and keep the tree server-rendered above it.

```javascript
// server-component.tsx — no "use client", runs on the server
import { AddToCartButton } from './add-to-cart-button'; // client component

export default async function ProductDetail({ id }) {
  const product = await db.products.findById(id); // direct DB access
  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <AddToCartButton productId={id} /> {/* only this is client-side */}
    </div>
  );
}
```

Why it matters:
- Large subtrees never ship to the browser — bundle size reduction is significant for data-heavy pages.
- Server-side data fetching without useEffect or loading states for the initial render.

**Use case:** Data-heavy product pages, admin tables, dashboards where most of the content is read-only and interactivity is limited to a few actions.

### 7. Streaming SSR & Suspense
Traditional SSR waits for all data to resolve before sending any HTML. If one API call takes 800ms, the user stares at a blank page for 800ms even though the header and nav could have loaded instantly.

Streaming SSR flushes the HTML shell to the browser immediately and streams in sections as their data resolves. React's Suspense is the mechanism — each <Suspense> boundary is a streamable chunk. The browser renders the shell and shows fallback skeletons for unresolved sections.

```javascript
export default function Page() {
  return (
    <Layout>
      <HeroSection /> {/* renders immediately */}
      <Suspense fallback={<ProductListSkeleton />}>
        <ProductList /> {/* streams in when ready */}
      </Suspense>
      <Suspense fallback={<ReviewsSkeleton />}>
        <Reviews /> {/* streams independently */}
      </Suspense>
    </Layout>
  );
}
```

Why it matters:
- TTFB (Time to First Byte) drops dramatically — the browser receives something to render immediately.
- Slow data sources do not block fast ones.

**Use case:** Any SSR page with multiple independent data dependencies — product pages with reviews, dashboards with independent metric panels.

### 8. Web Vitals — LCP, CLS, INP
To measure frontend performance, we track three core Web Vitals:
- **LCP (Largest Contentful Paint):** Time for the hero image or main heading to fully appear. Target: under 2.5 seconds. The main culprit is an unoptimised hero image or a render-blocking resource.
- **CLS (Cumulative Layout Shift):** How much the page layout jumps while loading. Target: under 0.1. Caused by images without explicit dimensions, late-loading ads, or fonts triggering text reflow. Fix by reserving space with aspect-ratio or explicit height/width on images.
- **INP (Interaction to Next Paint):** Time between a user action and the browser's next visual update. Replaced FID in 2024. Target: under 200ms. Long React renders during user interactions are the main cause — useDeferredValue and useTransition help.

These are the frontend equivalents of response time, uptime, and throughput. Google uses them as ranking signals.

Why it matters:
- Users notice delays above 100ms; they abandon pages if the initial load exceeds 3 seconds.
- LCP and INP directly affect Google Search rankings.

**Use case:** Monitor with the web-vitals npm package in production. Vercel Analytics and Datadog RUM show you real-user distributions, not just lab scores.

### 9. CDN & Edge Delivery
No matter which rendering strategy you choose, how content is physically delivered to users matters enormously. A CDN stores copies of your static assets (JS, CSS, images, pre-rendered HTML) on servers worldwide. A user in Mumbai requests your site and receives it from a Mumbai PoP — not from your origin server in Virginia.

Edge computing takes this further. Tools like Vercel Edge Functions and Cloudflare Workers run JavaScript at the CDN PoP itself. You can personalise responses, run A/B tests, and redirect users without a round-trip to a central server.

The constraint is the edge runtime — it is not full Node.js. No file system access, limited memory, restricted APIs. Middleware and lightweight auth checks work well at the edge. Heavy computation does not.

Why it matters:
- Latency drops from hundreds of milliseconds (transatlantic) to single-digit milliseconds (local PoP).
- CDN caching offloads origin server traffic by orders of magnitude during traffic spikes.

**Use case:** Every production app should serve static assets through a CDN. Global apps (social platforms, e-commerce) should consider edge-side personalisation to avoid SSR latency for international users.

### 10. Service Workers & Caching Strategies
Service workers are JavaScript files that run in a separate background thread, outside the main page. They act as a programmable proxy between the browser and the network — intercepting every request your page makes and deciding whether to serve it from cache or let it reach the network.

The three strategies we use most:
- **Cache First:** Serve from cache immediately, fall back to network if not found. Fastest, but risks serving stale content.
- **Network First:** Try the network, fall back to cache if offline. Always fresh when online, but adds latency.
- **Stale While Revalidate:** Serve from cache immediately (fast), then update the cache from the network in the background. The right choice for most assets.

```javascript
// service-worker.js — stale-while-revalidate for API responses
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open('api-cache').then(async cache => {
      const cached = await cache.match(event.request);
      const networkFetch = fetch(event.request).then(res => {
        cache.put(event.request, res.clone());
        return res;
      });
      return cached || networkFetch;
    })
  );
});
```

Use Workbox to avoid writing this boilerplate yourself. The hard part of service workers is cache invalidation — a stale service worker can continue serving old JavaScript after a deploy. Always version your service worker and include a proper update flow.

Why it matters:
- Repeat visits load instantly from cache.
- Apps remain usable on flaky or offline networks.

**Use case:** Twitter Lite, Starbucks PWA, and Uber Lite all use service workers to maintain usability on slow mobile networks in emerging markets.

### 11. PWA — Progressive Web App
A PWA is a web app that behaves like a native app. It can be installed on a device, works offline, sends push notifications, and loads instantly on repeat visits. It achieves this through three technologies working together: a service worker (for caching and offline), a web app manifest (for installability and display), and HTTPS (for security).

The manifest defines how the installed app looks — its name, icons, splash screen, and whether it opens in a browser chrome or full-screen.

```javascript
// public/manifest.json
{
  "name": "My App",
  "short_name": "App",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#0F6E56",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

Why it matters:
- Installed PWAs have higher engagement rates than browser-based equivalents.
- Removes the friction of app store distribution.

**Use case:** Apps targeting markets where data is expensive and native app install rates are low. Starbucks found that their PWA was 99.84% smaller than their native iOS app, and conversion rates were nearly identical.

## Architecture
Once we understand how pages reach users, we need to think about how the system itself is structured. Frontend architecture is about making the codebase maintainable, scalable, and understandable as teams and features grow.

### 12. Component-Based Architecture
React's core model is that UI is a function of state. Every piece of the screen is a component — a function that takes props and returns JSX. Composition is the fundamental pattern: small, focused components combine into larger ones.

The architectural question is granularity. Too coarse and components are impossible to reuse. Too fine and you spend more time managing prop drilling than building features. A useful rule: if a component has more than one reason to change (it handles both layout and data fetching), split it. If two components always change together, merge them.

Why it matters:
- Small, focused components are independently testable.
- Composition enables building complex UIs from simple, verified parts.
- Separation of concerns is enforced structurally by file organisation.

**Use case:** Every React application. The discipline is in where you draw component boundaries, not in whether to use components at all.

### 13. One-Way Data Flow vs Two-Way Binding
React enforces one-way data flow: data flows down via props, events bubble up via callbacks. A parent passes data to a child; the child calls an onChange callback to request updates. You always know exactly where state lives and who changed it.

Angular and Vue support two-way binding where a variable and a UI input stay in sync automatically. Convenient for simple forms, but state changes can cascade in ways that are hard to trace in large component trees.

In React we simulate two-way binding with controlled components — value plus onChange together. The explicit contract is more verbose but infinitely more debuggable.

```javascript
// Controlled component — React owns the value
function SearchInput({ value, onChange }) {
  return (
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder="Search..."
    />
  );
}
```

Why it matters:
- Debugging is predictable — every state change has a traceable cause.
- Time-travel debugging (Redux DevTools) is only possible because state mutations are explicit and unidirectional.

**Use case:** Any React form, search input, or complex UI where multiple components react to shared state.

### 14. Micro-Frontends
When multiple teams work on the same application, deployments become a coordination problem. Team A cannot deploy until Team B's code is reviewed. One team's bad deploy breaks everyone's product.

Micro-frontends solve this by giving each team ownership of a vertical slice — a full feature, not a layer. Teams build, test, and deploy independently. A shell application composes the micro-frontends at runtime.

Module Federation (Webpack 5, or the Vite plugin equivalent) enables this — separate builds can share React components, utilities, and state at runtime without bundling everything together.

Large companies like Zalando, IKEA, DAZN, and Spotify use micro-frontends so each team can build and release their part of the application independently. The cost is real: dependency version conflicts, harder debugging across boundaries, and coordination overhead for shared components. Micro-frontends are not the right choice for a team of three.

Why it matters:
- Independent deployment cycles remove cross-team coordination bottlenecks.
- Teams can choose their own tooling and release cadence.

**Use case:** Large engineering organisations with multiple product teams working on a single customer-facing application.

## 15. Design System & Component Library
A design system is the single source of truth for the visual language of a product. It includes reusable components, design tokens (color, spacing, typography scales), and usage guidelines. It prevents every team from building their own version of a Button component.

Shopify's Polaris, IBM's Carbon, and Airbnb's Design Language System are well-known examples. In React, we expose the component library as an npm package and document components with Storybook.

The versioning discipline matters. Treat the library as a public API. Breaking changes need major version bumps with migration guides. Teams consuming the library should never be surprised by a minor version update changing visual behavior.

Why it matters:
- Visual consistency across all products and teams without manual coordination.
- Shared components are tested once and reused everywhere.

**Use case:** Any organisation running more than one product or more than one team contributing to the same UI. Even a small team benefits from a shared set of 10–15 core components.

### 16. Style Management — CSS Modules vs SCSS vs CSS-in-JS
How we write and scope styles has significant architectural implications at scale.

CSS Modules scope class names locally by the build tool. No collisions, zero runtime cost, straightforward to understand. This is the default we recommend.

SCSS adds variables, nesting, and mixins on top of CSS Modules. Good for large teams with complex style hierarchies. The risk is deep nesting creating specificity nightmares that are hard to override.

CSS-in-JS (styled-components, Emotion) co-locates styles with components and supports dynamic styles based on props. The runtime cost for prop-driven styles adds up on mobile devices. Zero-runtime alternatives like Vanilla Extract and Panda CSS offer the ergonomics without the runtime penalty.

Tailwind CSS provides utility classes that eliminate the naming problem entirely. HTML becomes more verbose, but style co-location is guaranteed. Either you love it or you hate it — but its adoption across major companies (Vercel, GitHub, Stripe) is hard to ignore.

**Why it matters:**
- Style scope determines whether a change in one component accidentally breaks another.
- Runtime CSS-in-JS adds measurable overhead on slower devices — worth benchmarking before adopting.

**Use case:** CSS Modules for most React projects. Tailwind for teams that want to move fast. SCSS when you are migrating an existing codebase with global styles. CSS-in-JS only when prop-driven dynamic styling is genuinely required.


### 17. Monorepo Structure
A monorepo keeps multiple apps and packages in a single git repository. Your web app, mobile app, design system, shared utilities, and end-to-end tests all live together. Turborepo and Nx handle build orchestration and caching — they only rebuild packages whose inputs have changed.

The benefit is atomic cross-package changes. When you rename a shared utility, you update every consumer in the same commit. No version coordination across repositories. The cost is a more complex initial setup and CI pipelines that need careful configuration to avoid rebuilding everything on every commit.

**Why it matters:**
- Shared packages stay in sync — no "works in one app, broken in another" due to version drift.
- Refactoring across package boundaries is a single pull request.

**Use case:** Any team maintaining more than one app that shares components, utilities, or types. The monorepo structure is de facto at companies like Google, Meta, and most modern React-focused startups.

### 18. CI/CD for Frontend
Frontend applications need the same deployment discipline as backend services. A typical pipeline runs: lint → type-check → unit tests → build → visual regression tests → deploy preview → smoke tests → promote to production.

Vercel and Netlify generate automatic preview deployments for every pull request — a URL that shows exactly what the branch looks like. This is one of the most valuable tools for design review. No more "can you share your screen?" for review sessions.

Feature flags decouple deployment from release. We deploy code that is invisible to users, then toggle the flag in a dashboard when ready. LaunchDarkly and Unleash handle this at scale. A simple Zustand store can handle it for smaller apps.

**Why it matters:**
- Automated pipelines eliminate human error in deployment steps.
- Preview deployments catch visual regressions before they reach users.

**Use case:** Every team shipping to production. Netflix deploys thousands of times per day using automated pipelines — frontend teams operate at the same velocity with the same discipline.

### 19. Error Boundaries
React's Error Boundary is a class component that catches JavaScript errors during rendering and displays a fallback UI instead of crashing the entire application. Without boundaries, one component throwing an error unmounts the whole tree — users see a blank page.

The key is granularity. We wrap risky sections individually so one failure is isolated. A broken third-party widget should not take down the checkout flow.

```javascript
import { ErrorBoundary } from 'react-error-boundary';

function ProductPage() {
  return (
    <ErrorBoundary fallback={<ErrorMessage />} onError={logToSentry}>
      <ProductReviews /> {/* if this crashes, ProductDetail still renders */}
    </ErrorBoundary>
  );
}
```

Always forward caught errors to an observability tool like Sentry inside the onError callback. An error boundary that swallows errors silently is worse than no error boundary.

**Why it matters:**
- Partial failures degrade gracefully instead of wiping out the entire page.
- Production errors are captured with full context.

**Use case:** Any component that renders user-generated content, embeds third-party widgets, or uses experimental features should have its own Error Boundary.

### 20. Accessibility (a11y)
Accessibility is a system-level concern, not a checklist. Semantic HTML, ARIA attributes, keyboard navigation, and focus management all affect architecture decisions from the start — they are expensive to retrofit.

Using a <button> instead of a <div onClick> gives us keyboard focusability, space/enter activation, and the correct ARIA role for free. React's useId() hook generates stable IDs for pairing labels with inputs. aria-live regions announce dynamic content updates to screen readers without a page navigation.

Test with the axe-core library in Jest to catch violations in CI. Manual keyboard-only navigation testing catches the cases automated tools miss. WCAG 2.1 AA is the legal baseline in most jurisdictions.

**Why it matters:**
- Accessible apps reach more users, including those with permanent, situational, or temporary disabilities.
- WCAG compliance is legally required for government sites in the US, EU, and many other jurisdictions.

**Use case:** Every public-facing application. Government and healthcare apps are legally required to meet WCAG 2.1 AA. Ignoring accessibility until launch means a costly retrofit.

### 21. Security — XSS, CSRF, CSP
The frontend is the first line of defence for the application.

**XSS (Cross-Site Scripting):** An attacker injects malicious JavaScript that runs in the victim's browser. React escapes string content by default, but dangerouslySetInnerHTML bypasses this entirely. Never set it with user-generated content.

**CSRF (Cross-Site Request Forgery):** An attacker tricks a logged-in user's browser into making a request the user did not intend. Mitigate with SameSite=Strict cookies and CSRF tokens on state-changing endpoints.

**CSP (Content Security Policy):** A response header that tells the browser which scripts, styles, and external resources are allowed to load. A strict CSP prevents most XSS even if code injection occurs.

Auth tokens belong in httpOnly cookies — not localStorage. LocalStorage is readable by any JavaScript on the page. One XSS vulnerability anywhere on your domain exposes every token stored there.

**Why it matters:**
- Frontend security failures lead to account takeovers, data theft, and fraudulent transactions.
- CSP is your last line of defence if an XSS vector is found.

**Use case:** Any app handling authentication, payments, or personal data. Stripe, GitHub, and all major financial apps enforce strict CSP headers.

## Component Rendering Patterns
Component architecture is not just about splitting UI into smaller pieces. It is about the structural contracts between components — how logic is separated from presentation, how behaviour is shared without inheritance, how flexible APIs are designed without breaking consumer code.

These five patterns appear repeatedly in large React codebases. Understanding them is the difference between components that are easy to extend and ones that break every time requirements change.

### 22. Container / Presentation Pattern
The Container/Presentation pattern splits a component into two distinct concerns. The container handles all data fetching, state management, and side effects. The presentation component is a pure function of its props — it renders UI and nothing else.

Before hooks became standard, this was the primary way to separate logic from rendering in React. It remains highly relevant because the separation it enforces — regardless of how you implement it — is a structural discipline, not just a technique.

```javascript
// containers/user-profile-container.jsx — owns data and state
function UserProfileContainer({ userId }) {
  const { data: user, isLoading } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
  });

  if (isLoading) return <ProfileSkeleton />;
  return <UserProfile user={user} onFollow={handleFollow} />;
}

// components/user-profile.jsx — pure presentation, no data fetching
function UserProfile({ user, onFollow }) {
  return (
    <div className={styles.profile}>
      <img src={user.avatar_url} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.bio}</p>
      <button onClick={() => onFollow(user.id)}>Follow</button>
    </div>
  );
}
```

The presentation component is trivially testable — render it with any props and assert the output. The container is testable by mocking the query. Neither depends on the other's internals.

Today, custom hooks serve a similar purpose to containers. The distinction is still worth making explicitly: components that fetch data should not also be responsible for pixel-level rendering decisions, and vice versa.

**Why it matters:**
- Presentation components can be developed and tested in isolation in Storybook — no mock API setup required.
- The container can swap its data source (REST to GraphQL, prop drilling to context) without touching the presentation component.

**Use case:** Any component that both fetches data and renders UI. Dashboards, profile pages, feed lists — anywhere the data logic and the visual logic are independently complex enough to warrant separation.

### 23. Higher-Order Component (HOC) Pattern
A Higher-Order Component is a function that takes a component and returns a new component with additional behaviour injected. It is the React equivalent of a decorator pattern — wrapping a component to enhance it without modifying its source.

HOCs were the primary code-sharing mechanism before hooks. Many libraries still expose their APIs as HOCs, and the pattern remains the right choice for cross-cutting concerns that need to wrap the entire component lifecycle.

```javascript
// hocs/with-auth.jsx — redirects unauthenticated users
function withAuth(WrappedComponent) {
  return function AuthenticatedComponent(props) {
    const { user, isLoading } = useAuth();

    if (isLoading) return <PageSpinner />;
    if (!user) {
      redirect('/login');
      return null;
    }

    return <WrappedComponent {...props} user={user} />;
  };
}

// hocs/with-error-boundary.jsx — adds error boundary to any component
function withErrorBoundary(WrappedComponent, FallbackComponent) {
  return function WithErrorBoundary(props) {
    return (
      <ErrorBoundary fallback={<FallbackComponent />}>
        <WrappedComponent {...props} />
      </ErrorBoundary>
    );
  };
}

// usage — compose HOCs from outside the component definition
const ProtectedDashboard = withAuth(withErrorBoundary(Dashboard, DashboardError));
```

The main risk with HOCs is prop collision — if the HOC injects a prop with the same name as an existing prop, one silently overwrites the other. Always forward all original props with {...props} and document which props the HOC injects. Stacking more than two or three HOCs on a single component also makes debugging difficult because the component tree in DevTools shows a chain of anonymous wrappers.

**Why it matters:**
- Auth guards, analytics tracking, permission checks, and error boundaries applied uniformly across many components without touching each one individually.
- Libraries like React Redux still expose connect() as a HOC — understanding the pattern is necessary to read existing codebases.

**Use case:** Authentication wrappers, permission gates, analytics event tracking, error boundaries applied to entire page routes. Next.js middleware handles some of these at the routing layer, but HOCs remain relevant for component-level concerns.

### 24. Provider Pattern
The Provider pattern uses React Context to make data available to an entire component subtree without passing props at every level. Any component inside the provider can read from the context directly.

This solves prop drilling — the problem where a deeply nested component needs data from a top-level ancestor, forcing every intermediate component to pass it down as a prop even if it does not use it.

```javascript
// context/theme-context.jsx — creates the context and provider
const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme(t => t === 'light' ? 'dark' : 'light');
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook — components access context through a named hook, not raw useContext
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used inside ThemeProvider');
  return context;
}

// In any component, no matter how deep
function Header() {
  const { theme, toggleTheme } = useTheme();
  return <button onClick={toggleTheme}>Current: {theme}</button>;
}
```

The performance trap with Context is that every component consuming it re-renders whenever the context value changes — even if the specific piece of data it reads has not changed. Split contexts by update frequency: a UserContext that updates rarely and a NotificationContext that updates frequently should be separate providers. For high-frequency updates, Zustand is usually the better tool.

**Why it matters:**
- Eliminates prop drilling across deeply nested trees.
- The pattern is the foundation for nearly every React library that provides data to consumers — React Query, React Router, and most design system providers all use it.

**Use case:** Theme, locale, authenticated user, feature flags — data that is stable or changes infrequently and needs to be accessible application-wide. For high-frequency state, reach for Zustand instead.

### 25. Compound Component Pattern
The Compound Component pattern lets a group of components share implicit state and work together as a cohesive unit, while giving the consumer full control over composition and layout.

The classic example is an HTML <select> with <option> children — the parent manages which option is selected; each child knows whether it is the selected one. In React, we replicate this with Context.

```javascript
// components/tabs/tabs.jsx — parent manages active tab state
const TabsContext = createContext(null);

function Tabs({ children, defaultTab }) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={styles.tabs}>{children}</div>
    </TabsContext.Provider>
  );
}

// Sub-components read from shared context
Tabs.List = function TabList({ children }) {
  return <div className={styles.tabList} role="tablist">{children}</div>;
};

Tabs.Tab = function Tab({ id, children }) {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  return (
    <button
      role="tab"
      aria-selected={activeTab === id}
      onClick={() => setActiveTab(id)}
      className={activeTab === id ? styles.active : ''}
    >
      {children}
    </button>
  );
};

Tabs.Panel = function TabPanel({ id, children }) {
  const { activeTab } = useContext(TabsContext);
  if (activeTab !== id) return null;
  return <div role="tabpanel">{children}</div>;
};

// Consumer controls layout completely — no prop config needed
<Tabs defaultTab="profile">
  <Tabs.List>
    <Tabs.Tab id="profile">Profile</Tabs.Tab>
    <Tabs.Tab id="settings">Settings</Tabs.Tab>
    <Tabs.Tab id="billing">Billing</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel id="profile"><ProfileContent /></Tabs.Panel>
  <Tabs.Panel id="settings"><SettingsContent /></Tabs.Panel>
  <Tabs.Panel id="billing"><BillingContent /></Tabs.Panel>
</Tabs>
```

The advantage over a single component with a large config prop is that the consumer controls the structure. They can render the tab list at the bottom, insert a divider between tabs, or add any other element — without the parent component needing to anticipate every layout variation.

Radix UI, Headless UI, and shadcn/ui all use this pattern. It is why those components are so flexible without sacrificing accessibility — the ARIA attributes are coordinated through the shared context, not repeated in each sub-component independently.

**Why it matters:**
- Consumers control layout and composition without a growing list of configuration props.
- Shared state (which tab is active, which accordion item is open) is encapsulated — consumers never manage it directly.

**Use case:** Tabs, accordions, dropdowns, modals, select menus, step wizards — any component with multiple coordinated sub-parts. Radix UI is built entirely on this pattern.

### 26. Polymorphic Component Pattern
A polymorphic component renders as different HTML elements or components depending on a prop — typically called as. The API stays consistent while the underlying element changes to suit the semantic context.

This solves a recurring problem in design systems: a Button component that needs to render as an <a> tag when linking, as a <button> when triggering an action, and as a <Link> when navigating within the app. Without polymorphism, you end up with ButtonLink, ButtonAnchor, and ButtonRouterLink — three components with identical styling and diverging code.

```javascript
// components/text/text.tsx — polymorphic text component with TypeScript
type PolymorphicProps<T extends React.ElementType> = {
  as?: T;
  children: React.ReactNode;
  className?: string;
} & Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>;

function Text<T extends React.ElementType = 'p'>({
  as,
  children,
  className,
  ...rest
}: PolymorphicProps<T>) {
  const Component = as || 'p';
  return (
    <Component className={className} {...rest}>
      {children}
    </Component>
  );
}

// components/button/button.tsx — polymorphic button
function Button<T extends React.ElementType = 'button'>({
  as,
  children,
  variant = 'primary',
  ...rest
}: PolymorphicProps<T> & { variant?: 'primary' | 'secondary' }) {
  const Component = as || 'button';
  return (
    <Component className={`${styles.btn} ${styles[variant]}`} {...rest}>
      {children}
    </Component>
  );
}

// Consumer — same component, different elements, correct HTML semantics
<Button as="a" href="/pricing">View pricing</Button>      // renders <a>
<Button as={Link} to="/dashboard">Go to dashboard</Button> // renders React Router Link
<Button onClick={handleSubmit}>Submit</Button>             // renders <button>
```

The TypeScript generics are the critical part — the rest props are typed to match the as element, so <Button as="a"> accepts href and <Button as="button"> accepts type, and the compiler catches mismatches. Without the generic constraint, you lose type safety and the pattern's main benefit in TypeScript codebases.

Chakra UI and Radix UI use this pattern extensively. It is why a Chakra <Box as="section"> renders a semantic <section> while keeping all the styling props.

**Why it matters:**
- One component, correct HTML semantics for every context, no class explosion.
- Design system consumers do not need to know which underlying element to use — the as prop makes the choice explicit and the types enforce correctness.

**Use case:** Button, Text, Heading, Box, Card, Link — any primitive in a design system that needs to render as different elements without duplicating styling or behaviour logic.

## Data Model
State Management is one of the most misunderstood areas of frontend engineering. The right question is not "which library should we use?" but "where should this piece of data live?" There are four distinct types of state, and each has different home.

### 27. Local State - useState & useReducer
Local state lives inside a single component. It is the right home for UI state that no other component needs: whether a dropdown is open, what text is in a controlled input, which tab is active.

useState handles simple values. When state logic grows — multiple sub-values that update together, or updates that depend on the previous state — useReducer is more appropriate.

```javascript
// useReducer for from state with multiple fields
const [state, dispatch] = useReducer(formReducer, initialState);

function formReducer(state, action) {
  switch(action.type) {
    case 'SET_FIELD': return { ...state, [action.field]: action.value };
    case 'RESET': return initialState;
    default: return state;
  }
}
```

The most common mistake is lifting state up prematurely because it "might be needed elsewhere." Lift state only when two components genuinely need to share it. Unnecessary lifting causes unnecessary re-renders across the entire subtree.

**Why it matters:**
- Keeping state local prevents accidental coupling between components.
- Local state updates are synchronous and predictable.

**Use case:** Dropdown open/close state, form field values, accordion expanded state, modal visibility.

### 28. Global State - Zustand
When state needs to be shared across components that are far apart in the tree, we reach for a global store. Zustand is the de facto choice for new React projects. It is under 2KB, requires no providers, and exposes a simple hook-based API.

```javascript
// store/use-app-store.js
import { create } from 'zustand';

const useAppStore = create((set) => ({
  user: null,
  theme: 'light',
  setUser: (user) => set({ user }),
  toggleTheme: () => set(s => ({ theme: s.theme === 'light' ? 'dark' : 'light' })),
}));

// In any component — no provider needed
const user = useAppStore(s => s.user);
const setUser = useAppStore(s => s.setUser);
```

The subscribe API allows non-React code — WebSocket handlers, event listeners, analytics calls — to read and write store state without a hook. Use shallow comparison when selecting multiple fields to avoid re-renders when unrelated slices change.

**Why it matters:**
- Global state without boilerplate — no actions, reducers, or dispatchers required.
- Components re-render only when the slice they subscribe to changes.

**Use case:** Auth state, UI theme, notification queue, modal state, any state that multiple disconnected components need to read or write.

### Global State - Redux vs MobX
For teams that need strict traceability and a well-established DevTools story, Redux Toolkit remains the right choice. Every state change is an explicit action. Reducers are pure functions. Time-travel debugging works because every past state is reproducible.

MobX takes the opposite approach. You mark objects as observable and MobX tracks which components read which data, re-rendering them automatically when that data changes. Less boilerplate, surgical re-renders. But mutations are implicit — hard to trace who changed what in a large codebase.

Redux Toolkit removed most of Redux's boilerplate (no hand-written action types, no switch statements required), making the gap much smaller:

```javascript
// Redux Toolkit slice — createSlice handles action types automatically
const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [], total: 0 },
  reducers: {
    addItem: (state, action) => { state.items.push(action.payload); },
    removeItem: (state, action) => {
      state.items = state.items.filter(i => i.id !== action.payload);
    },
  },
});
```

**Why it matters:**
- Redux: predictable, traceable, excellent DevTools - right for complex apps with many developers.
- MobX: less code, automatic tracking - right for smaller teams that prioritise productivity.

**Use case:** Redux Toolkit for large teams where auditability matters (fintech, healthcare, e-commerce). Mobx for smaller teams building fast-moving internal tools.

### 30. Server State - React Query / TanStack Query
Server state is fundamentally different from client state. it lives on a server, it can change at any time without the client knowing, and it needs to be synchronised. useEffect + fetch + useState is the wrong tool for this - it create loading/error state boilerplate and does not handle background refetching, deduplication, or cache invalidation.

React Query (now TanStack Query) is built for server state. It handles fetching, caching, background updates, and stale data automatically.

```javascript
// Fetch and cache posts - automatic background refetch on window focus
function PostList({ userId }) {
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ["posts", userId],
    queryFn: () => fetchPostsByUser(userId),
    staleTime: 5 * 60 * 1000, // consider data fresh for 5 min
  });

  if(isLoading) return <Skeleton />;
  if(error) return <ErrorState error={error} />;
  return <ul>{posts.map(p => <PostItem key={p.id} post={p} />)}</ul>
}
```

React Query replaces the majority of useEffect-based data fetching in a React codebase. It is the de facto solution for managing server state.

**Why it matters:**
- Eliminates manual loading/error/refetch state management.
- Deduplicates identical requests — 10 components using the same query key share one request.

**Use case:** Any component that fetches data from an API. React Query is the right default for all server state.

## 31. Data Normalisation
When your API returns nested objects — a post with an embedded author with embedded follower counts — storing them as-is means the same user object is duplicated across dozens of cached responses. Updating one user's name requires finding and updating every copy.

Normalisation flattens the data: entities are stored once, referenced by ID. Posts hold a userId, not an embedded user object.

```javascript
// Normalised store shape
{
  posts: {
    byId: {
      'post-1': { id: 'post-1', title: '...', authorId: 'user-42' },
    },
    allIds: ['post-1']
  },
  users: {
    byId: {
      'user-42': { id: 'user-42', name: 'Prashant', avatar_url: '...' }
    }
  }
}
```

Redux Toolkit's createEntityAdapter handles normalisation automatically. In React Query, the query key hierarchy (e.g., ['users', id]) provides per-entity caching without explicit normalisation — a different trade-off that works well for most cases.

**Why it matters:**
- Single source of truth for each entity — one update propagates everywhere.
- Eliminates stale data from duplicated copies.

**Use case:** Applications with relational data — social networks, project management tools, e-commerce platforms with users, products, and orders.

## 32. Cookies vs localStorage vs IndexedDB
These are three distinct browser storage primitives with different capabilities, sizes, and security profiles.

**Cookies** are sent with every HTTP request to the matching domain. Setting httpOnly prevents JavaScript from reading them — this is where auth tokens belong. SameSite=Strict prevents CSRF. Limit: ~4KB per cookie.

**localStorage** is a synchronous key-value store. Persistent across sessions, ~5MB limit, readable by any JavaScript on the domain. Never store authentication tokens here — one XSS vulnerability anywhere exposes every token.

**IndexedDB** is a full async database in the browser. Stores binary data, supports indexes and transactions, handles gigabytes of data. Use the idb library to avoid the raw API's callback-based interface. Right for large offline datasets, file caches, and draft content that survives browser restarts.

**Why it matters:**
- Using the wrong storage primitive is a security vulnerability (tokens in localStorage) or a UX failure (large data in cookies).

**Use case:** Auth tokens → httpOnly cookie. User preferences, theme → localStorage. Offline-capable app data, draft documents, cached API responses → IndexedDB.

## 33. Optimistic Updates
When a user clicks "Like," they should see the heart fill instantly — not wait 400ms for the server to confirm. Optimistic updates apply the state change immediately in the UI and roll back if the server returns an error.

React Query's useMutation makes this straightforward:
```javascript
const likeMutation = useMutation({
  mutationFn: (postId) => likePost(postId),
  onMutate: async (postId) => {
    await queryClient.cancelQueries({ queryKey: ['posts', postId] });
    const previous = queryClient.getQueryData(['posts', postId]);
    queryClient.setQueryData(['posts', postId], old => ({
      ...old,
      liked: true,
      likeCount: old.likeCount + 1
    }));
    return { previous }; // snapshot for rollback
  },
  onError: (err, postId, context) => {
    queryClient.setQueryData(['posts', postId], context.previous); // rollback
  },
  onSettled: (postId) => {
    queryClient.invalidateQueries({ queryKey: ['posts', postId] }); // sync
  },
});
```

**Why it matters:**
- Perceived performance improves dramatically — the UI reacts at click speed, not network speed.
- Users feel in control; operations feel instantaneous.

**Use case:** Likes, bookmarks, follows, reorders — any action where failure is rare and rollback is acceptable. Twitter, Instagram, and LinkedIn all use optimistic updates for social interactions.

## 34. URL as State
Filters, sort order, pagination, and selected tabs belong in the URL — not in component state. *?page=2&sort=price&order=asc* is shareable, bookmarkable, and survives a page refresh. A URL that encodes all view state means any link is a reproducible view.

```javascript
// Next.js — read and write search params as state
import { useRouter, useSearchParams } from 'next/navigation';

function ProductFilters() {
  const router = useRouter();
  const params = useSearchParams();
  const sort = params.get('sort') || 'relevance';

  const updateSort = (value) => {
    const next = new URLSearchParams(params);
    next.set('sort', value);
    router.push(`?${next.toString()}`);
  };

  return <SortSelect value={sort} onChange={updateSort} />;
}
```

**Why it matters:**
- Support teams can reproduce user issues exactly by asking for the URL.
- Users can share specific filter states as links.
- Browser back/forward navigation works correctly without custom history management.

**Use case:** Product listing filters, admin table sort/filter state, search results, any paginated view.

## Form State - React Hook Form & Zod
Forms are one of the most common sources of complexity in React apps. Controlled components with useState re-render on every keystroke. For large forms with 20+ fields, this causes measurable performance issues.

React Hook Form defaults to uncontrolled inputs under the hood — it reads values via refs at submit time and only re-renders the specific field that changes. For complex validation, Zod provides a schema-based approach:

```javascript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}
    </form>
  );
}
```

**Why it matters:**
- Fewer re-renders means better performance on complex forms.
- Zod schemas are shared between frontend validation and backend API validation — one source of truth.

**Use case:** Any form with more than a few fields. React Hook Form is the de facto choice across the React ecosystem.

## 36. Real-Time State — WebSockets, SSE, Polling
Some state is not fetched once — it arrives continuously. Live chat, collaborative editing, notifications, and live dashboards all require different real-time strategies.

**WebSockets** provide a persistent, full-duplex connection. Both client and server can send messages at any time. Use for chat (Slack), multiplayer (Figma), and collaborative editing (Google Docs). The connection is stateful — reconnection logic and exponential backoff are required.

**Server-Sent Events (SSE)** are one-directional: the server pushes updates over a persistent HTTP connection. Simpler than WebSockets, works through most proxies and load balancers, and reconnects automatically. AI token streaming (ChatGPT's streaming responses) uses SSE.

**Polling** is the simplest approach — the client requests updates every N seconds. React Query's refetchInterval option implements polling with one line of configuration. Use when low-latency updates are not required and infrastructure simplicity matters.

**Why it matters:**
- Choosing the wrong real-time strategy wastes bandwidth (polling) or overcomplicates infrastructure (WebSockets for one-way data).

**Use case:** WebSockets for bidirectional real-time (Slack, Figma). SSE for server-push updates (notifications, AI streaming, live logs). Polling for low-frequency updates where a few seconds of lag is acceptable.

## Interfaces & APIs
The boundary between the frontend and the backend is where many architectural decisions are made. How we structure this boundary affects performance, type safety, and how quickly the frontend can evolve independently.

### 37. REST vs GraphQL
**REST** organises APIs around resources. One endpoint per resource type, standard HTTP verbs, cacheable by default. The classic problems are over-fetching (the endpoint returns 40 fields but the UI needs 5) and under-fetching (the UI needs data from 3 endpoints that must be requested sequentially).

**GraphQL** provides one endpoint where the client specifies exactly what it needs. Eliminates over/under-fetching. Excellent for complex data graphs like GitHub's API, where a single query can traverse pull requests, commits, authors, and reviews.

The cost of GraphQL is real: HTTP caching is harder (most queries are POST requests), resolver complexity grows with schema size, and N+1 database query problems require careful attention. For most apps, REST with React Query is simpler and sufficient. Reach for GraphQL when client data requirements vary significantly across different parts of the app.

**Why it matters:**
- REST: simpler infrastructure, better CDN caching, easier debugging.
- GraphQL: eliminates round-trips and over-fetching for complex data graphs.

**Use case:** REST for most products. GraphQL for platforms with complex, interrelated data where multiple teams consume the same API with different data needs.

### 38. React Query Patterns — useQuery, useMutation, useInfiniteQuery
React Query's three core hooks map cleanly to the three main client-server interaction patterns.

**useQuery** fetches and caches read data. The query key is the cache key — components sharing the same key share the same request and cached result.

**useMutation** handles writes. It provides callbacks for optimistic updates (onMutate), error rollback (onError), and cache invalidation after success (onSuccess).

**useInfiniteQuery** manages paginated lists. It maintains multiple pages as an array and provides fetchNextPage to load more. Works naturally with both offset and cursor pagination.

```javascript
// Cursor-based infinite scroll — useInfiniteQuery handles the page chain
const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
  queryKey: ['feed', userId],
  queryFn: ({ pageParam }) => fetchFeed(userId, { after: pageParam }),
  getNextPageParam: (lastPage) => lastPage.nextCursor,
});
```

Query keys should be hierarchical and descriptive: ['posts', userId, { filter, sort }]. This structure enables targeted invalidation — invalidating ['posts', userId] clears all post queries for that user without affecting other users' data.

**Why it matters:**
- A consistent query key structure makes cache management predictable and intentional.

**Use case:** useQuery for any read operation. useMutation for writes with optimistic UI. useInfiniteQuery for feeds, search results, and paginated data tables.

### 39. Pagination - Offset vs Cursor
Loading large datasets all at once is not an option. We page through them. The two approaches have fundamentally different behaviours on live data.

**Offset pagination** uses *?page=3&limit=20*. Simple, supports jumping to any page, works with standard SQL *LIMIT/OFFSET*. The problem: if ten new items are inserted between page 1 and page 2 requests, the offset shifts — the user sees duplicates or misses items entirely. Acceptable for stable datasets.

**Cursor pagination** uses a pointer to the last seen item: *?after=post_id_123*. The next page starts exactly after that item, regardless of insertions. Stable on live data. The cost: no jumping to page 50, and the cursor must be stable (usually a database ID or a timestamp).

**Why it matters:**
- Offset pagination breaks on live feeds — users in fast-moving feeds skip or repeat content.
- Cursor pagination is the only correct choice for real-time or frequently-updated data.

**Use case:** Offset pagination for admin tables with stable, rarely-changing data. Cursor pagination for social feeds, notification lists, chat history — any data that updates while the user is reading it.

## Custom Hooks as API Abstraction
A custom hook wraps data-fetching logic so components remain clean. usePosts(userId) returns { posts, isLoading, error } — the component does not know or care whether data comes from React Query, SWR, a WebSocket, or a local cache.

This abstraction also makes testing straightforward. Mock the hook, not the fetch call. The hook becomes the contract between the data layer and the UI layer.

```javascript
// hooks/use-posts.js — data source is an implementation detail
export function usePosts(userId) {
  return useQuery({
    queryKey: ['posts', userId],
    queryFn: () => fetchPostsByUser(userId),
    select: (data) => data.posts, // transform API response shape
  });
}

// Component stays clean regardless of what changes beneath
function UserProfile({ userId }) {
  const { data: posts, isLoading } = usePosts(userId);
  // ...
}
```
Co-locate the hook with the feature that uses it — not in a global hooks/ folder. If a hook is only used by one component, it lives in the same directory.

**Why it matters:**
- Changing the data source (REST to GraphQL, REST to WebSocket) requires changing the hook, not every component.

**Use case:** Every non-trivial data fetching operation should have a named custom hook.

### 41. BFF — Backend for Frontend
A Backend for Frontend is a thin server layer — often Next.js API routes or a dedicated Node.js service — that the frontend team owns. It aggregates multiple microservice calls, transforms data for the UI, and shields the browser from internal service complexity.

Instead of the browser making four separate API calls to assemble a product page, the BFF fans out to four services internally and returns one clean response. This reduces client-side complexity, lowers browser round-trips, and keeps internal service interfaces private.

```javascript
// pages/api/product-page.js — Next.js API route as BFF
export default async function handler(req, res) {
  const { productId, userId } = req.query;
  const [product, reviews, inventory, recommendations] = await Promise.all([
    productService.getById(productId),
    reviewService.getByProduct(productId),
    inventoryService.getStock(productId),
    recommendationService.getSimilar(productId, userId),
  ]);
  res.json({ product, reviews, inventory, recommendations });
}
```

**Why it matters:**
- The frontend is not the right place to orchestrate multiple microservices.
- BFF responses can be shaped exactly for the UI without over/under-fetching.

**Use case:** Any frontend that communicates with multiple microservices or internal APIs. The BFF is the layer that owns the translation from internal service contracts to frontend contracts.

### 42. Authentication — JWT, Sessions, OAuth
**Session cookies:** The server stores session data and issues a session ID cookie. Stateful on the server — requires a shared session store (Redis) for horizontal scaling. Simple, well-understood.

**JWT (JSON Web Tokens):** The server signs a token containing user claims. Stateless — any server can verify the signature without a database lookup. Store JWTs in httpOnly cookies, not localStorage. Use short expiry (15 minutes) with refresh token rotation.

**OAuth 2.0 / OIDC:** Delegate authentication to an identity provider (Google, GitHub, enterprise SSO). Your app receives an access token. Auth0, Clerk, and NextAuth.js handle the implementation complexity including token storage, refresh flows, and session management.

**Why it matters:**
- Tokens in localStorage are accessible to any JavaScript on the page — one XSS vulnerability exposes all sessions.
- Refresh token rotation invalidates stolen tokens before they can be reused.

**Use case:** Most new applications should use a managed auth provider (Clerk, Auth0) rather than building auth infrastructure themselves. The risks of getting it wrong are too high.

### 43. tRPC — End-to-End Type Safety
tRPC lets you call server functions from the client with full TypeScript type inference. No code generation, no schema files, no API documentation to keep in sync. You define procedures on the server; the client calls them as typed async functions.

```javascript
// server/router.ts — define typed procedures
const appRouter = router({
  posts: {
    list: publicProcedure
      .input(z.object({ userId: z.string() }))
      .query(({ input }) => db.posts.findMany({ where: { userId: input.userId } })),
    create: protectedProcedure
      .input(z.object({ title: z.string(), content: z.string() }))
      .mutation(({ input, ctx }) => db.posts.create({ data: { ...input, authorId: ctx.userId } })),
  }
});

// client — full TypeScript autocomplete, no codegen
const { data } = trpc.posts.list.useQuery({ userId: 'user-42' });
```

tRPC is a private contract between your own frontend and backend. It is not suitable for public APIs consumed by third parties. The entire value proposition is the shared TypeScript types — which only works when you control both ends.

**Why it matters:**
- Eliminates an entire class of bugs: API response shape mismatches that only appear at runtime.

**Use case:** Full-stack TypeScript applications where the frontend and backend are maintained by the same team.

### WebSocker Architecture in React
Opening a WebSocket connection inside a component with useEffect is the wrong approach. When that component unmounts and remounts, you open a new connection. Multiple components each opening their own connection wastes resources and creates race conditions.

We open one WebSocket connection per application in a top-level provider and share it via context or Zustand. Components subscribe to message types they care about.

```javascript
// providers/socker-provider.tsx
const socket = new WebSocket("wss://api/example/com/ws");
const SocketContext = createContext(socket);

export function SockerProvider({ children }) {
  useEffect(() => {
    return () => socket.close() // cleanup on unmount
  }, []);
  return <SocketContext.Provider value={socket}>{children}</SockerContext.Provider>
}

// In any component
function ChatWindow({ channelId }) {
  const socket = useContext(SocketContext);
  useEffect(() => {
    const handler = (event) => {
      const message = JSON.parse(event.data);
      if(message.channelId === channelId) setMessages(m => [...m, message]);
    };
    socket.addEventListener('message', handler);
    return () => socket.removeEventListener('message', handler);
  }, [channelId])
}
```

**Why it matters:**
- One connection shared across the app reduces server-side connection overhead.
- Centralised connection management makes reconnection logic consistent.

**Use case:** Chat applications, collaborative editing, live dashboards, multiplayer features.

### 45. Error Handling at the API Layer
A good API layer handles errors at three levels, and each level needs a different strategy.

Network errors — no internet, DNS failure, request timeout — should surface an offline banner and queue retries with exponential backoff rather than showing a blank screen or an opaque error message.

HTTP errors (4xx, 5xx) need to be translated into user-facing language. A 401 means redirect to login. A 403 means show an access-denied state. A 500 means show a retry option with a helpful message, not a raw status code.

Validation errors (422) from the server should map back to the specific form fields that caused them, not just show a generic toast.

```javascript
// api/client.js — Axios interceptor for global 401 handling
import axios from 'axios';

const apiClient = axios.create({ baseURL: '/api' });

apiClient.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      await refreshTokenOrRedirectToLogin();
    }
    return Promise.reject(error);
  }
);

// hooks/use-create-post.js — field-level server error mapping
function useCreatePost() {
  const { setError } = useFormContext();
  return useMutation({
    mutationFn: createPost,
    onError: (error) => {
      if (error.response?.status === 422) {
        const fieldErrors = error.response.data.errors;
        Object.entries(fieldErrors).forEach(([field, message]) => {
          setError(field, { message }); // maps server errors to form fields
        });
      }
    },
  });
}
```

**Why it matters:**
- Unhandled network errors silently fail — users do not know if their action succeeded.
- Field-level server errors that show as generic toasts frustrate users and increase support load.

**Use case:** Any form that submits data, any page that fetches data. Axios interceptors handle global auth errors once; field-level error mapping belongs in each mutation's onError handler.

## Optimizations
Having the right architecture and data model is necessary but not sufficient. A React app that renders correctly but takes five seconds to load or freezes during interaction is still a failure. Let us cover the concrete optimisation techniques that move metrics.

### 46. Code Splitting & Bundle Splitting
Shipping one large JavaScript bundle means the user downloads code for every route before seeing any of them. Code splitting breaks this into smaller chunks that load on demand. React's lazy() combined with Suspense is the native API.

```javascript
// Route-based code splitting — each page is its own chunk
const ProductPage = lazy(() => import('./pages/ProductPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));

function App() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Routes>
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </Suspense>
  );
}
```

Vite and Webpack split at dynamic import boundaries automatically. The goal for the initial bundle is to include only what is needed to render the visible route. Heavy components — rich text editors, chart libraries, map renderers — are candidates for component-level splitting even within a route.

**Why it matters:**
- A 2MB initial bundle takes 10+ seconds to parse on a mid-range Android device.
- Route-based splitting is the highest-leverage optimisation for most applications.

**Use case:** Every production React application. Route-based splitting alone typically cuts initial bundle size by 50–70%.

### 47. Tree Shaking
Tree shaking removes exported functions that are never called anywhere in the application. Modern bundlers do this automatically for ES modules — but only if imports are static.

The common mistake is importing an entire library when only one function is needed:

```javascript
// Bad — ships the entire 72KB lodash bundle
import _ from 'lodash';
const result = _.debounce(fn, 300);

// Good — ships only the debounce function (~2KB)
import debounce from 'lodash/debounce';
// or, even better, use lodash-es for full tree-shaking
import { debounce } from 'lodash-es';
```

Dynamic require() calls and namespace imports (import * as) break tree shaking. Many popular libraries ship both CommonJS and ES module builds — always import from the ES module entry point when it exists.

**Why it matters:**
- A single namespace import can silently pull in an entire library.
- date-fns is 75KB if imported correctly; it is over 200KB with a namespace import.

**Use case:** Any project using utility libraries. Run npx source-map-explorer dist/bundle.js to visualise what is inside your bundle before and after optimisation.

### 48. Lazy Loading & Intersection Observer
Images below the fold do not need to load when the page first renders. The IntersectionObserver API detects when an element enters the viewport — we load the image only then.

```javascript
// Native browser lazy loading — zero JavaScript, best performance
<img
  src="/product-hero.jpg"
  loading="lazy"
  width="800"
  height="600"
  alt="Product hero"
/>
```

For React components that are heavy and not immediately visible — analytics dashboards, complex visualisations — we combine lazy() with Intersection Observer to defer both the download and the rendering:

```javascript
import { useInView } from 'react-intersection-observer';

function DeferredChart({ data }) {
  const { ref, inView } = useInView({ triggerOnce: true });
  return (
    <div ref={ref}>
      {inView ? <HeavyChartComponent data={data} /> : <ChartSkeleton />}
    </div>
  );
}
```

**Why it matters:**
- Images are the largest contributor to page weight on most sites.
- Deferring off-screen content reduces initial JS parse time and memory usage.

**Use case:** Pinterest, Instagram, and every image-heavy application. Next.js's <Image> component handles lazy loading, WebP conversion, and responsive srcsets automatically.

### 49. Image Optimisation — WebP, AVIF, Responsive Images
Four levers for image performance:

**Format:** WebP is 25–35% smaller than JPEG at equivalent visual quality. AVIF is 50% smaller than JPEG but has slower encoding times. Use WebP as the baseline, AVIF where browser support and encoding budget allow.

**Responsive images**:** srcset serves a 400px-wide image to a 400px viewport, not a 2000px one. A user on a phone should never download a desktop-sized image.

**Compression:** Quality 75–85% is visually identical to quality 100 for most photographic images. The difference in file size is 40–60%.

**Dimensions:** Always specify width and height on images. Without them, the browser cannot reserve space before the image loads, causing layout shift (CLS).

```javascript
<img
  src="/product.jpg"
  srcset="/product-400.webp 400w, /product-800.webp 800w, /product-1200.webp 1200w"
  sizes="(max-width: 600px) 400px, (max-width: 1000px) 800px, 1200px"
  width="1200"
  height="800"
  alt="Product photo"
  loading="lazy"
/>
```

**Why it matters:**
- Images account for 50–75% of total page weight on most e-commerce sites.
- Serving desktop images to mobile devices wastes data and degrades performance on constrained networks.

**Use case:** Any site with photos, product images, or user-generated content. Next.js <Image> handles all four levers automatically.

### 50. React Performance — memo, useMemo, useCallback
React re-renders a component whenever its parent re-renders, even if its own props did not change. These three tools let us skip unnecessary renders.

**React.memo(Component)** wraps a component and skips re-render if props are shallowly equal. Right for components that receive stable props and are expensive to render.

**useMemo(fn, deps)** memoises a computed value. Right for expensive calculations — filtering large lists, complex data transformations.

**useCallback(fn, deps)** memoises a function reference. Needed when a callback is passed as a prop to a memoised child — without it, a new function reference is created on every render, defeating memo.

```javascript
const ExpensiveList = memo(function ExpensiveList({ items, onItemClick }) {
  return <ul>{items.map(i => <li onClick={() => onItemClick(i.id)}>{i.name}</li>)}</ul>;
});

function Parent({ allItems }) {
  const [filter, setFilter] = useState('');

  // Without useMemo, this runs on every Parent render
  const filteredItems = useMemo(
    () => allItems.filter(i => i.name.includes(filter)),
    [allItems, filter]
  );

  // Without useCallback, a new function reference breaks memo on ExpensiveList
  const handleClick = useCallback((id) => { /* ... */ }, []);

  return <ExpensiveList items={filteredItems} onItemClick={handleClick} />;
}
```

The rule: profile first, optimise second. Wrapping everything in memo and useMemo adds cognitive overhead and can introduce bugs if dependency arrays are wrong. React DevTools Profiler shows which components render too often and why.

**Why it matters:**
- Unnecessary re-renders accumulate. A component tree that re-renders 20 times per keystroke is a real performance issue.

**Use case:** Large lists, data tables, complex forms — any subtree that renders frequently and has expensive children.

## 51. Virtualisation — Virtual Scroll
Rendering a list of 10,000 items creates 10,000 DOM nodes. The browser's layout engine collapses under that weight — initial render takes seconds and scrolling becomes janky.

Virtualisation renders only the items visible in the viewport — typically 20–30 items — and recycles DOM nodes as the user scrolls. The total list height is simulated with a spacer element so the scrollbar behaves correctly.

```javascript
import { useVirtualizer } from '@tanstack/react-virtual';

function VirtualList({ items }) {
  const parentRef = useRef(null);
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 60, // estimated row height in px
  });

  return (
    <div ref={parentRef} style={{ height: '600px', overflow: 'auto' }}>
      <div style={{ height: virtualizer.getTotalSize(), position: 'relative' }}>
        {virtualizer.getVirtualItems().map(virtualRow => (
          <div
            key={virtualRow.index}
            style={{ position: 'absolute', top: virtualRow.start, width: '100%' }}
          >
            {items[virtualRow.index].name}
          </div>
        ))}
      </div>
    </div>
  );
}
```

TanStack Virtual is the modern choice. React Window is the alternative for simpler cases.

**Why it matters:**
- A table with 10,000 rows renders in milliseconds with virtualisation; without it, it can take several seconds.

**Use case:** Any list or table with more than 200 rows. Data grids, transaction histories, log viewers, search results.

## 52. Bundle Splitting Strategies — Route, Component, Vendor
Code splitting at the route level is the starting point. We can go further.

**Vendor splitting** separates third-party libraries (React, React Query, Lodash) from application code. Vendor code rarely changes; application code changes with every deploy. Split vendor chunks can be cached in the browser indefinitely while application code updates normally.

**Component splitting** defers heavy components that are not visible on initial load. A rich text editor, a complex data visualisation library, or a map renderer should only download when the user navigates to the feature that uses it.

```javascript
// vite.config.js - manual chunk configuration
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-query': ['@tanstack/react-query'],
          'vendor-charts': ['recharts', 'd3'],
        }
      }
    }
  }
};
```

**Why it matters:**
- Vendor chunks are cached between deploys — returning users skip the vendor download entirely.
- Separating chart libraries from core app code saves hundreds of kilobytes for users who never open the analytics page.

**Use case:** Any production application with more than 3–4 third-party dependencies.

### 53. Debounce & Throttle
Rate-limiting expensive operations is one of the most impactful optimisations for interactive UIs.

**Debounce** delays a function until a specified time has passed since the last call. A search input that fires an API request on every keystroke triggers hundreds of requests for a fast typist. Debouncing by 300ms means the request fires only when the user pauses.

**Throttle** limits a function to fire at most once every N milliseconds. Scroll handlers, resize listeners, and mouse move events can fire hundreds of times per second. Throttling to every 16ms (one animation frame) reduces the call rate to 60 per second — enough for smooth animation.

```javascript
import { useDebouncedCallback } from 'use-debounce';

function SearchInput() {
  const [query, setQuery] = useState('');

  const search = useDebouncedCallback(
    (value) => fetchSearchResults(value),
    300 // wait 300ms after last keystroke
  );

  return (
    <input
      value={query}
      onChange={e => { setQuery(e.target.value); search(e.target.value); }}
    />
  );
}
```

A common mistake is creating a new debounced function on every render by calling debounce() inside the component body. Always wrap with useCallback or use a hook like useDebouncedCallback.

**Why it matters:**
- A search input without debounce can trigger 10+ API calls per second for a fast typist.
- Scroll handlers without throttle run on every pixel of scroll — up to 1000 calls per second on a smooth display.

**Use case:** Search inputs, live filtering, scroll handlers, resize handlers, drag events.

### 54. useTransition & Deferred Rendering
React 18 introduced concurrent features that let us mark state updates as non-urgent, keeping the UI responsive during heavy re-renders.

**useTransition** marks an update as a transition — it can be interrupted by more urgent updates (user input). The pending state tells us when the transition is in progress.

```javascript
function FilterableList({ items }) {
  const [filter, setFilter] = useState('');
  const [isPending, startTransition] = useTransition();

  const filtered = items.filter(i => i.name.includes(filter));

  return (
    <>
      <input
        value={filter}
        onChange={e => {
          startTransition(() => setFilter(e.target.value)); // non-urgent update
        }}
      />
      {isPending && <Spinner />}
      <ul style={{ opacity: isPending ? 0.5 : 1 }}>
        {filtered.map(i => <ExpensiveItem key={i.id} item={i} />)}
      </ul>
    </>
  );
}
```

**useDeferredValue** is the hook equivalent for values you receive as props — it gives you a stale copy of the value that updates when React has spare time.

**Why it matters:**
- Input fields stay responsive even when filtering a list of 10,000 items.
- INP (Interaction to Next Paint) scores improve significantly for filter-heavy UIs.

**Use case:** Search filtering with large lists, tab switches that trigger expensive renders, any interaction where the UI update is slow.

### 55. Observability — Sentry, LogRocket, RUM
A frontend application in production fails in ways that no staging environment reveals. Observability gives us three layers of visibility.

**Error tracking (Sentry):** Catches unhandled JavaScript exceptions, records the call stack, browser, user agent, and what the user was doing. Error Boundaries forward caught errors via onError. Set up source maps so Sentry shows your original TypeScript code, not the minified bundle.

**Session replay (Sentry Session Replay, LogRocket):** Records what the user actually did before the error occurred — mouse movements, clicks, network requests. The most valuable debugging tool for frontend issues because it answers the question "how did they get to this state?"

**Real User Monitoring (Vercel Analytics, Datadog RUM, web-vitals.js):** Measures actual Web Vitals (LCP, INP, CLS) from real users in production. Lab metrics run in ideal conditions; real user data shows what your users on 3G phones in rural areas actually experience. These are fundamentally different numbers, and the real numbers are always worse.

**Why it matters:**
A 0.1% error rate on a million daily users is 1,000 broken sessions per day.
Session replay cuts root cause analysis from hours to minutes.

**Use case:** Every production application shipping to real users. Set up Sentry from day one, not after the first production incident.

### 56. 56. Performance Budget & CI Integration
A performance budget is a threshold — maximum initial bundle size, maximum LCP, maximum number of requests — that the CI pipeline enforces on every pull request. If a change exceeds the budget, the build fails.

This is the only way to prevent bundle size from drifting upward over time. Every feature adds dependencies; without a budget, no one notices until the app is noticeably slower than a year ago.

```javascript
// .bundlewatch.json — fail CI if bundle exceeds limits
{
  "files": [
    { "path": "dist/assets/index-*.js", "maxSize": "150kB" },
    { "path": "dist/assets/vendor-react-*.js", "maxSize": "50kB" },
    { "path": "dist/assets/*.css", "maxSize": "30kB" }
  ]
}
```

Lighthouse CI can run in GitHub Actions and post Web Vitals scores as PR comments — making performance regressions visible before they merge.

**Why it matters:**
- Bundle size and performance degrade one dependency at a time. A budget makes each regression visible and intentional.

**Use case:** Any team shipping to real users on a regular cadence. The moment a codebase has more than two contributors, a performance budget should be in CI.

## Conclusion
Frontend system design is backend system design — the same problems of caching, state, deployment, observability, and performance, running inside the user's browser instead of on your servers.

Every decision in this list maps to a question you should ask during any frontend system design discussion:
- **How does this page reach the user?** SSG, ISR, SSR, or CSR — or a mix.
- **How are components structured?** Container/Presentation, HOC, Provider, Compound, or Polymorphic — each solves a different composition problem.
- **Where does state live?** Local, global, server cache, or URL.
- **How does the client get data?** REST, GraphQL, tRPC, or WebSocket.
- **What ships to the browser?** Bundle splits, tree shaking, lazy loading.
- **How do we know when things break?** Error tracking, session replay, RUM.

Think of your frontend as a distributed system with the browser as a node in the network. Design it that way and the result is an application that is fast, resilient, and debuggable — exactly what users expect and what engineering teams can maintain at scale.

## References
References:
- [Next.js App Router documentation](nextjs.org/docs)
- [TanStack Query documentation](tanstack.com/query)
- [Zustand documentation](github.com/pmndrs/zustand)
- [web-vitals](github.com/GoogleChrome/web-vitals)
- [Workbox](developer.chrome.com/docs/workbox)
- [Micro Frontends case studies](micro-frontends-deep-dive.pages.dev/case-studies)
- [Shopify Polaris Design System](shopify.dev/docs/apps/design-guidelines/polaris) 
- [React Server Components RFC](github.com/reactjs/rfcs/blob/main/text/0188-server-components.md) 
- [TanStack Virtual](tanstack.com/virtual) 
- [Bundlewatch](bundlewatch.io) 
- [Radix UI Primitives (Compound Pattern)](radix-ui.com/primitives) 
- [Headless UI (Compound Pattern)](headlessui.com) 
- [Chakra UI Polymorphic Components](chakra-ui.com/docs/components) 
- [react-error-boundary](github.com/bvaughn/react-error-boundary) 
- [React Hook Form](react-hook-form.com)