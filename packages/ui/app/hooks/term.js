import { useEffect, useState, useRef } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';
import { webSocket } from 'rxjs/webSocket';
import _ from 'lodash';

export const useTerm = () => {
  const ref = useRef();
  const [url, setUrl] = useState(null);

  useEffect(() => {
    if (url && ref && ref.current) {
      const term = new Terminal();
      const fitAddon = new FitAddon();
      term.loadAddon(fitAddon);

      const subject = webSocket({
        url,
        deserializer: ({ data }) => data,
        serializer: (data) =>
          typeof data === 'string' ? data : JSON.stringify(data),
      });

      term.onData((data) => {
        subject.next(data);
      });

      term.open(ref.current);
      term.focus();
      fitAddon.fit();

      subject.next({ cols: term.cols, rows: term.rows });
      subject.subscribe(
        (data) => term.write(data),
        (eventOrError) => {
          const { type, code = '', reason = '', message = '' } = eventOrError;
          return term.write(`\x1b[41m[${type} ${code}] ${reason} ${message}\x1b[0m`)
        }
      );

      const resizeListener = _.debounce(() => {
        fitAddon.fit();
        subject.next({ cols: term.cols, rows: term.rows });
      }, 200);
      window.addEventListener('resize', resizeListener);
      const t = setTimeout(resizeListener, 300);
      return () => {
        clearTimeout(t);
        window.removeEventListener('resize', resizeListener);
        subject.complete();
      };
    }
    return () => null;
  }, [url, ref]);
  const open = (l) => setUrl(l);
  const close = () => setUrl(null);

  return { open, close, ref };
};

export default useTerm;
