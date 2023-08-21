function hexlify_memos(x) {
  if (!("Memos" in x)) return;

  for (let y in x["Memos"]) {
    for (let a in x["Memos"][y]) {
      let Fields = ["MemoFormat", "MemoType", "MemoData"];
      for (let z in Fields) {
        if (Fields[z] in x["Memos"][y][a]) {
          let u = x["Memos"][y][a][Fields[z]].toUpperCase();
          if (u.match(/^[0-9A-F]+$/)) {
            x["Memos"][y][a][Fields[z]] = u;
            continue;
          }

          x["Memos"][y][a][Fields[z]] =
            "" +
            Buffer.from(x["Memos"][y][a][Fields[z]])
              .toString("hex")
              .toUpperCase();
        }
      }
    }
  }
}
export default hexlify_memos;
