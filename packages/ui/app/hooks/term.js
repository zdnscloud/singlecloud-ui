import { useEffect, useState, useRef } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';
import SockJS from 'sockjs-client';
import _ from 'lodash';

export const useTerm = () => {
  const ref = useRef();
  const [url, setUrl] = useState(null);

  useEffect(() => {
    if (url && ref && ref.current) {
      const term = new Terminal();
      const fitAddon = new FitAddon();
      term.loadAddon(fitAddon);

      const socket = new SockJS(url, null, { transports: 'websocket' });

      term.onData((data) => {
        if (socket.readyState === 1) socket.send(data);
      });

      term.open(ref.current);
      term.focus();
      fitAddon.fit();

      socket.onopen = () => {
        socket.send(JSON.stringify({ cols: term.cols, rows: term.rows }));
      };

      socket.onmessage = (e) => {
        term.write(e.data);
      };

      socket.onclose = () => {
        term.write('session is close');
      };

      const resizeListener = _.debounce(() => {
        fitAddon.fit();
        socket.send(JSON.stringify({ cols: term.cols, rows: term.rows }));
      }, 200);
      window.addEventListener('resize', resizeListener);
      const t = setTimeout(resizeListener, 300);
      return () => {
        clearTimeout(t);
        window.removeEventListener('resize', resizeListener);
        socket.close();
      };
    }
    return () => null;
  }, [url, ref]);
  const open = (l) => setUrl(l);
  const close = () => setUrl(null);

  return { open, close, ref };
};

export default useTerm;
