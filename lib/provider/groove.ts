import { VideoInfo } from '../urlParser';

export interface GrooveUrlParameters {
    [key: string]: any;
}

export type GrooveMediaTypes = 'video';

export interface GrooveVideoInfo extends VideoInfo<GrooveUrlParameters, GrooveMediaTypes> {
    provider: 'groove';
    channel: string;
}

export type VoomlyParseResult = GrooveVideoInfo | undefined;
