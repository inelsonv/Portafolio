import React from 'react';
import {
  TechStack,
  Orchestrator,
  ProcessingEngine,
  StorageFormat,
  IngestionSource,
  QualityFramework,
  CloudProvider,
} from '../types/repository';
import { Sliders, Sparkles, FolderGit2, User, Globe } from 'lucide-react';

interface StackCustomizerProps {
  repoName: string;
  setRepoName: (name: string) => void;
  username: string;
  setUsername: (name: string) => void;
  techStack: TechStack;
  onChangeStack: (key: keyof TechStack, value: string) => void;
  onOpenAiTailor: () => void;
}

export const StackCustomizer: React.FC<StackCustomizerProps> = ({
  repoName,
  setRepoName,
  username,
  setUsername,
  techStack,
  onChangeStack,
  onOpenAiTailor,
}) => {
  const orchestrators: Orchestrator[] = ['Apache Airflow', 'Dagster', 'Prefect', 'Mage AI'];
  const engines: ProcessingEngine[] = ['Apache Spark (PySpark)', 'DuckDB + Polars', 'dbt Core', 'Apache Flink'];
  const storages: StorageFormat[] = ['Apache Iceberg', 'Delta Lake', 'Snowflake', 'BigQuery', 'DuckDB Parquet'];
  const ingestions: IngestionSource[] = ['Apache Kafka', 'Debezium CDC', 'REST API / Webhooks', 'AWS S3 Batch'];
  const qualities: QualityFramework[] = ['Great Expectations', 'Soda Core', 'dbt Tests', 'Pytest Schema'];
  const clouds: CloudProvider[] = ['Local / Hybrid (Docker)', 'AWS', 'Google Cloud', 'Azure'];

  return (
    <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Sliders className="w-5 h-5 text-indigo-500" />
            02. Customize Repository Parameters & Data Stack
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Configure your GitHub namespace, repository naming, and modular technology choices.
          </p>
        </div>

        <button
          onClick={onOpenAiTailor}
          className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 border border-indigo-200 dark:border-indigo-800 rounded-lg transition-colors shrink-0"
        >
          <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span>Tailor for Custom Domain with AI</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
        {/* Repository Slug */}
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
            <FolderGit2 className="w-3.5 h-3.5 text-slate-400" />
            GitHub Repository Name
          </label>
          <input
            type="text"
            value={repoName}
            onChange={(e) => setRepoName(e.target.value)}
            className="w-full px-3 py-2 text-xs font-mono bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            placeholder="e.g. realtime-streaming-lakehouse"
          />
        </div>

        {/* GitHub Username */}
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-slate-400" />
            Your GitHub Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 text-xs font-mono bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            placeholder="e.g. data_engineer_pro"
          />
        </div>

        {/* Orchestrator Select */}
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
            Pipeline Orchestrator
          </label>
          <select
            value={techStack.orchestrator}
            onChange={(e) => onChangeStack('orchestrator', e.target.value)}
            className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            {orchestrators.map((orch) => (
              <option key={orch} value={orch}>
                {orch}
              </option>
            ))}
          </select>
        </div>

        {/* Processing Engine */}
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
            Processing Engine
          </label>
          <select
            value={techStack.engine}
            onChange={(e) => onChangeStack('engine', e.target.value)}
            className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            {engines.map((eng) => (
              <option key={eng} value={eng}>
                {eng}
              </option>
            ))}
          </select>
        </div>

        {/* Storage / Format */}
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
            Storage & Lakehouse Table Format
          </label>
          <select
            value={techStack.storage}
            onChange={(e) => onChangeStack('storage', e.target.value)}
            className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            {storages.map((stg) => (
              <option key={stg} value={stg}>
                {stg}
              </option>
            ))}
          </select>
        </div>

        {/* Ingestion Source */}
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
            Ingestion & Transport
          </label>
          <select
            value={techStack.ingestion}
            onChange={(e) => onChangeStack('ingestion', e.target.value)}
            className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            {ingestions.map((ing) => (
              <option key={ing} value={ing}>
                {ing}
              </option>
            ))}
          </select>
        </div>

        {/* Quality Framework */}
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
            Data Quality & Testing
          </label>
          <select
            value={techStack.quality}
            onChange={(e) => onChangeStack('quality', e.target.value)}
            className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            {qualities.map((q) => (
              <option key={q} value={q}>
                {q}
              </option>
            ))}
          </select>
        </div>

        {/* Cloud Infrastructure */}
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1">
            <Globe className="w-3.5 h-3.5 text-slate-400" />
            Infrastructure Target
          </label>
          <select
            value={techStack.cloud}
            onChange={(e) => onChangeStack('cloud', e.target.value)}
            className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            {clouds.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
};
