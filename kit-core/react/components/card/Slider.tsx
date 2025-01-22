import React from 'react'

import { ListContextProvider, useListContext } from 'vtex.list-context'

import Card, { PCARD } from './Card'
import { TSLCARD } from './TCard'

const CardSlider = ({ contentItem, children }: TSLCARD) => {
  const { list } = useListContext() || []

  const headBandListContent = contentItem.map((item, idx: number) => (
    <Card key={idx} {...item} />
  ))

  const newListContextValue = list.concat(headBandListContent)
  return (
    <ListContextProvider list={newListContextValue}>
      {children}
    </ListContextProvider>
  )
}

Card.schema = {
  title: 'Card',
  type: 'object',
  properties: PCARD,
}

CardSlider.schema = {
  title: 'Card',
  type: 'object',
  properties: {
    contentItem: {
      title: 'Card Items',
      type: 'array',
      default: [],
      items: {
        title: 'Card Item',
        type: 'object',
        properties: PCARD,
      },
    },
  },
}

export default CardSlider
