import { useEffect, useState } from 'react';
import { webSocket } from "rxjs/webSocket";
import { map, scan, throttleTime, debounceTime } from 'rxjs/operators';
import dayjs from 'dayjs';

export const useLogs = () => {
  const [url, setUrl] = useState(null);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const subject = webSocket(url);
    if (url) {
      subject.subscribe((data) => {
        setLogs(logs.conncat([data]));
      });
    }
    return () => {
      subject.complete();
      subject.error({ code: 4000, reason: 'User close this logs output!' });
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
