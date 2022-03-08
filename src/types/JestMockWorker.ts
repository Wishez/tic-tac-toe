export interface JestMockWorker {
  postMessage(message: any, transfer: Transferable[]): void
  postMessage(message: any, options?: StructuredSerializeOptions): void
  terminate(): void
  addEventListener<K extends keyof WorkerEventMap>(
    type: K,
    listener: (this: Worker, ev: WorkerEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions,
  ): void
  addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void
  removeEventListener<K extends keyof WorkerEventMap>(
    type: K,
    listener: (this: Worker, ev: WorkerEventMap[K]) => any,
    options?: boolean | EventListenerOptions,
  ): void
  removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void
}

export class JestMockWorker {
  postMessage() {}

  terminate() {}

  addEventListener() {}

  removeEventListener() {}
}
