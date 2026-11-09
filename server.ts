import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

app.use(express.json({ limit: '10mb' }));

// Healthcheck
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// AI Customization Endpoint for Data Engineering Pipelines
app.post('/api/ai/customize-pipeline', async (req, res) => {
  try {
    const { domain, stack, userPrompt, currentArchitecture } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(200).json({
        success: false,
        fallback: true,
        message: 'GEMINI_API_KEY not configured. Falling back to built-in generator engine.',
      });
    }

    const ai = new GoogleGenAI({ apiKey });

    const promptText = `
You are a Staff Data Engineer creating a production-grade GitHub repository for a data engineering project.
User Request / Domain: ${domain || userPrompt}
Target Stack:
- Orchestrator: ${stack?.orchestrator || 'Airflow'}
- Processing Engine: ${stack?.engine || 'PySpark'}
- Storage / Lakehouse: ${stack?.storage || 'Iceberg'}
- Ingestion: ${stack?.ingestion || 'Kafka'}
- Quality: ${stack?.quality || 'Great Expectations'}

Provide custom, production-grade files for this repository in JSON format:
1. "readme_overview": 3-4 paragraphs of markdown explaining the architecture, data lineage, scalability, and impact.
2. "architecture_ascii": A clean ASCII / Unicode diagram of the data flow (e.g. Sources -> Streaming/Batch -> Bronze -> Quality Gate -> Silver -> Gold Marts -> Downstream).
3. "sample_events": A valid JSON array of 5 realistic domain events (raw data).
4. "core_dag_code": Complete, runnable Python code for the orchestrator (${stack?.orchestrator || 'Airflow'}).
5. "core_transform_code": Complete transform script (${stack?.engine || 'PySpark'} or SQL).
6. "data_quality_rules": List of 4-6 specific data quality expectation rules for this domain.
7. "quickstart_commands": Array of terminal commands to set up and run the repo locally.

Return ONLY valid JSON matching this structure without markdown code fences around the entire response.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: promptText,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const responseText = response.text || '{}';
    let parsedData = {};
    try {
      parsedData = JSON.parse(responseText);
    } catch {
      parsedData = { rawText: responseText };
    }

    return res.json({
      success: true,
      data: parsedData,
    });
  } catch (error: any) {
    console.error('Gemini pipeline customization error:', error);
    return res.status(500).json({
      success: false,
      error: error?.message || 'Failed to generate custom pipeline with Gemini',
    });
  }
});

// Setup Vite dev server middleware or serve static dist
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`DataForge Server running on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
