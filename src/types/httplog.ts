export interface HTTPRequestLog {
  [key: string]: string | number;
  ip: string;
  user: string,
  timestamp: string,
  method: string,
  url: string,
  protocol: string,
  status: number,
  size: number,
  userAgent: string;
}
