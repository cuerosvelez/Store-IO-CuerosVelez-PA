export type TCARD = {
  alt?: string
  text?: string
  link?: string
  image?: string
  mobileImage?: string
  type: "image" | "video",
  mobileVideo: string,
  video: string
}

export type TSLCARD = {
  children?: any
  contentItem: TCARD[]
  type: "image" | "video"
}
