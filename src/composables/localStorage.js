class localAccess {
  constructor() {
    this.l = window.localStorage;
  }
  get(name) {
    return JSON.parse(this.l.getItem(name));
  }
  getStr(name) {
    return this.l.getItem(name);
  }
  set(name, object) {
    this.l.setItem(name, JSON.stringify(object));
  }
  setStr(name, object) {
    this.l.setItem(name, object);
  }
  remove(name) {
    this.l.removeItem(name);
  }
}
export function useStoge(){
  return {storage: new localAccess}
}