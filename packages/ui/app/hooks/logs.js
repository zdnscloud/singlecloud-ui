import { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { Observable } from 'rxjs';
import { map, scan, throttleTime, debounceTime } from 'rxjs/operators';
import dayjs from 'dayjs';

export const useLogs = () => {
  const [url, setUrl] = useState(null);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (url) {
      Observable.create((observer) => {
        const socket = new SockJS(url, null, { transports: 'websocket' });
        socket.onmessage = (e) => {
          observer.next(e.data);
        };
        socket.onerror = (e) => {
          const time = dayjs().format('YYYY-MM-DD HH:mm:ss');
          observer.next(`${time} [Error] ${e && e.message}`);
        };
        socket.onclose = ({ code, reason }) => {
          const time = dayjs().format('YYYY-MM-DD HH:mm:ss');
          observer.next(`${time} [Close ${code}] ${reason}`);
          observer.complete();
        };
        return () => socket.close();
      })
        .pipe(
          scan((acc, val) => {
            acc.push(val);
            return acc;
          }, [])
        )
        .subscribe((l) => {
          setLogs(l);
        });
    }
  }, [url]);
  const open = (l) => setUrl(l);
  const close = () => setUrl(null);

  return { open, close, logs };
};

export default useLogs;
