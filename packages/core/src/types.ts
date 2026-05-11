export interface IpCount {
  ip: string;
  count: number;
  percentage: number;
}

export interface AnalysisResult {
  totalRequests: number;
  uniqueIpCount: number;
  processingTimeMs: number;
  topIps: IpCount[];
}
