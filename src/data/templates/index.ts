import { RepositoryTemplate, ArchetypeId } from '../../types/repository';
import { streamingLakehouseTemplate } from './streamingLakehouse';
import { modernDataStackTemplate } from './modernDataStack';
import { cloudMedallionTemplate } from './cloudMedallion';
import { profilePortfolioTemplate } from './profilePortfolio';

export const REPOSITORY_TEMPLATES: Record<ArchetypeId, RepositoryTemplate> = {
  'streaming-lakehouse': streamingLakehouseTemplate,
  'modern-data-stack': modernDataStackTemplate,
  'cloud-medallion': cloudMedallionTemplate,
  'profile-portfolio': profilePortfolioTemplate,
};

export const TEMPLATE_LIST: RepositoryTemplate[] = [
  streamingLakehouseTemplate,
  modernDataStackTemplate,
  cloudMedallionTemplate,
  profilePortfolioTemplate,
];

export function getTemplateById(id: ArchetypeId): RepositoryTemplate {
  return REPOSITORY_TEMPLATES[id] || streamingLakehouseTemplate;
}
