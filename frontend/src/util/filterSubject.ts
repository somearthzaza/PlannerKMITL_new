export default function filterSub<T extends { subject_name: string }>(
  selectData: string,
  subject: T[]
): T | undefined {
  const subjectFound = subject.find((value: T, index: number): T | null => {
    if (value.subject_name === selectData) {
      return subject[index];
    } else {
      return null;
    }
  });
  return subjectFound;
}
