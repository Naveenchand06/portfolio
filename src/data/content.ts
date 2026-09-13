/**
 * Single source of truth for every word on the site.
 * Edit here. Components read from this file only.
 *
 * House style: no em dashes in visible copy. Use a colon, a comma or a full
 * stop instead. Compound hyphens (on-call, policy-as-code) are fine.
 * Headline entries are one word each: a whole phrase in a single entry wraps
 * inside its reveal mask and gets clipped out of sight.
 *
 * NOTE: entries tagged `// verify` carry claims worth checking against your
 * own records before you publish.
 */

export type Accent = 'signal' | 'verify' | 'model' | 'insight'

export const profile = {
  name: 'Naveenchand R B',
  short: 'Naveenchand',
  first: 'Naveen',
  initials: 'NRB',
  role: 'DevSecOps, Cloud Platform & MLOps Engineer',
  company: 'Deloitte',
  email: 'naveenchand0606@icloud.com',
  kicker: 'DevSecOps · Cloud Platform · MLOps',
  focus: 'Currently at Deloitte',
  tagline:
    'I build the path from commit to production, and the guardrails that keep it honest.',
  /** Drop a file in /public and set this to e.g. '/portrait.jpg' to use a photo. */
  portrait: null as string | null,
  socials: [
    { label: 'GitHub', href: 'https://github.com/Naveenchand06', handle: '@Naveenchand06' },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/naveenchand06/',
      handle: '/in/naveenchand06',
    },
    { label: 'X', href: 'https://x.com/Naveenchand0606', handle: '@Naveenchand0606' },
    { label: 'WhatsApp', href: 'https://wa.me/919566945085', handle: 'Message directly' },
  ],
}

export const hero = {
  lines: [
    [{ t: 'CODE,' }, { t: 'CLOUD' }],
    [{ t: 'AND' }, { t: 'MODELS' }],
    [{ t: 'IN', em: true }, { t: 'PRODUCTION', em: true }],
  ],
  sub: 'I started as a software developer and got curious about what happened to the code after the merge. That curiosity became a career in DevSecOps and cloud platforms, then in getting models and LLM features live. Shipping is where the work starts: what the system tells you afterwards, about revenue, about latency, about the next thing to harden, is the part that compounds.',
  scrollCue: 'Scroll to read the story',
}

export const marquee = [
  'Kubernetes',
  'Terraform',
  'AWS',
  'Azure',
  'GCP',
  'MLflow',
  'KServe',
  'Istio',
  'Gateway API',
  'OpenTelemetry',
  'SigNoz',
  'Trivy',
  'Cosign',
  'Kyverno',
  'Argo CD',
  'RAG',
  'LLM evals',
  'GitHub Actions',
  'Prometheus',
  'Falco',
  'Vault',
  'Go',
  'Python',
  'Linux',
]

/* ------------------------------------------------------------------ */
/* Section headers                                                      */
/* ------------------------------------------------------------------ */

export type SectionHeader = {
  index: string
  label: string
  headline: { t: string; em?: boolean }[][]
  intro?: string
}

export const sections: Record<
  'story' | 'practice' | 'work',
  SectionHeader
> = {
  story: {
    index: '01',
    label: 'Who I am',
    headline: [
      [{ t: 'I' }, { t: 'started' }, { t: 'by' }, { t: 'writing' }],
      [{ t: 'the' }, { t: 'code.' }, { t: 'Then' }, { t: 'I' }, { t: 'got' }],
      [{ t: 'curious', em: true }, { t: 'about', em: true }, { t: 'the', em: true }, { t: 'rest.', em: true }],
    ],
  },
  practice: {
    index: '02',
    label: 'What I build',
    headline: [
      [{ t: 'Four' }, { t: 'practices,' }],
      [{ t: 'one' }, { t: 'system.', em: true }],
    ],
    intro:
      'Applications, models and AI features all fail for the same reasons once they leave a laptop. The artifact changes; the discipline does not. And none of them are finished the day they go live.',
  },
  work: {
    index: '03',
    label: 'Selected work',
    headline: [
      [{ t: 'Problems' }, { t: 'worth' }],
      [{ t: 'solving.', em: true }],
    ],
    intro:
      'Client names are withheld, the engineering is not. Each of these is a real migration or build: the situation I walked into, what I did about it, and what changed as a result.',
  },
}

