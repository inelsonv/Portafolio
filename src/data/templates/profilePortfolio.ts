import { RepositoryTemplate } from '../../types/repository';

export const profilePortfolioTemplate: RepositoryTemplate = {
  id: 'profile-portfolio',
  title: 'Data Engineer GitHub Profile & Portfolio README',
  slug: 'github-data-engineer-profile-readme',
  subtitle: 'Special <username>/<username> Repository with Badges, Architecture & Case Studies',
  summary: 'The holy grail GitHub Profile README for Data Engineers: dynamic tech stack badges, system architecture ASCII diagrams, quantified business impact case studies, and engineering philosophy.',
  difficulty: 'Beginner',
  techStack: {
    orchestrator: 'Apache Airflow',
    engine: 'Apache Spark (PySpark)',
    storage: 'Apache Iceberg',
    ingestion: 'Apache Kafka',
    quality: 'Great Expectations',
    cloud: 'AWS',
  },
  githubTopics: [
    'data-engineer',
    'github-profile',
    'portfolio',
    'data-architecture',
    'apache-spark',
    'dbt',
    'airflow',
    'kafka',
  ],
  metrics: {
    throughput: 'Profile views & recruiter conversion',
    latency: 'Instant impression in 5 seconds',
    sla: '100% showcased competencies',
    testCoverage: 'Live CI badges & case study evidence',
  },
  stages: [
    {
      id: 'profile-header',
      label: 'Hero Profile Lockup',
      category: 'source',
      description: 'Senior Data Engineer introduction, core tech stack badges, and specialty focus (Lakehouse & Streaming).',
      filePath: 'README.md',
    },
    {
      id: 'stack-matrix',
      label: 'Data Stack Matrix',
      category: 'bronze',
      description: 'Categorized badges across Orchestration, Distributed Processing, Storage & Warehouse, and Data Quality.',
      filePath: 'README.md',
    },
    {
      id: 'arch-blueprints',
      label: 'System Architecture Blueprint',
      category: 'silver',
      description: 'Clean ASCII diagrams demonstrating deep understanding of Medallion Lakehouses and Real-Time Event Streaming.',
      filePath: 'README.md',
    },
    {
      id: 'case-studies',
      label: 'Production Case Studies',
      category: 'gold',
      description: 'Quantified outcomes: 80% query latency reduction, $120k/yr AWS cost savings, zero data contract regressions.',
      filePath: 'README.md',
    },
  ],
  files: [
    {
      path: 'README.md',
      name: 'README.md',
      language: 'markdown',
      category: 'docs',
      description: 'Complete GitHub Profile README designed for the special username/username repository.',
      content: `# Hi there, I'm a Data & Analytics Engineer 👋

\`\`\`
   ____        _          _____             _                     
  |  _ \\  __ _| |_ __ _  | ____|_ __   __ _(_)_ __   ___  ___ _ __ 
  | | | |/ _\` | __/ _\` | |  _| | '_ \\ / _\` | | '_ \\ / _ \\/ _ \\ '__|
  | |_| | (_| | || (_| | | |___| | | | (_| | | | | |  __/  __/ |   
  |____/ \\__,_|\\__\\__,_| |_____|_| |_|\\__, |_|_| |_|\\___|\\___|_|   
                                      |___/                        
\`\`\`

> Building fault-tolerant, high-throughput distributed data pipelines, lakehouses, and analytics systems. Passionate about data contracts, idempotency, and automated data quality.

---

## 🛠️ Data Engineering Tech Stack

### 🚀 Distributed Processing & Streaming
![Apache Spark](https://img.shields.io/badge/Apache_Spark-E25A1C?style=for-the-badge&logo=apachespark&logoColor=white)
![Apache Kafka](https://img.shields.io/badge/Apache_Kafka-231F20?style=for-the-badge&logo=apachekafka&logoColor=white)
![Apache Flink](https://img.shields.io/badge/Apache_Flink-E6526F?style=for-the-badge&logo=apacheflink&logoColor=white)
![DuckDB](https://img.shields.io/badge/DuckDB-FFF000?style=for-the-badge&logo=duckdb&logoColor=black)
![Polars](https://img.shields.io/badge/Polars-CD792C?style=for-the-badge&logo=polars&logoColor=white)

### 🏛️ Lakehouse, Storage & Warehousing
![Apache Iceberg](https://img.shields.io/badge/Apache_Iceberg-008080?style=for-the-badge&logoColor=white)
![Delta Lake](https://img.shields.io/badge/Delta_Lake-00ADD8?style=for-the-badge&logo=delta&logoColor=white)
![Snowflake](https://img.shields.io/badge/Snowflake-29B5E8?style=for-the-badge&logo=snowflake&logoColor=white)
![Google BigQuery](https://img.shields.io/badge/BigQuery-669DF6?style=for-the-badge&logo=googlebigquery&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

### ⚙️ Orchestration & Modeling
![Apache Airflow](https://img.shields.io/badge/Apache_Airflow-017CEE?style=for-the-badge&logo=apacheairflow&logoColor=white)
![dbt](https://img.shields.io/badge/dbt-FF694B?style=for-the-badge&logo=dbt&logoColor=white)
![Dagster](https://img.shields.io/badge/Dagster-252B3B?style=for-the-badge&logo=dagster&logoColor=white)

### 🛡️ Quality, DevOps & Infrastructure
![Great Expectations](https://img.shields.io/badge/Great_Expectations-FF6B6B?style=for-the-badge&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Terraform](https://img.shields.io/badge/Terraform-7B42BC?style=for-the-badge&logo=terraform&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)

---

## 🏗️ Reference System Architecture

Here is the blueprint pattern I leverage for modern streaming lakehouses:

\`\`\`
+-----------------------+      +---------------------+      +-------------------------------+
| Transaction Sources   | ---> |  Apache Kafka       | ---> | PySpark Structured Streaming  |
| (Microservices & CDC) |      | (Idempotent Topics) |      | (Watermarking & Deduplication)|
+-----------------------+      +---------------------+      +---------------+---------------+
                                                                            |
                                        +-----------------------------------+-----------------------------------+
                                        |                                   |                                   |
                                        v                                   v                                   v
                           +-------------------------+         +-------------------------+         +-------------------------+
                           |      Bronze Layer       |         |      Silver Layer       |         |       Gold Layer        |
                           |   Raw Immutable Lake    |         | Cleansed & Deduplicated |         |   Dimensional Marts     |
                           |   Apache Iceberg        |         |  ACID Merge-on-Read     |         |   Star Schema (Kimball) |
                           +-------------------------+         +-------------------------+         +-------------------------+
                                        |                                   ^                                   |
                                        |      +---------------------+      |                                   v
                                        +----> | Great Expectations  | -----+                       +-----------------------+
                                               | Data Contracts Gate |                              | Trino / DuckDB / BI   |
                                               +---------------------+                              +-----------------------+
\`\`\`

---

## 🏆 Featured Case Studies & Repositories

### 1. [Real-Time Financial Streaming Lakehouse](https://github.com/USERNAME/realtime-kafka-spark-iceberg-lakehouse)
- **Problem**: Ingesting 12k events/sec with sub-3 second latency while avoiding duplicate records during broker retries.
- **Solution**: Built a PySpark structured streaming pipeline with 10m watermarking and Apache Iceberg ACID tables on MinIO S3.
- **Impact**: **$48k/year savings** on cloud egress and zero duplicate transactions in 6 months of stress testing.

### 2. [Enterprise SaaS Modern Data Stack with dbt Core & DuckDB](https://github.com/USERNAME/modern-data-stack-dbt-duckdb-airflow)
- **Problem**: Fragile 4-hour batch jobs with undocumented business logic and frequent billing metric discrepancies.
- **Solution**: Refactored warehouse into Kimball dimensional star schemas with automated dbt tests, Jinja macros, and Airflow orchestration.
- **Impact**: Reduced warehouse run time from **4 hours to 18 minutes** and achieved 100% test coverage on billing invariants.

---

## 📐 Data Engineering Core Principles

1. **Idempotency Over Everything**: Every pipeline stage must be safely re-runnable with deterministic results.
2. **Shift-Left Data Contracts**: Validate schema invariants at the producer and ingestion gateway, not in downstream BI dashboards.
3. **Partition & File Sizing Discipline**: Prevent small-file problems through scheduled compaction and Z-ordering.
4. **Observable by Design**: Pipelines without freshness SLAs and failure alerting are time bombs.

---

## 📬 Connect With Me
- 💼 **LinkedIn**: [linkedin.com/in/YOUR-HANDLE](https://linkedin.com)
- 🌐 **Portfolio / Blog**: [YOUR-SITE.dev](https://github.com)
- 📧 **Email**: your.email@example.com
`,
    },
    {
      path: 'github_profile_setup_instructions.md',
      name: 'github_profile_setup_instructions.md',
      language: 'markdown',
      category: 'docs',
      description: 'Step-by-step instructions on activating the GitHub Profile README feature.',
      content: `# How to activate this Data Engineer Profile README

1. Go to GitHub and click **New Repository**.
2. Name the repository with your **exact GitHub username** (e.g., \`https://github.com/johndoe/johndoe\`).
3. Set the repository visibility to **Public**.
4. Check **"Add a README file"** (or push this repository).
5. Paste this \`README.md\` content into your repository.
6. Commit and visit your GitHub profile page—your custom Data Engineer portfolio will be live!
`,
    },
  ],
};
