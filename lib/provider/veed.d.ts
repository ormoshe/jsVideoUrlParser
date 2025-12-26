import { VideoInfo } from '../urlParser';

export interface VeedUrlParameters {
    [key: string]: any;
}

export type VeedMediaTypes = 'video';

export interface VeedVideoInfo extends VideoInfo<VeedUrlParameters, VeedMediaTypes> {
    provider: 'veed';
}

export type VeedParseResult = VeedVideoInfo | undefined;

