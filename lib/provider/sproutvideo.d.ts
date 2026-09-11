import { VideoInfo } from '../urlParser';

export interface SproutVideoUrlParameters {
    [key: string]: any;
}

export type SproutVideoMediaTypes = 'video';

export interface SproutVideoVideoInfo extends VideoInfo<SproutVideoUrlParameters, SproutVideoMediaTypes> {
    provider: 'sproutvideo';
    token?: string;
    host?: string;
    slug?: string;
}

export type SproutVideoParseResult = SproutVideoVideoInfo | undefined;
