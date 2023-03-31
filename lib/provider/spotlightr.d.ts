import { VideoInfo } from '../urlParser';

export interface SpotlightrUrlParameters {
    [key: string]: any;
}

export type SpotlightrMediaTypes = 'video';

export interface SpotlightrVideoInfo extends VideoInfo<SpotlightrUrlParameters, SpotlightrMediaTypes> {
    provider: 'spotlightr';
    channel: string;
}

export type SpotlightrParseResult = SpotlightrVideoInfo | undefined;