/* ------------------------------------------------------------------ */
/* The story                                                            */
/* ------------------------------------------------------------------ */

export const story = {
  body: [
    'I began as a software developer. I liked building the thing, but I kept getting pulled toward the part nobody wanted to own: what happened to the code after the merge. How it got built, where it ran, and why it fell over at 2am.',
    'So I went and learned that side properly. Servers, then containers, then Kubernetes, then the cloud underneath all of it, and eventually the security that has to wrap the whole path. Today I am a DevSecOps and Cloud Platform Engineer at Deloitte, designing and running secure delivery platforms for enterprise clients.',
    'I never stopped writing code, and that turns out to be the useful part. When something breaks I can read the application as well as the cluster, so I am never stuck at "the infrastructure looks fine". I find the root cause faster because I can follow it across that boundary instead of handing it over at it.',
    'Security is where my curiosity keeps going. Not the compliance checkboxes, the actual mechanics: how an image earns trust, how a credential leaks, what default-deny genuinely costs you before it saves you.',
    'Getting something live is where the work starts, not where it ends. Once real traffic is flowing, the same platform will tell you what the business actually needs to know: which regions are growing, which products sell, where people drop off. It will also tell you where the latency is, which hop to fix, and what to harden next. Security especially is never finished. It is a moving target, and it has to be revisited as the system and the threats both keep changing.',
    'And now the models. Everyone can train something; almost nobody can ship it. Roughly nine in ten models never reach production, and the reasons are rarely about the model. They are packaging, serving, versioning, monitoring and the fact that nobody owns it once the notebook closes. That is a delivery problem, which is precisely the problem I already solve.',
    'The same holds for AI and LLMs. Using them well means understanding how they actually work rather than just calling an API. Knowing the mechanics is what tells you when a model is the right tool, when a retrieval layer fixes it, and when the honest answer is not to use one at all.',
  ],
  /** The arc, from first job to now. Doubles as the career timeline. */
  journey: [
    {
      year: '2021',
      title: 'Software Developer',
      accent: 'signal' as Accent,
      body: 'Built product features against real traffic. Picked up Linux, networking and deployment because shipping was part of the job.',
    },
    {
      year: '2022',
      title: 'Pulled toward delivery',
      accent: 'signal' as Accent,
      body: 'Took over the release process nobody wanted to own. Containers, then pipelines, then the cloud underneath them.',
    },
    {
      year: '2023',
      title: 'Application Lead',
      accent: 'verify' as Accent,
      body: 'Built a delivery platform from nothing, alone. CI/CD, infrastructure as code, observability and on-call practice.',
    },
    {
      year: '2024',
      title: 'DevSecOps & Cloud Platform Engineer',
      accent: 'verify' as Accent,
      body: 'Deloitte. Enterprise platforms where every control needs an audit trail and every change needs a reviewer.',
    },
    {
      year: 'Now',
      title: 'Models and AI in the same path',
      accent: 'model' as Accent,
      body: 'Extending that delivery discipline to ML models and LLM features, where almost nothing reaches production without it.',
    },
  ],
}

/* ------------------------------------------------------------------ */
/* Practices                                                            */
/* ------------------------------------------------------------------ */

export type Practice = {
  id: string
  art: 'platform' | 'models' | 'intelligence' | 'insight'
  accent: Accent
  title: string
  body: string
  tags: string[]
}

