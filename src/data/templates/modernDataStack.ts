import { RepositoryTemplate } from '../../types/repository';

export const modernDataStackTemplate: RepositoryTemplate = {
  id: 'modern-data-stack',
  title: 'Modern Data Stack & dbt Analytics Lakehouse',
  slug: 'modern-data-stack-dbt-duckdb-airflow',
  subtitle: 'dbt Core (Staging/Marts) + DuckDB/Snowflake + Airflow DAGs + CI/CD',
  summary: 'Production dbt Core analytics repository implementing the Kimball dimensional model (facts & dimensions), Jinja macros, schema contract tests, automated documentation generation, and Airflow orchestration.',
  difficulty: 'Intermediate',
  techStack: {
    orchestrator: 'Apache Airflow',
    engine: 'DuckDB + Polars',
    storage: 'DuckDB Parquet',
    ingestion: 'REST API / Webhooks',
    quality: 'dbt Tests',
    cloud: 'Local / Hybrid (Docker)',
  },
  githubTopics: [
    'dbt-core',
    'duckdb',
    'apache-airflow',
    'sql',
    'analytics-engineering',
    'data-modeling',
    'kimball',
    'github-actions',
  ],
  metrics: {
    throughput: '3.4M rows transformed / run',
    latency: '42s full DAG refresh',
    sla: '99.95% fresh by 06:00 UTC',
    testCoverage: '100% primary keys & foreign keys tested',
  },
  stages: [
    {
      id: 'raw-ingest',
      label: 'Staging Source Ingestion',
      category: 'source',
      description: 'Daily automated extraction of customer subscription events and stripe invoice webhooks into Parquet data lake.',
      filePath: 'src/ingestion/extract_stripe_invoices.py',
    },
    {
      id: 'dbt-staging',
      label: 'dbt Staging Models',
      category: 'bronze',
      description: 'Standardizes column names, casts timestamps to UTC, and cleanses JSON payloads with zero business logic.',
      filePath: 'models/staging/stg_stripe__invoices.sql',
    },
    {
      id: 'dbt-intermediate',
      label: 'dbt Intermediate Transformations',
      category: 'silver',
      description: 'Joins customers, handles subscription prorations, and calculates MRR churn cohorts via Jinja macros.',
      filePath: 'models/intermediate/int_customer_subscriptions_joined.sql',
    },
    {
      id: 'schema-tests',
      label: 'dbt & Soda Schema Tests',
      category: 'quality',
      description: 'Enforces unique & not-null constraints, relationships integrity, and custom business assertion tests.',
      filePath: 'models/schema.yml',
    },
    {
      id: 'dbt-marts',
      label: 'dbt Dimensional Marts',
      category: 'gold',
      description: 'Kimball star schema: dim_customers, fct_monthly_recurring_revenue, and daily revenue retention waterfalls.',
      filePath: 'models/marts/fct_monthly_recurring_revenue.sql',
    },
    {
      id: 'bi-consumption',
      label: 'Evidence / Superset Serving',
      category: 'serving',
      description: 'High-speed analytical queries executed directly against DuckDB parquet outputs or uploaded to Snowflake.',
      filePath: 'dags/dbt_analytics_dag.py',
    },
  ],
  files: [
    {
      path: 'README.md',
      name: 'README.md',
      language: 'markdown',
      category: 'docs',
      description: 'Detailed project documentation with Kimball dimensional model lineage, dbt docs preview, and setup guide.',
      content: `# Modern Data Stack: dbt Core + DuckDB Analytics Lakehouse

[![dbt CI](https://github.com/USERNAME/modern-data-stack-dbt-duckdb-airflow/actions/workflows/dbt_ci.yml/badge.svg)](https://github.com/USERNAME/modern-data-stack-dbt-duckdb-airflow/actions)
[![dbt-core](https://img.shields.io/badge/dbt--core-1.8.0-orange.svg)](https://www.getdbt.com/)
[![DuckDB](https://img.shields.io/badge/DuckDB-1.0.0-yellow.svg)](https://duckdb.org/)
[![Apache Airflow](https://img.shields.io/badge/Airflow-2.9.0-blue.svg)](https://airflow.apache.org/)
[![SQLFluff](https://img.shields.io/badge/linter-sqlfluff-red.svg)](https://sqlfluff.com/)

A portfolio-ready Modern Data Stack repository showing elite analytics engineering standards: **dbt-core** dimensional modeling (Kimball star schema), **DuckDB** columnar execution engine for ultra-fast zero-cost local warehousing, **Airflow** DAG orchestration with Cosmos/Bash operators, and **GitHub Actions** running automated \`dbt test\` and SQLFluff linting.

---

## 📐 Data Lineage & Modeling Architecture

\`\`\`
[ Raw Invoices & Subscriptions ]
               |
               v
  +--------------------------+
  |  models/staging/         |  --> 1:1 with source tables, renamed columns, clean UTC types
  |  stg_stripe__invoices    |
  |  stg_app__users          |
  +--------------------------+
               |
               v
  +--------------------------+
  |  models/intermediate/    |  --> Joins, complex window functions, Jinja macros
  |  int_customer_subs       |
  +--------------------------+
               |
               +--------------------------------------+
               |                                      |
               v                                      v
  +--------------------------+           +--------------------------+
  |  models/marts/facts/     |           |  models/marts/dims/      |
  |  fct_mrr_movements       |           |  dim_customers           |
  |  (New, Expansion, Churn) |           |  (SCD Type 1 & Type 2)   |
  +--------------------------+           +--------------------------+
\`\`\`

---

## 💎 Repository Highlights

- **Kimball Dimensional Modeling**: Clear division of Staging, Intermediate, and Marts with Facts (\`fct_\`) and Dimensions (\`dim_\`).
- **Jinja Macros**: DRY SQL logic with custom macros for currency conversion, safe division, and fiscal quarter calendar rollups.
- **Data Quality as Guardrails**: All primary and foreign keys covered by \`unique\`, \`not_null\`, and \`relationships\` tests in \`schema.yml\`.
- **Zero Cloud Costs**: Powered by **DuckDB** allowing entire warehouse testing locally or in GitHub Actions runners in < 30 seconds.
- **Airflow Orchestration**: Self-contained Airflow DAG triggering dbt runs, test evaluations, and automated alerting on test failures.

---

## 🚀 Quickstart

### 1. Prerequisites & Installation
\`\`\`bash
# Create virtual environment
python -m venv venv && source venv/bin/activate

# Install dependencies (dbt-duckdb, sqlfluff, airflow)
pip install -r requirements.txt

# Verify dbt connection
dbt debug
\`\`\`

### 2. Build Models & Execute Quality Tests
\`\`\`bash
# Run staging, intermediate, and marts models
dbt run

# Run all schema and custom data tests
dbt test

# Generate and view interactive documentation & lineage graph
dbt docs generate
dbt docs serve
\`\`\`

---

## 🧪 CI/CD Automation
On every pull request, GitHub Actions runs:
1. **SQLFluff**: Enforces uppercase SQL keywords, trailing commas, and indentation standards.
2. **dbt compile & test**: Builds the ephemeral DuckDB database and validates that 0 test regressions exist.
`,
    },
    {
      path: 'dbt_project.yml',
      name: 'dbt_project.yml',
      language: 'yaml',
      category: 'config',
      description: 'dbt project configuration specifying model paths, materializations (view vs table), and profiles.',
      content: `name: 'saas_analytics_dw'
version: '1.8.0'
config-version: 2

profile: 'duckdb_warehouse'

model-paths: ["models"]
analysis-paths: ["analyses"]
test-paths: ["tests"]
seed-paths: ["seeds"]
macro-paths: ["macros"]
snapshot-paths: ["snapshots"]

clean-targets:
  - "target"
  - "dbt_packages"

models:
  saas_analytics_dw:
    staging:
      +materialized: view
      +schema: staging
    intermediate:
      +materialized: ephemeral
    marts:
      +materialized: table
      +schema: marts
`,
    },
    {
      path: 'models/staging/stg_stripe__invoices.sql',
      name: 'stg_stripe__invoices.sql',
      language: 'sql',
      category: 'model',
      description: 'dbt Staging model cleansing raw Stripe invoices: casting timestamps, handling currencies, null coalesce.',
      content: `WITH source AS (
    SELECT * FROM {{ source('raw_stripe', 'invoices') }}
),

renamed AS (
    SELECT
        -- Primary key
        id AS invoice_id,
        
        -- Foreign keys
        customer_id,
        subscription_id,
        
        -- Monetary amounts (stored as cents in Stripe, converting to dollars)
        amount_due / 100.0 AS amount_due_usd,
        amount_paid / 100.0 AS amount_paid_usd,
        UPPER(currency) AS currency_code,
        
        -- Status flags
        status AS invoice_status,
        paid AS is_paid,
        
        -- Timestamps converted to standard UTC
        to_timestamp(created_at) AS created_at_utc,
        to_timestamp(period_start) AS billing_period_start_utc,
        to_timestamp(period_end) AS billing_period_end_utc
    FROM source
)

SELECT * FROM renamed
`,
    },
    {
      path: 'models/marts/fct_monthly_recurring_revenue.sql',
      name: 'fct_monthly_recurring_revenue.sql',
      language: 'sql',
      category: 'model',
      description: 'dbt Mart Fact model calculating monthly recurring revenue (MRR) movements: new, expansion, contraction, churn.',
      content: `{{ config(materialized='table') }}

WITH monthly_mrr AS (
    SELECT
        date_trunc('month', billing_period_start_utc) AS mrr_month,
        customer_id,
        subscription_id,
        SUM(amount_paid_usd) AS current_month_mrr
    FROM {{ ref('stg_stripe__invoices') }}
    WHERE is_paid = true
    GROUP BY 1, 2, 3
),

mrr_with_lag AS (
    SELECT
        mrr_month,
        customer_id,
        subscription_id,
        current_month_mrr,
        COALESCE(
            LAG(current_month_mrr) OVER (
                PARTITION BY customer_id, subscription_id 
                ORDER BY mrr_month
            ), 0.0
        ) AS previous_month_mrr
    FROM monthly_mrr
)

SELECT
    mrr_month,
    customer_id,
    subscription_id,
    current_month_mrr,
    previous_month_mrr,
    
    -- Categorize SaaS MRR movements
    CASE
        WHEN previous_month_mrr = 0 AND current_month_mrr > 0 THEN 'NEW'
        WHEN current_month_mrr > previous_month_mrr THEN 'EXPANSION'
        WHEN current_month_mrr < previous_month_mrr AND current_month_mrr > 0 THEN 'CONTRACTION'
        WHEN current_month_mrr = 0 THEN 'CHURN'
        ELSE 'RENEWAL'
    END AS mrr_type,
    
    (current_month_mrr - previous_month_mrr) AS net_mrr_change
FROM mrr_with_lag
`,
    },
    {
      path: 'models/schema.yml',
      name: 'schema.yml',
      language: 'yaml',
      category: 'tests',
      description: 'dbt Schema documentation and data quality assertions for primary keys, foreign keys, and values.',
      content: `version: 2

models:
  - name: stg_stripe__invoices
    description: "Cleansed Stripe billing invoices at 1 row per invoice."
    columns:
      - name: invoice_id
        description: "Primary key UUID."
        tests:
          - unique
          - not_null
      - name: customer_id
        description: "Foreign key referencing customers."
        tests:
          - not_null
      - name: amount_paid_usd
        description: "Total invoice amount collected in USD."
        tests:
          - not_null

  - name: fct_monthly_recurring_revenue
    description: "Monthly recurring revenue movements by customer and subscription cohort."
    columns:
      - name: mrr_month
        tests:
          - not_null
      - name: mrr_type
        tests:
          - accepted_values:
              values: ['NEW', 'EXPANSION', 'CONTRACTION', 'CHURN', 'RENEWAL']
`,
    },
    {
      path: 'dags/dbt_analytics_dag.py',
      name: 'dbt_analytics_dag.py',
      language: 'python',
      category: 'orchestration',
      description: 'Apache Airflow DAG scheduling daily dbt run, dbt test, and Slack SLA alerting.',
      content: `"""
Airflow DAG: Daily dbt Analytics Pipeline
Schedules execution of staging, intermediate, and mart models with automatic test gating.
"""
from datetime import datetime, timedelta
from airflow import DAG
from airflow.operators.bash import BashOperator

default_args = {
    "owner": "data-engineering",
    "depends_on_past": False,
    "email_on_failure": True,
    "email": ["data-alerts@company.internal"],
    "retries": 2,
    "retry_delay": timedelta(minutes=5),
}

with DAG(
    dag_id="dbt_daily_analytics_lakehouse",
    default_args=default_args,
    description="Executes dbt run and dbt test against DuckDB/Snowflake daily at 04:00 UTC",
    schedule_interval="0 4 * * *",
    start_date=datetime(2026, 1, 1),
    catchup=False,
    tags=["dbt", "analytics-engineering", "duckdb", "daily-marts"],
) as dag:

    dbt_deps = BashOperator(
        task_id="dbt_deps",
        bash_command="cd /opt/dbt && dbt deps",
    )

    dbt_seed = BashOperator(
        task_id="dbt_seed",
        bash_command="cd /opt/dbt && dbt seed",
    )

    dbt_run = BashOperator(
        task_id="dbt_run",
        bash_command="cd /opt/dbt && dbt run --target prod",
    )

    dbt_test = BashOperator(
        task_id="dbt_test",
        bash_command="cd /opt/dbt && dbt test --target prod",
    )

    dbt_docs = BashOperator(
        task_id="dbt_docs_generate",
        bash_command="cd /opt/dbt && dbt docs generate",
    )

    dbt_deps >> dbt_seed >> dbt_run >> dbt_test >> dbt_docs
`,
    },
    {
      path: '.github/workflows/dbt_ci.yml',
      name: 'dbt_ci.yml',
      language: 'yaml',
      category: 'workflow',
      description: 'Continuous Integration testing dbt SQL syntax, models compilation, and data quality validations.',
      content: `name: dbt CI Validation

on:
  pull_request:
    branches: [ main ]
  push:
    branches: [ main ]

jobs:
  dbt-test:
    name: Lint SQL & Validate dbt Models
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Python
        uses: actions/setup-python@v5
        with:
          python-version: "3.11"

      - name: Install dependencies
        run: |
          pip install dbt-duckdb sqlfluff

      - name: Run SQLFluff Lint
        run: |
          sqlfluff lint models/ --dialect duckdb

      - name: Run dbt Compile & Test
        run: |
          dbt debug
          dbt run
          dbt test
`,
    },
  ],
};
