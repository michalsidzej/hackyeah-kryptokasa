export interface PreloadAPI {
  fetch: (url: string) => Promise<Response>;
}
