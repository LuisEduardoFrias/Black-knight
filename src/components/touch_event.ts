
export type touchEvent = {
  touches: [{
    clientX: number,
    clientY: number,
    force: number,
    identifier: number,
    pageX: number,
    pageY: number,
    radiusX: number,
    radiusY: number,
    rotationAngle: number,
    screenX: number,
    screenY: number,
  }],
  length: number,
  type: string
}

/*
const obj = {
  isTrusted: true,
  altKey: false,
  bubbles: true,
  cancelBubble: false,
  cancelable: false,
  changedTouches: { TouchList: { 0: Touch, length: 1 } },
  composed: true,
  ctrlKey: false,
  currentTarget: null,
  defaultPrevented: false,
  detail: 0,
  eventPhase: 0,
  metaKey: false,
  returnValue: true,
  shiftKey: false,
  sourceCapabilities: { InputDeviceCapabilities: { firesTouchEvents: true } },
  srcElement: "canvas#Canvas",
  target: "canvas#Canvas",
  targetTouches: { TouchList: { 0: Touch, length: 1 } },
  timeStamp: 16156.60000000149,
  touches: { TouchList: { 0: Touch, length: 1 } },
  type: "touchstart",
  view: {
    Window: {
      window: Window,
      self: Window,
      document: document,
      name: '',
      location: Location,
    }
  },
  which: 0,
  Prototype: TouchEvent
}
*/