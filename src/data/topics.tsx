import React from 'react';

// Machine Coding & LLD
import MultiStepperComponent from '../LowLevelDesignAndMachineCoding/MultiStepperComponent/MultiStepperComponent';
import SwitchCaseComponent from '../LowLevelDesignAndMachineCoding/SwitchCaseComponent/SwitchCaseComponent';
import TwoStepLoginForm from '../LowLevelDesignAndMachineCoding/TwoStepLoginForm/TwoStepLoginForm';
import TodoList from '../LowLevelDesignAndMachineCoding/ToDoList/ToDoList';
import SearchWithPagingation from '../LowLevelDesignAndMachineCoding/SearchWithPagination/SearchWithPagination';
import InfiniteScrollInReact from '../LowLevelDesignAndMachineCoding/InfiniteScrollInReact/InfiniteScrollInReact';
import ResponsiveSlideshow from '../LowLevelDesignAndMachineCoding/ResponsiveSlideshow/ResponsiveSlideshow';
import FunctionalModalComponent from '../LowLevelDesignAndMachineCoding/FunctionalModalComponent/FunctionalModalComponent';
import DetectOverLappingCircle from '../LowLevelDesignAndMachineCoding/DetectOverLappingCircle/DetectOverLappingCircle';
import EditableToDoList from '../LowLevelDesignAndMachineCoding/EditableToDoList/EditableToDoList';
import CreateNestedCommentsInReact from '../LowLevelDesignAndMachineCoding/CreateNestedCommentsInReact/CreateNestedCommentsInReact';
import CreateANestedCheckboxTreeComponent from '../LowLevelDesignAndMachineCoding/CreateANestedCheckboxTreeComponent';
import ImplementFeatureFlagComponentInReact from '../LowLevelDesignAndMachineCoding/ImplementFeatureFlagComponentInReact/ImplementFeatureFlagComponentInReact';
import FeatureFlagProvider from '../LowLevelDesignAndMachineCoding/ImplementFeatureFlagComponentInReact/FeatureFlagContext';
import SearchWithAutoComplete from '../screens/SearchWithAutoComplete';

// Hooks & Polyfills & APIs
import UseMemoHookPolyfill from '../screens/UseMemoHookPolyfill/UseMemoHookPolyfill';
import DebounceSearchBar from '../screens/Debouncing/DebounceSearchBar';
import Throttling from '../screens/Throttling/Throttling';
import UseReducerHook from '../screens/UseReducerHook/UseReducerHook';
import UsePreviousHook from '../screens/UsePreviousHook/UsePreviousHook';
import UseAsyncHook from '../screens/Hooks/UseAsyncHook/UseAsyncHook';
import UseIdleHook from '../screens/UseIdleHook/UseIdleHook';
import UseStateHook from '../screens/ReactDefaultHooks/UseStateHook/UseStateHook';
import UseEffectHook from '../screens/ReactDefaultHooks/UseEffectHook/UseEffectHook';
import UseMemoHook from '../screens/ReactDefaultHooks/UseMemoHook/UseMemoHook';
import UseRefHook from '../screens/ReactDefaultHooks/UseRefHook/UseRefHook';
import UseContextHook from '../screens/ReactDefaultHooks/UseContextHook/UseContextHook';
import MemoApi from "../screens/ReactDefaultApi's/MemoApi/MemoApi";
import LazyLoading from '../screens/LazyLoadingScreen/LazyLoading';
import EventBubblingAndCapturingAkaTrickling from '../screens/Event Bubbling, Capturing aka Trickling in Javascript/Event Bubbling, Capturing aka Trickling in Javascript';
import IndexDB from '../screens/StateManagement/IndexDB';
import Worker from '../screens/Worker/Worker';

const FeatureFlagDemo = () => (
  <FeatureFlagProvider>
    <ImplementFeatureFlagComponentInReact />
  </FeatureFlagProvider>
);

export type ContentType = 'interactive' | 'article';

export type CategoryKey = 
  | 'Machine Coding'
  | 'Interview Questions'
  | 'React Hooks'
  | 'Rendering Patterns'
  | 'Optimization'
  | 'Frontend System Design'
  | 'Web Fundamentals'
  | 'State Management'
  | 'Engineering';

export interface Topic {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: CategoryKey;
  type: ContentType;
  companyTag?: string;
  githubPath: string; // Relative path from repo root
  component?: React.ComponentType; // For interactive demos
  articleKey?: string; // Key in articleContentMap
  tags?: string[];
}

