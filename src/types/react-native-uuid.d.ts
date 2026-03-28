declare module 'react-native-uuid' {
  type UUID = string;

  interface UUIDModule {
    v1: () => UUID;
    v4: () => UUID;
    parse: (uuid: string) => Uint8Array;
    stringify: (buffer: Uint8Array) => UUID;
    validate: (uuid: string) => boolean;
    version: (uuid: string) => number;
  }

  const uuid: UUIDModule;
  export default uuid;
}
