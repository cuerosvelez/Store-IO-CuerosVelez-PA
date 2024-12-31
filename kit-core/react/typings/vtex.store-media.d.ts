declare module 'vtex.store-media' {
  import type MediaTypes from 'vtex.store-media/MediaTypes';

  export type MediaProps =
    | MediaTypes.ImageModeProps
    | MediaTypes.VideoModeProps;

  export interface MediaListProps {
    /**
     * List of Media props that will be turned into a list of Media components
     * @default []
     */
    mediaList?: MediaProps[];
  }

  export const Media: ComponentType<MediaProps>;

  export const MediaList: ComponentType<PropsWithChildren<MediaListProps>>;
}
