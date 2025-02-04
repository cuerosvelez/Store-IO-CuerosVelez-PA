import React, { useMemo } from 'react';
import { ListContextProvider, useListContext } from 'vtex.list-context';

import MediaButton, { MediaButtonProps } from '../media-button';
import type { PropsWithChildren } from 'react';

export interface MediaListProps {
  /**
   * List of Media props that will be turned into a list of Media components
   * @default []
   */
  children?: React.ReactNode;
  mediaList?: MediaButtonProps[];
}

const getMediaAsJSXList = ({ mediaList }: MediaListProps) =>
  mediaList?.map((props: MediaButtonProps, idx) => (
    <MediaButton key={`mediaListButton-${idx}`} {...props} />
  ));

const MediaListButton = ({
  mediaList,
  children,
}: PropsWithChildren<MediaListProps>) => {
  const { list } = useListContext() || { list: [] };

  const imageListContent = useMemo(
    () => getMediaAsJSXList({ mediaList }),
    [mediaList],
  );

  const newListContextValue = useMemo(
    () => list?.concat(imageListContent ?? []),
    [list, imageListContent],
  );

  return (
    <ListContextProvider list={newListContextValue}>
      {children}
    </ListContextProvider>
  );
};

export default MediaListButton;
