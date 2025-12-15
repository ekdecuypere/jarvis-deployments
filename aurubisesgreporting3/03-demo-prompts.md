# Aurubis AG - Custom Demo Prompts

These prompts are ready-to-use during the demo. Each is tailored to Aurubis's specific business context and can be used with the synthetic data files provided.

---

## Prompt 1: Production Performance Analysis

**Context:** Use with `production_data.csv`

```
Analyze our copper production data across all sites for the past 6 months.
For each facility:
1. Calculate the average daily cathode output and compare to target capacity
2. Identify any sites operating below 85% capacity utilization
3. Highlight trends in precious metal recovery rates (gold, silver, PGM)
4. Flag any correlation between input material quality and output yield

Summarize the top 3 operational improvements we should prioritize for Q1.
```

**Expected Insight:** This demonstrates Facilis.ai's ability to analyze complex production data, identify patterns, and provide actionable recommendations that would normally require a data science team.

---

## Prompt 2: Commodity Hedging Scenario Analysis

**Context:** Use with `commodity_positions.csv`

```
Given our current copper inventory and forward contracts:

Scenario A: LME copper drops to $8,000/ton (from current ~$9,200)
Scenario B: LME copper rises to $10,500/ton
Scenario C: Treatment charges (TC) fall by 20% while copper stays flat

For each scenario, calculate:
- Gross margin impact across our product portfolio
- Which sites are most exposed to each scenario
- Recommended hedging adjustments to reduce downside risk while maintaining upside exposure

Compare to how similar market conditions affected us in Q4 2022.
```

**Expected Insight:** Shows real-time financial scenario modeling that typically requires complex spreadsheets and hours of analyst time.

---

## Prompt 3: Sustainability Progress Dashboard

**Context:** Use with `emissions_data.csv`

```
Create an executive summary of our sustainability performance:

1. Total Scope 1 and Scope 2 emissions YTD vs. same period last year
2. Progress toward our 2030 interim carbon reduction target (show as % complete)
3. Rank our sites by emissions intensity (CO2 per ton of copper produced)
4. Identify the 3 highest-impact decarbonization opportunities based on our hydrogen-ready furnace investments

Format this as a board-ready briefing with key metrics highlighted.
```

**Expected Insight:** Demonstrates instant ESG reporting that would otherwise require the sustainability team weeks to compile.

---

## Prompt 4: Supply Chain Risk Assessment

**Context:** Use with `supplier_data.csv`

```
Perform a supply chain risk analysis:

1. Identify our top 10 suppliers by volume and their risk scores
2. Flag any suppliers where we have >25% concentration dependency
3. Analyze quality trends - which suppliers have shown declining quality metrics in the past 3 quarters?
4. Cross-reference supplier locations with current geopolitical risk indices
5. Recommend 3 specific actions to reduce our supply chain vulnerability

Include a risk matrix visualization showing likelihood vs. impact.
```

**Expected Insight:** Shows how Facilis.ai can synthesize multiple data sources into actionable supply chain intelligence.

---

## Prompt 5: Competitive Landscape Analysis

**Context:** Live web search capability

```
Provide an updated competitive intelligence briefing on the European copper market:

1. What capacity expansions have Glencore, Boliden, and KGHM announced in the past 6 months?
2. How does our new Richmond, Georgia facility compare to competitor recycling investments in the US?
3. Identify any recent M&A activity in the copper recycling sector
4. What are analysts saying about copper demand from AI data centers and EV manufacturing through 2030?

Summarize the strategic implications for Aurubis.
```

**Expected Insight:** Demonstrates real-time competitive intelligence that would require expensive consultant reports or dedicated research staff.

---

## Prompt 6: Regulatory Compliance Check

**Context:** Use with `compliance_tracker.csv`

```
Review our regulatory compliance status across all jurisdictions:

1. Which environmental permits are expiring in the next 12 months?
2. Summarize our Copper Mark certification status by site
3. Identify any gaps in our EU Taxonomy alignment for green financing eligibility
4. What new EU regulations on battery recycling or critical raw materials are coming that will affect our operations?

Create a compliance action plan with deadlines and responsible parties.
```

**Expected Insight:** Shows how Facilis.ai can track complex regulatory requirements across multiple jurisdictions and flag upcoming compliance needs.

---

## Prompt 7: Investment ROI Analysis

**Context:** Use with `capex_projects.csv`

```
Analyze the return on our major strategic investments:

1. Richmond Plant ($800M): Project actual vs. planned ramp-up. When will we hit full 180,000t capacity? Calculate current and projected ROI.

2. Pirdop Expansion (€120M): Compare pre-investment vs. current production volumes. What's the payback period at current copper prices?

3. Hydrogen-Ready Furnaces (€40M): If we achieve 100% hydrogen utilization, what's the CO2 credit value and operational cost savings?

Rank all active CAPEX projects by risk-adjusted returns and recommend reallocation if any are underperforming.
```

**Expected Insight:** Demonstrates financial analysis capabilities that help leadership track investment performance in real-time.

---

## Quick Demo Prompts (30-Second Showcases)

### Quick 1: Instant Data Summary
```
Summarize our production output for last month in one paragraph. Include total cathodes, precious metals recovered, and any sites with notable performance.
```

### Quick 2: Price Alert
```
If copper prices drop below $8,500/ton, which of our contracts become unprofitable? List them with their margin impact.
```

### Quick 3: Peer Comparison
```
How does our emissions intensity compare to the industry average for copper smelters? Are we above or below peers?
```

### Quick 4: Document Search
```
Find all references to "hydrogen" in our sustainability reports. What commitments have we made and what's the timeline?
```

---

## Prompt Customization Notes

**For Finance Audience:** Emphasize prompts 2, 7, and Quick 2
**For Operations Audience:** Emphasize prompts 1, 4, and Quick 1
**For Sustainability Audience:** Emphasize prompts 3, 6, and Quick 3
**For Strategy/Executive:** Emphasize prompts 5, 7, and all Quick prompts

Each prompt can be adjusted on the fly based on audience reactions and questions.
