import { useState, useMemo, useRef } from "react";

const disorders = [
  {
    code: "ORG-001",
    name: "Chronic Meeting Proliferation Disorder",
    abbr: "CMPD",
    category: "Communication Pathologies",
    criteria: [
      "Three or more recurring meetings exist solely to discuss the outcomes of prior meetings, none of which produced outcomes",
      "Persistent clinical inability to distinguish between 'informational' and 'decisional' meetings, resulting in all meetings being both and neither",
      "Marked distress — occasionally vomiting — when a decision is made outside a meeting context",
      "Meeting invitees routinely exceed the number of people whose input is needed by a factor of 3 or more; at least one attendee is present because not inviting them would cause a separate problem",
      "Symptoms have been present for at least 6 months and cause significant impairment in the ability to do literally anything else",
    ],
    specifiers: [
      "With Agenda Denial: no written agenda has ever existed; the concept is treated as aggressive",
      "With Recursive Scheduling: a meeting is booked to determine when the meeting should occur",
      "Severe: an all-hands is convened to address the meeting problem; it runs 40 minutes over",
    ],
    differential: "Rule out Coordination Necessity Disorder, in which meetings occasionally produce decisions. CMPD is definitively diagnosed when the organization could not identify a single meeting in the past quarter that changed anyone's behavior in any direction.",
    prevalence: "87% of Fortune 500 organizations. 100% of universities. The remaining 13% have not yet been studied because their calendars are full.",
    prognosis: "Terminal. Asynchronous communication tools are adopted enthusiastically and then discussed in meetings.",
    survey: [
      "Our organization holds recurring meetings to discuss the outcomes of other meetings.",
      "People are invited to meetings primarily to avoid offending them, not because their input is needed.",
      "We have discussed our 'meeting culture' in a meeting.",
    ],
  },
  {
    code: "ORG-002",
    name: "Perpetual Capital Redistribution Disorder",
    abbr: "PCRD",
    category: "Financial Pathologies",
    criteria: [
      "The organizational budget is reshuffled at least once per fiscal year with no corresponding change to headcount, strategy, or outcomes — only to the PowerPoint",
      "Each reallocation is announced as a 'strategic pivot'; total spending changes by less than 3%; no one is fooled",
      "At least one department has been defunded, rebranded, and refunded within 24 months; employees in that department have stopped updating their email signatures",
      "Finance leadership cannot explain the current cost center structure without pulling up a deck that is already out of date",
      "The CFO uses the phrase 'right-sizing our investments' more than once per quarter; headcount announcements follow within 60 days",
    ],
    specifiers: [
      "With Rebadging: identical function, new budget line, new three-letter acronym, fresh set of slides",
      "With Cyclical Austerity: budgets cut in Q3, quietly restored in Q1, freeze blamed on 'macroeconomic uncertainty'",
      "Severe: a steering committee is established to govern budget reallocation; it has its own budget; no one audits it",
    ],
    differential: "Distinguish from Legitimate Portfolio Rebalancing, in which money moves because strategy changed. PCRD is characterized by strategy documents that change to match wherever the money already went. The ship does not change course; the map is redrawn.",
    prevalence: "Near-universal in organizations that have survived more than two 'transformation initiatives.' The third transformation is usually what triggers the fourth.",
    prognosis: "Poor. Reallocation accelerates under performance pressure because it looks like action and costs less than action. Executives who master this skill are frequently promoted.",
    survey: [
      "Our organization has reorganized its budget without meaningfully changing how work gets done.",
      "Leadership announces 'strategic investment shifts' that employees cannot connect to any observable change.",
      "The phrase 'right-sizing' has been used in our organization in a way that later meant layoffs.",
    ],
  },
  {
    code: "ORG-003",
    name: "Phantom Accountability Disorder",
    abbr: "PAD",
    category: "Structural Pathologies",
    criteria: [
      "Roles and responsibilities exist in documentation; they do not exist in practice; no one has noticed or acknowledged the gap",
      "When failures occur, blame diffuses across so many teams and stakeholders that accountability achieves a gaseous state — present everywhere, concentrated nowhere",
      "Annual performance reviews are conducted; ratings cluster in the middle 40% regardless of actual performance; the process is described internally as 'rigorous'",
      "High performers and chronic underperformers receive equivalent compensation adjustments for at least two consecutive cycles; the high performers begin updating their LinkedIn",
      "Leadership sincerely believes 'everyone knows what they own,' despite no one being able to demonstrate this when asked",
    ],
    specifiers: [
      "With RACI Theater: a responsibility assignment matrix exists, is beautiful, was last updated 18 months ago, and governs nothing",
      "With Responsibility Vapor: so many cross-functional stakeholders are listed as 'accountable' that the word has inverted its own meaning",
      "Severe: the accountability conversation is on the agenda; it is tabled; it remains on next week's agenda for seven consecutive weeks",
    ],
    differential: "Rule out Deliberate Role Flexibility, in which ambiguity is a feature. PAD is diagnosed when the ambiguity surprises leadership just as much as everyone else, usually during a postmortem.",
    prevalence: "Ubiquitous in matrixed organizations and any structure with more than three reporting layers, at which point 'accountable' means 'aware that the thing happened.'",
    prognosis: "Moderate with structural redesign. Individual coaching, feedback training, and 'accountability culture' workshops produce no measurable effect and are typically the first intervention attempted.",
    survey: [
      "When something fails in our organization, it is genuinely unclear who was responsible for preventing it.",
      "High performers and low performers in our organization experience roughly similar consequences.",
      "Leadership expresses surprise when they learn that ownership of a problem was unclear.",
    ],
  },
  {
    code: "ORG-004",
    name: "Adjectival Leadership Dependency",
    abbr: "ALD",
    category: "Financial Pathologies",
    criteria: [
      "The organization has retained an external consulting firm to deliver a leadership development program named after an adjective ('authentic,' 'servant,' 'agile,' 'resilient,' 'conscious') for which no peer-reviewed efficacy evidence was requested or provided",
      "A different adjectival leadership framework is introduced every 12 to 24 months; the prior framework is not evaluated before the next arrives; former frameworks are not discussed, like an ex at a family dinner",
      "Participants complete the program, receive a certificate or assessment profile, and report feeling 'energized'; no behavioral change is measurable at 90 days",
      "The consulting engagement costs exceed $50,000; the framework's theoretical basis is a book the consultant also wrote and sells at the back of the room",
      "HR describes the initiative as 'building our leadership pipeline'; no one in the pipeline has been promoted as a result",
    ],
    specifiers: [
      "With Proprietary Assessment Dependency: participants complete a bespoke leadership style instrument available exclusively through the consulting firm, at additional cost per administration, with no published psychometric properties",
      "With Cascade Theater: senior leaders attend the program and are asked to 'cascade' learnings to their teams; the learnings evaporate before the first cascade is complete",
      "Severe: the organization has a leadership competency model, a leadership values framework, and a leadership development program, none of which reference each other",
    ],
    differential: "Distinguish from evidence-based leadership development grounded in peer-reviewed research with pre-registered outcome evaluation. ALD is diagnosed by the complete absence of curiosity about whether the program worked — which is itself diagnostic.",
    prevalence: "Near-universal. The adjectival leadership industry generates an estimated $366 billion annually in global spend. Effect sizes, where measured at all, are indistinguishable from a well-catered offsite.",
    prognosis: "Indefinitely stable. The program's lack of measurable outcomes is reframed as evidence that leadership is complex, which is used to justify the next engagement.",
    survey: [
      "Our organization has paid for a leadership development program named after a single adjective or virtue.",
      "We have introduced a new leadership framework or model without formally evaluating the previous one.",
      "A consultant has sold our organization both the leadership framework and the assessment tool used to diagnose gaps in it.",
    ],
  },
  {
    code: "ORG-005",
    name: "Evidence-Free Team Cohesion Disorder",
    abbr: "ETCD",
    category: "Culture Pathologies",
    criteria: [
      "The organization has allocated budget to team-building activities — escape rooms, axe throwing, improv workshops, ropes courses, cooking classes — without reviewing a single study on whether such activities improve team performance",
      "When asked for the theoretical basis of the intervention, HR responds with 'it's about having fun together' or 'trust,' neither of which is operationalized",
      "Participation is nominally voluntary; employees who decline are described as 'not team players' in subsequent performance conversations",
      "Post-activity surveys measure enjoyment, not outcomes; enjoyment is reported as evidence of effectiveness",
      "The team that completed the escape room together has not improved on any measurable dimension of team functioning; they are, however, aware that Derek is surprisingly bad under pressure",
    ],
    specifiers: [
      "With Vendor Capture: the same external facilitator is rehired annually; their contract has never been competitively bid; someone on the leadership team knows them personally",
      "With Coercive Fun: the activity is scheduled during a workday employees were already using productively; attendance is tracked",
      "Severe: the organization books a multi-day resort offsite billed as a 'team cohesion retreat'; the agenda is 90% presentations that could have been emails; the actual team-building portion is 90 minutes on day two",
    ],
    differential: "Distinguish from structured team interventions grounded in team effectiveness research — role clarity, psychological safety development, feedback norm building. ETCD is diagnosed by the substitution of novelty and entertainment for any intervention with a documented mechanism of action.",
    prevalence: "Epidemic. The team-building industry generates billions annually on the foundational assumption that shared suffering in a locked room transfers to improved communication under deadline pressure. It does not.",
    prognosis: "Poor. Budget allocated to ETCD is rarely redirected toward evidence-based alternatives because evidence-based alternatives are harder to photograph for the company Slack.",
    survey: [
      "Our organization has paid for team-building activities (escape rooms, ropes courses, improv, etc.) without citing any research that such activities improve team performance.",
      "Participation in social or team events is framed as optional but carries implicit professional consequences for those who decline.",
      "We measure the success of team-building events by whether people enjoyed them, not by whether team functioning improved.",
    ],
  },
  {
    code: "ORG-006",
    name: "Hierarchical Flatness Paradox",
    abbr: "HFP",
    category: "Structural Pathologies",
    criteria: [
      "The organization publicly claims to be 'flat' or 'non-hierarchical'; a shadow hierarchy, more rigid and less transparent than any org chart, has existed since month three",
      "The elimination of formal titles has produced informal status markers — Slack response times, physical proximity to the founder, being cc'd on things — that everyone understands and no one discusses",
      "Employees report confusion about who makes decisions; the answer is always the same person; that person is surprised to hear there is confusion",
      "Consensus-seeking norms result in decision latency exceeding comparable hierarchical organizations by a factor of 2 or more, except for decisions the founder has already made",
      "Unpopular decisions are attributed to collective process ('we all landed here together'); popular decisions are attributed to leadership vision",
    ],
    specifiers: [
      "With Informal Hierarchy Emergence: within six months, every new employee knows exactly who actually matters; this information is transmitted entirely through social osmosis",
      "With Pseudo-Consensus: the decision was made before the meeting; the meeting exists to make people feel heard; it works about half the time",
      "Severe: the person with the most unchecked power in the organization is also its most vocal critic of hierarchy; the irony is not perceived",
    ],
    differential: "Distinguish from genuine distributed authority systems (sociocracy, holacracy implemented with fidelity) with explicit governance mechanisms. HFP organizations have none of these and are baffled when you mention them.",
    prevalence: "Endemic in tech startups from seed through Series B. Surfaces in academic departments wherever someone has read a book about Zappos.",
    prognosis: "The hierarchy always wins. The only variable is how long denial persists and how many people leave before it is acknowledged.",
    survey: [
      "Our organization claims to be flat or non-hierarchical, but employees understand an informal power structure that no one officially acknowledges.",
      "Decisions framed as collective or consensus-based were effectively made by one or two people before the group conversation occurred.",
      "Our organization's stated structure and its actual power dynamics would look meaningfully different if drawn side by side.",
    ],
  },
  {
    code: "ORG-007",
    name: "Demographic Diversity Facade Disorder",
    abbr: "DDFD",
    category: "Culture Pathologies",
    criteria: [
      "Demographic diversity metrics improve at entry level; representation in decision-making roles remains statistically indistinguishable from five years prior",
      "Hiring rubrics include explicit diversity criteria; informal screening eliminates candidates who 'wouldn't fit our culture,' which is defined by the people doing the screening",
      "Employees from underrepresented groups are hired at elevated rates and exit within 18 months at elevated rates; no one has formally connected these two data points",
      "The DEI function reports to HR, has no budget authority, and is staffed by one to two people who are exhausted",
      "Recruiting materials promise diverse perspectives; employees who express perspectives that diverge from leadership consensus are described as 'not a culture fit' or 'difficult to work with'",
    ],
    specifiers: [
      "With Aesthetic Diversity: the website, the conference booth, and the recruiting video feature a carefully curated demographic range; the leadership team does not",
      "With Assimilation Capture: the organization achieved demographic diversity and then selected within that group for everyone who thinks, communicates, and socializes identically to existing leadership",
      "Severe: the DEI Officer is the only person of color in a senior role; they have been asked to speak at seven external events this year; their internal budget request was denied",
    ],
    differential: "Distinguish from organizations pursuing structural inclusion, characterized by pay equity audits with published results, sponsorship programs with measurable outcomes, and representation targets at VP level and above. DDFD organizations have a webpage instead.",
    prevalence: "High and accelerating, particularly in organizations that issued public statements in 2020 and have since quietly discontinued the initiatives those statements announced.",
    prognosis: "Poor. The incentive to maintain the appearance of progress while avoiding the cost of actual progress is structurally stable. Turnover among underrepresented employees is reframed as a pipeline problem.",
    survey: [
      "Our organization's demographic diversity has improved at junior levels while senior leadership composition has remained largely unchanged.",
      "Candidates are screened for 'culture fit' using criteria that are not formally defined and differ by interviewer.",
      "Employees who express genuinely divergent perspectives are informally marked as difficult, regardless of the merit of their view.",
    ],
  },
  {
    code: "ORG-008",
    name: "Stakeholder Values Dissociation",
    abbr: "SVD",
    category: "Culture Pathologies",
    criteria: [
      "The organization publicly commits to environmental, social, or ethical causes; internal resource allocation is unaffected by any of them",
      "An annual impact or sustainability report is published; the reported metrics have no causal relationship to any operational decision made during the reporting period",
      "Executive compensation is tied exclusively to financial performance indicators; stated organizational values are tied to the content of a framed poster in the lobby",
      "When shareholder interests and stated values conflict — which is always — stated values are described as 'long-term aspirations' and the shareholder wins immediately",
      "The gap between public-facing communications and internal strategy documents is large enough to constitute a second organization",
    ],
    specifiers: [
      "With ESG Cosplay: a third-party sustainability certification is obtained through a process that does not require changing anything; it is featured prominently in investor materials",
      "With Cause Adjacency: the organization sponsors a Pride parade; it donates to legislators who oppose the rights of the people in that parade",
      "Severe: a Chief Purpose Officer is hired; they report to the Chief Marketing Officer; their role is abolished in the next restructuring under the category 'non-core functions'",
    ],
    differential: "Distinguish from organizations navigating genuine and disclosed tension between financial sustainability and values commitments. SVD is uniquely characterized by the complete absence of acknowledged tension — the organization has achieved a state of sincere self-deception that outsiders find remarkable.",
    prevalence: "Epidemic. Severity correlates positively with the number of values listed on the corporate homepage and inversely with the number of those values that appear in any governance document.",
    prognosis: "Stable indefinitely, or until a journalist, regulator, or disgruntled former employee introduces accountability from outside. Short-term symptom suppression follows; full remission has not been documented.",
    survey: [
      "Our organization publicly champions causes or values that are not reflected in how budgets are actually allocated.",
      "When financial interests conflict with stated organizational values, the values reliably lose.",
      "Our external communications and our internal strategic priorities describe a meaningfully different organization.",
    ],
  },
  {
    code: "ORG-009",
    name: "Compulsive Reorganization Syndrome",
    abbr: "CRS",
    category: "Structural Pathologies",
    criteria: [
      "The organization has reorganized structurally at least once every 18 months for five or more years; no reorganization has ever been formally evaluated for effectiveness",
      "Each reorganization is announced as a strategic response; the strategy is then adjusted to match the reorganization, reversing the stated causal direction",
      "Employees cannot name their current reporting structure with confidence; some have stopped trying",
      "Institutional knowledge exits the organization faster than it can be documented; the documentation system was itself dissolved in a reorganization",
      "The bandwidth consumed by planning the reorganization materially reduces the organization's ability to execute the strategy the reorganization was supposed to enable",
    ],
    specifiers: [
      "With Nomenclature Churn: team names, mission statements, and acronyms change on a 12-month cycle; the underlying work does not",
      "With Consultant Dependency: each reorganization is preceded by a six-figure engagement with a firm that recommends the reorganization and is retained to manage the transition",
      "Severe: a task force is formed to evaluate the last reorganization; it is absorbed into the next one before it reports",
    ],
    differential: "Distinguish from Adaptive Structural Evolution, in which organizational design changes follow demonstrated evidence of structural-strategy misalignment. CRS is diagnosed when reorganization is the first response to any problem, including problems caused by the last reorganization.",
    prevalence: "High in post-merger contexts and any organization whose incoming CEO was hired specifically to 'shake things up.' Shaking things up and reorganizing are treated as synonymous.",
    prognosis: "Poor and self-reinforcing. Each reorganization degrades institutional trust, which increases anxiety, which increases the appeal of the next reorganization as a signal of purposeful action.",
    survey: [
      "Our organization has undergone a significant structural reorganization in the past 18 months.",
      "A prior reorganization was never formally evaluated before the next one was announced.",
      "The time spent planning reorganizations visibly competes with time available to execute actual work.",
    ],
  },
  {
    code: "ORG-010",
    name: "Recursive Wellness Initiative Disorder",
    abbr: "RWID",
    category: "Culture Pathologies",
    criteria: [
      "The organization provides wellness benefits — meditation subscriptions, therapy stipends, resilience workshops — that treat symptoms produced by the organization's own working conditions",
      "Burnout is attributed to individual coping deficits; the 70-hour workweek, the 11pm Slack message from the VP, and the canceled vacation are not attributed to anything",
      "The wellness programming budget exceeds the investment in manager training, workload calibration, or any structural intervention that would address root causes",
      "Mental health days are technically available; employees who take them return to find their work undone and their absence noted in the following performance review",
      "Leadership cites Headspace subscription utilization as evidence that the culture prioritizes employee wellbeing; this claim is made without irony",
    ],
    specifiers: [
      "With Mindfulness Deflection: a meditation app subscription is offered the same week layoffs are announced; the juxtaposition is not acknowledged",
      "With Performative Vulnerability: the CEO shares a personal story about burnout at the all-hands; the Q&A is not open; headcount targets are announced the following week",
      "Severe: an employee wellbeing survey reveals widespread burnout; the findings are used to design a new resilience training module; the working conditions are not discussed",
    ],
    differential: "Distinguish from organizations that pair wellness support with genuine structural improvements — reduced meeting load, protected focus time, manageable spans of control. RWID is diagnosed when wellness investment functions as the organization's only response to a problem the organization is actively creating.",
    prevalence: "Surging. Post-2020 adoption accelerated as wellness programming became the lowest-cost, highest-optics response to a workforce in visible distress.",
    prognosis: "Poor. The model is structurally stable: the organization produces the disease and sells the cure to itself, and both sides of the transaction feel virtuous.",
    survey: [
      "Our organization offers wellness benefits while maintaining working conditions that most employees would describe as stressful or unsustainable.",
      "When employees experience burnout, the response focuses on individual coping strategies rather than workload or management practices.",
      "Leadership has cited employee use of wellness benefits as evidence that we have a healthy culture.",
    ],
  },
];

