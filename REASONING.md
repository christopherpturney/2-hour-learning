# Design Reasoning Log

This document captures the reasoning behind architectural and design decisions made in the 2-hour-learning project.

---

## CCSS Tooltip (CcssTooltip.tsx)

**What:** A portal-based tooltip that appears when hovering over any CCSS standard code (e.g., `K.OA.A.5`), breaking it down into grade level, domain, cluster, and standard description.

**Why:**
- CCSS codes like `1.NBT.B.2` are opaque to parents and students. A tooltip makes the curriculum transparent without cluttering the UI.
- Used `createPortal` to render at `document.body` level because the initial implementation with `position: absolute` was clipped by `overflow-hidden` on parent cards in the skill map. Portal approach guarantees the tooltip is always visible regardless of container styling.
- Included in both the Skill Map and Parent Dashboard since those are the two places standard codes appear.

---

## Analog Clock (AnalogClock.tsx)

**What:** SVG-based analog clock component that renders hour and minute hands procedurally from numeric inputs.

**Why:**
- The time-telling skill generators (`tell-time-hour`, `tell-time-half-hour`) were producing question parts with type `'image'` and values like `clock-3-00`, but the rendering code had no handler for this — it just displayed raw text like `[1:00]`.
- SVG was chosen over canvas/images because it scales cleanly at any size (used at 160px in practice sessions, smaller in worksheets), requires zero external assets, and renders identically in print.
- The `parseClockValue()` helper extracts hour/minute from the `clock-H-MM` format string, keeping the parsing logic co-located with the rendering component.

---

## Skill Dependency Tree (/skills page)

### Problem with the old design
The original `/skills` page displayed all skills in a flat grid grouped by domain (OA, NBT, MD, G). This hid the prerequisite relationships between skills — a parent couldn't see *why* their child was working on a particular skill or what comes next.

### DAG Layout Algorithm (dagLayout.ts)

**What:** Computes a tiered layout for the skill dependency graph.

**Why:**
- Skills form a Directed Acyclic Graph (DAG) via their `prerequisites` arrays. A tree/DAG layout naturally communicates "you need to learn X before Y."
- **Tier assignment:** Each skill's tier = `max(tier of prerequisites) + 1`. Root skills (no prerequisites) are tier 0. This ensures every parent appears above its children.
- **Node ordering within tiers:** Uses the barycenter heuristic — each node is placed at the average column position of its parents. This is a well-known technique for minimizing edge crossings in layered graph drawing (Sugiyama method). Tier-0 roots are sorted by domain then curriculum order for a stable starting arrangement.
- The algorithm runs once (memoized) since the skill graph is static.

### SVG Connectors (TreeConnectors.tsx)

**What:** Absolutely positioned SVG overlay drawing cubic bezier curves between parent and child skill cards.

**Why:**
- Bezier curves (rather than straight lines) give a cleaner visual when connecting nodes across tiers, especially when parent and child aren't aligned.
- **Left-to-right flow:** Curves go from right-center of parent to left-center of child, matching the horizontal reading direction.
- **Port staggering:** When a node has multiple outgoing or incoming edges, the connection points are spread vertically across the node's height (sorted by partner position). This prevents multiple edges from overlapping at the same point and reduces visual clutter.
- Uses `ResizeObserver` to remeasure node positions when the layout changes (e.g., window resize), keeping connectors accurate.
- Semi-transparent gray keeps connectors visible but unobtrusive — the skill cards are the primary focus.
- **Highlight mode:** When a skill is selected, edges in the dependency chain render in indigo at higher opacity, while all other edges fade to 15% opacity. Highlighted edges render last (on top) for visual clarity.

### Skill Tree Cards (SkillTreeCard.tsx)

**What:** Compact card component (~180px wide) replacing the old larger domain-grouped cards.

**Why:**
- With 47 skills arranged in a tree, cards need to be much more compact than the old grid cards to avoid excessive horizontal scrolling.
- Left border colored by domain (purple=OA, indigo=NBT, teal=MD, orange=G) provides domain identification without needing separate sections.
- Cards expand on click to show description and accuracy — keeps the default view clean while making detail accessible.
- 2nd grade skills show a "2nd Grade" badge and lock icon to indicate they're part of the curriculum roadmap but not yet playable.

### Unified Tree (SkillMap.tsx rewrite)

**Why a single tree instead of per-domain trees:**
- Many skills have cross-domain prerequisites (e.g., `word-problems-within-100` depends on OA word problem skills AND NBT addition skills). Separate domain trees would either miss these connections or require awkward cross-tree links.
- A unified tree shows the complete learning path from kindergarten foundations through 2nd grade extensions.
- Domain colors on cards + the legend at top still make domain grouping visible.

### Left-to-Right Layout

**Why left-to-right instead of top-to-bottom:**
- A left-to-right flow reads like a timeline — foundations on the left, advanced skills on the right. This maps naturally to progression.
- The widest tier (tier 2, 19 skills) stacks vertically, using available page height rather than forcing extreme horizontal width. The page scrolls naturally in both directions.
- Each tier is a `flex-col` column within a `flex-row` container. `overflow-x-auto` on the outer card enables horizontal scrolling on mobile.
- Container was widened from `max-w-7xl` to `max-w-full` to accommodate the 7-tier horizontal spread.

### Click-to-Highlight (Dependency Chain Focus)

**What:** Clicking a skill highlights its full dependency chain — all ancestors (transitive prerequisites) and all descendants (skills that depend on it). Everything else dims.

