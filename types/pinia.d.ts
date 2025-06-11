import 'pinia'

declare module 'pinia' {
  export interface DefineStoreOptionsBase<S, Store> {
    persist?: {
      storage?: Storage | undefined
      paths?: string[]
      key?: string
      beforeRestore?: (context: PiniaPluginContext) => void
      afterRestore?: (context: PiniaPluginContext) => void
      serializer?: {
        deserialize: (data: string) => any
        serialize: (data: any) => string
      }
    } | {
      storage?: Storage | undefined
      paths?: string[]
      key?: string
      beforeRestore?: (context: PiniaPluginContext) => void
      afterRestore?: (context: PiniaPluginContext) => void
      serializer?: {
        deserialize: (data: string) => any
        serialize: (data: any) => string
      }
    }[]
  }
} 