const categoryColors = {
  "Communication Pathologies": "#981A31",
  "Financial Pathologies": "#00546B",
  "Structural Pathologies": "#5E2154",
  "Culture Pathologies": "#7A4520",
};

const scaleLabels = ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"];

function getSeverity(score) {
  if (score === null) return { label: "—", color: "#999" };
  if (score < 1.0) return { label: "Subclinical", color: "#4A7A4A" };
  if (score < 2.0) return { label: "Mild", color: "#7A7A20" };
  if (score < 3.0) return { label: "Moderate", color: "#C07020" };
  if (score < 3.5) return { label: "Severe", color: "#981A31" };
  return { label: "Acute", color: "#5A0010" };
}

function SurveyView({ onNavigate, answers, setAnswers, submitted, setSubmitted, shuffledItems, ranked }) {
  const totalQuestions = disorders.reduce((sum, d) => sum + d.survey.length, 0);
  const resultsTopRef = useRef(null);

  const answered = Object.keys(answers).length;
  const progress = Math.round((answered / totalQuestions) * 100);
  const allAnswered = answered === totalQuestions;

  const setAnswer = (key, val) => setAnswers(prev => ({ ...prev, [key]: val }));

  return (
    <div style={{ padding: "24px 16px", maxWidth: 680, margin: "0 auto" }}>
      <div ref={resultsTopRef} />
      {!submitted ? (
        <>
          <div style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 8px" }}>Organizational Diagnostic Survey</h2>
            <p style={{ fontSize: 13, color: "#5A4A30", margin: "0 0 16px", lineHeight: 1.6 }}>
              Rate each statement based on your current organization. Respond honestly — this instrument has not been validated, and your employer cannot see your answers.
            </p>
            <div style={{ background: "#EDE8DC", borderRadius: 4, height: 6, overflow: "hidden" }}>
              <div style={{ background: "#981A31", height: "100%", width: `${progress}%`, transition: "width 0.3s" }} />
            </div>
            <div style={{ fontSize: 11, fontFamily: "'Courier New', monospace", color: "#7A6A50", marginTop: 6 }}>
              {answered} of {totalQuestions} items completed
            </div>
          </div>

          {shuffledItems.map((item, idx) => {
            const val = answers[item.key];
            return (
              <div key={item.key} style={{
                marginBottom: 12, padding: "14px 16px", background: "#fff",
                borderLeft: `3px solid ${val !== undefined ? "#981A31" : "#C8B89A"}`,
                border: "1px solid #C8B89A",
                borderRadius: 4,
              }}>
                <div style={{ fontSize: 10, fontFamily: "'Courier New', monospace", color: "#A89878", marginBottom: 8, letterSpacing: 1 }}>
                  ITEM {idx + 1}
                </div>
                <p style={{ margin: "0 0 12px", fontSize: 13, lineHeight: 1.55, color: "#1A1208" }}>{item.question}</p>
                <div style={{ display: "flex", gap: 6 }}>
                  {[0, 1, 2, 3, 4].map(v => (
                    <button key={v} onClick={() => setAnswer(item.key, v)} title={scaleLabels[v]} style={{
                      flex: 1, padding: "7px 0", fontSize: 12,
                      fontFamily: "'Courier New', monospace",
                      background: val === v ? "#981A31" : "#F5F0E8",
                      color: val === v ? "#fff" : "#4A3A20",
                      border: "1px solid",
                      borderColor: val === v ? "#981A31" : "#C8B89A",
                      borderRadius: 3, cursor: "pointer", transition: "all 0.1s",
                    }}>{v + 1}</button>
                  ))}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 5, fontSize: 10, color: "#A89878", fontFamily: "'Courier New', monospace" }}>
                  <span>Strongly Disagree</span><span>Strongly Agree</span>
                </div>
              </div>
            );
          })}

          <button onClick={() => {
            if (allAnswered) {
              setSubmitted(true);
              setTimeout(() => resultsTopRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
            }
          }} style={{
            padding: "12px 32px",
            background: allAnswered ? "#1A1208" : "#C8B89A",
            color: allAnswered ? "#F5F0E8" : "#7A6A50",
            border: "none", borderRadius: 3,
            fontSize: 13, fontFamily: "'Courier New', monospace",
            letterSpacing: 1, textTransform: "uppercase",
            cursor: allAnswered ? "pointer" : "not-allowed", marginBottom: 48,
          }}>
            {allAnswered ? "Generate Diagnostic Report" : `${totalQuestions - answered} Items Remaining`}
          </button>
        </>
      ) : (
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 6px" }}>Diagnostic Report</h2>
          <p style={{ fontSize: 13, color: "#5A4A30", marginBottom: 32, fontStyle: "italic" }}>
            Pathologies ranked by severity. Click any entry to read the full DSM-OD-1 criteria.
          </p>

          {ranked.map((d, idx) => {
            const sev = getSeverity(d.score);
            const pct = d.score !== null ? (d.score / 4) * 100 : 0;
            return (
              <button
                key={d.code}
                onClick={() => onNavigate(d.code)}
                style={{
                  display: "flex", alignItems: "center", gap: 16,
                  width: "100%", textAlign: "left",
                  marginBottom: 8, padding: "14px 18px",
                  background: "#fff",
                  border: "1px solid #C8B89A",
                  borderLeft: `4px solid ${categoryColors[d.category] || "#981A31"}`,
                  borderRadius: "0 4px 4px 0",
                  cursor: "pointer",
                  transition: "background 0.1s",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "#F5F0E8"}
                onMouseLeave={e => e.currentTarget.style.background = "#fff"}
              >
                <div style={{
                  flexShrink: 0, width: 28, height: 28, borderRadius: "50%",
                  background: "#EDE8DC", display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, fontFamily: "'Courier New', monospace", fontWeight: 700, color: "#7A6A50",
                }}>
                  {idx + 1}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 6 }}>
                    <span style={{ fontSize: 10, fontFamily: "'Courier New', monospace", color: "#A89878", letterSpacing: 1, flexShrink: 0 }}>{d.code}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#1A1208", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{d.name}</span>
                    <span style={{ fontSize: 11, color: "#A89878", fontStyle: "italic", flexShrink: 0 }}>({d.abbr})</span>
                  </div>
                  <div style={{ background: "#EDE8DC", borderRadius: 3, height: 4, overflow: "hidden" }}>
                    <div style={{ background: sev.color, height: "100%", width: `${pct}%` }} />
                  </div>
                </div>
                <div style={{ flexShrink: 0, textAlign: "right" }}>
                  <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "'Courier New', monospace", color: sev.color }}>
                    {d.score !== null ? d.score.toFixed(2) : "—"}
                  </div>
                  <div style={{ fontSize: 9, fontFamily: "'Courier New', monospace", color: sev.color, letterSpacing: 1, textTransform: "uppercase" }}>
                    {sev.label}
                  </div>
                </div>
                <div style={{ flexShrink: 0, color: "#C8B89A", fontSize: 14 }}>›</div>
              </button>
            );
          })}

          {/* Share button */}
          <ShareButton ranked={ranked} />

          <button onClick={() => { setAnswers({}); setSubmitted(false); }} style={{
            marginTop: 12, marginBottom: 48,
            padding: "10px 24px", background: "transparent",
            color: "#4A3A20", border: "1px solid #C8B89A",
            borderRadius: 3, fontSize: 12,
            fontFamily: "'Courier New', monospace",
            letterSpacing: 1, textTransform: "uppercase", cursor: "pointer",
          }}>
            Retake Survey
          </button>
        </div>
      )}
    </div>
  );
}

