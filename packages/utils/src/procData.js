export const procCollectionData = (payload) => {
  const { response } = payload;
  const data = ((response && response.data) || []).reduce(
    (meno, item) => ({
      ...meno,
      [item.id]: item,
    }),
    {}
  );
  const list = ((response && response.data) || []).map((item) => item.id);
  return { data, list };
};