export const practices: Practice[] = [
  {
    id: 'platform',
    art: 'platform',
    accent: 'verify',
    title: 'DevSecOps & Cloud Platform',
    body: 'The path from commit to production, and every guardrail around it. Kubernetes administration and hardening, multi-cloud infrastructure as code, container supply-chain security, service mesh and traffic, and observability that pages a human only when one is genuinely needed.',
    tags: ['Kubernetes', 'Terraform', 'Istio', 'Cosign', 'Argo CD', 'OpenTelemetry'],
  },
  {
    id: 'mlops',
    art: 'models',
    accent: 'model',
    title: 'MLOps & Model Delivery',
    body: 'Getting models out of notebooks and into production, then keeping them honest once they are there. Reproducible training, a registry with real lineage, versioned serving on the same pipeline as everything else, drift and quality monitoring, and rollback that works.',
    tags: ['MLflow', 'KServe', 'Kubeflow', 'Model registry', 'Drift monitoring', 'GPU scheduling'],
  },
  {
    id: 'ai',
    art: 'intelligence',
    accent: 'signal',
    title: 'AI & LLM Engineering',
    body: 'Building LLM features that survive contact with real users. Retrieval that measurably improves answers, evaluation you can trust, guardrails on input and output, predictable cost and latency, and the judgement to leave a model out where deterministic code does the job better.',
    tags: ['RAG', 'Evals', 'Guardrails', 'Vector search', 'Prompt versioning', 'Cost control'],
  },
  {
    id: 'insight',
    art: 'insight',
    accent: 'insight',
    title: 'Insight & Continuous Improvement',
    body: 'What the system tells you once it is carrying real traffic. On the business side that means the numbers people actually decide on: which regions are growing, which products move, where the funnel leaks. On the engineering side it means tracing a slow request to the hop that caused it, cutting latency, and treating hardening as a standing habit rather than a project, because the threat model moves whether or not you do.',
    tags: ['Product analytics', 'Distributed tracing', 'Latency profiling', 'SLOs', 'Capacity & cost', 'Continuous hardening'],
  },
]

/* ------------------------------------------------------------------ */
/* Case studies                                                         */
/* ------------------------------------------------------------------ */

