import { VideoInfo } from '../urlParser';

export interface CloudflareStreamUrlParameters {
    [key: string]: any;
}

export type CloudflareStreamMediaTypes = 'video';

export interface CloudflareStreamVideoInfo extends VideoInfo<CloudflareStreamUrlParameters, CloudflareStreamMediaTypes> {
    provider: 'cloudflarestream';
    host: string;
}

export type CloudflareStreamParseResult = CloudflareStreamVideoInfo | undefined;
