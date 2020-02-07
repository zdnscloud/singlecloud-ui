import { useEffect, useState } from 'react';
import { of } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';
import { map, scan, catchError, debounceTime } from 'rxjs/operators';

export const useTap = () => {
  const [url, setUrl] = useState(null);
  const [tap, setTap] = useState([]);

  useEffect(() => {
    const subject = webSocket({
      url,
      // deserializer: (e) => e.data,
    });
    if (url) {
      subject
        .pipe(
          map((l) => l),
          catchError((err) => of(err))
        )
        .pipe(
          scan((acc, val) => {
            acc.push(val);
            return acc;
          }, [])
        )
        .pipe(debounceTime(100))
        .subscribe((l) => {
          setTap(l.slice(-40));
        });
    }
    return () => {
      subject.complete();
    };
  }, [url]);
  const tapStart = (u) => { setUrl(u); };
  const tapStop = () => { setUrl(null); };
  const tapReset = () => { setTap([]); };

  return { tapStart, tapStop, tapReset, tap };
};

export default useTap;
