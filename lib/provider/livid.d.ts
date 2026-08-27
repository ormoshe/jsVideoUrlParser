import { VideoInfo } from '../urlParser';

export interface LividUrlParameters {
    [key: string]: any;
}

export type LividMediaTypes = 'video';

export interface LividVideoInfo extends VideoInfo<LividUrlParameters, LividMediaTypes> {
    provider: 'livid';
}

export type LividParseResult = LividVideoInfo | undefined;
