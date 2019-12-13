import { useEffect, useState } from 'react';
import { of } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';
import { map, scan, catchError, debounceTime } from 'rxjs/operators';
import dayjs from 'dayjs';

export const useLogs = () => {
  const [url, setUrl] = useState(null);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const subject = webSocket({
      url,
      deserializer: (e) => e.data,
    });
    if (url) {
      subject
        .pipe(
          map((l) => l),
          catchError((err) => {
            const { type, code, reason, message } = err;
            const time = dayjs().toISOString();
            return of(`${time} [${type} ${code}] ${reason || message || ''}`);
          })
        )
        .pipe(
          scan((acc, val) => {
            acc.push(val);
            return acc;
          }, [])
        )
        .pipe(debounceTime(100))
        .subscribe((l) => {
          setLogs(l.slice(-2000));
        });
    }
    return () => {
      subject.complete();
    };
  }, [url]);
  const open = (l) => {
    setUrl(l);
    setLogs([]);
  };
  const close = () => {
    setUrl(null);
    setLogs([]);
  };

  return { open, close, logs };
};

export default useLogs;
