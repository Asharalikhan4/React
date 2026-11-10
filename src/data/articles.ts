// Rendering Patterns
import compoundPattern from 'bundle-text:../../RenderingPatterns/Compund Pattern in React.md';
import containerPresentational from 'bundle-text:../../RenderingPatterns/Container Presentational Pattern in React.md';
import hocPattern from 'bundle-text:../../RenderingPatterns/Higher-Order Component Pattern in React.md';
import advancePatterns from 'bundle-text:../../RenderingPatterns/Advance React Component Patterns.md';
import providerPattern from 'bundle-text:../../RenderingPatterns/Provider Data Passing in React.md';
import csrVsSsr from 'bundle-text:../../RenderingPatterns/Client-side rendering vs Server-side rendering.md';
import hydration from 'bundle-text:../../RenderingPatterns/Selective vs Progressive Hydration.md';
import isrVsSsg from 'bundle-text:../../RenderingPatterns/Incremental Static Re-Rendering vs Server-Side Generated.md';

// Optimization Techniques
import codeSplitting from 'bundle-text:../../Optimization Techniques/Code Splitting.md';
import treeShaking from 'bundle-text:../../Optimization Techniques/Tree Shaking.md';
import listVirtualization from 'bundle-text:../../Optimization Techniques/List Virtualization.md';
import adaptiveLoading from 'bundle-text:../../Optimization Techniques/Adaptive Loading.md';
import mediaLoading from 'bundle-text:../../Optimization Techniques/Efficient Loading of Media.md';
import asyncDefer from 'bundle-text:../../Optimization Techniques/Load script efficiently with async and defer.md';
import pagination from 'bundle-text:../../Optimization Techniques/Pagination - Offset vs Cursor-Based.md';
import backgroundSync from 'bundle-text:../../Optimization Techniques/Periodically synchronize data in the background.md';
import reactivity from 'bundle-text:../../Optimization Techniques/Reactivity in JavaScript frameworks.md';

// Frontend System Design
import systemDesign55 from 'bundle-text:../../Frontend System Design Questions/55 Frontend System Design Concepts (React Focused).md';
import youtubeDesign from 'bundle-text:../../Frontend System Design Questions/Sample- Design a video streaming app like youtube.md';

// Web Fundamentals
import browserRendering from 'bundle-text:../../Web Fundamentals/How a web page is rendered in the browser.md';
import cdn from 'bundle-text:../../Web Fundamentals/CDN.md';
import hostingWays from 'bundle-text:../../Web Fundamentals/Different ways to host a frontend application.md';
import testingStrategies from 'bundle-text:../../Web Fundamentals/Testing Startergies.md';
import restVsSoap from 'bundle-text:../../Web Fundamentals/Rest Api vs SOAP Api.md';
import typeOfApis from "bundle-text:../../Web Fundamentals/Type of Api's.md";

// State Management & Patterns
import storageComparison from 'bundle-text:../../State Management/Cookies, Session, Local storage, Indexdb.md';
import dataNormalization from 'bundle-text:../../State Management/Data Normalization.md';
import singletonPattern from 'bundle-text:../../Design Pattern/Singleton.md';
import styleGuide from 'bundle-text:../../Styling/Style Guide.md';
import prTemplate from 'bundle-text:../../Code Management/Pr Template.md';

export const articleContentMap: Record<string, string> = {
  'compound-pattern': compoundPattern,
  'container-presentational-pattern': containerPresentational,
  'higher-order-components': hocPattern,
  'advance-component-patterns': advancePatterns,
  'provider-pattern': providerPattern,
  'csr-vs-ssr': csrVsSsr,
  'selective-vs-progressive-hydration': hydration,
  'isr-vs-ssg': isrVsSsg,
  
  'code-splitting': codeSplitting,
  'tree-shaking': treeShaking,
  'list-virtualization': listVirtualization,
  'adaptive-loading': adaptiveLoading,
  'efficient-media-loading': mediaLoading,
  'load-script-async-defer': asyncDefer,
  'pagination-offset-vs-cursor': pagination,
  'background-data-sync': backgroundSync,
  'reactivity-in-js-frameworks': reactivity,
  
  'frontend-system-design-55-concepts': systemDesign55,
  'system-design-youtube-app': youtubeDesign,
  
  'how-web-page-is-rendered': browserRendering,
  'cdn-content-delivery-network': cdn,
  'hosting-frontend-application': hostingWays,
  'testing-strategies': testingStrategies,
  'rest-vs-soap-api': restVsSoap,
  'types-of-apis': typeOfApis,
  
  'storage-cookies-session-local-indexeddb': storageComparison,
  'data-normalization': dataNormalization,
  'singleton-design-pattern': singletonPattern,
  'frontend-style-guide': styleGuide,
  'pull-request-template': prTemplate,
};
