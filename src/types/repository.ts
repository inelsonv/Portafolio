export type ArchetypeId = 'streaming-lakehouse' | 'modern-data-stack' | 'cloud-medallion' | 'profile-portfolio';

export type Orchestrator = 'Apache Airflow' | 'Dagster' | 'Prefect' | 'Mage AI';
export type ProcessingEngine = 'Apache Spark (PySpark)' | 'DuckDB + Polars' | 'dbt Core' | 'Apache Flink';
export type StorageFormat = 'Apache Iceberg' | 'Delta Lake' | 'Snowflake' | 'BigQuery' | 'DuckDB Parquet';
export type IngestionSource = 'Apache Kafka' | 'Debezium CDC' | 'REST API / Webhooks' | 'AWS S3 Batch';
export type QualityFramework = 'Great Expectations' | 'Soda Core' | 'dbt Tests' | 'Pytest Schema';
export type CloudProvider = 'Local / Hybrid (Docker)' | 'AWS' | 'Google Cloud' | 'Azure';

export interface TechStack {
  orchestrator: Orchestrator;
  engine: ProcessingEngine;
  storage: StorageFormat;
  ingestion: IngestionSource;
  quality: QualityFramework;
  cloud: CloudProvider;
}

export interface RepoFile {
  path: string;
  name: string;
  language: 'python' | 'sql' | 'yaml' | 'markdown' | 'dockerfile' | 'makefile' | 'json' | 'shell';
  category: 'workflow' | 'model' | 'orchestration' | 'config' | 'docs' | 'tests' | 'infra';
  content: string;
  description: string;
}

export interface PipelineStage {
  id: string;
  label: string;
  category: 'source' | 'ingestion' | 'bronze' | 'quality' | 'silver' | 'gold' | 'serving' | 'infra' | 'orchestration';
  description: string;
  filePath: string;
  recordsCount?: number;
}

export interface RepositoryTemplate {
  id: ArchetypeId;
  title: string;
  slug: string;
  subtitle: string;
  summary: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Senior/Staff';
  techStack: TechStack;
  githubTopics: string[];
  stages: PipelineStage[];
  files: RepoFile[];
  metrics: {
    throughput: string;
    latency: string;
    sla: string;
    testCoverage: string;
  };
}

export interface SimulationRecord {
  id: string;
  timestamp: string;
  rawPayload: Record<string, any>;
  cleansedPayload: Record<string, any>;
  qualityChecks: {
    rule: string;
    status: 'passed' | 'warning' | 'failed';
    detail: string;
  }[];
  goldAggregates: Record<string, any>;
}
