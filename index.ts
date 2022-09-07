interface Form {
  [key: string]: string | null | undefined | number;
}

export function trimer<T = Form>(
  form: T,
  exception?: keyof T | { [index: number]: keyof T }
): T {
  const keys = Object.keys(form);
  const anyTypedForm: any = form;
  const result = keys.reduce((acc: Form, cur, i) => {
    if (
      typeof anyTypedForm[cur] === "number" ||
      typeof anyTypedForm[cur] === "undefined" ||
      typeof anyTypedForm[cur] === "object"
    ) {
      acc[cur] = anyTypedForm[cur];
      return acc;
    }

    // 만약 예외가 존재하고
    if (exception) {
      // #1 한가지 스트링일 경우
      if (typeof exception === "string") {
        // 해당 스트링이 키값과 일치한경우
        if (cur === exception) {
          acc[cur] = anyTypedForm[cur];
          return acc;
        }
      }
      // #2 배열일 경우
      if (Array.isArray(exception)) {
        // 해당 배열에 존재하는 키값이면
        if (!exception.includes(cur)) {
          acc[cur] = anyTypedForm[cur];
          return acc;
        }
      }
    }

    // 나머지 의 경우 전부 트림처리
    acc[cur] = anyTypedForm[cur].trim();
    return acc;
  }, {});

  const typedResult = result as unknown as T;
  return typedResult;
}

const fftk = {
  trimer,
};

export default fftk;
