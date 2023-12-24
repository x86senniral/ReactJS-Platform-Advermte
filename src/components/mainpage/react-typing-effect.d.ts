// react-typing-effect.d.ts
declare module 'react-typing-effect' {
    import { FunctionComponent, ReactElement } from 'react';
  
    interface ReactTypingEffectProps {
      text: string | string[];
      speed?: number;
      eraseSpeed?: number;
      typingDelay?: number;
      eraseDelay?: number;
      cursorRenderer?: (cursor: string) => ReactElement;
      displayTextRenderer?: (text: string, i: number) => ReactElement;
      // ... other props
    }
  
    const ReactTypingEffect: FunctionComponent<ReactTypingEffectProps>;
    export default ReactTypingEffect;
  }
  