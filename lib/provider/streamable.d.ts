import { VideoInfo } from '../urlParser';

export interface StreamableUrlParameters {
    [key: string]: any;
}

export type StreamableMediaTypes = 'video';

export interface StreamableVideoInfo extends VideoInfo<StreamableUrlParameters, StreamableMediaTypes> {
    provider: 'streamable';
    channel: string;
}

export type StreamableParseResult = StreamableVideoInfo | undefined;
