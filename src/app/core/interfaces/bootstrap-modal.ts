export interface BootstrapModal {
    new (element: HTMLElement): {
      show: () => void;
      hide: () => void;
    };
  }
  