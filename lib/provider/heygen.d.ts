import { VideoInfo } from '../urlParser';

export interface HeyGenUrlParameters {
    [key: string]: any;
}

export type HeyGenMediaTypes = 'video';

export interface HeyGenVideoInfo extends VideoInfo<HeyGenUrlParameters, HeyGenMediaTypes> {
    provider: 'heygen';
}

export type HeyGenParseResult = HeyGenVideoInfo | undefined;
