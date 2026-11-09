import React, { useState } from 'react';
import {
  Github,
  Mail,
  Linkedin,
  MapPin,
  Terminal,
  Database,
  Cpu,
  Layers,
  ShieldCheck,
  Check,
  Copy,
  Download,
  ExternalLink,
  Sun,
  Moon,
  Sparkles,
  ArrowUpRight,
  Code2,
  FolderGit2,
  Award,
  CheckCircle2,
  Clock,
  Globe,
  Tag,
} from 'lucide-react';
import avatarImg from './assets/images/avatar_data_engineer_1794232360862.jpg';
import { PublishModal } from './components/PublishModal';
import { exportPortfolioProjectZip } from './utils/zipExporter';

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [lang, setLang] = useState<'es' | 'en'>('en');
  const [hasCopied, setHasCopied] = useState(false);
  const [copiedTopics, setCopiedTopics] = useState(false);
  const [copiedDesc, setCopiedDesc] = useState(false);
  const [showReadmePreview, setShowReadmePreview] = useState(false);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);

  // Sync dark class on document element
  React.useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const profile = {
    name: 'Nelson Ventura',
    fullName: 'I. Nelson Ventura Mena',
    username: 'inelsonv',
    repoName: 'Portafolio',
    repoUrl: 'https://github.com/inelsonv/Portafolio',
    title: lang === 'es' ? 'Ingeniero de Datos / Data Engineer' : 'Senior Data Engineer',
    location: lang === 'es' ? 'Remoto / Global' : 'Remote / Worldwide',
    email: 'iventuramena@gmail.com',
    github: 'https://github.com/inelsonv',
    linkedin: 'https://www.linkedin.com/in/iventuram/',
    bio:
      lang === 'es'
        ? 'Ingeniero de Datos enfocado en construir pipelines de alto rendimiento, arquitecturas Lakehouse en tiempo real (Kafka, Spark, Iceberg), modelado dimensional con dbt Core y contratos de datos automatizados para garantizar calidad absoluta.'
        : 'Data Engineer focused on building high-throughput data pipelines, real-time Lakehouse architectures (Kafka, Spark, Iceberg), Kimball dimensional modeling with dbt Core, and automated data quality contracts.',
    principles:
      lang === 'es'
        ? [
            {
              title: 'Idempotencia Absoluta',
              desc: 'Todo pipeline debe poder re-ejecutarse de forma determinista sin duplicar registros ni corromper el estado.',
            },
            {
              title: 'Contratos de Datos (Data Contracts)',
              desc: 'Validación estricta de esquemas e invariantes en la ingesta (shift-left), no en los tableros finales.',
            },
            {
              title: 'Arquitectura Medallion & ACID',
              desc: 'Almacenamiento estructurado en capas Bronze, Silver y Gold utilizando Apache Iceberg y Delta Lake.',
            },
            {
              title: 'Observabilidad & SLAs',
              desc: 'Monitoreo de frescura, volumetría y detección de anomalías con alertas en tiempo real.',
            },
          ]
        : [
            {
              title: 'Strict Idempotency',
              desc: 'Every pipeline stage must be deterministically re-runnable without duplicate records or corrupted state.',
            },
            {
              title: 'Shift-Left Data Contracts',
              desc: 'Enforcing strict schema invariants at the ingestion gateway rather than discovering bugs downstream.',
            },
            {
              title: 'ACID Lakehouse Architecture',
              desc: 'Clean Bronze, Silver, and Gold layering using Apache Iceberg and Delta Lake snapshot isolation.',
            },
            {
              title: 'Observability & Freshness SLAs',
              desc: 'Continuous freshness tracking, row count checks, and automated Slack failure alerting.',
            },
          ],
    stackCategories: [
      {
        category: lang === 'es' ? 'Procesamiento & Streaming' : 'Distributed Processing & Streaming',
        skills: ['Apache Spark (PySpark)', 'Apache Kafka', 'DuckDB', 'Polars', 'Apache Flink'],
      },
      {
        category: lang === 'es' ? 'Lakehouse & Almacenamiento' : 'Lakehouse & Storage',
        skills: ['Apache Iceberg', 'Delta Lake', 'Snowflake', 'BigQuery', 'PostgreSQL'],
      },
      {
        category: lang === 'es' ? 'Orquestación & Modelado' : 'Orchestration & Modeling',
        skills: ['Apache Airflow', 'dbt Core', 'Dagster', 'Kimball Star Schema'],
      },
      {
        category: lang === 'es' ? 'Calidad, DevOps & Cloud' : 'Quality, DevOps & Cloud',
        skills: ['Great Expectations', 'Docker', 'Terraform', 'AWS (S3, Glue, Athena)', 'GitHub Actions'],
      },
    ],
    certifications: [
      {
        title: 'AWS Certified Data Engineer - Associate',
        issuer: 'Amazon Web Services',
        badge: 'AWS Certified',
        status: lang === 'es' ? 'Verificado' : 'Verified',
      },
      {
        title: 'Databricks Certified Associate Data Engineer',
        issuer: 'Databricks Academy',
        badge: 'Databricks',
        status: lang === 'es' ? 'Verificado' : 'Verified',
      },
      {
        title: 'dbt Fundamentals Certified',
        issuer: 'dbt Labs',
        badge: 'dbt Core',
        status: lang === 'es' ? 'Verificado' : 'Verified',
      },
      {
        title: 'Apache Kafka Event Streaming Specialist',
        issuer: 'Confluent Ecosystem',
        badge: 'Kafka',
        status: lang === 'es' ? 'Verificado' : 'Verified',
      },
    ],
    githubMeta: {
      description:
        'Senior Data Engineer Portfolio: Streaming Lakehouses (Kafka, PySpark, Iceberg), Kimball dbt modeling, and automated data quality pipelines.',
      topics: [
        'data-engineering',
        'apache-spark',
        'apache-kafka',
        'apache-iceberg',
        'dbt-core',
        'lakehouse',
        'python',
        'sql',
        'aws',
        'great-expectations',
      ],
    },
    projects: [
      {
        title: 'Real-Time Financial Streaming Lakehouse',
        tags: ['Apache Kafka', 'PySpark', 'Apache Iceberg', 'MinIO'],
        metrics: lang === 'es' ? '12.5k eventos/seg · Latencia < 2.4s · 99.98% SLA' : '12.5k events/sec · <2.4s latency · 99.98% SLA',
        desc:
          lang === 'es'
            ? 'Ingesta continua de transacciones financieras mediante Kafka, deduplicación con marcas de agua en PySpark y persistencia ACID en Apache Iceberg con contratos Great Expectations.'
            : 'Continuous payment event ingestion via Kafka, watermarked deduplication in PySpark Structured Streaming, and ACID Iceberg tables on S3.',
      },
      {
        title: 'Modern Data Stack & dbt Analytics Warehouse',
        tags: ['dbt Core', 'DuckDB', 'Apache Airflow', 'SQLFluff'],
        metrics: lang === 'es' ? '3.4M filas transformadas · 42s refresh · Cobertura 100%' : '3.4M rows transformed · 42s refresh · 100% test coverage',
        desc:
          lang === 'es'
            ? 'Modelado dimensional en estrella de Kimball (staging, intermediate, marts), macros en Jinja, pruebas de contrato y orquestación programada en Airflow.'
            : 'Kimball dimensional star schema (staging, intermediate, marts), Jinja macros, automated schema integrity tests, and Airflow orchestration.',
      },
      {
        title: 'Cloud Medallion ETL & Infrastructure as Code',
        tags: ['Terraform', 'Delta Lake', 'AWS S3', 'Dagster'],
        metrics: lang === 'es' ? '850 GB/día procesados · Optimización Z-Order' : '850 GB/day · Z-Order optimization · Zero data loss',
        desc:
          lang === 'es'
            ? 'Provisionamiento automatizado de infraestructura con Terraform en AWS, pipeline Medallion (Bronze/Silver/Gold) y orquestación con activos declarativos en Dagster.'
            : 'Automated AWS infrastructure via Terraform, multi-stage Medallion lakehouse, and declarative software-defined assets in Dagster.',
      },
    ],
  };

  const readmeMarkdown = `# Hi, I'm ${profile.name} 👋
### ${profile.title} · Lakehouse & Data Pipelines

[![Live Website](https://img.shields.io/badge/Live%20Website-inelsonv.github.io%2FPortafolio-6366F1?style=for-the-badge&logo=googlechrome&logoColor=white)](https://inelsonv.github.io/Portafolio/)
[![Portfolio Repository](https://img.shields.io/badge/GitHub-inelsonv%2FPortafolio-2ea44f?style=for-the-badge&logo=github&logoColor=white)](${profile.repoUrl})
[![LinkedIn](https://img.shields.io/badge/LinkedIn-iventuram-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](${profile.linkedin})
[![Email](https://img.shields.io/badge/Email-iventuramena%40gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:${profile.email})

\`\`\`
   ____        _          _____             _                     
  |  _ \\  __ _| |_ __ _  | ____|_ __   __ _(_)_ __   ___  ___ _ __ 
  | | | |/ _\` | __/ _\` | |  _| | '_ \\ / _\` | | '_ \\ / _ \\/ _ \\ '__|
  | |_| | (_| | || (_| | | |___| | | | (_| | | | | |  __/  __/ |   
  |____/ \\__,_|\\__\\__,_| |_____|_| |_|\\__, |_|_| |_|\\___|\\___|_|   
                                      |___/                        
\`\`\`

> ${profile.bio}

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

## 🏆 Featured Repositories & Case Studies

### 1. [Real-Time Financial Streaming Lakehouse](https://github.com/${profile.username}/realtime-kafka-spark-iceberg-lakehouse)
- **Problem**: 12,500 events/second payment ingestion requiring sub-3s latency without duplicate transactions.
- **Architecture**: Kafka $\\rightarrow$ PySpark watermarking $\\rightarrow$ Apache Iceberg on MinIO S3 $\\rightarrow$ Great Expectations.
- **Impact**: Zero duplicate events, 99.98% pipeline uptime.

### 2. [Modern Data Stack with dbt Core & DuckDB](https://github.com/${profile.username}/modern-data-stack-dbt-duckdb-airflow)
- **Architecture**: Kimball star schema models, Jinja macros, schema contract testing, Airflow DAG.
- **Impact**: Reduced batch run duration from 4 hours to 42 seconds with 100% test coverage.

---

## 📬 Contact & Connect
- 💼 **LinkedIn**: [linkedin.com/in/iventuram](https://www.linkedin.com/in/iventuram/)
- 🐙 **GitHub Profile**: [github.com/${profile.username}](https://github.com/${profile.username})
- 📁 **Repository**: [github.com/${profile.username}/${profile.repoName}](${profile.repoUrl})
- 📧 **Email**: ${profile.email}
`;

  const handleCopyReadme = () => {
    navigator.clipboard.writeText(readmeMarkdown);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  const handleCopyTopics = () => {
    navigator.clipboard.writeText(profile.githubMeta.topics.join(', '));
    setCopiedTopics(true);
    setTimeout(() => setCopiedTopics(false), 2000);
  };

  const handleCopyDesc = () => {
    navigator.clipboard.writeText(profile.githubMeta.description);
    setCopiedDesc(true);
    setTimeout(() => setCopiedDesc(false), 2000);
  };

  const handleDownloadReadme = () => {
    const blob = new Blob([readmeMarkdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadProjectZip = async () => {
    try {
      await exportPortfolioProjectZip(readmeMarkdown, profile.repoName);
    } catch (err) {
      console.error('Error exporting portfolio project zip:', err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors flex flex-col font-sans">
      {/* Top Bar Contract (Strict 3-Zone Architecture) */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6 sm:gap-8">
          {/* Zone 1: Brand title wordmark */}
          <div className="flex items-center gap-2.5 shrink-0">
            <a
              href="/"
              className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100 whitespace-nowrap"
            >
              {profile.name}
            </a>
            <span className="hidden sm:inline text-xs font-mono text-slate-400 dark:text-slate-500">
              · {profile.username}/{profile.repoName}
            </span>
          </div>

          {/* Zone 2: Navigation Links - Only "About Me" as requested */}
          <nav className="flex items-center gap-6 text-sm font-medium">
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold border-b-2 border-indigo-600 dark:border-indigo-400 py-1 whitespace-nowrap">
              {lang === 'es' ? 'Sobre mí' : 'About Me'}
            </span>
          </nav>

          {/* Zone 3: Actions (Publish CTA, Language toggle, Theme toggle, Copy README) */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Language Toggle */}
            <div className="flex items-center p-0.5 bg-slate-100 dark:bg-slate-900 rounded-lg text-xs font-medium">
              <button
                onClick={() => setLang('es')}
                className={`px-2 py-1 rounded-md transition-colors ${
                  lang === 'es'
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                ES
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-2 py-1 rounded-md transition-colors ${
                  lang === 'en'
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                EN
              </button>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-1.5 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 rounded-md transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Publish CTA Button */}
            <button
              onClick={() => setIsPublishModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors shadow-xs whitespace-nowrap"
            >
              <Github className="w-3.5 h-3.5" />
              <span>{lang === 'es' ? 'Publicar en GitHub' : 'Publish to GitHub'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Repository Destination Banner */}
        <div className="p-4 bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-indigo-900 dark:text-indigo-200">
            <FolderGit2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <span>
              {lang === 'es' ? 'Repositorio de destino configurado:' : 'Target GitHub Repository:'}{' '}
              <a
                href={profile.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="font-mono font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                inelsonv/Portafolio
              </a>
            </span>
          </div>

          <button
            onClick={() => setIsPublishModalOpen(true)}
            className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>{lang === 'es' ? 'Ver pasos para subir código &rarr;' : 'View push instructions &rarr;'}</span>
          </button>
        </div>

        {/* Hero Section: Personal Profile */}
        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="relative shrink-0">
              <img
                src={avatarImg}
                alt={profile.name}
                referrerPolicy="no-referrer"
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border border-slate-200 dark:border-slate-700 shadow-xs"
              />
              <div className="absolute -bottom-1.5 -right-1.5 p-1 rounded-full bg-indigo-600 text-white shadow-xs">
                <Database className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
                  {profile.name}
                </h1>
                <span className="text-xs font-mono text-slate-400 dark:text-slate-500">
                  @{profile.username}
                </span>
              </div>

              <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                {profile.title}
              </p>

              {/* Zero-Pill Unboxed Metadata with Typographic Separator */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {profile.location}
                </span>
                <span aria-hidden="true">·</span>
                <span>Apache Spark & Kafka</span>
                <span aria-hidden="true">·</span>
                <span>Iceberg & dbt Core</span>
                <span aria-hidden="true">·</span>
                <span>AWS & Python</span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed pt-1">
                {profile.bio}
              </p>

              {/* Contact Links */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <a
                  href={profile.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 border border-indigo-200 dark:border-indigo-800 rounded-lg transition-colors"
                >
                  <FolderGit2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  <span>github.com/inelsonv/Portafolio</span>
                  <ArrowUpRight className="w-3 h-3 text-indigo-400" />
                </a>

                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>github.com/{profile.username}</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-400" />
                </a>

                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                  <span>linkedin.com/in/iventuram</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-400" />
                </a>

                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-amber-500" />
                  <span>{profile.email}</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Section 0: Interactive Launch Checklist (¿Qué más falta?) */}
        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-7 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-indigo-500" />
                {lang === 'es'
                  ? 'Checklist de Publicación en GitHub (¿Qué falta?)'
                  : 'GitHub Launch Roadmap (What is left to do?)'}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {lang === 'es'
                  ? 'Sigue estos 3 pasos rápidos en GitHub para tener tu repositorio 100% publicado y profesional.'
                  : 'Follow these 3 quick steps on GitHub to have your repository 100% published and professional.'}
              </p>
            </div>

            <button
              onClick={() => setIsPublishModalOpen(true)}
              className="px-3 py-1.5 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-xs shrink-0 flex items-center gap-1.5"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>{lang === 'es' ? 'Abrir Guía de Comandos' : 'Open Git Guide'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-2">
            {/* Step 1 */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 flex items-center justify-center text-[10px] font-bold">1</span>
                  {lang === 'es' ? 'Subir Código o README' : 'Push Code or README'}
                </span>
                <span className="text-[10px] uppercase font-mono font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded">
                  {lang === 'es' ? 'Paso 1' : 'Step 1'}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {lang === 'es'
                  ? 'Descarga el .ZIP o copia el README.md y haz push a inelsonv/Portafolio con Git.'
                  : 'Download the .ZIP or copy the README.md and push to inelsonv/Portafolio using Git.'}
              </p>
              <button
                onClick={() => setIsPublishModalOpen(true)}
                className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline flex items-center gap-1 pt-1"
              >
                <span>{lang === 'es' ? 'Ver comandos Git' : 'View Git commands'}</span> &rarr;
              </button>
            </div>

            {/* Step 2 */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 flex items-center justify-center text-[10px] font-bold">2</span>
                  {lang === 'es' ? 'Agregar Tags & Descripción' : 'Add Topics & Description'}
                </span>
                <span className="text-[10px] uppercase font-mono font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded">
                  {lang === 'es' ? 'Paso 2' : 'Step 2'}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {lang === 'es'
                  ? 'En GitHub (Settings -> About), pega la descripción y los 10 tags para que reclutadores te encuentren.'
                  : 'In GitHub (About section), paste the description and 10 tags for recruiter discoverability.'}
              </p>
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={handleCopyTopics}
                  className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
                >
                  {copiedTopics ? (lang === 'es' ? '¡Temas Copiados!' : 'Topics Copied!') : (lang === 'es' ? 'Copiar 10 Temas' : 'Copy 10 Topics')}
                </button>
                <span className="text-slate-300 dark:text-slate-700">·</span>
                <button
                  onClick={handleCopyDesc}
                  className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
                >
                  {copiedDesc ? (lang === 'es' ? '¡Descripción Copiada!' : 'Desc Copied!') : (lang === 'es' ? 'Copiar Desc' : 'Copy Desc')}
                </button>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 flex items-center justify-center text-[10px] font-bold">3</span>
                  {lang === 'es' ? 'Activar GitHub Pages' : 'Enable GitHub Pages'}
                </span>
                <span className="text-[10px] uppercase font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                  {lang === 'es' ? 'Opcional Web' : 'Live Web'}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {lang === 'es'
                  ? 'En Settings -> Pages -> Source: selecciona "GitHub Actions". Tu web estará viva en inelsonv.github.io/Portafolio.'
                  : 'In Settings -> Pages -> Source: select "GitHub Actions" to have your site live on inelsonv.github.io/Portafolio.'}
              </p>
              <a
                href={`${profile.repoUrl}/settings/pages`}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline flex items-center gap-1 pt-1"
              >
                <span>{lang === 'es' ? 'Ir a Settings de Pages' : 'Go to Pages Settings'}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </section>

        {/* Section 1: Tech Stack Matrix */}
        <section className="space-y-4">
          <div className="flex items-baseline justify-between">
            <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-indigo-500" />
              {lang === 'es' ? 'Stack Tecnológico & Habilidades' : 'Data Engineering Stack & Competencies'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profile.stackCategories.map((group, idx) => (
              <div
                key={idx}
                className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl"
              >
                <h3 className="text-xs font-semibold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-500" />
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2.5 py-1 text-xs font-mono bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Certificaciones & Formación */}
        <section className="space-y-4">
          <div className="flex items-baseline justify-between">
            <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              {lang === 'es' ? 'Certificaciones & Especializaciones' : 'Certifications & Accreditations'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5">
            {profile.certifications.map((cert, idx) => (
              <div
                key={idx}
                className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-semibold uppercase px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300">
                    {cert.badge}
                  </span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    {cert.status}
                  </span>
                </div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 leading-snug pt-1">
                  {cert.title}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {cert.issuer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Proyectos & Repositorios Destacados */}
        <section className="space-y-4">
          <div className="flex items-baseline justify-between">
            <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-500" />
              {lang === 'es' ? 'Proyectos & Repositorios de Referencia' : 'Featured Repositories & Case Studies'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {profile.projects.map((proj, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-between p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-4 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors"
              >
                <div className="space-y-2">
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
                    {proj.title}
                  </h3>
                  <div className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400 tabular-nums">
                    {proj.metrics}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {proj.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-1.5">
                  {proj.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-mono text-slate-500 dark:text-slate-400"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Principios de Ingeniería */}
        <section className="space-y-4">
          <div className="flex items-baseline justify-between">
            <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              {lang === 'es' ? 'Principios de Ingeniería de Datos' : 'Core Data Engineering Philosophy'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profile.principles.map((p, idx) => (
              <div
                key={idx}
                className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-1.5"
              >
                <h3 className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                  {idx + 1}. {p.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: GitHub README & Publishing Options */}
        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Terminal className="w-5 h-5 text-indigo-500" />
                {lang === 'es'
                  ? 'Publicar en tu Repositorio inelsonv/Portafolio'
                  : 'Publish to inelsonv/Portafolio Repository'}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {lang === 'es'
                  ? 'Código y README listos para tu repositorio en github.com/inelsonv/Portafolio'
                  : 'Ready-to-push files and README for github.com/inelsonv/Portafolio'}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => setIsPublishModalOpen(true)}
                className="px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-xs flex items-center gap-1.5"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>{lang === 'es' ? 'Ver Comandos Git' : 'Git Commands'}</span>
              </button>

              <button
                onClick={handleDownloadProjectZip}
                className="px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors flex items-center gap-1"
                title="Descargar Proyecto Web Completo (.ZIP)"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{lang === 'es' ? 'Descargar Web .ZIP' : 'Download Web .ZIP'}</span>
              </button>

              <button
                onClick={() => setShowReadmePreview(!showReadmePreview)}
                className="px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors flex items-center gap-1"
              >
                <Code2 className="w-3.5 h-3.5" />
                {showReadmePreview ? (lang === 'es' ? 'Ocultar Código' : 'Hide Code') : (lang === 'es' ? 'Ver Markdown' : 'View Markdown')}
              </button>

              <button
                onClick={handleCopyReadme}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors"
              >
                {hasCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                      {lang === 'es' ? '¡Copiado!' : 'Copied!'}
                    </span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{lang === 'es' ? 'Copiar README' : 'Copy README'}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Direct 3-Step Guide */}
          <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2 text-xs">
            <span className="font-semibold text-slate-900 dark:text-slate-100">
              {lang === 'es' ? 'Pasos rápidos para subir a github.com/inelsonv/Portafolio:' : 'Quick steps to push to github.com/inelsonv/Portafolio:'}
            </span>
            <ol className="list-decimal list-inside space-y-1.5 text-slate-600 dark:text-slate-400 pl-1 leading-relaxed">
              <li>
                {lang === 'es'
                  ? 'Haz clic en "Descargar Web .ZIP" o copia el README.md.'
                  : 'Click "Download Web .ZIP" or copy the README.md content.'}
              </li>
              <li>
                {lang === 'es'
                  ? 'En tu terminal, clona tu repositorio: '
                  : 'In your terminal, clone your repository: '}
                <code className="text-indigo-600 dark:text-indigo-400 font-mono font-bold">
                  git clone https://github.com/inelsonv/Portafolio.git
                </code>
              </li>
              <li>
                {lang === 'es'
                  ? 'Descomprime los archivos dentro de la carpeta Portafolio y ejecuta: '
                  : 'Extract the files into the Portafolio folder and run: '}
                <code className="text-indigo-600 dark:text-indigo-400 font-mono font-bold">
                  git add . && git commit -m "feat: data engineer portfolio" && git push origin main
                </code>
              </li>
            </ol>
          </div>

          {/* Code Viewer (Collapsible) */}
          {showReadmePreview && (
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-950 text-slate-200 p-4 font-mono text-xs overflow-x-auto max-h-[400px] leading-relaxed">
              <pre className="whitespace-pre-wrap">{readmeMarkdown}</pre>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-6 text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-900 dark:text-slate-100">{profile.name}</span>
            <span aria-hidden="true">·</span>
            <span>{profile.title}</span>
            <span aria-hidden="true">·</span>
            <a
              href={profile.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              inelsonv/Portafolio
            </a>
          </div>

          <div className="flex items-center gap-6">
            <a
              href={profile.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
            >
              GitHub Repo
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
            >
              LinkedIn
            </a>
            <button
              onClick={() => setIsPublishModalOpen(true)}
              className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
            >
              {lang === 'es' ? 'Publicar' : 'Publish'}
            </button>
          </div>
        </div>
      </footer>

      {/* Publish Modal */}
      <PublishModal
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
        lang={lang}
        readmeContent={readmeMarkdown}
        onDownloadProjectZip={handleDownloadProjectZip}
      />
    </div>
  );
}
