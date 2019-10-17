suite('Array iteration', function() {
  benchmark('_.each', function() {
    _.each([1, 2, 3], function(el) {
      return el;
    });
  });

  benchmark('native forEach', function() {
    [1, 2, 3].forEach(function(el) {
      return el;
    });
  });
});

suite('Array push vs concat', function() {
  benchmark('Array push', function() {
    const arr = [];
    arr.push(1);
    arr.push(1);
    arr.push(1);
    arr.push(1);
    arr.push(1);
  });

  benchmark('Array concat', function() {
    let arr = [];
    arr = arr.concat([1]);
    arr = arr.concat([1]);
    arr = arr.concat([1]);
    arr = arr.concat([1]);
    arr = arr.concat([1]);
  });
});