function ShareButton({ ranked }) {
  const [showModal, setShowModal] = useState(false);
  const [orgName, setOrgName] = useState("");
  const [hrEmail, setHrEmail] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);
  const top3 = ranked.slice(0, 3);

  const buildCanvas = () => {
    const W = 1080, H = 1080;
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");

    // Background
    ctx.fillStyle = "#0A0604";
    ctx.fillRect(0, 0, W, H);

    // Radial glow top-left
    const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, 750);
    glow.addColorStop(0, "rgba(152,26,49,0.4)");
    glow.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, W, H);

    // Radial glow bottom-right
    const glow2 = ctx.createRadialGradient(W, H, 0, W, H, 650);
    glow2.addColorStop(0, "rgba(94,33,84,0.3)");
    glow2.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = glow2;
    ctx.fillRect(0, 0, W, H);

    // Gradient top bar
    const bar = ctx.createLinearGradient(0, 0, W, 0);
    bar.addColorStop(0, "#981A31");
    bar.addColorStop(0.5, "#5E2154");
    bar.addColorStop(1, "#00546B");
    ctx.fillStyle = bar;
    ctx.fillRect(0, 0, W, 10);
    ctx.fillRect(0, H - 10, W, 10);

    // Left accent
    ctx.fillStyle = "#981A31";
    ctx.fillRect(0, 0, 8, H);

    const PAD = 64;

    // DSM badge pill
    ctx.fillStyle = "#981A31";
    roundRect(ctx, PAD, 36, 180, 44, 6);
    ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.font = "bold 18px 'Courier New'";
    ctx.textAlign = "center";
    ctx.fillText("DSM-OD-1", PAD + 90, 65);
    ctx.textAlign = "left";

    ctx.fillStyle = "#A89878";
    ctx.font = "15px 'Courier New'";
    ctx.fillText("ORGANIZATIONAL DIAGNOSTIC REPORT", PAD + 196, 65);

    // Org name — massive
    const displayOrg = (orgName.trim() || "YOUR ORGANIZATION").toUpperCase();
    let orgSize = 86;
    ctx.font = `bold ${orgSize}px Georgia`;
    while (ctx.measureText(displayOrg).width > W - PAD * 2 - 8 && orgSize > 36) {
      orgSize -= 2;
      ctx.font = `bold ${orgSize}px Georgia`;
    }
    ctx.fillStyle = "#F5F0E8";
    ctx.fillText(displayOrg, PAD + 8, 172);

    // Taglines
    ctx.fillStyle = "#981A31";
    ctx.font = "italic 26px Georgia";
    ctx.fillText("has been clinically assessed.", PAD + 8, 218);
    ctx.fillStyle = "#6A5A40";
    ctx.font = "italic 26px Georgia";
    ctx.fillText("The results are not great.", PAD + 8, 252);

    // Divider
    ctx.strokeStyle = "rgba(200,184,154,0.18)";
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(PAD, 278); ctx.lineTo(W - PAD, 278); ctx.stroke();

    // Section label
    ctx.fillStyle = "#5A4A30";
    ctx.font = "bold 15px 'Courier New'";
    ctx.fillText("TOP PATHOLOGIES IDENTIFIED", PAD + 8, 308);

    // Cards — stacked, generous height
    const cardColors = ["#981A31", "#5E2154", "#00546B"];
    const CARD_TOP = 324;
    const CARD_H = 192;
    const CARD_GAP = 14;
    const CARD_W = W - PAD * 2;

    top3.forEach((d, i) => {
      const x = PAD;
      const y = CARD_TOP + i * (CARD_H + CARD_GAP);
      const color = cardColors[i];
      const sev = getSeverity(d.score);
      const pct = d.score !== null ? d.score / 4 : 0;

      // Card bg
      ctx.fillStyle = "rgba(255,255,255,0.04)";
      ctx.strokeStyle = `${color}44`;
      ctx.lineWidth = 1;
      roundRect(ctx, x, y, CARD_W, CARD_H, 10);
      ctx.fill(); ctx.stroke();

      // Left color stripe
      ctx.fillStyle = color;
      roundRect(ctx, x, y, 8, CARD_H, { tl: 10, tr: 0, bl: 10, br: 0 });
      ctx.fill();

      // Ghost rank number — very large, right-aligned
      ctx.fillStyle = `${color}22`;
      ctx.font = `bold 140px Georgia`;
      ctx.textAlign = "right";
      ctx.fillText(`${i + 1}`, x + CARD_W - 20, y + CARD_H + 2);
      ctx.textAlign = "left";

      // Rank badge circle
      ctx.fillStyle = color;
      ctx.beginPath(); ctx.arc(x + 44, y + 44, 26, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.font = "bold 22px 'Courier New'";
      ctx.textAlign = "center";
      ctx.fillText(`#${i + 1}`, x + 44, y + 52);
      ctx.textAlign = "left";

      // Code + abbr
      ctx.fillStyle = `${color}EE`;
      ctx.font = "bold 16px 'Courier New'";
      ctx.fillText(`${d.code}  ·  ${d.abbr}`, x + 84, y + 36);

      // Severity — top right
      ctx.fillStyle = sev.color;
      ctx.font = "bold 16px 'Courier New'";
      ctx.textAlign = "right";
      ctx.fillText(sev.label.toUpperCase(), x + CARD_W - 20, y + 36);
      ctx.textAlign = "left";

      // Disorder name — large, word-wrapped
      ctx.fillStyle = "#F5F0E8";
      ctx.font = "bold 30px Georgia";
      const words = d.name.split(" ");
      let line = "", lineY = y + 82;
      const maxW = CARD_W - 120;
      words.forEach(w => {
        const test = line + (line ? " " : "") + w;
        if (ctx.measureText(test).width > maxW) {
          ctx.fillText(line, x + 24, lineY);
          line = w; lineY += 36;
        } else { line = test; }
      });
      ctx.fillText(line, x + 24, lineY);

      // Score bar
      const barY = y + CARD_H - 36;
      const barW = CARD_W - 48;
      ctx.fillStyle = "rgba(255,255,255,0.07)";
      ctx.fillRect(x + 24, barY, barW, 8);
      const barFill = ctx.createLinearGradient(x + 24, 0, x + 24 + barW, 0);
      barFill.addColorStop(0, color);
      barFill.addColorStop(1, `${color}55`);
      ctx.fillStyle = barFill;
      ctx.fillRect(x + 24, barY, barW * pct, 8);

      // Score label
      ctx.fillStyle = "#A89878";
      ctx.font = "bold 15px 'Courier New'";
      ctx.fillText(`Score: ${d.score !== null ? d.score.toFixed(2) : "—"} / 4.00`, x + 24, y + CARD_H - 10);
    });

    // Footer
    const footerY = CARD_TOP + 3 * (CARD_H + CARD_GAP) + 24;
    ctx.strokeStyle = "rgba(200,184,154,0.15)";
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(PAD, footerY); ctx.lineTo(W - PAD, footerY); ctx.stroke();

    ctx.fillStyle = "#4A3A20";
    ctx.font = "italic 16px Georgia";
    ctx.fillText("DSM-OD-1 · Diagnostic & Statistical Manual of Organizational Disorders", PAD + 8, footerY + 30);

    if (hrEmail.trim()) {
      ctx.fillStyle = "#A89878";
      ctx.font = "bold 18px 'Courier New'";
      ctx.fillText(`HR: ${hrEmail.trim()}`, PAD + 8, footerY + 58);
    }

    return canvas;
  };

  const generatePreview = () => {
    const canvas = buildCanvas();
    setPreviewUrl(canvas.toDataURL("image/jpeg", 0.93));
  };

  // Mobile-safe: just show the image in the modal — user long-presses to save on iOS,
  // right-clicks on desktop. window.open() is blocked by mobile browsers without a direct tap.
  const handleDownload = () => {
    const canvas = buildCanvas();
    const dataUrl = canvas.toDataURL("image/jpeg", 0.93);
    const filename = `dsm-od1-${(orgName || "org").toLowerCase().replace(/\s+/g, "-")}.jpg`;
    // Desktop: try direct anchor download
    try {
      const link = document.createElement("a");
      link.download = filename;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {}
    // Always update preview so mobile users can long-press the image to save
    setPreviewUrl(dataUrl);
  };

  return (
    <>
      <button
        onClick={() => { setShowModal(true); setPreviewUrl(null); }}
        style={{
          display: "flex", alignItems: "center", gap: 10,
          marginTop: 28, marginBottom: 8, width: "100%", padding: "16px 24px",
          background: "linear-gradient(135deg, #981A31 0%, #5E2154 100%)",
          color: "#F5F0E8", border: "none", borderRadius: 4,
          cursor: "pointer", fontSize: 14, fontWeight: 700,
          fontFamily: "'Georgia', serif", letterSpacing: 0.5,
          boxShadow: "0 2px 12px rgba(152,26,49,0.35)",
        }}
        onMouseEnter={e => e.currentTarget.style.opacity = "0.9"}
        onMouseLeave={e => e.currentTarget.style.opacity = "1"}
      >
        <span style={{ fontSize: 18 }}>📊</span>
        Share Your Top 3 Pathologies
        <span style={{ marginLeft: "auto", fontSize: 12, opacity: 0.7, fontFamily: "'Courier New', monospace", fontWeight: 400 }}>
          LinkedIn Graphic →
        </span>
      </button>

      {showModal && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(10,6,2,0.75)",
          overflowY: "auto", zIndex: 1000,
          WebkitOverflowScrolling: "touch",
        }}>
          <div style={{
            background: "#F5F0E8", borderRadius: 6, padding: 24,
            width: "calc(100% - 32px)", maxWidth: previewUrl ? 700 : 480,
            boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            margin: "24px auto",
          }}>
            <div style={{ fontSize: 10, fontFamily: "'Courier New', monospace", color: "#981A31", letterSpacing: 3, marginBottom: 8, textTransform: "uppercase" }}>
              DSM-OD-1 · Share Report
            </div>
            <h3 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 6px" }}>Generate LinkedIn Graphic</h3>
            <p style={{ fontSize: 13, color: "#5A4A30", marginBottom: 24, lineHeight: 1.6 }}>
              Your top 3 diagnoses will be featured. Consider tagging your HR department for maximum clinical impact.
            </p>

            {!previewUrl ? (
              <>
                <div style={{ marginBottom: 24 }}>
                  {top3.map((d, i) => {
                    const sev = getSeverity(d.score);
                    return (
                      <div key={d.code} style={{
                        display: "flex", alignItems: "center", gap: 10,
                        padding: "8px 12px", marginBottom: 6,
                        background: "#fff", borderRadius: 3,
                        borderLeft: `3px solid ${["#981A31","#5E2154","#00546B"][i]}`,
                      }}>
                        <span style={{ fontSize: 11, fontFamily: "'Courier New', monospace", color: "#A89878", width: 16 }}>#{i+1}</span>
                        <span style={{ fontSize: 12, fontWeight: 700, flex: 1 }}>{d.name}</span>
                        <span style={{ fontSize: 11, fontFamily: "'Courier New', monospace", color: sev.color }}>{d.score?.toFixed(2)}</span>
                      </div>
                    );
                  })}
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: "block", fontSize: 11, fontFamily: "'Courier New', monospace", letterSpacing: 1, color: "#7A6A50", textTransform: "uppercase", marginBottom: 6 }}>
                    Organization Name *
                  </label>
                  <input
                    value={orgName}
                    onChange={e => setOrgName(e.target.value)}
                    placeholder="e.g. Initech, Umbrella Corp, Academia"
                    style={{
                      width: "100%", padding: "10px 12px", fontSize: 13,
                      fontFamily: "'Georgia', serif", border: "1px solid #C8B89A",
                      borderRadius: 3, background: "#fff", color: "#1A1208",
                      boxSizing: "border-box", outline: "none",
                    }}
                  />
                </div>

                <div style={{ marginBottom: 28 }}>
                  <label style={{ display: "block", fontSize: 11, fontFamily: "'Courier New', monospace", letterSpacing: 1, color: "#7A6A50", textTransform: "uppercase", marginBottom: 6 }}>
                    HR Department Email <span style={{ opacity: 0.5 }}>(optional)</span>
                  </label>
                  <input
                    value={hrEmail}
                    onChange={e => setHrEmail(e.target.value)}
                    placeholder="hr@yourcompany.com"
                    style={{
                      width: "100%", padding: "10px 12px", fontSize: 13,
                      fontFamily: "'Georgia', serif", border: "1px solid #C8B89A",
                      borderRadius: 3, background: "#fff", color: "#1A1208",
                      boxSizing: "border-box", outline: "none",
                    }}
                  />
                  <p style={{ margin: "6px 0 0", fontSize: 11, color: "#A89878", fontStyle: "italic" }}>
                    Will be printed on the graphic.
                  </p>
                </div>

                <div style={{ display: "flex", gap: 10 }}>
                  <button onClick={() => setShowModal(false)} style={{
                    flex: 1, padding: "11px", background: "transparent",
                    border: "1px solid #C8B89A", borderRadius: 3,
                    fontSize: 12, fontFamily: "'Courier New', monospace",
                    letterSpacing: 1, textTransform: "uppercase",
                    color: "#4A3A20", cursor: "pointer",
                  }}>Cancel</button>
                  <button
                    onClick={generatePreview}
                    disabled={!orgName.trim()}
                    style={{
                      flex: 2, padding: "11px",
                      background: orgName.trim() ? "linear-gradient(135deg, #981A31 0%, #5E2154 100%)" : "#C8B89A",
                      border: "none", borderRadius: 3, fontSize: 12,
                      fontFamily: "'Courier New', monospace", letterSpacing: 1,
                      textTransform: "uppercase", color: "#F5F0E8",
                      cursor: orgName.trim() ? "pointer" : "not-allowed", fontWeight: 700,
                    }}
                  >Preview Graphic</button>
                </div>
              </>
            ) : (
              <>
                <img src={previewUrl} alt="LinkedIn graphic preview" style={{ width: "100%", borderRadius: 4, marginBottom: 12, display: "block" }} />
                <p style={{ fontSize: 12, color: "#7A6A50", fontFamily: "'Courier New', monospace", marginBottom: 20, textAlign: "center", lineHeight: 1.6 }}>
                  📱 <strong>iPhone:</strong> Press and hold the image → Save to Photos{"\n"}
                  💻 <strong>Desktop:</strong> Right-click → Save Image As
                </p>
                <div style={{ display: "flex", gap: 10 }}>
                  <button onClick={() => setPreviewUrl(null)} style={{
                    flex: 1, padding: "11px", background: "transparent",
                    border: "1px solid #C8B89A", borderRadius: 3,
                    fontSize: 12, fontFamily: "'Courier New', monospace",
                    letterSpacing: 1, textTransform: "uppercase",
                    color: "#4A3A20", cursor: "pointer",
                  }}>← Edit</button>
                  <button onClick={() => setShowModal(false)} style={{
                    flex: 1, padding: "11px", background: "transparent",
                    border: "1px solid #C8B89A", borderRadius: 3,
                    fontSize: 12, fontFamily: "'Courier New', monospace",
                    letterSpacing: 1, textTransform: "uppercase",
                    color: "#4A3A20", cursor: "pointer",
                  }}>Close</button>
                  <button onClick={handleDownload} style={{
                    flex: 2, padding: "11px",
                    background: "linear-gradient(135deg, #981A31 0%, #5E2154 100%)",
                    border: "none", borderRadius: 3, fontSize: 12,
                    fontFamily: "'Courier New', monospace", letterSpacing: 1,
                    textTransform: "uppercase", color: "#F5F0E8",
                    cursor: "pointer", fontWeight: 700,
                  }}>Save / Download</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function roundRect(ctx, x, y, w, h, r) {
  if (typeof r === "number") r = { tl: r, tr: r, bl: r, br: r };
  ctx.beginPath();
  ctx.moveTo(x + r.tl, y);
  ctx.lineTo(x + w - r.tr, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r.tr);
  ctx.lineTo(x + w, y + h - r.br);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r.br, y + h);
  ctx.lineTo(x + r.bl, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r.bl);
  ctx.lineTo(x, y + r.tl);
  ctx.quadraticCurveTo(x, y, x + r.tl, y);
  ctx.closePath();
}

