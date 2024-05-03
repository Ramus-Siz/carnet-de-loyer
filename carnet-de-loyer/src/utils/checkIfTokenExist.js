export function IstokenExist() {
  const token = sessionStorage.getItem("token");

  if (token !== null) {
    return { token: token };
  }
}
