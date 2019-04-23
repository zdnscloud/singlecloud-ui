export const procCollectionData = (payload) => {
  const { response } = payload;
  const data = (response.data || []).reduce(
    (meno, item) => ({
      ...meno,
      [item.id]: item,
    }),
    {}
  );
  const list = (response.data || []).map((item) => item.id);
  return { data, list };
};
