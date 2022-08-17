export default (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (x, i) =>
    arr.slice(i * size, i * size + size),
  );
