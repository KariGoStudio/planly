export function isDev() {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("dev_mode") === "true";
}

export function requireDevAccess(router: any) {
  const ok = isDev();
  if (!ok) {
    router.push("/login");
  }
}