export type AgentGisDataInput = {
  label?: string;
  longitude?: number;
  latitude?: number;
  value?: number;
};

export type AgentGisToolInput = {
  prompt?: string;
  message?: string;
  title?: string;
  country?: string;
  projection?: string;
  geojsonUrl?: string;
  longitudeField?: string;
  latitudeField?: string;
  labelField?: string;
  valueField?: string;
  colorScale?: string;
  legendTitle?: string;
  data?: AgentGisDataInput[];
};

export type AgentImageToolInput = {
  operation?: string;
  prompt?: string;
  message?: string;
  instruction?: string;
  sourceUri?: string;
  path?: string;
  outputFormat?: string;
  title?: string;
  frameWidth?: number;
  frameHeight?: number;
  columns?: number;
  rows?: number;
};
