import {getElementWidth} from "@/utils/dom";

export const scrollbarHide = (element?: HTMLElement, scrollbarCheck?: boolean) => {
  if (typeof document === "undefined" || !scrollbarCheck) return null
  if(!element) {
    element = document.querySelector("#root-body") as HTMLElement
  }
  const width = getElementWidth()
  disableOverFlow(element)
  saveInitialPadding(element)
  element.style.paddingRight = `${width}px`
}

export const scrollbarReset = (element?: HTMLElement, scrollbarCheck?: boolean) => {
  if (typeof document === "undefined" || !scrollbarCheck) return null
  if(!element) {
    element = document.querySelector("#root-body") as HTMLElement
  }
  restoreInitialOverflow(element)
  restoreInitialPadding(element)
}

const restoreInitialOverflow = (root: HTMLElement) => {
  root.style.overflow = root.dataset.initialOverflow || ""
  root.removeAttribute("data-initial-overflow")
}

const restoreInitialPadding = (root: HTMLElement) => {
  root.style.paddingRight = root.dataset.initialPadding || ""
  root.removeAttribute("data-initial-padding")
}

const disableOverFlow = (root: HTMLElement) => {
  saveInitialOverflow(root)
  root.style.overflow = "hidden"
}

const saveInitialOverflow = (root: HTMLElement) => {
  if (root.hasAttribute("data-initial-overflow")) return
  root.dataset.initialOverflow = root.style.overflow
}

const saveInitialPadding = (root: HTMLElement) => {
  root.dataset.initialPadding = root.style.paddingRight
}