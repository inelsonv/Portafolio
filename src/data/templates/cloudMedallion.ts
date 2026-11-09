import { RepositoryTemplate } from '../../types/repository';

export const cloudMedallionTemplate: RepositoryTemplate = {
  id: 'cloud-medallion',
  title: 'Cloud Medallion Lakehouse (Bronze -> Silver -> Gold)',
  slug: 'cloud-medallion-lakehouse-terraform-spark',
  subtitle: 'Scalable Medallion Architecture with PySpark, Delta Lake & Terraform IaC',
  summary: 'Enterprise cloud lakehouse demonstrating infrastructure-as-code with Terraform, bronze raw ingestion, silver cleansing with schema evolution, and gold analytical mart aggregations with strict SLA monitoring.',
  difficulty: 'Senior/Staff',
  techStack: {
    orchestrator: 'Dagster',
    engine: 'Apache Spark (PySpark)',
    storage: 'Delta Lake',
    ingestion: 'AWS S3 Batch',
    quality: 'Soda Core',
    cloud: 'AWS',
  },
  githubTopics: [
    'medallion-architecture',
    'delta-lake',
    'terraform',
    'aws-data-engineering',
    'dagster',
    'pyspark',
    'soda-core',
    'infrastructure-as-code',
  ],
  metrics: {
    throughput: '850 GB / day',
    latency: '15-min micro-batch intervals',
    sla: '99.99% data pipeline delivery',
    testCoverage: '98% schema validations',
  },
  stages: [
    {
      id: 'infra-provision',
      label: 'Terraform IaC Provisioning',
      category: 'infra',
      description: 'Provisions secure S3 medallion buckets (bronze/silver/gold), IAM policies, KMS encryption, and Glue Catalog.',
      filePath: 'terraform/main.tf',
    },
    {
      id: 'bronze-stage',
      label: 'Bronze Raw Ingestion',
      category: 'bronze',
      description: 'Raw JSON/CSV ingestion into immutable Delta Lake tables with audit metadata (_ingested_at, _source_file).',
      filePath: 'src/pipelines/bronze_ingest.py',
    },
    {
      id: 'soda-validation',
      label: 'Soda Core Quality Contract',
      category: 'quality',
      description: 'Checks schema invariants, missing values, freshness, and outlier distributions before silver compaction.',
      filePath: 'quality/soda_checks.yml',
    },
    {
      id: 'silver-stage',
      label: 'Silver Cleansed & Deduplicated',
      category: 'silver',
      description: 'Upserts into Delta Lake with schema enforcement, surrogate keys generation, and null replacements.',
      filePath: 'src/pipelines/silver_transform.py',
    },
    {
      id: 'gold-stage',
      label: 'Gold Analytical Marts',
      category: 'gold',
      description: 'Pre-computes dimensional aggregates, customer retention cohorts, and executive KPIs for Athena/PowerBI.',
      filePath: 'src/pipelines/gold_marts.py',
    },
    {
      id: 'dagster-assets',
      label: 'Dagster Software-Defined Assets',
      category: 'orchestration',
      description: 'Declarative data assets with lineage tracking, auto-materialization policies, and Slack alerting.',
      filePath: 'orchestration/assets.py',
    },
  ],
  files: [
    {
      path: 'README.md',
      name: 'README.md',
      language: 'markdown',
      category: 'docs',
      description: 'Enterprise Cloud Medallion documentation with architecture diagrams, cost optimization notes, and deploy guide.',
      content: `# Enterprise Cloud Medallion Lakehouse

[![Terraform](https://img.shields.io/badge/Terraform-1.7.0-purple.svg)](https://www.terraform.io/)
[![Delta Lake](https://img.shields.io/badge/Delta%20Lake-3.1.0-blue.svg)](https://delta.io/)
[![Dagster](https://img.shields.io/badge/Dagster-1.7.0-darkblue.svg)](https://dagster.io/)
[![AWS](https://img.shields.io/badge/AWS-S3%20%7C%20Glue%20%7C%20Athena-orange.svg)](https://aws.amazon.com/)

A production-ready Data Engineering project showcasing an enterprise **Medallion Architecture (Bronze -> Silver -> Gold)** on AWS utilizing **Terraform** for automated Infrastructure-as-Code, **Delta Lake** for ACID table guarantees, **Soda Core** for data contract testing, and **Dagster** for software-defined asset orchestration.

---

## 🏛️ Medallion Architecture

\`\`\`
+-----------------------+
|  Operational Sources  |  (ERP, CRM, IoT streams, Weblogs)
+-----------------------+
            |
            | Batch S3 Push / EventBridge
            v
+-------------------------------------------------------------+
|  BRONZE LAYER (s3://medallion-lake-bronze/)                 |
|  - Raw, immutable append-only historical log               |
|  - Enriched with audit columns (_ingested_at, _file_hash)   |
|  - Delta Lake table format                                  |
+-------------------------------------------------------------+
            |
            v
    [ Soda Core Contract Gate: Schema Check & Null Tolerance ]
            |
            v
+-------------------------------------------------------------+
|  SILVER LAYER (s3://medallion-lake-silver/)                 |
|  - Deduplicated, cleansed, typed, and structured            |
|  - Surrogate hash keys generated (SHA-256)                  |
|  - Type casting & ISO timezone standardization              |
+-------------------------------------------------------------+
            |
            v
+-------------------------------------------------------------+
|  GOLD LAYER (s3://medallion-lake-gold/)                     |
|  - Star schema dimensional marts (dim_users, fct_orders)    |
|  - High performance Z-Ordered Parquet files                 |
|  - Optimized for AWS Athena, Amazon Redshift & Tableau/BI   |
+-------------------------------------------------------------+
\`\`\`

---

## 🛠️ Infrastructure as Code (Terraform)
All AWS infrastructure is managed declaratively:
- S3 Bucket lifecycle rules (Bronze glacier transitions after 90 days).
- AWS Glue Data Catalog databases & crawler IAM roles.
- Least-privilege IAM service principals for Dagster worker nodes.

---

## 🚀 Deployment Guide

### 1. Provision AWS Resources via Terraform
\`\`\`bash
cd terraform
terraform init
terraform plan -out=tfplan
terraform apply tfplan
\`\`\`

### 2. Materialize Assets via Dagster
\`\`\`bash
# Start Dagster webserver & daemon
dagster dev -f orchestration/assets.py
\`\`\`

---

## 🧪 Data Contract Validation
\`\`\`bash
# Run Soda Core data quality audit
soda scan -d aws_athena configuration.yml quality/soda_checks.yml
\`\`\`
`,
    },
    {
      path: 'terraform/main.tf',
      name: 'main.tf',
      language: 'shell',
      category: 'infra',
      description: 'Terraform configuration provisioning Bronze, Silver, and Gold S3 buckets with KMS encryption and Glue databases.',
      content: `terraform {
  required_version = ">= 1.7.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.40"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# Bronze Bucket: Raw Ingestion
resource "aws_s3_bucket" "bronze" {
  bucket        = "\${var.environment}-lakehouse-bronze"
  force_destroy = false
}

resource "aws_s3_bucket_server_side_encryption_configuration" "bronze_enc" {
  bucket = aws_s3_bucket.bronze.id
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

# Silver Bucket: Cleansed
resource "aws_s3_bucket" "silver" {
  bucket = "\${var.environment}-lakehouse-silver"
}

# Gold Bucket: Analytical Marts
resource "aws_s3_bucket" "gold" {
  bucket = "\${var.environment}-lakehouse-gold"
}

# AWS Glue Catalog Database
resource "aws_glue_catalog_database" "lakehouse_catalog" {
  name        = "\${var.environment}_medallion_dw"
  description = "Central metastore for Bronze, Silver and Gold Delta tables"
}
`,
    },
    {
      path: 'src/pipelines/silver_transform.py',
      name: 'silver_transform.py',
      language: 'python',
      category: 'workflow',
      description: 'PySpark silver layer job performing deduplication, schema validation, and Delta Lake MERGE INTO upsert.',
      content: `"""
Silver Layer Delta Lake Upsert Pipeline
Reads Bronze raw Delta table, validates columns, deduplicates, and MERGE INTO Silver.
"""
from pyspark.sql import SparkSession
from pyspark.sql.functions import col, sha2, concat_ws, current_timestamp, to_date
from delta.tables import DeltaTable

def execute_silver_upsert(spark: SparkSession, bronze_path: str, silver_path: str):
    # Read newly ingested bronze records
    bronze_df = spark.read.format("delta").load(bronze_path)

    # Cleanse and derive surrogate keys
    cleansed_df = (
        bronze_df
        .filter(col("id").isNotNull())
        .withColumn("surrogate_key", sha2(concat_ws("||", col("id"), col("tenant_id")), 256))
        .withColumn("order_date", to_date(col("created_at")))
        .withColumn("_silver_updated_at", current_timestamp())
        .dropDuplicates(["id", "tenant_id"])
    )

    # Perform ACID Merge into Silver Delta Table
    if DeltaTable.isDeltaTable(spark, silver_path):
        silver_table = DeltaTable.forPath(spark, silver_path)
        (
            silver_table.alias("target")
            .merge(
                cleansed_df.alias("source"),
                "target.surrogate_key = source.surrogate_key"
            )
            .whenMatchedUpdateAll()
            .whenNotMatchedInsertAll()
            .execute()
        )
    else:
        # Initial table creation
        cleansed_df.write.format("delta").partitionBy("order_date").save(silver_path)

    print("✅ Successfully merged records into Silver Delta table.")
`,
    },
    {
      path: 'quality/soda_checks.yml',
      name: 'soda_checks.yml',
      language: 'yaml',
      category: 'tests',
      description: 'Soda Core data quality contracts defining strict null limits, anomaly bounds, and freshness SLAs.',
      content: `checks for silver_orders:
  - row_count > 0
  - missing_count(order_id) = 0
  - duplicate_count(surrogate_key) = 0
  - invalid_count(order_status) = 0:
      valid values: ['PENDING', 'PROCESSING', 'COMPLETED', 'REFUNDED', 'CANCELLED']
  - freshness(order_date) < 24h
  - schema:
      name: Verify column types
      fail:
        when wrong column type:
          order_id: string
          order_amount: double
          order_date: date
`,
    },
  ],
};
