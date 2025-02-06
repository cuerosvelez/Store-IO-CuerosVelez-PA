import React, { useRef, useState } from "react";
import { useCssHandles } from 'vtex.css-handles';
import { index as RichText } from 'vtex.rich-text'
import { useDevice } from 'vtex.device-detector';
import { CSSTransition } from "react-transition-group";

import "./style.css"

interface BlockTabsI {
  blocks: Array<blocksI>,
  blockClass: string,
  title_section: string
}

interface blocksI {
  image: string,
  thumbnailImage: string,
  imageMobile: string,
  title: string
  text: string
  paragraph: string
  thumbnailMobile: string
}

const initialTab = {
  image: "",
  thumbnailImage: "",
  imageMobile: "",
  title: "",
  text: "",
  paragraph: ""
}

const BlockTabs = ({ title_section, blocks, blockClass }: BlockTabsI) => {


  const { isMobile } = useDevice();

  const CSS_HANDLES = [
    "container_tabs_baner_3",
    "container_blocks_tabs",
    "container_section_1",
    "container_section_2",
    "container_section_2_box",
    "container_title_general",
    "container_imgs",
    "container_img_1",
    "container_img_2",
    "container_img_3",
    "img",
    "container_texts",
    "container_text_1",
    "container_text_2",
    "container_text_3",
    "container_tabs_items",
    "container_tabs_text",
    "container_tabs_img",
    "container_btn_tab_close",
    "btn_tab_close",
    "container_btn_tab_items",
    "btn_tab_items",
    "tabs_img",
    "split_box",
    "tab_active"
  ];
  const handles: any = useCssHandles(CSS_HANDLES, { blockClass });

  const [showTabs, setShowTabs] = useState(false);
  const [itemTab, setItemTab] = useState(initialTab);


  console.log('HANDLES: ', handles , 'aqui')
  const handleShowTabs = (item: blocksI) => {
    setItemTab(item);
    setShowTabs(true);
  }

  const handleHideTabs = () => {
    setItemTab(initialTab);
    setShowTabs(false);
  }

  const containerClick = useRef(null)

  return <>
    <div className={`${handles.handles.container_tabs_baner_3}`}>

      <CSSTransition
        in={!showTabs}
        timeout={100}
        classNames="fade"
        unmountOnExit
      >
        <section className={`${handles.handles.container_section_1}`}>
          <div className={`${handles.handles.container_title_general}`}>
            <RichText text={title_section} />
          </div>
          <div className={`${handles.handles.container_blocks_tabs}`}>
            {blocks.map((item: blocksI, index) => (
              <div ref={containerClick} key={"container_imgs_" + index} onClick={() => handleShowTabs(item)}>
                <div className={`${handles.handles.container_imgs} ${handles.handles.container_img_1}`}>
                  <img className={`${handles.handles.img}`} src={isMobile ? item.thumbnailMobile : item.thumbnailImage} alt="Imagen de referencia" />
                  <div className={`${handles.handles.container_texts} ${handles.handles.container_text_1}`}>
                    <RichText text={item.title} />
                    <RichText text={item.text} />
                  </div>
                </div>

              </div>
            ))}
          </div>
        </section>
      </CSSTransition>

      <CSSTransition
        in={showTabs}
        timeout={1200}
        classNames="fade"
        unmountOnExit
      >

        <section className={`${handles.handles.container_section_2}`}>
          <div className={`${handles.handles.container_section_2_box}`}>
            <div className={`${handles.handles.split_box}`}>
              <div className={`flex ${handles.handles.container_tabs_items}`}>
                <div className={`${handles.handles.container_btn_tab_close}`}>
                  <button onClick={() => handleHideTabs()} type="button" className={`${handles.handles.btn_tab_close}`}>
                    <svg width="14" height="20" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.59574 13.5106L0 6.91484L6.59574 0.319092L7.76649 1.48984L2.34149 6.91484L7.76649 12.3398L6.59574 13.5106Z" fill="#707070" />
                    </svg>

                  </button>
                </div>
                {blocks.map((block, index) => (
                  <div className={`${handles.handles.container_btn_tab_items} ${handles.handles.container_btn_tab_items+"_"+index}`} key={"container_imgs_tabs" + index}>
                    <button className={`${handles.handles.btn_tab_items} ${itemTab.title === block.title && handles.handles.tab_active}`} type="button" onClick={() => handleShowTabs(block)}>
                      <RichText text={block.title} />
                    </button>
                  </div>
                ))}
              </div>
              <div className={`${handles.handles.container_tabs_text}`}>
                <RichText text={itemTab.paragraph} />
              </div>
            </div>
            <div className={`${handles.handles.container_tabs_img}`}>
              <img className={`${handles.tabs_img}`} src={isMobile ? itemTab.imageMobile : itemTab.image} alt="" />
            </div>
          </div>
        </section>
      </CSSTransition>
    </div>
  </>
};

export default BlockTabs;
