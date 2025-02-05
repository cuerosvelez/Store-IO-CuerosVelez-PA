import React, { useEffect, useRef, useState } from 'react'

import { useCssHandles } from 'vtex.css-handles'

interface CustomSliderNumberProps {
  title?: string
  classes?: any
  children: any
}

const CustomSliderNumber = ({
  classes,
  children,
  title = 'VISUALIZANDO',
}: CustomSliderNumberProps) => {
  const version = 'vtex.slider-layout@0.x'
  const refContainer = useRef<HTMLDivElement>(null)
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const base = '.' + version.replace(/[.@]/g, '-') + '-'

  const CSS_HANDLES = [
    'sliderPagination-title',
    'sliderPagination-wrapper',
    'sliderPagination-numbers',
    'sliderPagination-content',
    'sliderPagination-container',
  ]

  const { handles } = useCssHandles(CSS_HANDLES, {
    migrationFrom: version,
    classes,
  })

  const handleClassChange = () => {
    setTimeout(() => {
      const currentClass = findHtmlAndGetCurrentClass(
        refContainer.current
      )?.split(' of ')

      if (currentClass && currentClass.length === 2) {
        const item: any = refContainer.current?.querySelectorAll(
          `${base}slide--visible`
        )?.length

        const pages = Math.ceil(parseInt(currentClass[1]) / item)
        const current = Math.ceil(parseInt(currentClass[0]) / item)

        if (totalPages !== pages) setTotalPages(pages)
        if (currentPage !== current) setCurrentPage(current)
      }
    }, 500)
  }

  useEffect(() => {
    handleClassChange()
    if (refContainer.current) {
      const observer = new MutationObserver(handleClassChange)
      observer.observe(refContainer.current, {
        subtree: true,
        attributes: true,
        attributeFilter: ['class'],
      })
      return () => {
        observer.disconnect()
      }
    } else {
      return () => {}
    }
  }, [])

  const findHtmlAndGetCurrentClass = (
    element: HTMLElement | null
  ): string | null => {
    if (!element) return null

    const spanElement = element.querySelector(
      `${base}slide--visible${base}slide--firstVisible`
    )
    return spanElement?.getAttribute('aria-label') || null
  }

  return (
    <div
      ref={refContainer}
      className={`${handles['sliderPagination-content']}`}
    >
      {children}
      <div className={`relative z-1 ${handles['sliderPagination-container']}`}>
        <div
          className={`flex flex-row items-center ${handles['sliderPagination-wrapper']}`}
        >
          <small
            className={`fs-normal fw4 ${handles['sliderPagination-title']}`}
          >
            {title}
          </small>
          <small
            className={`fs-normal fw4 ${handles['sliderPagination-numbers']}`}
          >
            {currentPage} / {totalPages}
          </small>
        </div>
      </div>
    </div>
  )
}

const SliderNumber: React.FC = (props: any) => {
  const { children, active = true, ...rest } = props

  return children && active ? (
    <CustomSliderNumber {...rest}>{children}</CustomSliderNumber>
  ) : children && !active ? (
    children
  ) : (
    <></>
  )
}

export default SliderNumber
