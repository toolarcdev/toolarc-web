import csv
import re
from collections import defaultdict
from datetime import datetime, date, timedelta

path = r"c:\Users\mmura\Downloads\usage-events-2026-06-08 (1).csv"

rows = []
with open(path, newline="", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    for r in reader:
        rows.append(r)

print("Total rows:", len(rows))

dates = []
for r in rows:
    dt_str = r["Date"].strip('"')
    if dt_str:
        dt = datetime.fromisoformat(dt_str.replace("Z", "+00:00"))
        dates.append(dt)

min_dt = min(dates)
max_dt = max(dates)
print("Date range:", min_dt.date(), "to", max_dt.date(), "(UTC)")

kind_counts = defaultdict(int)
for r in rows:
    kind_counts[r["Kind"]] += 1
print("\n=== Kind breakdown ===")
for k, v in sorted(kind_counts.items(), key=lambda x: -x[1]):
    print(" ", k + ":", v)


def parse_int(s):
    s = (s or "").strip()
    if not s:
        return 0
    try:
        return int(s)
    except ValueError:
        return 0


total_tokens = sum(parse_int(r["Total Tokens"]) for r in rows)
print("\nTotal tokens (all rows):", f"{total_tokens:,}")

cost_numeric = []
cost_included = 0
cost_free = 0
cost_other_text = defaultdict(int)
for r in rows:
    c = (r["Cost"] or "").strip()
    if c.startswith("$") or re.match(r"^[\d.]+$", c):
        try:
            val = float(c.replace("$", "").replace(",", ""))
            cost_numeric.append(val)
        except ValueError:
            cost_other_text[c] += 1
    elif c.lower() == "included":
        cost_included += 1
    elif c.lower() == "free":
        cost_free += 1
    else:
        cost_other_text[c] += 1

print("\n=== Cost column ===")
print(" Numeric cost rows:", len(cost_numeric), "sum: $", round(sum(cost_numeric), 4), sep="")
print(" Included label:", cost_included)
print(" Free label:", cost_free)
if cost_other_text:
    print(" Other cost values:")
    for k, v in sorted(cost_other_text.items(), key=lambda x: -x[1]):
        print("  ", repr(k) + ":", v)

model_stats = defaultdict(lambda: {"events": 0, "tokens": 0, "cost": 0.0, "cost_rows": 0})
for r in rows:
    m = r["Model"] or "(empty)"
    model_stats[m]["events"] += 1
    model_stats[m]["tokens"] += parse_int(r["Total Tokens"])
    c = (r["Cost"] or "").strip()
    if c.startswith("$") or re.match(r"^[\d.]+$", c):
        try:
            val = float(c.replace("$", "").replace(",", ""))
            model_stats[m]["cost"] += val
            model_stats[m]["cost_rows"] += 1
        except ValueError:
            pass

print("\n=== Model breakdown ===")
for m, s in sorted(model_stats.items(), key=lambda x: -x[1]["tokens"]):
    print(
        " ",
        m + ":",
        "events=" + str(s["events"]) + ",",
        "tokens=" + f"{s['tokens']:,}" + ",",
        "numeric_cost=$" + f"{s['cost']:.4f}",
        "(" + str(s["cost_rows"]) + " rows)",
    )

daily = defaultdict(lambda: {"tokens": 0, "events": 0, "cost": 0.0})
for r in rows:
    dt_str = r["Date"].strip('"')
    d = datetime.fromisoformat(dt_str.replace("Z", "+00:00")).date()
    daily[d]["tokens"] += parse_int(r["Total Tokens"])
    daily[d]["events"] += 1
    c = (r["Cost"] or "").strip()
    if c.startswith("$") or re.match(r"^[\d.]+$", c):
        try:
            daily[d]["cost"] += float(c.replace("$", "").replace(",", ""))
        except ValueError:
            pass

print("\n=== Daily usage (May 20 - Jun 8) ===")
start = date(2026, 5, 20)
end = date(2026, 6, 8)
d = start
while d <= end:
    if d in daily:
        print(
            " ",
            d,
            "events=" + str(daily[d]["events"]) + ",",
            "tokens=" + f"{daily[d]['tokens']:,}" + ",",
            "cost=$" + f"{daily[d]['cost']:.4f}",
        )
    else:
        print(" ", d, "(no data)")
    d += timedelta(days=1)


def classify_pool(model):
    m = (model or "").lower()
    if m == "auto":
        return "Auto+Composer"
    if "composer" in m:
        return "Auto+Composer"
    return "API"


cycle_start = date(2026, 5, 22)
cycle_end = date(2026, 6, 8)
cycle_rows = []
for r in rows:
    dt_str = r["Date"].strip('"')
    d = datetime.fromisoformat(dt_str.replace("Z", "+00:00")).date()
    if cycle_start <= d <= cycle_end:
        cycle_rows.append(r)

print("\n=== Current billing cycle", cycle_start, "to", cycle_end, "===")
print(" Rows:", len(cycle_rows))

pool_stats = defaultdict(lambda: {"events": 0, "tokens": 0})
for r in cycle_rows:
    pool = classify_pool(r["Model"])
    pool_stats[pool]["events"] += 1
    pool_stats[pool]["tokens"] += parse_int(r["Total Tokens"])

print(" Pool breakdown:")
for p, s in sorted(pool_stats.items()):
    print("  ", p + ":", "events=" + str(s["events"]) + ",", "tokens=" + f"{s['tokens']:,}")

cycle_kind = defaultdict(int)
for r in cycle_rows:
    cycle_kind[r["Kind"]] += 1
print(" Kind in cycle:")
for k, v in sorted(cycle_kind.items(), key=lambda x: -x[1]):
    print("  ", k + ":", v)

cycle_days = (cycle_end - cycle_start).days + 1
days_remaining = 14
print(" Days elapsed in cycle:", cycle_days)
print(" Days remaining to Jun 22:", days_remaining)

cycle_tokens = sum(parse_int(r["Total Tokens"]) for r in cycle_rows)
cycle_daily_tokens = cycle_tokens / cycle_days
print(" Cycle total tokens:", f"{cycle_tokens:,}")
print(" Avg daily tokens (cycle):", f"{cycle_daily_tokens:,.0f}")

jun8 = date(2026, 6, 8)
jun8_tokens = daily[jun8]["tokens"] if jun8 in daily else 0
jun8_events = daily[jun8]["events"] if jun8 in daily else 0
pre_jun8_rows = [
    r
    for r in cycle_rows
    if datetime.fromisoformat(r["Date"].strip('"').replace("Z", "+00:00")).date() < jun8
]
pre_jun8_days = (jun8 - cycle_start).days
pre_jun8_tokens = sum(parse_int(r["Total Tokens"]) for r in pre_jun8_rows)
pre_jun8_daily = pre_jun8_tokens / pre_jun8_days if pre_jun8_days > 0 else 0

print("\n=== Burst analysis ===")
print(" Jun 8:", jun8_events, "events,", f"{jun8_tokens:,}", "tokens")
print(
    " May 22-Jun 7 (" + str(pre_jun8_days) + " days):",
    f"{pre_jun8_tokens:,}",
    "tokens, avg",
    f"{pre_jun8_daily:,.0f}/day",
)
if pre_jun8_daily:
    print(" Jun 8 vs prior avg:", f"{jun8_tokens / pre_jun8_daily:.1f}x")

for p in ["Auto+Composer", "API"]:
    p_jun8 = sum(
        parse_int(r["Total Tokens"])
        for r in cycle_rows
        if datetime.fromisoformat(r["Date"].strip('"').replace("Z", "+00:00")).date() == jun8
        and classify_pool(r["Model"]) == p
    )
    p_pre = sum(parse_int(r["Total Tokens"]) for r in pre_jun8_rows if classify_pool(r["Model"]) == p)
    p_pre_daily = p_pre / pre_jun8_days if pre_jun8_days > 0 else 0
    print(" ", p, "Jun 8:", f"{p_jun8:,}", "tokens; pre-Jun8 avg/day:", f"{p_pre_daily:,.0f}")

total_cycle_days = cycle_days + days_remaining
print("\n=== Linear projections (tokens) ===")
print(" At cycle avg rate full cycle:", f"{cycle_daily_tokens * total_cycle_days:,.0f}")
print(
    " At pre-Jun8 rate for remaining 14d:",
    f"{pre_jun8_tokens + jun8_tokens + pre_jun8_daily * days_remaining:,.0f}",
)
print(
    " At Jun8 burst rate for remaining 14d:",
    f"{cycle_tokens + jun8_tokens * days_remaining:,.0f}",
)

screenshot_auto_pct = 40
screenshot_api_pct = 63
screenshot_total_pct = 45

auto_tokens = pool_stats["Auto+Composer"]["tokens"]
api_tokens = pool_stats["API"]["tokens"]
auto_daily_cycle = auto_tokens / cycle_days
api_daily_cycle = api_tokens / cycle_days

est_auto_pool = auto_tokens / (screenshot_auto_pct / 100)
est_api_pool = api_tokens / (screenshot_api_pct / 100)

auto_pre = sum(
    parse_int(r["Total Tokens"])
    for r in pre_jun8_rows
    if classify_pool(r["Model"]) == "Auto+Composer"
)
api_pre = sum(parse_int(r["Total Tokens"]) for r in pre_jun8_rows if classify_pool(r["Model"]) == "API")
auto_pre_daily = auto_pre / pre_jun8_days if pre_jun8_days else 0
api_pre_daily = api_pre / pre_jun8_days if pre_jun8_days else 0

auto_jun8 = sum(
    parse_int(r["Total Tokens"])
    for r in cycle_rows
    if datetime.fromisoformat(r["Date"].strip('"').replace("Z", "+00:00")).date() == jun8
    and classify_pool(r["Model"]) == "Auto+Composer"
)
api_jun8 = sum(
    parse_int(r["Total Tokens"])
    for r in cycle_rows
    if datetime.fromisoformat(r["Date"].strip('"').replace("Z", "+00:00")).date() == jun8
    and classify_pool(r["Model"]) == "API"
)

print("\n=== Pool overflow projection (screenshot % as Jun 8 baseline) ===")
print(" Auto+Composer tokens to date:", f"{auto_tokens:,}")
print(" API tokens to date:", f"{api_tokens:,}")
print(" Est Auto pool (from 40%):", f"{est_auto_pool:,.0f}")
print(" Est API pool (from 63%):", f"{est_api_pool:,.0f}")

proj_auto_cycle_avg = (auto_tokens + auto_daily_cycle * days_remaining) / est_auto_pool * 100
proj_api_cycle_avg = (api_tokens + api_daily_cycle * days_remaining) / est_api_pool * 100
proj_auto_pre = (auto_tokens + auto_pre_daily * days_remaining) / est_auto_pool * 100
proj_api_pre = (api_tokens + api_pre_daily * days_remaining) / est_api_pool * 100
proj_auto_burst = (auto_tokens + auto_jun8 * days_remaining) / est_auto_pool * 100
proj_api_burst = (api_tokens + api_jun8 * days_remaining) / est_api_pool * 100

print(" Projected Auto at Jun 22 (cycle avg rate):", f"{proj_auto_cycle_avg:.1f}%")
print(" Projected API at Jun 22 (cycle avg rate):", f"{proj_api_cycle_avg:.1f}%")
print(" Projected Auto at Jun 22 (pre-Jun8 daily rate):", f"{proj_auto_pre:.1f}%")
print(" Projected API at Jun 22 (pre-Jun8 daily rate):", f"{proj_api_pre:.1f}%")
print(" Projected Auto at Jun 22 (Jun8 burst rate):", f"{proj_auto_burst:.1f}%")
print(" Projected API at Jun 22 (Jun8 burst rate):", f"{proj_api_burst:.1f}%")

# Total usage projection
est_total_pool = cycle_tokens / (screenshot_total_pct / 100)
proj_total_cycle = (cycle_tokens + cycle_daily_tokens * days_remaining) / est_total_pool * 100
proj_total_pre = (cycle_tokens + pre_jun8_daily * days_remaining) / est_total_pool * 100
proj_total_burst = (cycle_tokens + jun8_tokens * days_remaining) / est_total_pool * 100
print("\n Total usage projection:")
print(" Est total pool (from 45%):", f"{est_total_pool:,.0f}")
print(" Projected Total at Jun 22 (cycle avg):", f"{proj_total_cycle:.1f}%")
print(" Projected Total at Jun 22 (pre-Jun8 rate):", f"{proj_total_pre:.1f}%")
print(" Projected Total at Jun 22 (Jun8 burst):", f"{proj_total_burst:.1f}%")

# On-Demand
od = [r for r in rows if "Demand" in r["Kind"] or "On-Demand" in r["Kind"]]
print("\nOn-Demand rows:", len(od))
for r in od:
    print(" ", r["Date"][:10], r["Kind"], r["Model"], "cost=" + r["Cost"])

# Model detail in cycle
print("\n=== Cycle model detail ===")
cycle_model = defaultdict(lambda: {"events": 0, "tokens": 0})
for r in cycle_rows:
    m = r["Model"]
    cycle_model[m]["events"] += 1
    cycle_model[m]["tokens"] += parse_int(r["Total Tokens"])
for m, s in sorted(cycle_model.items(), key=lambda x: -x[1]["tokens"]):
    print(" ", m + ":", "events=" + str(s["events"]) + ",", "tokens=" + f"{s['tokens']:,}")

print("\nUnique models:", sorted(set(r["Model"] for r in rows)))
print("Unique kinds:", sorted(set(r["Kind"] for r in rows)))

# Weekly summary
print("\n=== Weekly token totals ===")
weeks = defaultdict(int)
for r in cycle_rows:
    d = datetime.fromisoformat(r["Date"].strip('"').replace("Z", "+00:00")).date()
    week_start = d - timedelta(days=d.weekday())
    weeks[week_start] += parse_int(r["Total Tokens"])
for w in sorted(weeks):
    print(" ", w, "week:", f"{weeks[w]:,}")
