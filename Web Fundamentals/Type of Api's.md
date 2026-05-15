## 1. REST (Representational State Transfer)
- **Type:** Architectural style over HTTP
- **Data Format:** JSON (primary), XML, HTML, Plain Text
- **Core Concept:** Resource-oriented. Everything is a "resource" identified by a URI. Uses standard HTTP methods (GET, POST, PUT, PATCH, DELETE).
- **Key Traits:** Stateless, cacheable, uniform interface, layered system.
- **Pros:** Simple, widely adopted, browser-friendly, easy to cache, excellent tooling & documentation (OpenAPI/Swagger).
- **Cons:** Over-fetching/under-fetching data, rigid endpoint design, requires multiple requests for complex relational data.
- **Best For:** Public web APIs, mobile backends, CRUD-heavy applications, microservices.


## 2. SOAP (Simple Object Access Protocol)
- **Type:** Strict communication protocol
- **Data Format:** XML exclusively
- **Core Concept:** Envelope-based messaging with formal contracts (WSDL), built-in error handling (Fault), and standards for security (WS-Security), transactions (WS-AtomicTransaction), and reliability.
- **Key Traits:** Stateful or stateless, ACID-compliant, highly standardized.
- **Pros:** Enterprise-grade security, built-in retry/transaction support, strict schema validation, language-agnostic.
- **Cons:** Verbose payloads, complex to implement, slower performance, steep learning curve.
- **Best For:** Banking, telecom, enterprise ERP/CRM integrations, legacy systems requiring compliance & audit trails.

## 3. GraphQL
- **Type:** Query language + runtime architecture
- **Data Format:** JSON
- **Core Concept:** Single endpoint (/graphql). Clients send precise queries/mutations matching a strongly typed schema. Server returns exactly what’s requested.
- **Key Traits:** Client-driven data fetching, hierarchical structure, supports real-time via Subscriptions (often over WebSockets).
- **Pros:** Eliminates over/under-fetching, reduces round trips, excellent for complex UIs, self-documenting schema.
- **Cons:** Caching is non-trivial, query complexity/depth attacks require safeguards, higher server-side implementation effort.
- **Best For:** Modern web/mobile apps, dashboards with dynamic data needs, products with multiple client platforms.

## 4. gRPC
- **Type:** High-performance RPC framework
- **Data Format:** Protocol Buffers (binary)
- **Core Concept:** Service-oriented. Define .proto contracts, generate client/server code in any language. Runs over HTTP/2 with built-in streaming.
- **Key Traits:** Strongly typed, bidirectional streaming, multiplexed connections, low overhead.
- **Pros:** Extremely fast (3–10x REST), tiny payloads, excellent for microservices, automatic code generation.
- **Cons:** Not natively browser-supported (requires gRPC-Web proxy), binary format is not human-readable, harder to debug/curl.
- **Best For:** Internal microservice communication, IoT, real-time systems, high-throughput/low-latency environments.

## 5. WebSocket
- **Type: Full-duplex communication protocol
- **Data Format: Text or binary frames
- **Core Concept: Upgrades an HTTP connection to a persistent TCP socket. Both client and server can push data at any time without polling.
- **Key Traits: Persistent, low-latency, event-driven, bidirectional.
Pros: Real-time delivery, eliminates polling overhead, ideal for frequent updates.
- **Cons: Connection management complexity, scaling requires sticky sessions/message brokers, no built-in caching or HTTP semantics.
- **Best For: Live chat, collaborative editing, gaming, financial tickers, real-time notifications.

## 6. Webhooks (Event-Driven Callbacks)
- **Type:** Architectural pattern (HTTP-based)
- **Data Format:** Usually JSON via HTTP POST
- **Core Concept:** "Reverse API". Provider pushes data to a consumer-defined URL when a specific event occurs.
- **Key Traits:** Asynchronous, event-triggered, requires consumer to host a public endpoint, needs signature validation for security.
- **Pros:** Eliminates polling, decouples systems, near real-time, lightweight.
- **Cons:** Delivery reliability challenges (requires retries/idempotency), security/validation overhead, harder to test locally.
- **Best For:** Payment confirmations, CI/CD pipelines, SaaS integrations, status change notifications.

## 7. RPC (Remote Procedure Call) / JSON-RPC / XML-RPC
- **Type:** Invocation protocol
- **Data Format:** JSON or XML
- **Core Concept:** Action-oriented. Clients call remote methods/functions with parameters, as if calling local code. Focuses on operations rather than resources.
- **Key Traits:** Simple request/response, stateless, minimal overhead.
- **Pros:** Direct mapping to business logic, easy to implement for internal tools, lightweight.
- **Cons:** Less standardized than REST, poor cacheability, versioning can be messy, not resource-URI friendly.
- **Best For:** Internal tooling, blockchain nodes (e.g., Ethereum JSON-RPC), legacy integrations, simple command execution.
