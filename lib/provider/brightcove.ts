import { VideoInfo } from '../urlParser';

export interface BrightcoveUrlParameters {
    [key: string]: any;
}

export type BrightcoveMediaTypes = 'video';

export interface BrightcoveVideoInfo extends VideoInfo<BrightcoveUrlParameters, BrightcoveMediaTypes> {
    provider: 'brightcove';
    channel: string;
}

export type VoomlyParseResult = BrightcoveVideoInfo | undefined;
