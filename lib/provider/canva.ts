import { VideoInfo } from '../urlParser';

export interface CanvaUrlParameters {
    [key: string]: any;
}

export type CanvaMediaTypes = 'video';

export interface CanvaVideoInfo extends VideoInfo<CanvaUrlParameters, CanvaMediaTypes> {
    provider: 'canva';
    channel: string;
}

export type CanvaParseResult = CanvaVideoInfo | undefined;