export type CaseStudy = {
  id: string
  index: string
  title: string
  kicker: string
  context: string
  accent: Accent
  problem: string
  approach: string[]
  outcome: string
  metrics: { value: string; label: string }[]
  stack: string[]
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'iac-migration',
    index: '01',
    title: 'Everything by hand, then everything by code',
    kicker: 'Manual estate to Terraform, without downtime',
    context: 'Freelance project',
    accent: 'verify',
    problem:
      'A production estate built up over years of console clicks. No one could say with confidence what existed, who changed it last, or how to rebuild it if a region went dark. Every change was a ticket, a screen-share and a held breath.',
    approach: [
      'Inventoried the live estate and mapped it against what anyone believed was running. The gap was the actual finding.',
      'Wrote Terraform to match reality first, then imported live resources into state so the initial plan was a genuine no-op.',
      'Refactored into versioned, reusable modules once state was clean, rather than trying to do both at once.',
      'Put plan output into pull requests as a reviewable artifact, with policy-as-code checks running before a human review.',
      'Enabled scheduled drift detection so out-of-band console changes surface as alerts instead of as next quarter’s outage.',
    ],
    outcome:
      'Infrastructure changes moved from tickets and tribal knowledge to reviewed pull requests. Rebuilding an environment became a pipeline run rather than a recovery project, and the audit conversation changed from interviews to git history.',
    metrics: [
      { value: '100%', label: 'Production estate under version control' }, // verify
      { value: 'Zero', label: 'Downtime during import and cutover' },
      { value: 'PR-based', label: 'Every infrastructure change reviewed' },
    ],
    stack: ['Terraform', 'Terragrunt', 'AWS', 'Azure', 'Checkov', 'Conftest', 'GitHub Actions'],
  },
  {
    id: 'model-to-production',
    index: '02',
    title: 'The ninety percent that never ship',
    kicker: 'Models out of notebooks and into production',
    context: 'MLOps',
    accent: 'model',
    problem:
      'A team with good models and nothing in production. Training lived in notebooks on individual laptops, the registry was a shared folder of pickle files, and nobody could say which version had produced last quarter’s numbers. Every deployment attempt stalled on the same question: who owns this once it is running.',
    approach: [
      'Moved training into reproducible pipelines with pinned data snapshots and tracked parameters, so a result could be regenerated rather than remembered.',
      'Introduced a model registry with versioning, stage promotion and lineage running back to the training run and the dataset behind it.',
      'Packaged models as containers behind a standard serving interface, so a model deployed through the same pipeline, scanning and signing as every other workload.',
      'Monitored what actually fails in production: input drift, prediction distribution, latency and error rate, not just accuracy against a test set.',
      'Defined rollback exactly as we define it for applications, so a bad model is a revert rather than an incident.',
    ],
    outcome:
      'Models began reaching production on a schedule instead of by heroics, and stayed observable once they were there. The bottleneck had never been the modelling. It was that nothing downstream of the notebook existed.',
    metrics: [
      { value: 'Repeatable', label: 'Notebook to production as a pipeline' },
      { value: 'Versioned', label: 'Lineage from prediction back to dataset' },
      { value: 'Reversible', label: 'A bad model is a revert, not an incident' },
    ],
    stack: ['MLflow', 'Kubeflow Pipelines', 'KServe', 'Docker', 'Kubernetes', 'Prometheus', 'Python'],
  },
  {
    id: 'llm-feature',
    index: '03',
    title: 'An LLM feature that survived real users',
    kicker: 'Retrieval, evaluation, and knowing when not to use a model',
    context: 'AI engineering',
    accent: 'signal',
    problem:
      'A prototype that demoed beautifully and fell apart in front of real users. Answers drifted, cost was unpredictable, latency was whatever the provider felt like that day, and there was no way to tell whether a prompt change had made things better or worse.',
    approach: [
      'Built an evaluation set out of real failure cases first, so every later change could be measured instead of argued about.',
      'Added retrieval over the actual source of truth, which removed most of the hallucinations that prompt engineering alone had never fixed.',
      'Versioned prompts and model choices as deployable configuration, with the same review and rollback as any other change.',
      'Put guardrails on input and output, then added caching and token budgets so cost and latency became predictable.',
      'Scoped the feature honestly: the parts where a model added nothing went back to ordinary deterministic code.',
    ],
    outcome:
      'The feature became measurable, affordable and boring in the way production things should be. The largest single improvement came from understanding how the model actually behaved, not from reaching for a bigger one.',
    metrics: [
      { value: 'Measured', label: 'Eval set built from real failures' },
      { value: 'Predictable', label: 'Cost and latency inside a budget' },
      { value: 'Scoped', label: 'Deterministic code where AI added nothing' },
    ],
    stack: ['Python', 'Vector search', 'RAG', 'LLM evals', 'Guardrails', 'OpenTelemetry', 'Kubernetes'],
  },
  {
    id: 'supply-chain',
    index: '04',
    title: 'A signature the cluster actually checks',
    kicker: 'Container supply-chain security, commit to admission',
    context: 'Enterprise engagement',
    accent: 'verify',
    problem:
      'Images were scanned, and the reports went to a dashboard nobody had opened in months. Nothing stopped an unscanned, unsigned image from being deployed. Nobody could answer the provenance question: where did this running container actually come from.',
    approach: [
      'Moved scanning into the pipeline as a gate with severity thresholds, plus an exception process with expiry dates so waivers could not become permanent.',
      'Generated an SBOM per build and retained it, turning "are we exposed to this CVE" into a query with an answer in minutes.',
      'Adopted keyless signing with attestations binding each image to the exact commit and workflow that produced it.',
      'Enforced verification at admission, so unsigned or unverified images are rejected by the cluster rather than merely reported on.',
      'Layered policy on top: no privileged pods, no latest tags, no missing resource limits, no hostPath mounts.',
    ],
    outcome:
      'Provenance became verifiable rather than assumed. The control moved from a report someone might read to an enforcement point in the deployment path. Because it ran in CI where developers already were, adoption did not need policing.',
    metrics: [
      { value: 'Signed', label: 'Every production image, verified at admission' },
      { value: 'Per-build', label: 'SBOM retained and queryable' },
      { value: 'Blocking', label: 'Policy enforced, not advisory' },
    ],
    stack: ['Trivy', 'Syft', 'Cosign', 'Sigstore', 'Kyverno', 'Harbor', 'GitHub Actions'],
  },
  {
    id: 'k8s-hardening',
    index: '05',
    title: 'Default-deny, and the migration to get there',
    kicker: 'Kubernetes hardening on a live cluster',
    context: 'Enterprise engagement',
    accent: 'verify',
    problem:
      'A flat cluster network where every pod could reach every other pod and the internet. Broad RBAC handed out because narrowing it was harder than granting it. Workloads running as root because that was the default in the chart.',
    approach: [
      'Started in audit mode, logging what policy would have blocked, for weeks, before enforcing anything.',
      'Used the observed traffic to write network policies that matched real dependencies rather than an architecture diagram.',
      'Moved namespace by namespace to default-deny with explicit allow, keeping each step independently revertible.',
      'Rebuilt RBAC from the roles actually exercised, removing standing cluster-admin in favour of scoped, time-bound access.',
      'Applied Pod Security Admission, dropped capabilities, enforced read-only root filesystems and non-root users.',
      'Added runtime detection for the behaviours that only appear after an image has already passed every scan.',
    ],
    outcome:
      'Lateral movement stopped being trivial. The blast radius of a compromised workload shrank to its own namespace, and the migration shipped without an outage because enforcement only ever followed evidence.',
    metrics: [
      { value: 'Default-deny', label: 'Network posture across namespaces' },
      { value: 'Non-root', label: 'Workload baseline enforced at admission' },
      { value: 'Audit-first', label: 'Rollout with zero breaking changes' },
    ],
    stack: ['Kubernetes', 'Cilium', 'Kyverno', 'Falco', 'PSA', 'RBAC', 'OPA'],
  },
  {
    id: 'gateway-api',
    index: '06',
    title: 'Deleting a thousand annotations',
    kicker: 'Ingress to Gateway API, plus mesh mTLS',
    context: 'Enterprise engagement',
    accent: 'verify',
    problem:
      'Routing logic encoded in controller-specific Ingress annotations that only two people understood. Application teams needed a platform engineer for every hostname change, and traffic between services inside the cluster was plaintext.',
    approach: [
      'Modelled the estate onto Gateway API’s role separation: platform owns the Gateway, application teams own their own routes.',
      'Ran both stacks in parallel behind weighted DNS, shifting traffic gradually with an instant path back.',
      'Replaced annotation workarounds with first-class Gateway API constructs: header matching, traffic splitting, timeouts and retries.',
      'Rolled out service mesh sidecars for automatic mTLS on east-west traffic, then added authorization policy per service identity.',
      'Handed route ownership to application teams with templates and guardrails, removing the platform team from the critical path.',
    ],
    outcome:
      'Hostname and routing changes became self-service for application teams. Internal traffic became mutually authenticated by default, and the routing configuration became portable across implementations instead of welded to one controller.',
    metrics: [
      { value: 'Self-service', label: 'Route ownership moved to app teams' },
      { value: 'mTLS', label: 'East-west traffic encrypted by default' },
      { value: 'Progressive', label: 'Weighted cutover, instant rollback' },
    ],
    stack: ['Gateway API', 'Istio', 'Envoy', 'cert-manager', 'ExternalDNS', 'Kubernetes'],
  },
  {
    id: 'observability',
    index: '07',
    title: 'We deleted most of the alerts',
    kicker: 'OpenTelemetry and SigNoz, and a quieter pager',
    context: 'Enterprise engagement',
    accent: 'verify',
    problem:
      'Three disconnected monitoring tools, none of which could follow a single request end to end. Alert fatigue severe enough that pages were being acknowledged and ignored, which is the failure mode right before a real one gets missed.',
    approach: [
      'Standardised on OpenTelemetry as the single vendor-neutral collection layer, ending per-tool agent sprawl.',
      'Instrumented services for distributed tracing so latency could be attributed to a hop rather than argued about.',
      'Correlated traces, metrics and logs behind one query surface in SigNoz, with retention tiered by actual usefulness.',
      'Audited every existing alert against incident history and deleted the ones that had never once driven an action.',
      'Rewrote what remained against SLOs and error budgets, splitting symptom-based pages from cause-based tickets.',
      'Attached runbook links to alert payloads so the first thing on-call reads is what to do.',
    ],
    outcome:
      'Pages became rare enough to be worth reading. Debugging shifted from correlating timestamps across three tools to following one trace, and the instrumentation stayed portable because nothing was written against a proprietary agent.',
    metrics: [
      { value: 'One pane', label: 'Traces, metrics and logs correlated' },
      { value: 'SLO-based', label: 'Alerting rewritten against error budgets' },
      { value: 'Portable', label: 'OTEL, with no proprietary lock-in' },
    ],
    stack: ['OpenTelemetry', 'SigNoz', 'Prometheus', 'Grafana', 'Elasticsearch', 'Alertmanager'],
  },
  {
    id: 'startup-platform',
    index: '08',
    title: 'Zero to platform, team of one',
    kicker: 'Greenfield delivery at startup speed',
    context: 'Startup product team',
    accent: 'signal',
    problem:
      'No pipeline, no infrastructure code, no monitoring, and a product that needed to ship. The entire platform function was one engineer, and every hour spent on tooling was an hour not spent on the product.',
    approach: [
      'Picked managed services aggressively. The goal was shipping, not demonstrating how much could be self-hosted.',
      'Built CI/CD first, because every day without it multiplies the cost of everything after it.',
      'Wrote infrastructure as code from commit one, so there was never a manual estate to migrate later.',
      'Added the smallest useful observability layer immediately: uptime, error rate and latency. Grew it only when an incident proved something was missing.',
      'Kept security to the controls with the highest ratio of risk reduced to time spent: no static cloud keys, no secrets in git, scanned dependencies, least-privilege IAM.',
    ],
    outcome:
      'A working delivery platform inside weeks, run by one person alongside feature work. Nothing built then had to be thrown away later. The same shape scaled up as the team grew, because it was codified from the start.',
    metrics: [
      { value: 'Weeks', label: 'From nothing to full delivery pipeline' },
      { value: 'Team of 1', label: 'Platform built alongside feature work' },
      { value: 'No rework', label: 'Codified from day one, scaled as-is' },
    ],
    stack: ['AWS', 'Terraform', 'Docker', 'GitHub Actions', 'Grafana', 'Linux', 'Bash'],
  },
]

export const contact = {
  headline: [
    [{ t: 'Let’s' }, { t: 'build' }, { t: 'something' }],
    [{ t: 'that', em: true }, { t: 'stays', em: true }, { t: 'up.', em: true }],
  ],
  body: 'I work across the whole path: pipelines, cloud infrastructure, Kubernetes, the security controls that hold it together, the models and AI features running on top, and everything the system tells you once it is live. If you are building something that has to be fast, defensible and genuinely in production, I am glad to talk about it.',
  cta: 'Start a conversation',
  hire: {
    label: 'Hiring?',
    title: 'Want to hire me?',
    body: 'If you need someone who can build the platform, ship the models, and stay accountable for both once they are carrying real traffic, that is the job I want.',
    cta: 'Hire me',
    subject: 'Hiring enquiry',
  },
}

export const nav = [
  { label: 'Story', href: '#story' },
  { label: 'Practice', href: '#practice' },
  { label: 'Contact', href: '#contact' },
]
