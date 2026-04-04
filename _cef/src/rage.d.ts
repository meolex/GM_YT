declare const mp: {
  events:
    | {
        add: (name: string, callback: (...args: any[]) => void) => void;
        remove: (name: string) => void;
      }
    | undefined;
  invoke: (name: string, ...args: any[]) => void;
};