export const topics: Topic[] = [
  // ==========================================
  // 1. MACHINE CODING & LLD
  // ==========================================
  {
    id: 'multi-stepper',
    slug: 'multi-stepper-component',
    title: 'Multi Stepper Component',
    description: 'Interactive step-by-step progress indicator and form workflow wizard.',
    category: 'Machine Coding',
    type: 'interactive',
    githubPath: 'src/LowLevelDesignAndMachineCoding/MultiStepperComponent/MultiStepperComponent.tsx',
    component: MultiStepperComponent,
    tags: ['UI Components', 'State', 'Form'],
  },
  {
    id: 'switch-case',
    slug: 'switch-case-component',
    title: 'Switch-Case Component',
    description: 'Custom declarative conditional rendering component pattern for React.',
    category: 'Machine Coding',
    type: 'interactive',
    githubPath: 'src/LowLevelDesignAndMachineCoding/SwitchCaseComponent/SwitchCaseComponent.tsx',
    component: SwitchCaseComponent,
    tags: ['Design Pattern', 'Declarative UI'],
  },
  {
    id: 'two-step-login',
    slug: 'two-step-login-form',
    title: 'Two Step Login Form',
    description: 'Multi-stage authentication workflow with email verification and password input.',
    category: 'Machine Coding',
    type: 'interactive',
    githubPath: 'src/LowLevelDesignAndMachineCoding/TwoStepLoginForm/TwoStepLoginForm.tsx',
    component: TwoStepLoginForm,
    tags: ['Authentication', 'Forms', 'Validation'],
  },
  {
    id: 'todo-list',
    slug: 'todo-list',
    title: 'ToDo List Application',
    description: 'Classic task management component with add, delete, and toggle completion.',
    category: 'Machine Coding',
    type: 'interactive',
    githubPath: 'src/LowLevelDesignAndMachineCoding/ToDoList/ToDoList.tsx',
    component: TodoList,
    tags: ['CRUD', 'State Management'],
  },
  {
    id: 'search-pagination',
    slug: 'search-with-pagination',
    title: 'Search With Pagination',
    description: 'Client and server-side search querying coupled with paginated navigation.',
    category: 'Machine Coding',
    type: 'interactive',
    githubPath: 'src/LowLevelDesignAndMachineCoding/SearchWithPagination/SearchWithPagination.tsx',
    component: SearchWithPagingation,
    tags: ['Search', 'Pagination', 'API'],
  },
  {
    id: 'infinite-scroll',
    slug: 'infinite-scroll-in-react',
    title: 'Infinite Scroll In React',
    description: 'High-performance dynamic content loader utilizing Intersection Observer API.',
    category: 'Machine Coding',
    type: 'interactive',
    githubPath: 'src/LowLevelDesignAndMachineCoding/InfiniteScrollInReact/InfiniteScrollInReact.tsx',
    component: InfiniteScrollInReact,
    tags: ['IntersectionObserver', 'Performance', 'Feeds'],
  },
  {
    id: 'responsive-slideshow',
    slug: 'responsive-slideshow',
    title: 'Responsive Slideshow Carousel',
    description: 'Smooth animated carousel slider supporting automatic playback and navigation.',
    category: 'Machine Coding',
    type: 'interactive',
    githubPath: 'src/LowLevelDesignAndMachineCoding/ResponsiveSlideshow/ResponsiveSlideshow.tsx',
    component: ResponsiveSlideshow,
    tags: ['Carousel', 'Animation', 'Responsive'],
  },
  {
    id: 'functional-modal',
    slug: 'functional-modal-component',
    title: 'Functional Modal Component',
    description: 'Accessible modal dialog portal with backdrop dismissal and keyboard triggers.',
    category: 'Machine Coding',
    type: 'interactive',
    githubPath: 'src/LowLevelDesignAndMachineCoding/FunctionalModalComponent/FunctionalModalComponent.tsx',
    component: FunctionalModalComponent,
    tags: ['Modals', 'Portals', 'Accessibility'],
  },
  {
    id: 'detect-overlapping-circle',
    slug: 'detect-overlapping-circle',
    title: 'Detect Overlapping Circles',
    description: 'Geometric coordinate calculations and canvas/SVG collision detection in React.',
    category: 'Machine Coding',
    type: 'interactive',
    githubPath: 'src/LowLevelDesignAndMachineCoding/DetectOverLappingCircle/DetectOverLappingCircle.tsx',
    component: DetectOverLappingCircle,
    tags: ['Canvas', 'Algorithms', 'Geometry'],
  },
  {
    id: 'nested-checkbox-tree',
    slug: 'nested-checkbox-tree',
    title: 'Nested Checkbox Tree Component',
    description: 'Hierarchical recursive checkbox tree with indeterminate state management.',
    category: 'Machine Coding',
    type: 'interactive',
    githubPath: 'src/LowLevelDesignAndMachineCoding/CreateANestedCheckboxTreeComponent',
    component: CreateANestedCheckboxTreeComponent,
    tags: ['Recursion', 'Tree', 'Indeterminate State'],
  },
  {
    id: 'feature-flag-component',
    slug: 'feature-flag-component',
    title: 'Feature Flag System in React',
    description: 'Context-driven feature toggling mechanism for A/B testing and phased rollouts.',
    category: 'Machine Coding',
    type: 'interactive',
    githubPath: 'src/LowLevelDesignAndMachineCoding/ImplementFeatureFlagComponentInReact/ImplementFeatureFlagComponentInReact.tsx',
    component: FeatureFlagDemo,
    tags: ['Feature Flags', 'Context API', 'Enterprise'],
  },
  {
    id: 'search-autocomplete',
    slug: 'search-with-autocomplete',
    title: 'Search with Auto-Complete & Debounce',
    description: 'Live query suggestions with network debouncing and keyboard navigation.',
    category: 'Machine Coding',
    type: 'interactive',
    githubPath: 'src/screens/SearchWithAutoComplete.tsx',
    component: SearchWithAutoComplete,
    tags: ['Autocomplete', 'Debounce', 'Search'],
  },

  // ==========================================
  // 2. COMPANY INTERVIEW QUESTIONS
  // ==========================================
  {
    id: 'editable-todo-list',
    slug: 'editable-todo-list',
    title: 'Editable ToDo List (Abhibus SDE2)',
    description: 'In-place inline editing with save, cancel, and persistence constraints.',
    category: 'Interview Questions',
    companyTag: 'Abhibus SDE2',
    type: 'interactive',
    githubPath: 'src/LowLevelDesignAndMachineCoding/EditableToDoList/EditableToDoList.tsx',
    component: EditableToDoList,
    tags: ['Abhibus', 'Machine Coding', 'Inline Edit'],
  },
  {
    id: 'nested-comments',
    slug: 'nested-comments',
    title: 'Recursive Nested Comments (Zamp.ai)',
    description: 'Reddit/HackerNews style infinite depth threaded discussion tree.',
    category: 'Interview Questions',
    companyTag: 'Zamp.ai',
    type: 'interactive',
    githubPath: 'src/LowLevelDesignAndMachineCoding/CreateNestedCommentsInReact/CreateNestedCommentsInReact.tsx',
    component: CreateNestedCommentsInReact,
    tags: ['Zamp.ai', 'Recursion', 'Threaded Comments'],
  },
  {
    id: 'use-memo-polyfill',
    slug: 'use-memo-polyfill',
    title: 'useMemo() Polyfill (ThoughtSpot)',
    description: 'Custom React polyfill recreating useMemo dependency caching mechanism.',
    category: 'Interview Questions',
    companyTag: 'ThoughtSpot',
    type: 'interactive',
    githubPath: 'src/screens/UseMemoHookPolyfill/UseMemoHookPolyfill.tsx',
    component: UseMemoHookPolyfill,
    tags: ['ThoughtSpot', 'Polyfill', 'useMemo', 'Internals'],
  },

  // ==========================================
  // 3. REACT HOOKS & POLYFILLS
  // ==========================================
  {
    id: 'use-debounce',
    slug: 'use-debounce-hook',
    title: 'useDebounce Hook Demo',
    description: 'Custom debounce hook to delay rapid input updates and optimize API calls.',
    category: 'React Hooks',
    type: 'interactive',
    githubPath: 'src/screens/Debouncing/DebounceSearchBar.tsx',
    component: DebounceSearchBar,
    tags: ['Hooks', 'Debounce', 'Performance'],
  },
  {
    id: 'throttling-demo',
    slug: 'throttling-demo',
    title: 'Throttling in React',
    description: 'Rate limiting high-frequency events (scroll, resize, mouse moves).',
    category: 'React Hooks',
    type: 'interactive',
    githubPath: 'src/screens/Throttling/Throttling.tsx',
    component: Throttling,
    tags: ['Performance', 'Throttling', 'Events'],
  },
  {
    id: 'use-reducer-hook',
    slug: 'use-reducer-hook',
    title: 'useReducer() Hook Deep Dive',
    description: 'Complex nested and linear state management through reducer dispatch actions.',
    category: 'React Hooks',
    type: 'interactive',
    githubPath: 'src/screens/UseReducerHook/UseReducerHook.tsx',
    component: UseReducerHook,
    tags: ['Hooks', 'useReducer', 'State'],
  },
  {
    id: 'use-previous-hook',
    slug: 'use-previous-hook',
    title: 'usePrevious() Hook',
    description: 'Ref-based custom hook to capture previous state across renders.',
    category: 'React Hooks',
    type: 'interactive',
    githubPath: 'src/screens/UsePreviousHook/UsePreviousHook.tsx',
    component: UsePreviousHook,
    tags: ['Hooks', 'useRef', 'Render Lifecycle'],
  },
  {
    id: 'use-async-hook',
    slug: 'use-async-hook',
    title: 'useAsync() Hook',
    description: 'Manage async promise execution state: loading, error, and resolved data.',
    category: 'React Hooks',
    type: 'interactive',
    githubPath: 'src/screens/Hooks/UseAsyncHook/UseAsyncHook.tsx',
    component: UseAsyncHook,
    tags: ['Async', 'Hooks', 'Promise'],
  },
  {
    id: 'use-idle-hook',
    slug: 'use-idle-hook',
    title: 'useIdle() Hook',
    description: 'Detect user inactivity across mouse and keyboard events to trigger actions.',
    category: 'React Hooks',
    type: 'interactive',
    githubPath: 'src/screens/UseIdleHook/UseIdleHook.tsx',
    component: UseIdleHook,
    tags: ['User Activity', 'Events', 'Hooks'],
  },
  {
    id: 'use-state-hook',
    slug: 'use-state-hook',
    title: 'useState() Fundamentals',
    description: 'Atomic component state management, updater functions, and re-rendering.',
    category: 'React Hooks',
    type: 'interactive',
    githubPath: 'src/screens/ReactDefaultHooks/UseStateHook/UseStateHook.tsx',
    component: UseStateHook,
    tags: ['Core Hooks', 'useState'],
  },
  {
    id: 'use-effect-hook',
    slug: 'use-effect-hook',
    title: 'useEffect() Lifecycle & Cleanup',
    description: 'Side effects execution, dependency array nuances, and cleanup functions.',
    category: 'React Hooks',
    type: 'interactive',
    githubPath: 'src/screens/ReactDefaultHooks/UseEffectHook/UseEffectHook.tsx',
    component: UseEffectHook,
    tags: ['Core Hooks', 'useEffect', 'Lifecycle'],
  },
  {
    id: 'use-memo-hook',
    slug: 'use-memo-hook',
    title: 'useMemo() Computation Memoization',
    description: 'Prevent expensive recalculations across component renders.',
    category: 'React Hooks',
    type: 'interactive',
    githubPath: 'src/screens/ReactDefaultHooks/UseMemoHook/UseMemoHook.tsx',
    component: UseMemoHook,
    tags: ['Optimization', 'useMemo'],
  },
  {
    id: 'use-ref-hook',
    slug: 'use-ref-hook',
    title: 'useRef() DOM & Mutable References',
    description: 'Direct DOM node access and preserving mutable instance variables without re-renders.',
    category: 'React Hooks',
    type: 'interactive',
    githubPath: 'src/screens/ReactDefaultHooks/UseRefHook/UseRefHook.tsx',
    component: UseRefHook,
    tags: ['Core Hooks', 'useRef', 'DOM'],
  },
  {
    id: 'use-context-hook',
    slug: 'use-context-hook',
    title: 'useContext() Global State Sharing',
    description: 'Eliminating prop-drilling by providing scoped state to descendant subtrees.',
    category: 'React Hooks',
    type: 'interactive',
    githubPath: 'src/screens/ReactDefaultHooks/UseContextHook/UseContextHook.tsx',
    component: UseContextHook,
    tags: ['Context API', 'State'],
  },
  {
    id: 'react-memo-api',
    slug: 'react-memo-api',
    title: 'React.memo API',
    description: 'Higher-order component to memoize functional components and skip re-renders.',
    category: 'React Hooks',
    type: 'interactive',
    githubPath: "src/screens/ReactDefaultApi's/MemoApi/MemoApi.tsx",
    component: MemoApi,
    tags: ['Performance', 'React.memo'],
  },
  {
    id: 'lazy-loading',
    slug: 'lazy-loading',
    title: 'React.lazy & Suspense Code-Splitting',
    description: 'Dynamic chunk imports with fallback loading skeletons.',
    category: 'React Hooks',
    type: 'interactive',
    githubPath: 'src/screens/LazyLoadingScreen/LazyLoading.tsx',
    component: LazyLoading,
    tags: ['Code Splitting', 'Suspense', 'Lazy Loading'],
  },
  {
    id: 'event-bubbling-capturing',
    slug: 'event-bubbling-capturing',
    title: 'Event Bubbling & Capturing (Trickling)',
    description: 'Visualizing DOM event propagation phases and stopPropagation controls.',
    category: 'React Hooks',
    type: 'interactive',
    githubPath: 'src/screens/Event Bubbling, Capturing aka Trickling in Javascript/Event Bubbling, Capturing aka Trickling in Javascript.tsx',
    component: EventBubblingAndCapturingAkaTrickling,
    tags: ['JavaScript', 'DOM Events', 'Propagation'],
  },
  {
    id: 'web-worker-task',
    slug: 'web-worker-task',
    title: 'Dedicated Web Worker Offloading',
    description: 'Executing heavy computational calculations off the main browser UI thread.',
    category: 'React Hooks',
    type: 'interactive',
    githubPath: 'src/screens/Worker/Worker.tsx',
    component: Worker,
    tags: ['Web Workers', 'Concurrency', 'Performance'],
  },

  // ==========================================
  // 4. RENDERING PATTERNS (WRITTEN ARTICLES)
  // ==========================================
  {
    id: 'compound-pattern',
    slug: 'compound-pattern',
    title: 'Compound Component Pattern in React',
    description: 'Design flexible, modular component APIs using shared implicit state (like Tabs, Selects).',
    category: 'Rendering Patterns',
    type: 'article',
    githubPath: 'RenderingPatterns/Compund Pattern in React.md',
    articleKey: 'compound-pattern',
    tags: ['Design Patterns', 'API Design', 'Compound Components'],
  },
  {
    id: 'container-presentational',
    slug: 'container-presentational-pattern',
    title: 'Container & Presentational Pattern',
    description: 'Separating business logic & data fetching from pure UI presentation.',
    category: 'Rendering Patterns',
    type: 'article',
    githubPath: 'RenderingPatterns/Container Presentational Pattern in React.md',
    articleKey: 'container-presentational-pattern',
    tags: ['Architecture', 'Clean Code'],
  },
  {
    id: 'higher-order-components',
    slug: 'higher-order-components',
    title: 'Higher-Order Component Pattern (HOC)',
    description: 'Enhancing and reusing cross-cutting component logic through function composition.',
    category: 'Rendering Patterns',
    type: 'article',
    githubPath: 'RenderingPatterns/Higher-Order Component Pattern in React.md',
    articleKey: 'higher-order-components',
    tags: ['HOC', 'Composition', 'Reusability'],
  },
  {
    id: 'advance-component-patterns',
    slug: 'advance-component-patterns',
    title: 'Advanced React Component Patterns',
    description: 'Comprehensive review of Render Props, State Reducer, and Inversion of Control.',
    category: 'Rendering Patterns',
    type: 'article',
    githubPath: 'RenderingPatterns/Advance React Component Patterns.md',
    articleKey: 'advance-component-patterns',
    tags: ['Advanced', 'Render Props', 'Patterns'],
  },
  {
    id: 'provider-pattern',
    slug: 'provider-pattern',
    title: 'Provider Data Passing Pattern',
    description: 'Distributing data globally across trees avoiding prop drilling with React Context.',
    category: 'Rendering Patterns',
    type: 'article',
    githubPath: 'RenderingPatterns/Provider Data Passing in React.md',
    articleKey: 'provider-pattern',
    tags: ['Context', 'State Management'],
  },
  {
    id: 'csr-vs-ssr',
    slug: 'csr-vs-ssr',
    title: 'Client-Side Rendering (CSR) vs Server-Side Rendering (SSR)',
    description: 'Architecture comparison, TTFB, FCP, LCP, SEO tradeoffs, and hybrid rendering strategies.',
    category: 'Rendering Patterns',
    type: 'article',
    githubPath: 'RenderingPatterns/Client-side rendering vs Server-side rendering.md',
    articleKey: 'csr-vs-ssr',
    tags: ['CSR', 'SSR', 'Web Performance', 'SEO'],
  },
  {
    id: 'selective-hydration',
    slug: 'selective-vs-progressive-hydration',
    title: 'Selective vs Progressive Hydration',
    description: 'Modern React 18 streaming architecture and hydrating components as they become visible.',
    category: 'Rendering Patterns',
    type: 'article',
    githubPath: 'RenderingPatterns/Selective vs Progressive Hydration.md',
    articleKey: 'selective-vs-progressive-hydration',
    tags: ['React 18', 'Hydration', 'Streaming'],
  },
  {
    id: 'isr-vs-ssg',
    slug: 'isr-vs-ssg',
    title: 'Incremental Static Regeneration (ISR) vs SSG',
    description: 'Static site generation caching models and on-demand background regeneration.',
    category: 'Rendering Patterns',
    type: 'article',
    githubPath: 'RenderingPatterns/Incremental Static Re-Rendering vs Server-Side Generated.md',
    articleKey: 'isr-vs-ssg',
    tags: ['Next.js', 'Static Generation', 'Caching'],
  },

  // ==========================================
  // 5. OPTIMIZATION & PERFORMANCE (WRITTEN ARTICLES)
  // ==========================================
  {
    id: 'code-splitting',
    slug: 'code-splitting',
    title: 'Code Splitting & Bundle Optimization',
    description: 'Route-based and component-based bundle chunking to minimize initial JavaScript payloads.',
    category: 'Optimization',
    type: 'article',
    githubPath: 'Optimization Techniques/Code Splitting.md',
    articleKey: 'code-splitting',
    tags: ['Webpack', 'Parcel', 'Vite', 'Performance'],
  },
  {
    id: 'tree-shaking',
    slug: 'tree-shaking',
    title: 'Tree Shaking & Dead Code Elimination',
    description: 'How ES modules enable static analysis and eliminate unused exports during builds.',
    category: 'Optimization',
    type: 'article',
    githubPath: 'Optimization Techniques/Tree Shaking.md',
    articleKey: 'tree-shaking',
    tags: ['Bundling', 'ES Modules', 'Optimization'],
  },
  {
    id: 'list-virtualization',
    slug: 'list-virtualization',
    title: 'List Virtualization & Windowing',
    description: 'Rendering 100,000+ items smoothly by keeping only visible items in the DOM.',
    category: 'Optimization',
    type: 'article',
    githubPath: 'Optimization Techniques/List Virtualization.md',
    articleKey: 'list-virtualization',
    tags: ['Virtualization', 'DOM', 'Performance'],
  },
  {
    id: 'adaptive-loading',
    slug: 'adaptive-loading',
    title: 'Adaptive Loading for Diverse Devices',
    description: 'Optimizing media quality and features dynamically based on network and device capabilities.',
    category: 'Optimization',
    type: 'article',
    githubPath: 'Optimization Techniques/Adaptive Loading.md',
    articleKey: 'adaptive-loading',
    tags: ['Network API', 'Hardware Concurrency', 'Adaptive'],
  },
  {
    id: 'efficient-media-loading',
    slug: 'efficient-media-loading',
    title: 'Efficient Media & Image Optimization',
    description: 'Modern formats (WebP, AVIF), responsive srcset, lazy loading, and placeholder techniques.',
    category: 'Optimization',
    type: 'article',
    githubPath: 'Optimization Techniques/Efficient Loading of Media.md',
    articleKey: 'efficient-media-loading',
    tags: ['Images', 'Lazy Loading', 'Core Web Vitals'],
  },
  {
    id: 'load-script-async-defer',
    slug: 'load-script-async-defer',
    title: 'Script Loading with Async & Defer',
    description: 'HTML parsing blocking behavior, async vs defer execution timing, and critical rendering path.',
    category: 'Optimization',
    type: 'article',
    githubPath: 'Optimization Techniques/Load script efficiently with async and defer.md',
    articleKey: 'load-script-async-defer',
    tags: ['HTML', 'Scripts', 'Critical Path'],
  },
  {
    id: 'pagination-offset-cursor',
    slug: 'pagination-offset-cursor',
    title: 'Pagination: Offset vs Cursor-Based',
    description: 'Deep dive into database efficiency, infinite feeds, duplicates handling, and API tradeoffs.',
    category: 'Optimization',
    type: 'article',
    githubPath: 'Optimization Techniques/Pagination - Offset vs Cursor-Based.md',
    articleKey: 'pagination-offset-cursor',
    tags: ['APIs', 'Pagination', 'Databases'],
  },
  {
    id: 'background-data-sync',
    slug: 'background-data-sync',
    title: 'Periodic Background Data Synchronization',
    description: 'Background Sync API, service workers, and stale-while-revalidate client strategies.',
    category: 'Optimization',
    type: 'article',
    githubPath: 'Optimization Techniques/Periodically synchronize data in the background.md',
    articleKey: 'background-data-sync',
    tags: ['PWA', 'Service Workers', 'Sync'],
  },
  {
    id: 'reactivity-in-js-frameworks',
    slug: 'reactivity-in-js-frameworks',
    title: 'Reactivity in Modern JavaScript Frameworks',
    description: 'How React Virtual DOM, Vue Proxies, Svelte Runes, and Solid Signals track updates.',
    category: 'Optimization',
    type: 'article',
    githubPath: 'Optimization Techniques/Reactivity in JavaScript frameworks.md',
    articleKey: 'reactivity-in-js-frameworks',
    tags: ['Reactivity', 'Signals', 'Virtual DOM'],
  },

  // ==========================================
  // 6. FRONTEND SYSTEM DESIGN (WRITTEN ARTICLES)
  // ==========================================
  {
    id: 'system-design-55-concepts',
    slug: 'frontend-system-design-55-concepts',
    title: '55 Frontend System Design Core Concepts',
    description: 'The master cheatsheet covering architecture, caching, security, performance, and scaling.',
    category: 'Frontend System Design',
    type: 'article',
    githubPath: 'Frontend System Design Questions/55 Frontend System Design Concepts (React Focused).md',
    articleKey: 'frontend-system-design-55-concepts',
    tags: ['System Design', 'Interview Guide', 'Architecture', '55 Concepts'],
  },
  {
    id: 'system-design-youtube',
    slug: 'system-design-youtube-app',
    title: 'System Design: Video Streaming Platform (YouTube)',
    description: 'End-to-end frontend architecture: video player buffer, comments feed, infinite recommendations, and offline caching.',
    category: 'Frontend System Design',
    type: 'article',
    githubPath: 'Frontend System Design Questions/Sample- Design a video streaming app like youtube.md',
    articleKey: 'system-design-youtube-app',
    tags: ['System Design', 'Video Player', 'YouTube', 'Large Scale'],
  },

  // ==========================================
  // 7. WEB FUNDAMENTALS (WRITTEN ARTICLES)
  // ==========================================
  {
    id: 'how-web-page-rendered',
    slug: 'how-web-page-is-rendered',
    title: 'How a Web Page is Rendered in the Browser',
    description: 'Step-by-step breakdown: HTML parser, DOM tree, CSSOM, Render Tree, Layout, Paint, and Compositing.',
    category: 'Web Fundamentals',
    type: 'article',
    githubPath: 'Web Fundamentals/How a web page is rendered in the browser.md',
    articleKey: 'how-web-page-is-rendered',
    tags: ['Browser Internals', 'Render Tree', 'Layout & Paint'],
  },
  {
    id: 'cdn-fundamentals',
    slug: 'cdn-content-delivery-network',
    title: 'Content Delivery Networks (CDN) Explained',
    description: 'Edge nodes, Anycast routing, caching headers, cache invalidation, and static asset distribution.',
    category: 'Web Fundamentals',
    type: 'article',
    githubPath: 'Web Fundamentals/CDN.md',
    articleKey: 'cdn-content-delivery-network',
    tags: ['CDN', 'Networking', 'Caching'],
  },
  {
    id: 'hosting-frontend-apps',
    slug: 'hosting-frontend-application',
    title: 'Different Ways to Host Frontend Applications',
    description: 'Comparing S3 + CloudFront, Vercel/Netlify, Docker containers, and VPS server configurations.',
    category: 'Web Fundamentals',
    type: 'article',
    githubPath: 'Web Fundamentals/Different ways to host a frontend application.md',
    articleKey: 'hosting-frontend-application',
    tags: ['Deployment', 'DevOps', 'Hosting', 'Cloud'],
  },
  {
    id: 'testing-strategies',
    slug: 'testing-strategies',
    title: 'Frontend Testing Strategies & Test Pyramid',
    description: 'Unit testing, integration testing with React Testing Library, and end-to-end testing with Playwright.',
    category: 'Web Fundamentals',
    type: 'article',
    githubPath: 'Web Fundamentals/Testing Startergies.md',
    articleKey: 'testing-strategies',
    tags: ['Testing', 'Jest', 'RTL', 'Playwright'],
  },
  {
    id: 'rest-vs-soap',
    slug: 'rest-vs-soap-api',
    title: 'REST API vs SOAP API Comparison',
    description: 'Stateless HTTP endpoints vs XML-based protocols, security standards, and usage criteria.',
    category: 'Web Fundamentals',
    type: 'article',
    githubPath: 'Web Fundamentals/Rest Api vs SOAP Api.md',
    articleKey: 'rest-vs-soap-api',
    tags: ['REST', 'SOAP', 'Web APIs'],
  },
  {
    id: 'types-of-apis',
    slug: 'types-of-apis',
    title: 'Types of Web APIs (REST, GraphQL, gRPC, WebSocket)',
    description: 'Comprehensive analysis of communication protocols, real-time channels, and data fetching paradigms.',
    category: 'Web Fundamentals',
    type: 'article',
    githubPath: "Web Fundamentals/Type of Api's.md",
    articleKey: 'types-of-apis',
    tags: ['GraphQL', 'WebSockets', 'gRPC', 'APIs'],
  },

  // ==========================================
  // 8. STATE MANAGEMENT & ARCHITECTURE
  // ==========================================
  {
    id: 'storage-comparison',
    slug: 'storage-cookies-session-local-indexeddb',
    title: 'Browser Storage: Cookies vs LocalStorage vs SessionStorage vs IndexedDB',
    description: 'Capacity, lifecycle, access security (HttpOnly, SameSite), and use cases for client persistence.',
    category: 'State Management',
    type: 'article',
    githubPath: 'State Management/Cookies, Session, Local storage, Indexdb.md',
    articleKey: 'storage-cookies-session-local-indexeddb',
    tags: ['Storage', 'IndexedDB', 'Security', 'Cookies'],
  },
  {
    id: 'data-normalization',
    slug: 'data-normalization',
    title: 'Frontend Data Normalization',
    description: 'Flattening relational nested API payloads into entities by ID for zero duplicate state.',
    category: 'State Management',
    type: 'article',
    githubPath: 'State Management/Data Normalization.md',
    articleKey: 'data-normalization',
    tags: ['Normalization', 'State Architecture'],
  },
  {
    id: 'singleton-pattern',
    slug: 'singleton-design-pattern',
    title: 'Singleton Design Pattern in JavaScript & React',
    description: 'Ensuring single class instance instantiation, global access points, and avoiding memory leaks.',
    category: 'State Management',
    type: 'article',
    githubPath: 'Design Pattern/Singleton.md',
    articleKey: 'singleton-design-pattern',
    tags: ['Design Patterns', 'Singleton', 'OOP'],
  },

  // ==========================================
  // 9. ENGINEERING PRACTICES
  // ==========================================
  {
    id: 'frontend-style-guide',
    slug: 'frontend-style-guide',
    title: 'Frontend Style Guide & Code Conventions',
    description: 'Folder structure standards, naming conventions, ESLint/Prettier configuration, and component layout.',
    category: 'Engineering',
    type: 'article',
    githubPath: 'Styling/Style Guide.md',
    articleKey: 'frontend-style-guide',
    tags: ['Style Guide', 'Conventions', 'Architecture'],
  },
  {
    id: 'pull-request-template',
    slug: 'pull-request-template',
    title: 'Production Pull Request (PR) Template',
    description: 'Structured PR description framework for testing checklists, screenshots, and reviewers.',
    category: 'Engineering',
    type: 'article',
    githubPath: 'Code Management/Pr Template.md',
    articleKey: 'pull-request-template',
    tags: ['Code Review', 'Git', 'Best Practices'],
  },
];
