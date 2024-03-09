import { subject, selectSubject } from "../model";

export default function sameData(
  subject: string,
  yearstore: selectSubject
): boolean {
  let found: boolean = false;

  for (const value of Object.values(yearstore)) {
    found = value.some((ele: subject) => {
      return ele.subject_name === subject;
    });
    if (found === true) break;
  }
  return found;
}

//   if (year === 1) {
//     found = yearstore.firstYear.some((el) => {
//       el.subject_name === subject;
//     });
//   } else if (year === 2) {
//     found = yearstore.firstYear.some((el) => {
//       el.subject_name === subject;
//     });
//   } else if (year === 3) {
//     found = yearstore.firstYear.some((el) => {
//       el.subject_name === subject;
//     });
//   }
