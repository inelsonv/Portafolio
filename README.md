# Hi, I'm Nelson Ventura 👋
### Senior Data Engineer · Lakehouse & Real-Time Data Pipelines

[![Live Website](https://img.shields.io/badge/Live%20Website-inelsonv.github.io%2FPortafolio-6366F1?style=for-the-badge&logo=googlechrome&logoColor=white)](https://inelsonv.github.io/Portafolio/)
[![Portfolio Repository](https://img.shields.io/badge/GitHub-inelsonv%2FPortafolio-2ea44f?style=for-the-badge&logo=github&logoColor=white)](https://github.com/inelsonv/Portafolio)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-iventuram-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/iventuram/)
[![Email](https://img.shields.io/badge/Email-iventuramena%40gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:iventuramena@gmail.com)

```
   ____        _          _____             _                     
  |  _ \  __ _| |_ __ _  | ____|_ __   __ _(_)_ __   ___  ___ _ __ 
  | | | |/ _` | __/ _` | |  _| | '_ \ / _` | | '_ \ / _ \/ _ \ '__|
  | |_| | (_| | || (_| | | |___| | | | (_| | | | | |  __/  __/ |   
  |____/ \__,_|\__\__,_| |_____|_| |_|\__, |_|_| |_|\___|\___|_|   
                                      |___/                        
```

> Data Engineer focused on building high-throughput data pipelines, real-time Lakehouse architectures (Kafka, Spark, Iceberg), Kimball dimensional modeling with dbt Core, and automated data quality contracts.

---

## 🛠️ Data Engineering Tech Stack

### 🚀 Distributed Processing & Streaming
![Apache Spark](https://img.shields.io/badge/Apache_Spark-E25A1C?style=for-the-badge&logo=apachespark&logoColor=white)
![Apache Kafka](https://img.shields.io/badge/Apache_Kafka-231F20?style=for-the-badge&logo=apachekafka&logoColor=white)
![DuckDB](https://img.shields.io/badge/DuckDB-FFF000?style=for-the-badge&logo=duckdb&logoColor=black)
![Polars](https://img.shields.io/badge/Polars-CD792C?style=for-the-badge&logo=polars&logoColor=white)

### 🏛️ Lakehouse & Warehousing
![Apache Iceberg](https://img.shields.io/badge/Apache_Iceberg-008080?style=for-the-badge&logoColor=white)
![Delta Lake](https://img.shields.io/badge/Delta_Lake-00ADD8?style=for-the-badge&logo=delta&logoColor=white)
![Snowflake](https://img.shields.io/badge/Snowflake-29B5E8?style=for-the-badge&logo=snowflake&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

### ⚙️ Orchestration & Modeling
![Apache Airflow](https://img.shields.io/badge/Apache_Airflow-017CEE?style=for-the-badge&logo=apacheairflow&logoColor=white)
![dbt](https://img.shields.io/badge/dbt-FF694B?style=for-the-badge&logo=dbt&logoColor=white)
![Dagster](https://img.shields.io/badge/Dagster-252B3B?style=for-the-badge&logo=dagster&logoColor=white)

### 🛡️ Quality & Infrastructure
![Great Expectations](https://img.shields.io/badge/Great_Expectations-FF6B6B?style=for-the-badge&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Terraform](https://img.shields.io/badge/Terraform-7B42BC?style=for-the-badge&logo=terraform&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)

---

## 🏗️ System Architecture Blueprint

```
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
```

---

## 🏆 Featured Repositories & Case Studies

### 1. [Real-Time Financial Streaming Lakehouse](https://github.com/inelsonv/realtime-kafka-spark-iceberg-lakehouse)
- **Problem**: 12,500 events/second payment ingestion requiring sub-3s latency without duplicate transactions.
- **Architecture**: Kafka $\rightarrow$ PySpark watermarking $\rightarrow$ Apache Iceberg on MinIO S3 $\rightarrow$ Great Expectations.
- **Impact**: Zero duplicate events, 99.98% pipeline uptime.

### 2. [Modern Data Stack with dbt Core & DuckDB](https://github.com/inelsonv/modern-data-stack-dbt-duckdb-airflow)
- **Architecture**: Kimball star schema models, Jinja macros, schema contract testing, Airflow DAG.
- **Impact**: Reduced batch run duration from 4 hours to 42 seconds with 100% test coverage.

---

## 📜 Core Data Engineering Philosophy

1. **Strict Idempotency**: Every pipeline stage must be deterministically re-runnable without duplicate records or corrupted state.
2. **Shift-Left Data Contracts**: Enforcing strict schema invariants at the ingestion gateway rather than discovering bugs downstream.
3. **ACID Lakehouse Architecture**: Clean Bronze, Silver, and Gold layering using Apache Iceberg and Delta Lake snapshot isolation.
4. **Observability & Freshness SLAs**: Continuous freshness tracking, row count checks, and automated Slack failure alerting.

---

## 📬 Contact & Connect
- 💼 **LinkedIn**: [linkedin.com/in/iventuram](https://www.linkedin.com/in/iventuram/)
- 🐙 **GitHub Profile**: [github.com/inelsonv](https://github.com/inelsonv)
- 📁 **Repository**: [github.com/inelsonv/Portafolio](https://github.com/inelsonv/Portafolio)
- 📧 **Email**: iventuramena@gmail.com
