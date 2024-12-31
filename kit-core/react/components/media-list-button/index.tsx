import React, { useMemo } from 'react';
import { Media, MediaProps } from 'vtex.store-media';
import { ListContextProvider, useListContext } from 'vtex.list-context';

import type { PropsWithChildren } from 'react';

export interface MediaListProps {
  /**
   * List of Media props that will be turned into a list of Media components
   * @default []
   */
  mediaList?: MediaProps[];
}

const getMediaAsJSXList = ({ mediaList }: MediaListProps) =>
  mediaList?.map((props: MediaProps, idx) => (
    <Media key={`mediaListButton-${idx}`} {...props} />
  ));

const MediaListButton = ({ mediaList }: PropsWithChildren<MediaListProps>) => {
  const contextList = useListContext();

  const imageListContent = useMemo(
    () => getMediaAsJSXList({ mediaList }),
    [mediaList],
  );

  const newListContextValue = useMemo(() => {
    const list = contextList?.list ?? [];
    return list.concat(imageListContent ?? []);
  }, [contextList?.list, imageListContent]);

  return <ListContextProvider list={newListContextValue} />;
};

export default MediaListButton;
