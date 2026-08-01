/**
 * Single source of truth for every word on the site.
 * Edit here. Components read from this file only.
 *
 * House style: no em dashes in visible copy. Use a colon, a comma or a full
 * stop instead. Compound hyphens (on-call, policy-as-code) are fine.
 *
 * NOTE: entries tagged `// verify` carry claims worth double-checking
 * against your own records before you publish.
 */

export const profile = {
  name: 'Naveenchand R B',
  short: 'Naveenchand',
  first: 'Naveen',
  role: 'DevSecOps & Cloud Engineer',
  email: 'naveenchand0606@icloud.com',
  /** Shown in the hero eyebrow: identity, not availability. */
  kicker: 'DevSecOps & Cloud Engineer',
  focus: 'Code to cloud · Kubernetes · Security · Observability',
  tagline:
    'I build the path from commit to production, and the guardrails that keep it honest.',
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

/** Hero headline, split so words can animate independently. */
export const hero = {
  lines: [
    [{ t: 'FROM' }, { t: 'CODE' }],
    [{ t: 'TO' }, { t: 'CLOUD,' }],
    [{ t: 'SECURED', em: true }],
  ],
  sub: 'DevSecOps and Cloud Engineer. I take systems from console-clicked and unmonitored to codified, hardened, observable and boring, at enterprise scale and at startup speed.',
  scrollCue: 'Scroll to trace the pipeline',
}

export const marquee = [
  'Kubernetes',
  'Terraform',
  'AWS',
  'Azure',
  'GCP',
  'Istio',
  'Gateway API',
  'OpenTelemetry',
  'SigNoz',
  'Trivy',
  'Cosign',
  'Kyverno',
  'ArgoCD',
  'GitHub Actions',
  'Ansible',
  'Prometheus',
  'Grafana',
  'Falco',
  'SonarQube',
  'Vault',
  'Helm',
  'Go',
  'Python',
  'Linux',
]

export const about = {
  eyebrow: 'The short version',
  // One entry per word. A whole phrase in a single entry wraps inside its
  // reveal mask and gets clipped out of sight; the flex row handles wrapping.
  headline: [
    [{ t: 'Most' }, { t: 'teams' }, { t: 'have' }, { t: 'a' }, { t: 'pipeline.' }],
    [{ t: 'Fewer' }, { t: 'have' }, { t: 'one' }, { t: 'they' }],
    [{ t: 'trust.', em: true }],
  ],
  body: [
    'I started as a software developer, which is the reason I build platforms the way I do. I have been the person on the other side of a slow pipeline and a useless alert, and I remember how much it cost.',
    'Today I work across the whole delivery path: the repository, the build, the scanners, the registry, the cluster, the mesh, the gateway, and everything on-call sees at 3am. Because I set all of it up, when something breaks I can look once and say exactly what went wrong and where. No guessing, no archaeology. I have done this on enterprise engagements where change control, audit evidence and compliance are non-negotiable, and in startups where the entire platform was me, a laptop and a deadline.',
    'Both taught me the same lesson from opposite directions: security that slows delivery gets deleted, and delivery without security gets breached. The work is finding the version where neither happens.',
  ],
  pillars: [
    {
      k: '01',
      title: 'Enterprise rigour',
      body: 'Change advisory boards, audit trails, segregated duties, policy-as-code, evidence you can hand to a compliance officer without flinching.',
    },
    {
      k: '02',
      title: 'Startup velocity',
      body: 'Greenfield platforms built solo: CI/CD, IaC, observability and secrets management standing up in weeks, not quarters.',
    },
    {
      k: '03',
      title: 'Developer empathy',
      body: 'I ship the guardrails as paved roads, not as gates. If a control makes engineers route around it, the control has failed.',
    },
  ],
}

/* ------------------------------------------------------------------ */
/* Section headers: eyebrow, display headline and intro paragraph       */
/* ------------------------------------------------------------------ */

export type SectionHeader = {
  index: string
  label: string
  headline: { t: string; em?: boolean }[][]
  intro?: string
}

export const sections: Record<
  'pipeline' | 'domains' | 'work' | 'stack',
  SectionHeader
> = {
  pipeline: {
    index: '02',
    label: 'The delivery path',
    headline: [
      [{ t: 'Seven' }, { t: 'stages.' }],
      [{ t: 'One' }, { t: 'continuous' }, { t: 'path.', em: true }],
    ],
    intro:
      'Every stage below is something I have designed, built or migrated in production. They are listed in the order a change actually travels, because security that only exists at one of these points is theatre.',
  },
  domains: {
    index: '03',
    label: 'What I actually do',
    headline: [
      [{ t: 'Six' }, { t: 'domains,' }],
      [{ t: 'one' }, { t: 'discipline.', em: true }],
    ],
    intro:
      'These are the areas I work in every day. What sits under each heading is the real scope of it: the systems I have built, hardened and kept running.',
  },
  work: {
    index: '04',
    label: 'Selected work',
    headline: [
      [{ t: 'Six' }, { t: 'problems' }],
      [{ t: 'worth' }, { t: 'solving.', em: true }],
    ],
    intro:
      'Client names are withheld, the engineering is not. Each of these is a real migration or build: the situation I walked into, what I did about it, and what changed as a result.',
  },
  stack: {
    index: '05',
    label: 'The toolbox',
    headline: [[{ t: 'The' }, { t: 'full' }, { t: 'toolbox', em: true }]],
  },
}

/* ------------------------------------------------------------------ */
/* The pipeline: the interactive spine of the site                      */
/* ------------------------------------------------------------------ */

export type PipelineStage = {
  id: string
  index: string
  title: string
  verb: string
  summary: string
  tools: string[]
}

export const pipeline: PipelineStage[] = [
  {
    id: 'code',
    index: '01',
    title: 'Code',
    verb: 'Shift left, properly',
    summary:
      'Secret scanning, SAST and dependency policy run in the editor and on the pull request, with findings posted against the changed lines rather than filed in a dashboard nobody opens. Branch protection, signed commits and mandatory review are enforced configuration, not team convention.',
    tools: ['SonarQube', 'Semgrep', 'gitleaks', 'Trivy fs', 'pre-commit', 'CODEOWNERS'],
  },
  {
    id: 'build',
    index: '02',
    title: 'Build',
    verb: 'Reproducible by default',
    summary:
      'Multi-stage builds producing minimal, distroless runtime images, with bases pinned by digest so "latest" never silently changes what ships. CI authenticates to the cloud through OIDC federation instead of long-lived static keys.',
    tools: ['Docker', 'BuildKit', 'GitHub Actions', 'Jenkins', 'OIDC federation', 'Distroless'],
  },
  {
    id: 'scan',
    index: '03',
    title: 'Scan & Sign',
    verb: 'Supply chain, end to end',
    summary:
      'Every image is scanned against severity gates, inventoried as an SBOM, and signed with an attestation tying it back to the commit and workflow that built it. Whether a new CVE reaches you becomes a query rather than an investigation.',
    tools: ['Trivy', 'Grype', 'Syft', 'Cosign', 'Sigstore', 'Checkov', 'tfsec', 'Kubescape'],
  },
  {
    id: 'provision',
    index: '04',
    title: 'Provision',
    verb: 'Nothing by hand',
    summary:
      'Versioned Terraform modules and locked remote state across more than one cloud, including the brownfield work of importing a live console-built estate without downtime. Plans are reviewed in pull requests and drift is caught on a schedule.',
    tools: ['Terraform', 'Terragrunt', 'Ansible', 'Packer', 'OPA / Conftest', 'CloudFormation'],
  },
  {
    id: 'deploy',
    index: '05',
    title: 'Deploy',
    verb: 'Git is the only lever',
    summary:
      'GitOps controllers reconcile each environment toward what the repository says, with promotion as a reviewed change and canary rollouts that revert themselves on an SLO breach. Admission control rejects anything unsigned, privileged or unbounded before it ever schedules.',
    tools: ['Argo CD', 'Helm', 'Kustomize', 'Argo Rollouts', 'Kyverno', 'Gatekeeper', 'Vault', 'ESO'],
  },
  {
    id: 'runtime',
    index: '06',
    title: 'Run & Route',
    verb: 'Zero trust, east and west',
    summary:
      'Cluster operations end to end, plus the traffic layer where most real incidents actually live. Service mesh carries mTLS and authorization policy between workloads, the Gateway API replaces annotation-driven Ingress, and network policy defaults to deny.',
    tools: ['Kubernetes', 'Istio', 'Linkerd', 'Gateway API', 'NGINX / Envoy', 'Cilium', 'Falco', 'CoreDNS'],
  },
  {
    id: 'observe',
    index: '07',
    title: 'Observe',
    verb: 'Alerts that matter',
    summary:
      'OpenTelemetry as the one vendor-neutral collection layer, with traces, metrics and logs correlated behind a single query surface. Alerting is written against SLOs, and any page that never drove an action gets deleted, because noise is a defect.',
    tools: ['OpenTelemetry', 'SigNoz', 'Prometheus', 'Grafana', 'Elasticsearch', 'Kibana', 'Alertmanager', 'Jaeger'],
  },
]

/* ------------------------------------------------------------------ */
/* Capability domains                                                   */
/* ------------------------------------------------------------------ */

export type Domain = {
  id: string
  icon: 'shield' | 'cloud' | 'kube' | 'mesh' | 'code' | 'radar'
  title: string
  blurb: string
}

export const domains: Domain[] = [
  {
    id: 'kubernetes',
    icon: 'kube',
    title: 'Kubernetes',
    blurb:
      'Administration, workload development and hardening, across managed and self-managed clusters. Upgrades, RBAC, admission baselines and autoscaling, including the operators written when an off-the-shelf chart is the wrong answer.',
  },
  {
    id: 'security',
    icon: 'shield',
    title: 'Security Engineering',
    blurb:
      'Application, container, infrastructure and supply-chain security treated as one continuous problem. Enforced in the pipeline and at admission, rather than reported in a dashboard someone might read.',
  },
  {
    id: 'cloud',
    icon: 'cloud',
    title: 'Multi-Cloud Infrastructure',
    blurb:
      'Designing, migrating and maintaining estates on AWS, Azure and GCP without pretending they are interchangeable. Including the unglamorous work of bringing a console-built estate under code.',
  },
  {
    id: 'mesh',
    icon: 'mesh',
    title: 'Networking & Service Mesh',
    blurb:
      'The traffic layer: ingress, gateways, mesh, and the policies that decide who may talk to whom. Plus the debugging everyone else avoids, down to DNS, MTU and TLS handshakes.',
  },
  {
    id: 'automation',
    icon: 'code',
    title: 'Automation & Platform',
    blurb:
      'Internal tooling and pipelines built so the common path is the safe path. Go and Python where glue is needed, and self-service workflows that do not put a platform engineer in the loop.',
  },
  {
    id: 'observability',
    icon: 'radar',
    title: 'Observability',
    blurb:
      'Open standards over vendor lock-in, correlation over dashboards, signal over volume. Instrumentation that survives changing the backend, and alerting tuned against real incident history.',
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
  problem: string
  approach: string[]
  outcome: string
  metrics: { value: string; label: string }[]
  stack: string[]
  scale: 'Enterprise' | 'Startup' | 'Freelance'
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'iac-migration',
    index: '01',
    title: 'Everything by hand, then everything by code',
    kicker: 'Manual estate to Terraform, without downtime',
    context: 'Freelance project',
    scale: 'Freelance',
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
    id: 'supply-chain',
    index: '02',
    title: 'A signature the cluster actually checks',
    kicker: 'Container supply-chain security, commit to admission',
    context: 'Enterprise engagement',
    scale: 'Enterprise',
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
    index: '03',
    title: 'Default-deny, and the migration to get there',
    kicker: 'Kubernetes hardening on a live cluster',
    context: 'Enterprise engagement',
    scale: 'Enterprise',
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
    index: '04',
    title: 'Deleting a thousand annotations',
    kicker: 'Ingress to Gateway API, plus mesh mTLS',
    context: 'Enterprise engagement',
    scale: 'Enterprise',
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
    index: '05',
    title: 'We deleted most of the alerts',
    kicker: 'OpenTelemetry and SigNoz, and a quieter pager',
    context: 'Enterprise engagement',
    scale: 'Enterprise',
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
    index: '06',
    title: 'Zero to platform, team of one',
    kicker: 'Greenfield delivery at startup speed',
    context: 'Startup product team',
    scale: 'Startup',
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

/* ------------------------------------------------------------------ */
/* Stack                                                                */
/* ------------------------------------------------------------------ */

export const stack: { group: string; items: string[] }[] = [
  {
    group: 'Cloud',
    items: ['AWS', 'Microsoft Azure', 'Google Cloud', 'IAM & identity federation', 'VPC / VNet design', 'Load balancing', 'Landing zones', 'Cost engineering'],
  },
  {
    group: 'Containers & Orchestration',
    items: ['Kubernetes', 'Docker', 'Helm', 'Kustomize', 'Argo CD', 'Argo Rollouts', 'Operators & CRDs', 'Harbor', 'Distroless'],
  },
  {
    group: 'Infrastructure as Code',
    items: ['Terraform', 'Terragrunt', 'Ansible', 'Packer', 'CloudFormation', 'Module design', 'State & drift management', 'Brownfield import'],
  },
  {
    group: 'Security',
    items: ['Trivy', 'Grype', 'Syft (SBOM)', 'Cosign / Sigstore', 'Kyverno', 'OPA / Gatekeeper', 'Falco', 'SonarQube', 'Semgrep', 'gitleaks', 'Checkov', 'tfsec', 'HashiCorp Vault', 'CIS benchmarks'],
  },
  {
    group: 'Networking & Mesh',
    items: ['Gateway API', 'Ingress NGINX', 'Istio', 'Linkerd', 'Envoy', 'Cilium', 'NetworkPolicy', 'cert-manager', 'ExternalDNS', 'CoreDNS', 'Firewalls'],
  },
  {
    group: 'Observability',
    items: ['OpenTelemetry', 'SigNoz', 'Prometheus', 'Grafana', 'Elasticsearch', 'Kibana', 'Jaeger', 'Alertmanager', 'SLO & error budgets'],
  },
  {
    group: 'CI/CD',
    items: ['GitHub Actions', 'Jenkins', 'GitLab CI', 'GitOps', 'Progressive delivery', 'OIDC federation', 'Reusable workflows'],
  },
  {
    group: 'Languages & Systems',
    items: ['Go', 'Python', 'Bash', 'JavaScript', 'Linux', 'systemd', 'Networking fundamentals', 'Git'],
  },
  {
    group: 'Design & Practice',
    items: ['System design', 'Distributed systems', 'Threat modelling', 'Landing zone design', 'SLO design', 'Incident response', 'Technical documentation'],
  },
]

export const contact = {
  headline: [
    [{ t: 'Let’s' }, { t: 'build' }, { t: 'something' }],
    [{ t: 'that', em: true }, { t: 'stays', em: true }, { t: 'up.', em: true }],
  ],
  body: 'I work across the whole delivery path: pipelines, cloud infrastructure, Kubernetes, and the security controls that hold all three together. If you are building a platform that has to be both fast and defensible, I am always glad to talk about it.',
  cta: 'Start a conversation',
}

export const nav = [
  { label: 'Approach', href: '#approach' },
  { label: 'Pipeline', href: '#pipeline' },
  { label: 'Expertise', href: '#expertise' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
]
