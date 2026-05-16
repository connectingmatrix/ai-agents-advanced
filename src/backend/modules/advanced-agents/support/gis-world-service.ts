import { randomUUID } from 'node:crypto';
import type { AdvancedGisSpec } from '../contracts/types';

const text = (value: unknown) => String(value ?? '').trim();
const number = (value: unknown, fallback = 0) => (Number.isFinite(Number(value)) ? Number(value) : fallback);

const COUNTRY_ALIASES: Record<string, string> = {
  usa: 'United States of America',
  us: 'United States of America',
  'united states': 'United States of America',
  pakistan: 'Pakistan',
  pk: 'Pakistan',
  uk: 'United Kingdom',
  uae: 'United Arab Emirates',
};

export const WORLD_COUNTRIES_GEOJSON_URL = 'https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson';

export function normalizeCountryName(value: unknown): string | undefined {
  const raw = text(value);
  if (!raw) return undefined;
  return COUNTRY_ALIASES[raw.toLowerCase()] || raw.replace(/\b\w/g, (m) => m.toUpperCase());
}

export function createWorldGisSpec(input: Record<string, unknown>): AdvancedGisSpec {
  const message = text(input.prompt || input.message || input.title);
  const country = normalizeCountryName(
    input.country || (/pakistan/i.test(message) ? 'Pakistan' : /\b(us|usa|united states)\b/i.test(message) ? 'United States of America' : undefined),
  );
  const type = country
    ? 'country'
    : /heat/i.test(message)
    ? 'heatmap'
    : /route/i.test(message)
    ? 'route'
    : /coordinate|lat|lng|lon|point/i.test(message)
    ? 'coordinates'
    : 'world';
  const title = text(input.title) || (country ? `${country} map` : 'World map');
  const data = Array.isArray(input.data) ? (input.data.filter((row) => row && typeof row === 'object') as Record<string, unknown>[]) : [];
  const valueField = text(input.valueField || input.value_field) || (/population/i.test(message) ? 'population' : 'value');
  const labelField = text(input.labelField || input.label_field) || (country ? 'name' : 'ADMIN');
  return {
    id: text(input.id) || randomUUID(),
    type: type as AdvancedGisSpec['type'],
    title,
    projection: (text(input.projection) as AdvancedGisSpec['projection']) || 'natural-earth',
    country,
    geojsonUrl: text(input.geojsonUrl || input.geojson_url) || WORLD_COUNTRIES_GEOJSON_URL,
    data,
    coordinateFields: {
      longitude: text(input.longitudeField || input.longitude_field) || 'longitude',
      latitude: text(input.latitudeField || input.latitude_field) || 'latitude',
      label: text(input.labelField || input.label_field) || 'label',
      value: valueField,
    },
    style: {
      colorScale:
        (text(input.colorScale || input.color_scale) as AdvancedGisSpec['style']['colorScale']) || (/blue/i.test(message) ? 'blue' : 'viridis'),
      labelField,
      valueField,
      legendTitle: text(input.legendTitle || input.legend_title) || valueField.replace(/_/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase()),
    },
    operations: Array.isArray(input.operations) ? (input.operations as AdvancedGisSpec['operations']) : [],
  };
}

export function createCoordinatePlotSpec(input: Record<string, unknown>): AdvancedGisSpec {
  return createWorldGisSpec({ ...input, type: 'coordinates' });
}

export function createGisOperationPlan(input: Record<string, unknown>) {
  const spec = createWorldGisSpec(input);
  const operations = spec.operations.length
    ? spec.operations
    : [
        { name: 'validate-geojson', args: { url: spec.geojsonUrl } },
        { name: 'join-data', args: { labelField: spec.style.labelField, valueField: spec.style.valueField } },
        {
          name: spec.type === 'heatmap' ? 'compute-heatmap' : spec.type === 'route' ? 'compute-route' : 'render-map',
          args: { projection: spec.projection },
        },
      ];
  return {
    spec: { ...spec, operations },
    summary: `Prepared ${spec.type} GIS map${spec.country ? ` for ${spec.country}` : ''}.`,
    output: `[chart]{"type":"gis","title":"${spec.title.replace(/"/g, '\\"')}","id":"${spec.id}"}[/chart]`,
  };
}

export function haversineKm(a: { latitude: number; longitude: number }, b: { latitude: number; longitude: number }) {
  const R = 6371;
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(b.latitude - a.latitude);
  const dLon = toRad(b.longitude - a.longitude);
  const lat1 = toRad(a.latitude);
  const lat2 = toRad(b.latitude);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export function bboxFromCoordinates(rows: Array<Record<string, unknown>>, fields = { latitude: 'latitude', longitude: 'longitude' }) {
  const points = rows
    .map((row) => ({ lat: number(row[fields.latitude]), lon: number(row[fields.longitude]) }))
    .filter((p) => Number.isFinite(p.lat) && Number.isFinite(p.lon));
  if (!points.length) return null;
  return {
    minLatitude: Math.min(...points.map((p) => p.lat)),
    maxLatitude: Math.max(...points.map((p) => p.lat)),
    minLongitude: Math.min(...points.map((p) => p.lon)),
    maxLongitude: Math.max(...points.map((p) => p.lon)),
  };
}
