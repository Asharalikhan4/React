# 🚀 Web Performance & Optimization Techniques

> Technical blueprints and patterns for auditing, analyzing, and optimizing production React applications for Core Web Vitals.

---

## 📑 Optimization Guides Included

1. [**Code Splitting & Bundle Optimization**](./Code%20Splitting.md)  
   Dynamic imports, route-level and component-level code splitting using `React.lazy` and bundler chunking.

2. [**Tree Shaking & Dead Code Elimination**](./Tree%20Shaking.md)  
   How ES module static structure allows modern bundlers (Parcel, Webpack, Vite) to drop unused code exports.

3. [**List Virtualization & Windowing**](./List%20Virtualization.md)  
   Techniques for rendering datasets of 100,000+ items smoothly by only rendering DOM nodes within the viewport.

4. [**Adaptive Loading for Diverse Devices**](./Adaptive%20Loading.md)  
   Tailoring interactive features and assets based on real-time Network Information and Hardware Concurrency APIs.

5. [**Efficient Media & Image Optimization**](./Efficient%20Loading%20of%20Media.md)  
   Modern image formats (AVIF, WebP), responsive `srcset`, lazy loading, and blur placeholder techniques.

6. [**Script Loading with Async & Defer**](./Load%20script%20efficiently%20with%20async%20and%20defer.md)  
   Preventing render-blocking JavaScript and understanding browser critical rendering path execution.

7. [**Pagination: Offset vs Cursor-Based**](./Pagination%20-%20Offset%20vs%20Cursor-Based.md)  
   Database index efficiency, handling duplicates in real-time feeds, and infinite scroll architecture.

8. [**Periodic Background Data Synchronization**](./Periodically%20synchronize%20data%20in%20the%20background.md)  
   Service Workers, Background Sync API, and stale-while-revalidate client cache strategies.

9. [**Reactivity in Modern JavaScript Frameworks**](./Reactivity%20in%20JavaScript%20frameworks.md)  
   Comparing reconciliation in React Virtual DOM, Vue 3 Proxies, Svelte Runes, and SolidJS fine-grained Signals.

---

## 🔗 Useful External References
- [web.dev - Core Web Vitals](https://web.dev/vitals/)
- [Rendering Large Datasets in React - Syncfusion](https://www.syncfusion.com/blogs/post/render-large-datasets-in-react)
- [TanStack Query Documentation](https://tanstack.com/query/latest)
