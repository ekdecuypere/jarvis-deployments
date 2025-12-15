# Aurubis AG - Objection Handling Prep

## Objection 1: "How do we ensure data security for our proprietary production and trading data?"

### Why They Ask This
Aurubis deals with sensitive data: commodity positions, production yields, supplier pricing, and strategic plans. As a publicly traded company (MDAX), they have regulatory obligations around data handling.

### Response

**Acknowledge:**
> "Data security is absolutely critical - especially for a company handling commodity trading positions and proprietary production processes. This is a concern we address at every level of our architecture."

**Answer:**
> "Facilis.ai offers multiple deployment options:
>
> 1. **Private Cloud Deployment**: Your data stays within your own cloud infrastructure (AWS, Azure, or GCP). We never see your actual data.
>
> 2. **On-Premise Option**: For the most sensitive environments, we can deploy entirely within your data center.
>
> 3. **Role-Based Access Control**: You define who can access which data sets. Trading data visible only to Treasury, production data to Operations, etc.
>
> 4. **Audit Logging**: Every query is logged with user attribution for compliance.
>
> 5. **Encryption**: All data is encrypted at rest (AES-256) and in transit (TLS 1.3).
>
> We're SOC 2 Type II certified and can work with your information security team during a pilot to address specific requirements."

**Evidence:**
> "We work with other industrial companies handling similarly sensitive data - including commodity traders and manufacturers with proprietary processes."

---

## Objection 2: "We already have Power BI/Tableau dashboards - how is this different?"

### Why They Ask This
Aurubis likely has existing BI infrastructure. IT may see this as redundant tooling.

### Response

**Acknowledge:**
> "You're right that you have strong BI capabilities already. Power BI and Tableau are excellent for structured reporting and visualizations you've defined in advance."

**Answer:**
> "Facilis.ai solves a different problem - the ad-hoc questions that arise every day that no one anticipated when building dashboards:
>
> - 'What if copper drops 15% AND treatment charges fall 20% at the same time?'
> - 'Which of our suppliers had quality issues in Q3 and are located in countries with rising political risk?'
> - 'Compare our emissions intensity to industry peers and identify the gap to best-in-class'
>
> These questions require combining data across multiple systems, applying conditional logic, and explaining the reasoning - not just showing a chart.
>
> **Facilis.ai complements your BI stack rather than replacing it:**
> - Use Power BI for standardized weekly/monthly reports
> - Use Facilis.ai for exploration, scenario analysis, and answering new questions
>
> In fact, insights discovered through Facilis.ai often become new dashboards in your BI tools."

**Evidence:**
> "Many of our customers use Facilis alongside existing BI - they find that executives and analysts use Facilis for quick answers, then build formal dashboards for recurring insights."

---

## Objection 3: "Implementation sounds complex - we're already running an SAP S/4HANA migration"

### Why They Ask This
Our research shows Aurubis has a major SAP migration project in progress (€35M budget). They're likely experiencing change fatigue.

### Response

**Acknowledge:**
> "I understand - an SAP S/4HANA migration is a major undertaking, and the last thing you need is another complex integration project competing for IT resources."

**Answer:**
> "Here's why Facilis.ai is different:
>
> 1. **Read-Only Integration**: We connect to your existing data sources without modifying them. No schema changes, no new ETL pipelines to maintain.
>
> 2. **Quick Start**: Typical pilot setup takes 2-3 weeks, not months. We can connect to your existing data warehouse or even work with Excel exports initially.
>
> 3. **Minimal IT Burden**: After initial setup, business users manage their own queries. IT doesn't need to build new reports.
>
> 4. **SAP Compatible**: Once your S/4HANA is live, we connect directly to it. Many of our customers use SAP as a primary data source.
>
> We often suggest starting with data that's already consolidated - perhaps your commodity positions spreadsheet or production summary reports. Prove value first, then expand."

**Evidence:**
> "We've deployed pilots at companies mid-ERP migration. The pilot actually helps them validate their new data architecture by testing whether insights work before full go-live."

---

## Objection 4: "Our analysts already know how to use Excel and SQL - why do they need this?"