export default function OrgDSM() {
  const [selected, setSelected] = useState(disorders[0]);
  const [expandedSection, setExpandedSection] = useState("criteria");
  const [activeTab, setActiveTab] = useState("manual");
  const [returnToResults, setReturnToResults] = useState(false);

  // Survey state lifted here so it survives tab switches
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const shuffledItems = useMemo(() => {
    const items = disorders.flatMap(d =>
      d.survey.map((q, i) => ({ key: `${d.code}-${i}`, question: q, code: d.code }))
    );
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }
    return items;
  }, []);

  const ranked = useMemo(() => {
    if (!submitted) return [];
    const scored = disorders.map(d => {
      const vals = d.survey.map((_, i) => answers[`${d.code}-${i}`]).filter(v => v !== undefined);
      const avg = vals.length === d.survey.length ? vals.reduce((a, b) => a + b, 0) / vals.length : null;
      return { ...d, score: avg, tiebreak: Math.random() };
    });
    return scored.sort((a, b) => (b.score ?? -1) - (a.score ?? -1) || a.tiebreak - b.tiebreak);
  }, [submitted]);

  const handleNavigate = (code) => {
    const disorder = disorders.find(d => d.code === code);
    if (disorder) {
      setSelected(disorder);
      setExpandedSection("criteria");
      setReturnToResults(true);
      setActiveTab("manual");
    }
  };

  const sections = [
    { key: "criteria", label: "Diagnostic Criteria" },
    { key: "specifiers", label: "Specifiers" },
    { key: "differential", label: "Differential Diagnosis" },
    { key: "prevalence", label: "Prevalence" },
    { key: "prognosis", label: "Prognosis" },
  ];

  return (
    <div style={{ fontFamily: "'Georgia', serif", minHeight: "100vh", background: "#F5F0E8", color: "#1A1208" }}>
      <div style={{ background: "#1A1208", color: "#F5F0E8", padding: "20px 16px 0", borderBottom: "4px solid #981A31" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: "#981A31", marginBottom: 4, fontFamily: "'Courier New', monospace" }}>
            DSM-OD-1 · First Edition
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 700, margin: "0 0 2px", letterSpacing: -0.5, lineHeight: 1.1 }}>DSM-OD-1</h1>
          <p style={{ margin: "0 0 16px", fontSize: 12, color: "#A89878", fontStyle: "italic" }}>
            Diagnostic & Statistical Manual of Organizational Disorders
          </p>
          <div style={{ display: "flex", gap: 4 }}>
            {[{ key: "manual", label: "DSM Reference" }, { key: "survey", label: "Diagnostic Survey" }].map(tab => (
              <button key={tab.key} onClick={() => { setActiveTab(tab.key); setReturnToResults(false); }} style={{
                padding: "7px 14px", fontSize: 10,
                fontFamily: "'Courier New', monospace", letterSpacing: 1,
                textTransform: "uppercase",
                background: activeTab === tab.key ? "#F5F0E8" : "transparent",
                color: activeTab === tab.key ? "#1A1208" : "#A89878",
                border: "1px solid", borderBottom: "none",
                borderColor: activeTab === tab.key ? "#C8B89A" : "#3A2A18",
                borderRadius: "3px 3px 0 0", cursor: "pointer",
              }}>{tab.label}</button>
            ))}
          </div>
        </div>
      </div>

      {activeTab === "survey" ? (
        <SurveyView
          onNavigate={handleNavigate}
          answers={answers}
          setAnswers={setAnswers}
          submitted={submitted}
          setSubmitted={setSubmitted}
          shuffledItems={shuffledItems}
          ranked={ranked}
        />
      ) : (
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          {/* Disorder picker — dropdown on all sizes, clean and mobile-friendly */}
          <div style={{ padding: "12px 16px", background: "#EDE8DC", borderBottom: "1px solid #C8B89A" }}>
            <select
              value={selected?.code || ""}
              onChange={e => {
                const d = disorders.find(x => x.code === e.target.value);
                if (d) { setSelected(d); setExpandedSection("criteria"); }
              }}
              style={{
                width: "100%", padding: "10px 12px", fontSize: 13,
                fontFamily: "'Georgia', serif", background: "#fff",
                border: "1px solid #C8B89A", borderRadius: 3,
                color: "#1A1208",
              }}
            >
              {disorders.map(d => (
                <option key={d.code} value={d.code}>{d.code} · {d.name}</option>
              ))}
            </select>
          </div>

          {selected && (
            <div style={{ padding: "20px 16px" }}>
              {returnToResults && (
                <button
                  onClick={() => { setActiveTab("survey"); setReturnToResults(false); }}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 6,
                    marginBottom: 16, padding: "6px 12px",
                    background: "transparent", border: "1px solid #C8B89A",
                    borderRadius: 3, cursor: "pointer",
                    fontSize: 11, fontFamily: "'Courier New', monospace",
                    color: "#7A6A50", letterSpacing: 1, textTransform: "uppercase",
                  }}
                >
                  ‹ Back to Results
                </button>
              )}

              <div style={{ borderBottom: "2px solid #1A1208", paddingBottom: 14, marginBottom: 18 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
                  <span style={{ fontFamily: "'Courier New', monospace", fontSize: 11, color: "#F5F0E8", background: categoryColors[selected.category] || "#981A31", padding: "2px 7px", borderRadius: 2, letterSpacing: 1 }}>
                    {selected.code}
                  </span>
                  <span style={{ fontFamily: "'Courier New', monospace", fontSize: 10, color: "#7A6A50", letterSpacing: 1 }}>{selected.category}</span>
                </div>
                <h2 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 3px", lineHeight: 1.2 }}>{selected.name}</h2>
                <div style={{ fontSize: 13, color: "#7A6A50", fontStyle: "italic" }}>({selected.abbr})</div>
              </div>

              {/* Section tabs — horizontally scrollable */}
              <div style={{ display: "flex", gap: 4, marginBottom: 16, overflowX: "auto", paddingBottom: 4, WebkitOverflowScrolling: "touch" }}>
                {sections.map(s => (
                  <button key={s.key} onClick={() => setExpandedSection(s.key)} style={{
                    padding: "5px 10px", fontSize: 10, whiteSpace: "nowrap", flexShrink: 0,
                    fontFamily: "'Courier New', monospace", letterSpacing: 0.5, textTransform: "uppercase",
                    background: expandedSection === s.key ? "#1A1208" : "transparent",
                    color: expandedSection === s.key ? "#F5F0E8" : "#4A3A20",
                    border: "1px solid", borderColor: expandedSection === s.key ? "#1A1208" : "#C8B89A",
                    borderRadius: 2, cursor: "pointer",
                  }}>{s.label}</button>
                ))}
              </div>

              <div style={{ background: "#fff", border: "1px solid #C8B89A", borderRadius: 4, padding: 16 }}>
                {expandedSection === "criteria" && (
                  <div>
                    <h3 style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "#7A6A50", fontFamily: "'Courier New', monospace", marginBottom: 12, marginTop: 0 }}>Diagnostic Criteria</h3>
                    <p style={{ fontSize: 12, color: "#4A3A20", marginBottom: 14, fontStyle: "italic" }}>
                      A diagnosis requires at least three of the following criteria:
                    </p>
                    {selected.criteria.map((c, i) => (
                      <div key={i} style={{ display: "flex", gap: 12, marginBottom: 14, paddingBottom: 14, borderBottom: i < selected.criteria.length - 1 ? "1px solid #EDE8DC" : "none" }}>
                        <div style={{ flexShrink: 0, width: 22, height: 22, borderRadius: "50%", background: categoryColors[selected.category] || "#981A31", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontFamily: "'Courier New', monospace", fontWeight: 700 }}>
                          {String.fromCharCode(64 + i + 1)}
                        </div>
                        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: "#1A1208" }}>{c}</p>
                      </div>
                    ))}
                  </div>
                )}
                {expandedSection === "specifiers" && (
                  <div>
                    <h3 style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "#7A6A50", fontFamily: "'Courier New', monospace", marginBottom: 12, marginTop: 0 }}>Diagnostic Specifiers</h3>
                    {selected.specifiers.map((s, i) => (
                      <div key={i} style={{ padding: "10px 14px", marginBottom: 8, background: "#F5F0E8", borderLeft: `3px solid ${categoryColors[selected.category] || "#981A31"}`, borderRadius: "0 3px 3px 0" }}>
                        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5, color: "#1A1208" }}>{s}</p>
                      </div>
                    ))}
                  </div>
                )}
                {expandedSection === "differential" && (
                  <div>
                    <h3 style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "#7A6A50", fontFamily: "'Courier New', monospace", marginBottom: 12, marginTop: 0 }}>Differential Diagnosis</h3>
                    <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: "#1A1208" }}>{selected.differential}</p>
                  </div>
                )}
                {expandedSection === "prevalence" && (
                  <div>
                    <h3 style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "#7A6A50", fontFamily: "'Courier New', monospace", marginBottom: 12, marginTop: 0 }}>Prevalence</h3>
                    <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: "#1A1208" }}>{selected.prevalence}</p>
                  </div>
                )}
                {expandedSection === "prognosis" && (
                  <div>
                    <h3 style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "#7A6A50", fontFamily: "'Courier New', monospace", marginBottom: 12, marginTop: 0 }}>Prognosis</h3>
                    <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: "#1A1208" }}>{selected.prognosis}</p>
                  </div>
                )}
              </div>

              <p style={{ fontSize: 10, color: "#A89878", marginTop: 16, fontStyle: "italic", fontFamily: "'Courier New', monospace", lineHeight: 1.6 }}>
                DSM-OD-1 is intended for satirical purposes. The system is usually the patient.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

