export const posts = [
  {
    slug: "designing-audit-proof-systems",
    title: "Designing Audit-Proof Systems: Lessons from Building Veridex",
    date: "2026-05-20",
    readTime: "9 min read",
    tags: ["Java", "Architecture", "Spring Boot"],
    excerpt:
      "How I built an immutable audit trail system for financial compliance — and the design decisions that made it trustworthy at scale.",
    content: [
      {
        type: "p",
        text: "Audit logs are one of those things every financial system claims to have, but few do well. After inheriting a system where audit records were stored in mutable database rows — and discovering that a well-intentioned migration had silently overwritten months of history — I decided to build Veridex.",
      },
      {
        type: "h2",
        text: "The Problem with Mutable Audit Trails",
      },
      {
        type: "p",
        text: "Traditional audit implementations store state snapshots in a table with an updated_at timestamp. The issue is fundamental: any UPDATE can destroy the audit history. Even with soft deletes, the record of 'who changed what' is one SQL statement away from being lost.",
      },
      {
        type: "h2",
        text: "Append-Only Event Sourcing",
      },
      {
        type: "p",
        text: "The solution is to treat the audit log as an append-only ledger, not a mutable table. Each change becomes an immutable event record. The current state is a projection of all events.",
      },
      {
        type: "code",
        lang: "java",
        text: `@Entity
@Table(name = "audit_events")
public class AuditEvent {
    @Id
    private UUID id;

    @Column(nullable = false, updatable = false)
    private String entityType;

    @Column(nullable = false, updatable = false)
    private UUID entityId;

    @Column(nullable = false, updatable = false)
    private String eventType; // CREATED | UPDATED | DELETED

    @Column(columnDefinition = "jsonb", updatable = false)
    private String payload;

    @Column(nullable = false, updatable = false)
    private String actorId;

    @Column(nullable = false, updatable = false)
    private Instant occurredAt;

    // No setters — immutability enforced at the JPA level
}`,
      },
      {
        type: "p",
        text: "The critical detail is updatable = false on every column. Once written, no ORM operation can modify this record. Pair this with a database-level constraint (remove UPDATE privileges from the application role) and you have defense in depth.",
      },
      {
        type: "h2",
        text: "The Projection Layer",
      },
      {
        type: "p",
        text: "Clients rarely want raw events — they want the current state and a diff-based history. The projection service folds all events for an entity into a view that shows the latest state alongside a timeline of changes.",
      },
      {
        type: "h2",
        text: "Key Takeaways",
      },
      {
        type: "ul",
        items: [
          "Append-only tables, enforced at both the ORM and database permission level, are the foundation of trustworthy audit trails.",
          "Separate the write model (events) from the read model (projections) early — retrofitting this is painful.",
          "Store the actor ID and a correlation ID on every event. You'll thank yourself when debugging multi-service flows.",
          "JSON payload columns (jsonb in PostgreSQL) give you schema flexibility without losing queryability.",
        ],
      },
    ],
  },
  {
    slug: "microservices-in-fintech",
    title: "Microservices Communication Patterns in Financial Systems",
    date: "2026-04-10",
    readTime: "11 min read",
    tags: ["Architecture", "Microservices", "Java"],
    excerpt:
      "Three years building payment and compliance microservices taught me that synchronous REST is often the wrong default. Here's what I use instead.",
    content: [
      {
        type: "p",
        text: "The first microservice system I worked on used REST calls for everything. Service A called Service B which called Service C. It was clean on the whiteboard and a reliability nightmare in production. A single downstream timeout cascaded into a full system outage affecting real financial transactions.",
      },
      {
        type: "h2",
        text: "The Synchronous Trap",
      },
      {
        type: "p",
        text: "REST is a natural starting point — it's familiar, debuggable, and well-supported. But synchronous call chains in financial systems create tight coupling that compounds risk: the caller's reliability ceiling is now bounded by the called service's uptime.",
      },
      {
        type: "h2",
        text: "Pattern 1: Async Messaging for Non-Blocking Flows",
      },
      {
        type: "p",
        text: "For anything where the caller doesn't need an immediate result — audit logging, notification dispatch, ledger updates — messaging over a broker (we used AWS SQS) decouples the services completely.",
      },
      {
        type: "code",
        lang: "java",
        text: `@Service
public class AuditEventPublisher {
    private final SqsClient sqsClient;
    private final String queueUrl;

    public void publish(AuditEvent event) {
        var request = SendMessageRequest.builder()
            .queueUrl(queueUrl)
            .messageBody(serialize(event))
            .messageGroupId(event.getEntityId().toString())
            .build();
        sqsClient.sendMessage(request);
    }
}`,
      },
      {
        type: "h2",
        text: "Pattern 2: Circuit Breakers for Synchronous Dependencies",
      },
      {
        type: "p",
        text: "When you need synchronous calls, wrap them in a circuit breaker. Resilience4j integrates cleanly with Spring Boot and prevents a flaky dependency from exhausting your thread pool.",
      },
      {
        type: "h2",
        text: "Pattern 3: Idempotent Consumers",
      },
      {
        type: "p",
        text: "In financial systems, processing a payment twice is worse than not processing it at all. Every message consumer should be idempotent — track processed message IDs in a deduplication table and skip re-processing.",
      },
      {
        type: "h2",
        text: "What I'd Tell My Past Self",
      },
      {
        type: "ul",
        items: [
          "Design for async first. Add synchronous REST only where the caller genuinely needs an immediate response.",
          "Circuit breakers are not optional in production financial systems — they're load-bearing.",
          "Idempotency is not an edge case. Network retries, message redeliveries, and failover scenarios will exercise it constantly.",
          "Correlation IDs across all services, from day one. Distributed tracing is impossible without them.",
        ],
      },
    ],
  },
  {
    slug: "sql-optimizations-oracle",
    title: "5 SQL Optimizations That Saved Our Oracle Production Database",
    date: "2026-03-05",
    readTime: "7 min read",
    tags: ["SQL", "Oracle", "Performance"],
    excerpt:
      "Real optimizations from a high-traffic financial platform — from killing N+1 queries to getting execution plans to actually use your indexes.",
    content: [
      {
        type: "p",
        text: "Working on a financial platform that processed thousands of transactions per minute, slow queries were not just an annoyance — they were a business risk. Here are five changes that delivered the most impact.",
      },
      {
        type: "h2",
        text: "1. Fix the N+1 Before You Add an Index",
      },
      {
        type: "p",
        text: "An index won't save you if you're executing 500 queries to load a page that should need one. Hibernate's default lazy loading is notorious for generating N+1 patterns. Use JOIN FETCH for associations you know you'll need.",
      },
      {
        type: "code",
        lang: "java",
        text: `// Before — generates N+1 queries
List<Transaction> txns = repo.findAll();
txns.forEach(t -> t.getLineItems().size()); // N extra queries

// After — single JOIN FETCH query
@Query("SELECT t FROM Transaction t JOIN FETCH t.lineItems")
List<Transaction> findAllWithLineItems();`,
      },
      {
        type: "h2",
        text: "2. Use Explain Plan Before Every Index Creation",
      },
      {
        type: "p",
        text: "Oracle's cost-based optimizer is sophisticated. Before adding an index, verify with EXPLAIN PLAN that the optimizer will actually use it. Stale statistics, skewed data, or low cardinality columns can cause full table scans even with an index present.",
      },
      {
        type: "h2",
        text: "3. Partition Pruning for Date-Range Queries",
      },
      {
        type: "p",
        text: "Financial tables grow unbounded. A transaction history table with 200M rows scanned every reconciliation run was the worst query we had. Partitioning by month and ensuring queries include the partition key in WHERE clauses dropped scan times by 90%.",
      },
      {
        type: "h2",
        text: "4. Batch Inserts, Not Row-by-Row",
      },
      {
        type: "p",
        text: "JDBC round-trips are expensive. Inserting audit records one-by-one in a loop is a common anti-pattern. Spring Data JPA's saveAll() uses batching when hibernate.jdbc.batch_size is configured.",
      },
      {
        type: "h2",
        text: "5. Connection Pool Tuning",
      },
      {
        type: "p",
        text: "HikariCP defaults are conservative. On a service handling financial transactions under load, under-provisioned connection pools cause queue buildup that looks like slow queries but is actually connection wait time. Profile your pool metrics before tuning anything else.",
      },
    ],
  },
  {
    slug: "spring-boot-observability",
    title: "Spring Boot Observability in Production: Beyond the Basics",
    date: "2026-01-22",
    readTime: "8 min read",
    tags: ["Spring Boot", "AWS", "Observability"],
    excerpt:
      "Actuator health endpoints are just the starting point. Here's how I set up structured logging, distributed tracing, and meaningful metrics in production Spring Boot services.",
    content: [
      {
        type: "p",
        text: "The first time one of our microservices went silent at 2am — no errors, no alerts, just stopped processing — I learned that logging 'application started' and calling it observability is not enough. Here's what we built instead.",
      },
      {
        type: "h2",
        text: "Structured Logging Over Plain Text",
      },
      {
        type: "p",
        text: "Plain-text log lines are human readable but machine opaque. Switching to structured JSON logs via Logback and logstash-logback-encoder made our CloudWatch Logs Insights queries 10x faster and enabled log-based alerting.",
      },
      {
        type: "code",
        lang: "java",
        text: `// Instead of:
log.info("Processing transaction " + txnId + " for user " + userId);

// Use structured context:
log.info("Processing transaction",
    kv("transactionId", txnId),
    kv("userId", userId),
    kv("amount", amount),
    kv("currency", currency)
);`,
      },
      {
        type: "h2",
        text: "Distributed Tracing with Correlation IDs",
      },
      {
        type: "p",
        text: "Spring Boot 3+ ships with Micrometer Tracing. Add spring-boot-starter-actuator and micrometer-tracing-bridge-otel, and every request gets a trace ID that propagates across service boundaries automatically via HTTP headers.",
      },
      {
        type: "h2",
        text: "Custom Metrics That Actually Matter",
      },
      {
        type: "p",
        text: "CPU and memory metrics come free. What matters in a financial service is business-level metrics: transactions processed per second, payment failure rate, queue depth, and SLA breach rate. Micrometer makes registering custom counters and gauges straightforward.",
      },
      {
        type: "h2",
        text: "Health Checks That Lie Less",
      },
      {
        type: "p",
        text: "Spring Actuator's /health endpoint returns UP if the app started. That's not the same as ready to serve traffic. Implement custom HealthIndicators that verify critical dependencies — database connectivity, downstream service reachability, and queue consumer lag.",
      },
      {
        type: "ul",
        items: [
          "Structured logs are a prerequisite for useful alerting — plain text doesn't scale.",
          "Trace IDs must propagate from the first entry point, not just within your service.",
          "Business metrics (failure rates, throughput) alert faster than infrastructure metrics for application-layer issues.",
          "A health check that always returns UP is worse than no health check — it gives false confidence.",
        ],
      },
    ],
  },
  {
    slug: "rest-api-design-lessons",
    title: "REST API Design Lessons from 3 Years in Backend Engineering",
    date: "2025-12-08",
    readTime: "10 min read",
    tags: ["REST API", "Architecture", "Java"],
    excerpt:
      "The design mistakes that caused the most pain — versioning, error responses, pagination, and the contracts clients actually depend on.",
    content: [
      {
        type: "p",
        text: "I've designed, maintained, and inherited REST APIs across several teams. The mistakes I've seen — and made — cluster around the same patterns. This is what I wish I'd known on day one.",
      },
      {
        type: "h2",
        text: "Lesson 1: Version from Day One",
      },
      {
        type: "p",
        text: "Every unversioned API eventually becomes a versioned one, except the migration is forced and painful. Adding /v1/ to your base path costs nothing upfront and buys you the ability to evolve contracts without breaking existing consumers.",
      },
      {
        type: "h2",
        text: "Lesson 2: Standardize Error Responses Immediately",
      },
      {
        type: "p",
        text: "Clients build error handling logic based on what your API actually returns, not what your documentation says it returns. If validation errors return 400 with a string message on one endpoint and an object on another, client developers will write brittle code to handle both.",
      },
      {
        type: "code",
        lang: "java",
        text: `public record ApiError(
    String code,        // machine-readable, e.g. "VALIDATION_FAILED"
    String message,     // human-readable description
    String traceId,     // for support tickets
    List<FieldError> fields  // for validation errors, nullable
) {}

@ExceptionHandler(MethodArgumentNotValidException.class)
public ResponseEntity<ApiError> handleValidation(
        MethodArgumentNotValidException ex) {

    var fields = ex.getBindingResult().getFieldErrors().stream()
        .map(e -> new FieldError(e.getField(), e.getDefaultMessage()))
        .toList();

    return ResponseEntity.badRequest().body(new ApiError(
        "VALIDATION_FAILED",
        "Request validation failed",
        MDC.get("traceId"),
        fields
    ));
}`,
      },
      {
        type: "h2",
        text: "Lesson 3: Cursor-Based Pagination for Ordered Data",
      },
      {
        type: "p",
        text: "Offset-based pagination breaks when rows are inserted during traversal. Cursor-based pagination using a stable sort key (created_at + id) gives consistent results regardless of concurrent writes — critical for financial transaction history.",
      },
      {
        type: "h2",
        text: "Lesson 4: Don't Expose Your Database Schema",
      },
      {
        type: "p",
        text: "Entity fields leaking directly into API responses couples your API contract to your database schema. The day you need to rename a column or split a table, you'll discover that every downstream team has hardcoded the field name.",
      },
    ],
  },
];
