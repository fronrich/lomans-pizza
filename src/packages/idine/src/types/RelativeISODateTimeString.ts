// RelativeISOTimeString - ISO-like time string (24h format)
type HH = `${0 | 1}${number}` | `2${0 | 1 | 2 | 3}`;
type MM = `${0 | 1 | 2 | 3 | 4 | 5}${number}`;
type SS = MM;
type RelativeISODateTimeString = `${HH}:${MM}` | `${HH}:${MM}:${SS}` | string;

export default RelativeISODateTimeString;
