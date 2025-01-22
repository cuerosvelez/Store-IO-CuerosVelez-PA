import React from 'react'

import { CssHandlesTypes, useCssHandles } from 'vtex.css-handles'

import { TCARD } from './TCard'
import Card, { PCARD } from './Card'

const CSS_HANDLES = ['wrapperCardGallery']

interface ICARDGALLERY {
  cards: TCARD[]
  classes?: CssHandlesTypes.CustomClasses<typeof CSS_HANDLES>
}

const CardGallery = ({ classes, cards }: ICARDGALLERY) => {
  const { handles } = useCssHandles(CSS_HANDLES, {
    migrationFrom: 'vtex.store-components@3.x',
    classes,
  })

  return (
    <div className={`${handles['wrapperCardGallery']}`}>
      {cards?.map((item, i) => (
        <Card key={`gallery-card-${i}`} {...item} />
      ))}
    </div>
  )
}

CardGallery.schema = {
  title: 'Card Gallery',
  type: 'object',
  properties: {
    contentItem: {
      title: 'Card Gallery Items',
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

export default CardGallery
