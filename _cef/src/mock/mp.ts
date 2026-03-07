if (typeof window !== "undefined" && typeof (window as any).mp === "undefined") {
  (window as any).mp = {
    events: {
      add: (_name: string, _callback: (...args: any[]) => void) => {},
      remove: (_name: string, _callback?: (...args: any[]) => void) => {},
      call: (_name: string, ..._args: any[]) => {},
    },
    trigger: (_name: string, ..._args: any[]) => {},
    callProc: (_name: string, ..._args: any[]) => Promise.resolve(),
  };
}
