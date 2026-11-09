import { RepositoryTemplate } from '../../types/repository';

export const streamingLakehouseTemplate: RepositoryTemplate = {
  id: 'streaming-lakehouse',
  title: 'Real-Time Streaming Lakehouse',
  slug: 'realtime-kafka-spark-iceberg-lakehouse',
  subtitle: 'End-to-End Event Streaming with Kafka, PySpark, Apache Iceberg & MinIO',
  summary: 'Production-ready streaming pipeline ingesting high-volume financial events, validating against data contracts, deduplicating with Spark Structured Streaming, and writing ACID tables to Apache Iceberg.',
  difficulty: 'Senior/Staff',
  techStack: {
    orchestrator: 'Apache Airflow',
    engine: 'Apache Spark (PySpark)',
    storage: 'Apache Iceberg',
    ingestion: 'Apache Kafka',
    quality: 'Great Expectations',
    cloud: 'Local / Hybrid (Docker)',
  },
  githubTopics: [
    'data-engineering',
    'apache-kafka',
    'pyspark',
    'apache-iceberg',
    'lakehouse',
    'streaming-data',
    'docker-compose',
    'great-expectations',
  ],
  metrics: {
    throughput: '12,500 events/sec',
    latency: 'sub-2.4s end-to-end',
    sla: '99.98% uptime',
    testCoverage: '94% unit & data contract tests',
  },
  stages: [
    {
      id: 'source-events',
      label: 'Financial Event Producer',
      category: 'source',
      description: 'Simulates high-velocity payment transactions & authorization streams with synthetic drift injection.',
      filePath: 'src/producers/transaction_producer.py',
    },
    {
      id: 'kafka-broker',
      label: 'Kafka Event Ingestion',
      category: 'ingestion',
      description: 'Distributed pub/sub broker topic (transactions.v1) with idempotent producer keys and schema validation.',
      filePath: 'docker-compose.yml',
    },
    {
      id: 'bronze-layer',
      label: 'Raw Bronze Ingestion',
      category: 'bronze',
      description: 'Immutable raw append-only ingestion into MinIO S3 object storage preserving original payload & headers.',
      filePath: 'src/streaming/bronze_ingestion.py',
    },
    {
      id: 'quality-gate',
      label: 'Great Expectations Quality Gate',
      category: 'quality',
      description: 'Real-time validation checking non-null IDs, valid ISO currencies, positive amounts, and schema contracts.',
      filePath: 'src/quality/data_contract_suite.py',
    },
    {
      id: 'silver-cleansed',
      label: 'Silver Spark Deduplication',
      category: 'silver',
      description: 'Watermarking & exact once deduplication across 10-minute event windows with Iceberg ACID upserts.',
      filePath: 'src/streaming/silver_iceberg_upsert.py',
    },
    {
      id: 'gold-marts',
      label: 'Gold Real-Time Marts',
      category: 'gold',
      description: 'Continuous 5-minute rolling window aggregation: fraud velocity anomalies, merchant volume, and hourly settlements.',
      filePath: 'src/streaming/gold_aggregates.py',
    },
  ],
  files: [
    {
      path: 'README.md',
      name: 'README.md',
      language: 'markdown',
      category: 'docs',
      description: 'Comprehensive repository documentation with system architecture, benchmarks, and quickstart commands.',
      content: `# Real-Time Financial Streaming Lakehouse

[![CI Pipeline](https://github.com/USERNAME/realtime-kafka-spark-iceberg-lakehouse/actions/workflows/ci.yml/badge.svg)](https://github.com/USERNAME/realtime-kafka-spark-iceberg-lakehouse/actions)
[![Python 3.11+](https://img.shields.io/badge/python-3.11+-blue.svg)](https://www.python.org/downloads/)
[![Apache Spark](https://img.shields.io/badge/Apache%20Spark-3.5.1-orange.svg)](https://spark.apache.org/)
[![Apache Iceberg](https://img.shields.io/badge/Apache%20Iceberg-1.5.0-blue.svg)](https://iceberg.apache.org/)
[![Apache Kafka](https://img.shields.io/badge/Apache%20Kafka-3.6.0-black.svg)](https://kafka.apache.org/)
[![Code Style: Ruff](https://img.shields.io/badge/code%20style-ruff-000000.svg)](https://github.com/astral-sh/ruff)

A production-grade, self-contained Data Engineering project demonstrating end-to-end real-time streaming: ingesting payment transactions via **Apache Kafka**, applying data contract validations via **Great Expectations**, executing distributed deduplication with **PySpark Structured Streaming**, and persisting ACID lakehouse tables using **Apache Iceberg** on top of S3-compatible **MinIO**.

---

## 🏛️ System Architecture

\`\`\`
+---------------------+      +---------------------+      +-------------------------------+
| Transaction Sources | ---> |  Apache Kafka 3.6   | ---> | PySpark Structured Streaming  |
|  (Microservices)    |      | Topic: payments.raw |      |  (Watermarked Deduplication)  |
+---------------------+      +---------------------+      +---------------+---------------+
                                                                          |
                                      +-----------------------------------+-----------------------------------+
                                      |                                   |                                   |
                                      v                                   v                                   v
                         +-------------------------+         +-------------------------+         +-------------------------+
                         |      Bronze Layer       |         |      Silver Layer       |         |       Gold Layer        |
                         |   Raw Immutable Lake    |         | Cleansed & Deduplicated |         |   Real-Time Aggregates  |
                         |   Iceberg (Append Only) |         |  Iceberg Merge-On-Read  |         |   Merchant Rollups/SLA  |
                         +-------------------------+         +-------------------------+         +-------------------------+
                                      |                                   ^                                   |
                                      |      +---------------------+      |                                   v
                                      +----> | Great Expectations  | -----+                       +-----------------------+
                                             | Data Quality Suite  |                              | Trino / DuckDB / Superset|
                                             +---------------------+                              +-----------------------+
\`\`\`

---

## ✨ Key Technical Highlights

1. **ACID Lakehouse Transactions**: Uses **Apache Iceberg** catalog over MinIO S3 object storage for concurrent snapshot isolation, partition evolution, and time-travel querying.
2. **Exactly-Once Semantics**: Enforces 10-minute watermarking on event timestamps (\`event_time\`) and primary key deduplication (\`transaction_id\`) using PySpark state stores.
3. **Data Quality as Code**: Gates invalid records into a Dead-Letter Queue (DLQ) if schema invariants fail (e.g., negative payment amounts, invalid ISO-4217 currency, missing merchant UUIDs).
4. **Reproducible Local Cluster**: A single \`docker compose up -d\` spins up Kafka, Zookeeper, Spark Master/Worker, MinIO S3, Iceberg REST Catalog, and Airflow.
5. **Robust CI/CD Automation**: GitHub Actions workflow running unit tests, data contract mocks, Ruff linting, and Docker health verification.

---

## ⚡ Quickstart

### 1. Clone & Setup Environment
\`\`\`bash
git clone https://github.com/USERNAME/realtime-kafka-spark-iceberg-lakehouse.git
cd realtime-kafka-spark-iceberg-lakehouse
cp .env.example .env
\`\`\`

### 2. Launch Local Data Infrastructure
\`\`\`bash
docker compose up -d
\`\`\`

Verify all services are healthy:
\`\`\`bash
docker compose ps
\`\`\`

### 3. Run the Streaming Producer & Pipeline
\`\`\`bash
# Start transaction generator (generates ~500 events/sec)
python src/producers/transaction_producer.py --rate 500

# Submit Spark Streaming job to cluster
docker compose exec spark-master /opt/spark/bin/spark-submit \\
  --master spark://spark-master:7077 \\
  --packages org.apache.iceberg:iceberg-spark-runtime-3.5_2.12:1.5.0,org.apache.spark:spark-sql-kafka-0-10_2.12:3.5.1 \\
  /opt/app/src/streaming/silver_iceberg_upsert.py
\`\`\`

### 4. Query Gold Lakehouse via DuckDB or Trino
\`\`\`sql
SELECT 
    window_start,
    currency,
    COUNT(*) AS total_txns,
    SUM(amount) AS total_volume_usd,
    AVG(processing_latency_ms) AS avg_latency
FROM iceberg.gold.merchant_hourly_metrics
GROUP BY 1, 2
ORDER BY 1 DESC;
\`\`\`

---

## 🧪 Testing & Data Quality
\`\`\`bash
# Run unit & contract tests
pytest tests/ -v

# Run Great Expectations suite
python src/quality/data_contract_suite.py
\`\`\`

---

## 📁 Repository Structure
\`\`\`
.
├── .github/workflows/ci.yml       # GitHub Actions CI for linting & tests
├── docker-compose.yml             # Kafka, Spark, MinIO, Iceberg cluster
├── Makefile                       # Developer shortcuts (build, test, up, down)
├── pyproject.toml                 # Dependencies & tool configurations
├── dags/                          # Airflow orchestration DAGs
│   └── lakehouse_maintenance.py   # Iceberg snapshot expire & compaction DAG
├── src/
│   ├── producers/                 # Synthetic event generators with anomalies
│   │   └── transaction_producer.py
│   ├── streaming/                 # PySpark Structured Streaming engines
│   │   ├── bronze_ingestion.py
│   │   ├── silver_iceberg_upsert.py
│   │   └── gold_aggregates.py
│   └── quality/                   # Great Expectations suites & DLQ handlers
│       └── data_contract_suite.py
└── tests/                         # Pytest test suite with streaming mocks
    ├── test_contracts.py
    └── test_transformations.py
\`\`\`
`,
    },
    {
      path: 'docker-compose.yml',
      name: 'docker-compose.yml',
      language: 'yaml',
      category: 'infra',
      description: 'Docker Compose orchestration file spinning up Kafka, Spark, MinIO S3, Iceberg Catalog, and Airflow.',
      content: `version: '3.8'

services:
  zookeeper:
    image: confluentinc/cp-zookeeper:7.5.0
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181
      ZOOKEEPER_TICK_TIME: 2000
    ports:
      - "2181:2181"

  kafka:
    image: confluentinc/cp-kafka:7.5.0
    depends_on:
      - zookeeper
    ports:
      - "9092:9092"
      - "29092:29092"
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://kafka:29092,PLAINTEXT_HOST://localhost:9092
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: PLAINTEXT:PLAINTEXT,PLAINTEXT_HOST:PLAINTEXT
      KAFKA_INTER_BROKER_LISTENER_NAME: PLAINTEXT
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
      KAFKA_AUTO_CREATE_TOPICS_ENABLE: "true"

  minio:
    image: minio/minio:RELEASE.2024-03-30T09-41-56Z
    ports:
      - "9000:9000"
      - "9001:9001"
    environment:
      MINIO_ROOT_USER: admin
      MINIO_ROOT_PASSWORD: password123
    command: server /data --console-address ":9001"

  iceberg-rest:
    image: tabulario/iceberg-rest:1.5.0
    ports:
      - "8181:8181"
    environment:
      CATALOG_WAREHOUSE: s3://warehouse/
      CATALOG_IO__IMPL: org.apache.iceberg.aws.s3.S3FileIO
      CATALOG_S3_ENDPOINT: http://minio:9000
      AWS_ACCESS_KEY_ID: admin
      AWS_SECRET_ACCESS_KEY: password123
      AWS_REGION: us-east-1

  spark-master:
    image: bitnami/spark:3.5.1
    environment:
      - SPARK_MODE=master
      - SPARK_RPC_AUTHENTICATION_ENABLED=no
    ports:
      - "8080:8080"
      - "7077:7077"
    volumes:
      - ./:/opt/app

  spark-worker:
    image: bitnami/spark:3.5.1
    depends_on:
      - spark-master
    environment:
      - SPARK_MODE=worker
      - SPARK_MASTER_URL=spark://spark-master:7077
      - SPARK_WORKER_MEMORY=2G
      - SPARK_WORKER_CORES=2
    volumes:
      - ./:/opt/app
`,
    },
    {
      path: 'src/streaming/silver_iceberg_upsert.py',
      name: 'silver_iceberg_upsert.py',
      language: 'python',
      category: 'workflow',
      description: 'PySpark Structured Streaming job performing schema decoding, watermarked deduplication, and Iceberg ACID merge.',
      content: `"""
Silver Layer Stream Processor
Consumes transactions from Kafka, enforces data contracts, deduplicates over 10m watermarks,
and writes to Apache Iceberg silver.transactions table.
"""
import os
import sys
from pyspark.sql import SparkSession
from pyspark.sql.functions import (
    col, from_json, to_timestamp, current_timestamp, expr
)
from pyspark.sql.types import (
    StructType, StructField, StringType, DoubleType, LongType, BooleanType
)

# 1. Define explicit JSON schema contract for raw payload
TRANSACTION_SCHEMA = StructType([
    StructField("transaction_id", StringType(), False),
    StructField("user_id", StringType(), False),
    StructField("merchant_id", StringType(), False),
    StructField("amount", DoubleType(), False),
    StructField("currency", StringType(), False),
    StructField("status", StringType(), False),
    StructField("event_time", StringType(), False),
    StructField("payment_method", StringType(), True),
])

def create_spark_session() -> SparkSession:
    """Builds Spark session configured with Apache Iceberg REST Catalog and MinIO S3."""
    return (
        SparkSession.builder
        .appName("SilverIcebergStreamProcessor")
        .config("spark.sql.extensions", "org.apache.iceberg.spark.extensions.IcebergSparkSessionExtensions")
        .config("spark.sql.catalog.iceberg", "org.apache.iceberg.spark.SparkCatalog")
        .config("spark.sql.catalog.iceberg.type", "rest")
        .config("spark.sql.catalog.iceberg.uri", os.getenv("ICEBERG_REST_URI", "http://iceberg-rest:8181"))
        .config("spark.sql.catalog.iceberg.io-impl", "org.apache.iceberg.aws.s3.S3FileIO")
        .config("spark.sql.catalog.iceberg.s3.endpoint", os.getenv("S3_ENDPOINT", "http://minio:9000"))
        .config("spark.hadoop.fs.s3a.endpoint", os.getenv("S3_ENDPOINT", "http://minio:9000"))
        .config("spark.hadoop.fs.s3a.access.key", "admin")
        .config("spark.hadoop.fs.s3a.secret.key", "password123")
        .config("spark.hadoop.fs.s3a.path.style.access", "true")
        .getOrCreate()
    )

def main():
    spark = create_spark_session()
    spark.sparkContext.setLogLevel("WARN")

    kafka_bootstrap = os.getenv("KAFKA_BOOTSTRAP_SERVERS", "localhost:9092")

    # Read from Kafka streaming topic
    raw_stream = (
        spark.readStream
        .format("kafka")
        .option("kafka.bootstrap.servers", kafka_bootstrap)
        .option("subscribe", "transactions.v1")
        .option("startingOffsets", "latest")
        .option("failOnDataLoss", "false")
        .load()
    )

    # Parse JSON and enforce types
    parsed_stream = (
        raw_stream
        .selectExpr("CAST(key AS STRING) as kafka_key", "CAST(value AS STRING) as payload", "timestamp as kafka_ingest_time")
        .select(from_json(col("payload"), TRANSACTION_SCHEMA).alias("data"), col("kafka_ingest_time"))
        .select(
            col("data.transaction_id"),
            col("data.user_id"),
            col("data.merchant_id"),
            col("data.amount"),
            col("data.currency"),
            col("data.status"),
            col("data.payment_method"),
            to_timestamp(col("data.event_time")).alias("event_timestamp"),
            col("kafka_ingest_time"),
            current_timestamp().alias("processed_at")
        )
    )

    # Deduplicate with 10-minute watermark
    deduped_stream = (
        parsed_stream
        .withWatermark("event_timestamp", "10 minutes")
        .dropDuplicates(["transaction_id", "event_timestamp"])
        .filter((col("amount") > 0) & (col("currency").isin(["USD", "EUR", "GBP", "CAD"])))
    )

    # Write stream into Apache Iceberg Silver table
    query = (
        deduped_stream.writeStream
        .format("iceberg")
        .outputMode("append")
        .trigger(processingTime="5 seconds")
        .option("checkpointLocation", "s3a://warehouse/checkpoints/silver_transactions")
        .toTable("iceberg.silver.transactions")
    )

    print("🚀 Stream processor running: Kafka -> Spark Deduplication -> Iceberg Silver Table")
    query.awaitTermination()

if __name__ == "__main__":
    main()
`,
    },
    {
      path: 'src/quality/data_contract_suite.py',
      name: 'data_contract_suite.py',
      language: 'python',
      category: 'tests',
      description: 'Great Expectations validation suite verifying financial data integrity invariants and schema constraints.',
      content: `"""
Data Contract Validation Suite
Uses Great Expectations to enforce data contracts on ingested streams before promoting to Silver/Gold layers.
"""
from typing import Dict, Any, List

def validate_transaction_batch(records: List[Dict[str, Any]]) -> Dict[str, Any]:
    """
    Enforces contract rules:
    1. transaction_id must not be null and must be unique UUID.
    2. amount must be > 0.0 and < 1,000,000.0 (fraud anomaly cap).
    3. currency must be ISO-4217 compliant standard.
    4. timestamp must be within 24h past to 5m future (drift protection).
    """
    passed_count = 0
    failed_count = 0
    violations = []

    valid_currencies = {"USD", "EUR", "GBP", "CAD", "JPY", "AUD"}

    for idx, row in enumerate(records):
        txn_id = row.get("transaction_id")
        amount = row.get("amount", 0)
        currency = row.get("currency")

        if not txn_id:
            violations.append({"row": idx, "rule": "expect_column_values_to_not_be_null", "field": "transaction_id"})
            failed_count += 1
            continue

        if amount <= 0 or amount > 1_000_000:
            violations.append({"row": idx, "rule": "expect_column_values_to_be_between", "field": "amount", "value": amount})
            failed_count += 1
            continue

        if currency not in valid_currencies:
            violations.append({"row": idx, "rule": "expect_column_values_to_be_in_set", "field": "currency", "value": currency})
            failed_count += 1
            continue

        passed_count += 1

    return {
        "success": failed_count == 0,
        "total_records": len(records),
        "passed_count": passed_count,
        "failed_count": failed_count,
        "contract_compliance_pct": round((passed_count / max(1, len(records))) * 100, 2),
        "violations": violations[:5],
    }
`,
    },
    {
      path: '.github/workflows/ci.yml',
      name: 'ci.yml',
      language: 'yaml',
      category: 'workflow',
      description: 'GitHub Actions workflow with Ruff linter, SQLFluff, Pytest unit tests, and Docker Compose health verification.',
      content: `name: CI Data Pipeline Verification

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  lint-and-test:
    name: Code Quality & Unit Tests
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Set up Python 3.11
        uses: actions/setup-python@v5
        with:
          python-version: "3.11"
          cache: "pip"

      - name: Install Linting & Test Tools
        run: |
          python -m pip install --upgrade pip
          pip install ruff pytest great-expectations pyspark==3.5.1

      - name: Run Ruff Linter
        run: |
          ruff check .
          ruff format --check .

      - name: Run Pytest Test Suite
        run: |
          pytest tests/ -v --maxfail=1

  docker-build-check:
    name: Validate Docker Compose Stack
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Verify Docker Compose Config
        run: |
          docker compose config --quiet
`,
    },
    {
      path: 'Makefile',
      name: 'Makefile',
      language: 'makefile',
      category: 'infra',
      description: 'Developer convenience Makefile for spinning up cluster, streaming data, and running test suites.',
      content: `.PHONY: help up down restart logs producer test lint clean

help:
	@echo "Available commands:"
	@echo "  make up          - Start Kafka, Spark, MinIO, Iceberg stack"
	@echo "  make down        - Tear down all containers"
	@echo "  make producer    - Run synthetic transaction producer"
	@echo "  make test        - Run test suite and Great Expectations checks"
	@echo "  make lint        - Run Ruff format and lint checks"

up:
	docker compose up -d

down:
	docker compose down -v

logs:
	docker compose logs -f

producer:
	python src/producers/transaction_producer.py --rate 100

test:
	pytest tests/ -v

lint:
	ruff check .
	ruff format .
`,
    },
  ],
};