### Why They Ask This
Technical teams may feel threatened or skeptical that natural language can match their expertise.

### Response

**Acknowledge:**
> "Your analysts are experts - they understand your data and business deeply. Facilis.ai isn't meant to replace that expertise."

**Answer:**
> "Think of Facilis.ai as a force multiplier for your best analysts:
>
> 1. **Speed**: Your analyst might take 4 hours to build a complex scenario model in Excel. Facilis can do the initial analysis in minutes, freeing your analyst to focus on interpretation and strategy.
>
> 2. **Access**: Not everyone who needs insights has SQL skills. A procurement manager can ask questions without waiting for an analyst to build a query.
>
> 3. **Documentation**: Every analysis is automatically documented and reproducible. No more 'only Hans knows how that spreadsheet works.'
>
> 4. **Exploration**: Analysts often have to prioritize which analyses to do. Facilis lets them explore more hypotheses quickly, then deep-dive on the promising ones.
>
> Your Excel experts will still be essential - for validating results, building complex models, and interpreting strategic implications. They just get a powerful assistant."

**Evidence:**
> "In our experience, the best analysts become power users. They find Facilis helps them do more impactful work because they're not stuck doing repetitive data pulls."

---

## Objection 5: "How accurate are the AI-generated insights? Can we trust them for trading decisions?"

### Why They Ask This
Aurubis's commodity trading has direct P&L impact. Errors are costly. "Hallucination" concerns are valid.

### Response

**Acknowledge:**
> "This is exactly the right question to ask. For trading and operational decisions, accuracy isn't negotiable. We share that concern completely."

**Answer:**
> "Facilis.ai is designed for accuracy in enterprise contexts:
>
> 1. **Grounded in Your Data**: Unlike general AI chatbots, Facilis only answers based on data you've connected. It can't 'make up' copper prices - it reads them from your systems.
>
> 2. **Show Your Work**: Every answer includes the data sources and calculations used. Your team can verify the reasoning, not just trust the output.
>
> 3. **Confidence Indicators**: When data is incomplete or uncertain, Facilis flags it. It says 'Based on available data through December 1...' rather than pretending to know more than it does.
>
> 4. **Human in the Loop**: We recommend using Facilis for analysis acceleration, not autonomous decision-making. Your traders review and approve before acting.
>
> 5. **Validation Period**: During pilot, we compare Facilis outputs against your existing reports. If there's a discrepancy, we investigate together.
>
> For high-stakes decisions like hedging or capital allocation, Facilis provides the analysis; your experts make the call."

**Evidence:**
> "We can show validation reports from our pilot comparing Facilis calculations to your existing spreadsheet models. Accuracy is verifiable."

---

## Bonus Objections (Quick Responses)

### "What's the cost?"

> "Pricing scales with data volume and users. For a pilot with 10-20 users focused on 2-3 use cases, typical investment is €X-Y per month. Happy to provide detailed pricing after we scope the pilot."

### "How long until we see value?"

> "Most pilots demonstrate value within 4-6 weeks. The first 'aha moment' usually comes in week 2 when someone gets an answer in 5 minutes that previously took a day."

### "Who else in our industry uses this?"

> "While I can't name specific customers without permission, we work with multiple industrial companies in metals, mining, and manufacturing. Happy to arrange a reference call with a relevant customer."

### "What happens if the AI is wrong and we act on it?"

> "The same governance applies as any analytical tool - human review and approval. We recommend treating Facilis outputs as analyst recommendations, not automated decisions. Your existing controls remain in place."

### "Can we customize it for metallurgical terminology?"

> "Absolutely. During onboarding, we configure Facilis to understand your specific vocabulary - recovery rates, TC/RC, cathode grades, etc. It learns your terminology."

---

## Questions to Ask Them

Turn objection handling into discovery:

1. "What data sources are most critical for your trading decisions today?"
2. "How long does it typically take to compile your monthly sustainability report?"
3. "If you could get instant answers to any question about your operations, what would you ask first?"
4. "What's the biggest frustration your analysts have with current tools?"
5. "How do you currently monitor supplier risk across your global supply chain?"

These questions help tailor the demo and identify the highest-value use case for a pilot.
