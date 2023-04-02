import { VideoInfo } from '../urlParser';

export interface BunnyUrlParameters {
    [key: string]: any;
}

export type BunnyMediaTypes = 'video';

export interface BunnyVideoInfo extends VideoInfo<BunnyUrlParameters, BunnyMediaTypes> {
    provider: 'bunny';
    channel: string;
}

export type BunnyParseResult = BunnyVideoInfo | undefined;