**Why:**
- With 47 skills and ~60 edges, the graph can feel overwhelming. Highlighting lets a user focus on "what do I need before this skill?" and "what does this skill unlock?" in one click.
- **Graph traversal:** `getAncestors()` and `getDescendants()` use iterative DFS from `dagLayout.ts` to compute the transitive closure. Pre-computed adjacency maps (`buildGraphMaps`) make this O(V+E).
- **Visual treatment:** Selected card gets an indigo ring + slight scale. Ancestors/descendants get a subtle ring. Everything else fades to 30% opacity. Connectors in the chain turn indigo; others fade to 15%.
- **Deselection:** Click the same card again to toggle off, or click the container background. This uses `e.stopPropagation()` on cards to prevent the background handler from firing during card clicks.

---

## 2nd Grade Skill Extensions

**What:** Added 6 second-grade skills that extend the existing 1st grade skill graph.

**Why these 6 specifically:**
- Each one directly builds on mastered 1st grade skills, forming natural "next steps" in the curriculum:
  - `fluency-add-sub-20` (2.OA.B.2) — extends `addition-within-20` and `subtraction-within-20`
  - `word-problems-within-100` (2.OA.A.1) — extends word problem skills + two-digit addition
  - `understand-hundreds` (2.NBT.A.1) — extends `understand-tens-ones`
  - `add-subtract-within-100` (2.NBT.B.5) — extends multiple two-digit operation skills
  - `tell-time-five-minutes` (2.MD.C.7) — extends `tell-time-half-hour`
  - `draw-shapes-attributes` (2.G.A.1) — extends both 2D and 3D shape identification
- They cover all 4 domains, showing that the curriculum extends broadly.
- These are high-value CCSS standards that directly follow 1st grade mastery.

---

## ZPD Engine Guard (zpd.ts)

**What:** Added a check in `isReady()` that prevents skills without registered problem generators from being selected for practice.

**Why:**
- The 2nd grade skills don't have problem generators yet — they're placeholder nodes in the skill tree to show the learning path.
- Without this guard, the ZPD engine could select a 2nd grade skill for a practice session and then crash or produce no problems when trying to generate questions.
- The guard checks `generatorSkillIds.has(skill.id)` against the set of all skills that have registered generators. This is future-proof: as generators are added for 2nd grade skills, they'll automatically become eligible for practice without any engine changes.
- The set is computed once at module load from `getRegisteredSkillIds()`.

---

## Worksheet Clock Rendering (WorksheetGenerator.tsx)

**What:** Added analog clock SVG rendering to both inline preview and print preview in the worksheet generator.

**Why:**
- Worksheets for time-telling skills were showing raw text placeholders like `[1:00]` instead of clock faces.
- Added `getClockFromProblem()` to extract clock data from a problem's `questionParts` array, and `stripClockText()` to remove the `[H:MM]` text from the question string (since the clock image replaces it).
- Reuses the same `AnalogClock` component from practice sessions, ensuring visual consistency between digital practice and printed worksheets.

---

## Per-Domain Containers with Cluster Swim Lanes

### Separate Domain Containers (SkillMap.tsx)

**What:** Each of the 4 CCSS domains (OA, NBT, MD, G) gets its own white rounded container card. Within each container, clusters are rendered as swim-lane rows with skills positioned at tier columns left-to-right.

**Why:**
- The unified tree with 47 skills and ~60 edges was visually overwhelming. Separating by domain creates clear sections that match how math curricula are organized.
- Each domain container has its own header badge with domain icon and name, its own horizontal scroll, and its own SVG connector layer.
- `domainClusters` maps each domain to its ordered list of clusters. `domainContainerRefs` provides stable ref objects per domain so each `TreeConnectors` instance measures node positions relative to its own container.
- A `clusterTierGrid` maps each cluster to a `Map<tier, Skill[]>`, computed once from the DAG layout's tier assignments.

### Intra-Domain Edges (SkillMap.tsx + TreeConnectors.tsx)

**What:** Connector lines appear between all skills within the same domain — including cross-cluster connections within a domain. Only cross-domain dependencies are hidden as lines.

**Why:**
- Cross-cluster connections within a domain (e.g., OA.A → OA.C) are important for understanding the learning progression within a subject area and fit naturally within the domain container.
- `edgesByDomain` groups `layout.edges` by domain, filtering to edges where both endpoints share the same domain.
- Each domain's `TreeConnectors` receives only its domain's edges and its own container ref, so connectors never span across domain boundaries.
- `highlightedEdges` uses the flat union of all intra-domain edges (`allIntraDomainEdges`) for the click-to-highlight feature.

### Cross-Domain Prerequisite Tabs (SkillTreeCard.tsx)

**What:** Small colored pills on cards showing which external domain/cluster a skill depends on. E.g., an NBT.C skill that requires an OA.C skill shows "← OA.C" in purple.

**Why:**
- Cross-domain dependencies answer "what do I need from other domains before this skill?" without cluttering the visual with lines that would need to span separate containers.
- Tabs are color-coded by the prerequisite's domain using `domainTabColors`, making it visually consistent with the domain color scheme.
- A left-arrow icon (`ArrowLeft` at 8px) signals "comes from" direction.
- Hover title shows the full prerequisite name and cluster for detail without cluttering the card.
- `crossDomainPrereqsMap` is computed once via `useMemo`, checking each skill's prerequisites for domain mismatches.
